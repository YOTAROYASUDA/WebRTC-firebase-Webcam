// webrtc.js

import { db } from "./firebase-config.js";
import { collection, doc, setDoc, getDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import * as state from './state.js';
import { RTC_CONFIGURATION, RESOLUTIONS } from './constants.js';
import * as ui from './ui.js';
import * as uiElements from './ui-elements.js';
import * as ptz from './ptz.js';
import { stopStatsRecording, updateResolutionDisplay } from './stats.js';

/**
 * RTCPeerConnectionインスタンスを作成し、イベントハンドラを設定する。
 * @returns {RTCPeerConnection} RTCPeerConnectionのインスタンス
 */
function createPeerConnection() {
  const pc = new RTCPeerConnection(RTC_CONFIGURATION);

  pc.onconnectionstatechange = () => {
    console.log(`PeerConnection state changed to: ${pc.connectionState}`);
    const isConnected = pc.connectionState === 'connected';
    uiElements.statsControls.style.display = isConnected ? 'block' : 'none';

    if (isConnected && state.currentRole === 'receiver') {
      if (!state.resolutionUpdateInterval) {
        const interval = setInterval(updateResolutionDisplay, 1000);
        state.setResolutionUpdateInterval(interval);
      }
    } else {
      if (state.resolutionUpdateInterval) {
        clearInterval(state.resolutionUpdateInterval);
        state.setResolutionUpdateInterval(null);
      }
      uiElements.resolutionDisplay.style.display = 'none';
    }

    if (!isConnected) {
      stopStatsRecording();
    }
  };

  return pc;
}

/**
 * SDP（Session Description Protocol）を操作して、指定されたコーデックを優先する。
 * @param {string} sdp - 元のSDP
 * @param {string} codecName - 優先するコーデック名 (e.g., 'H264', 'VP9')
 * @returns {string} 変更されたSDP
 */
function preferCodec(sdp, codecName) {
  const lines = sdp.split('\r\n');
  const mLineIndex = lines.findIndex(line => line.startsWith('m=video'));
  if (mLineIndex === -1) return sdp;

  const codecRegex = new RegExp(`a=rtpmap:(\\d+) ${codecName}/90000`, 'i');
  const codecLine = lines.find(line => codecRegex.test(line));
  if (!codecLine) return sdp;

  const codecPayload = codecLine.match(codecRegex)[1];
  const mLineParts = lines[mLineIndex].split(' ');
  const newMLine = [
    mLineParts[0], mLineParts[1], mLineParts[2],
    codecPayload,
    ...mLineParts.slice(3).filter(pt => pt !== codecPayload)
  ];
  lines[mLineIndex] = newMLine.join(' ');
  return lines.join('\r\n');
}

/**
 * ICE Candidateをリッスンし、Firestoreに保存する。
 * @param {RTCPeerConnection} pc - RTCPeerConnectionインスタンス
 * @param {CollectionReference} candidateCollection - ICE Candidateを保存するFirestoreコレクション
 */
function handleIceCandidates(pc, candidateCollection) {
  pc.onicecandidate = event => {
    if (event.candidate) {
      setDoc(doc(candidateCollection), event.candidate.toJSON());
    }
  };
}

/**
 * 相手のICE Candidateをリッスンし、PeerConnectionに追加する。
 * @param {CollectionReference} candidateCollection - 相手のICE Candidateが保存されているFirestoreコレクション
 */
function listenForRemoteCandidates(candidateCollection) {
  onSnapshot(candidateCollection, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added" && state.peerConnection) {
        const candidate = new RTCIceCandidate(change.doc.data());
        state.peerConnection.addIceCandidate(candidate).catch(e => console.error("Error adding ICE candidate:", e));
      }
    });
  });
}

/**
 * 通話を終了し、すべてのリソースをクリーンアップする。
 */
export async function hangUp() {
  stopStatsRecording();
  if (state.resolutionUpdateInterval) {
    clearInterval(state.resolutionUpdateInterval);
    state.setResolutionUpdateInterval(null);
  }

  if (state.localStream) {
    state.localStream.getTracks().forEach(track => track.stop());
    state.setLocalStream(null);
  }

  if (state.peerConnection) {
    state.peerConnection.close();
    state.setPeerConnection(null);
  }

  if (state.callDocRef) {
    await deleteDoc(state.callDocRef).catch(e => console.error("Error deleting document: ", e));
    state.setCallDocRef(null);
  }
  
  state.setVideoTrack(null);
  ui.resetUI();
}

/**
 * 送信者（Sender）として通話を開始する。
 */
export async function startCall() {
  uiElements.startCameraBtn.disabled = true;
  const selectedResolution = uiElements.resolutionSelect.value;
  const selectedFramerate = parseInt(uiElements.framerateSelect.value, 10);
  const selectedCodec = uiElements.codecSelect.value;
  const selectedCameraId = uiElements.cameraSelect.value; 
  const constraints = {
    video: { 
        deviceId: { exact: selectedCameraId },
        ...RESOLUTIONS[selectedResolution], 
        frameRate: { ideal: selectedFramerate},
        pan: true, 
        tilt: true, 
        zoom: true 
    },
    audio: false
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    state.setLocalStream(stream);
    uiElements.localVideo.srcObject = stream;
    uiElements.localVideo.style.display = 'block';
    const [track] = stream.getVideoTracks();
    state.setVideoTrack(track);

    const pc = createPeerConnection();
    state.setPeerConnection(pc);
    stream.getTracks().forEach(track => state.peerConnection.addTrack(track, stream));
    
    ptz.setupPtzDataChannel();

    const callRef = doc(collection(db, "calls"));
    state.setCallDocRef(callRef);
    const offerCandidates = collection(callRef, "offerCandidates");
    const answerCandidates = collection(callRef, "answerCandidates");

    handleIceCandidates(state.peerConnection, offerCandidates);
    listenForRemoteCandidates(answerCandidates);

    const offer = await state.peerConnection.createOffer();
    const modifiedSDP = preferCodec(offer.sdp, selectedCodec);
    await state.peerConnection.setLocalDescription({ type: offer.type, sdp: modifiedSDP });

    await setDoc(callRef, { offer: { type: offer.type, sdp: modifiedSDP } });

    uiElements.callIdDisplay.textContent = callRef.id;
    uiElements.callControls.style.display = "block";

    onSnapshot(callRef, snapshot => {
      const data = snapshot.data();
      if (data?.answer && state.peerConnection && !state.peerConnection.currentRemoteDescription) {
        state.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

  } catch (error) {
    console.error("Error starting camera or creating call:", error);
    alert("カメラへのアクセスに失敗しました。利用可能か、また権限が許可されているか確認してください。");
    ui.resetUI();
  }
}

/**
 * 受信者（Receiver）として通話に参加する。
 */
export async function joinCall() {
  const callId = uiElements.callIdInput.value.trim();
  if (!callId) {
    alert("Call ID を入力してください。");
    return;
  }
  uiElements.joinCallBtn.disabled = true;

  try {
    const callRef = doc(db, "calls", callId);
    state.setCallDocRef(callRef);
    const callSnapshot = await getDoc(callRef);
    if (!callSnapshot.exists() || !callSnapshot.data().offer) {
      alert("無効なCall IDです。");
      ui.resetUI();
      return;
    }
    
    const offer = callSnapshot.data().offer;
    
    const pc = createPeerConnection();
    state.setPeerConnection(pc);
    
    const offerCandidates = collection(callRef, "offerCandidates");
    const answerCandidates = collection(callRef, "answerCandidates");

    state.peerConnection.ontrack = event => {
      uiElements.remoteVideo.srcObject = event.streams[0];
      uiElements.remoteVideoContainer.style.display = 'inline-block';
    };
    state.peerConnection.ondatachannel = ptz.handleReceiverDataChannel;
    
    handleIceCandidates(state.peerConnection, answerCandidates);
    listenForRemoteCandidates(offerCandidates);

    await state.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    
    const answer = await state.peerConnection.createAnswer();
    await state.peerConnection.setLocalDescription(answer);

    await setDoc(callRef, { answer }, { merge: true });

    uiElements.callIdDisplay.textContent = callRef.id;
    uiElements.callControls.style.display = "block";

  } catch (error) {
    console.error("Error joining call:", error);
    alert("通話への参加中にエラーが発生しました。Call IDを確認してください。");
    ui.resetUI();
  } finally {
    uiElements.joinCallBtn.disabled = false;
  }
}