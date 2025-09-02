// webrtc.js

import { db } from "./firebase-config.js";
import { collection, doc, setDoc, getDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import * as state from './state.js';
import { RTC_CONFIGURATION, RESOLUTIONS } from './constants.js';
import * as ui from './ui.js';
import * as uiElements from './ui-elements.js';
import * as ptz from './ptz.js';
import { stopStatsRecording, updateResolutionDisplay, startStatsRecording } from './stats.js';
import { stopRecording } from './recording.js';

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

    if (isConnected) {
      startStatsRecording();
    }

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
      uiElements.resolutionDisplay1.style.display = 'none';
      uiElements.resolutionDisplay2.style.display = 'none';
    }

    if (!isConnected) {
      stopStatsRecording();
      // 接続が切れたら録画も停止
      stopRecording('camera1');
      stopRecording('camera2');
    }
  };

  return pc;
}

/**
 * SDP（Session Description Protocol）を操作して、すべてのビデオストリームで指定されたコーデックを優先する。
 * @param {string} sdp - 元のSDP
 * @param {string} codecName - 優先するコーデック名 (e.g., 'H264', 'VP9')
 * @returns {string} 変更されたSDP
 */
function preferCodec(sdp, codecName) {
  const lines = sdp.split('\r\n');
  const mLineIndices = [];
  
  lines.forEach((line, index) => {
    if (line.startsWith('m=video')) {
      mLineIndices.push(index);
    }
  });

  if (mLineIndices.length === 0) {
    return sdp;
  }

  const codecRegex = new RegExp(`a=rtpmap:(\\d+) ${codecName}/90000`, 'i');
  const codecLine = lines.find(line => codecRegex.test(line));
  
  if (!codecLine) {
    return sdp;
  }
  
  const codecPayload = codecLine.match(codecRegex)[1];

  mLineIndices.forEach(mLineIndex => {
    const mLineParts = lines[mLineIndex].split(' ');
    
    if (mLineParts.slice(3).includes(codecPayload)) {
        const newPayloadOrder = [
          codecPayload,
          ...mLineParts.slice(3).filter(pt => pt !== codecPayload)
        ];
        
        lines[mLineIndex] = [
          ...mLineParts.slice(0, 3),
          ...newPayloadOrder
        ].join(' ');
    }
  });

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
  // 両方の録画を停止
  stopRecording('camera1');
  stopRecording('camera2');
  
  if (state.resolutionUpdateInterval) {
    clearInterval(state.resolutionUpdateInterval);
    state.setResolutionUpdateInterval(null);
  }

  if (state.localStreams) {
    state.localStreams.forEach(stream => stream.getTracks().forEach(track => track.stop()));
    state.setLocalStreams([]);
  }

  if (state.peerConnection) {
    state.peerConnection.close();
    state.setPeerConnection(null);
  }

  if (state.callDocRef) {
    await deleteDoc(state.callDocRef).catch(e => console.error("Error deleting document: ", e));
    state.setCallDocRef(null);
  }
  
  state.setVideoTracks({});
  state.setRemoteTracks({});
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
  const selectedCameraId1 = uiElements.cameraSelect1.value; 
  const selectedCameraId2 = uiElements.cameraSelect2.value; 
  
  const commonConstraints = {
    ...RESOLUTIONS[selectedResolution], 
    frameRate: { ideal: selectedFramerate},
    pan: true, 
    tilt: true, 
    zoom: true 
  };

  const constraints1 = { video: { deviceId: { exact: selectedCameraId1 }, ...commonConstraints }, audio: false };
  const constraints2 = { video: { deviceId: { exact: selectedCameraId2 }, ...commonConstraints }, audio: false };

  try {
    const stream1 = await navigator.mediaDevices.getUserMedia(constraints1);
    const stream2 = await navigator.mediaDevices.getUserMedia(constraints2);
    state.setLocalStreams([stream1, stream2]);

    uiElements.localVideo1.srcObject = stream1;
    uiElements.localVideo2.srcObject = stream2;
    uiElements.localVideo1.style.display = 'block';
    uiElements.localVideo2.style.display = 'block';
    
    const tracks = {
      camera1: stream1.getVideoTracks()[0],
      camera2: stream2.getVideoTracks()[0]
    };
    state.setVideoTracks(tracks);

    const pc = createPeerConnection();
    state.setPeerConnection(pc);
    stream1.getTracks().forEach(track => state.peerConnection.addTrack(track, stream1));
    stream2.getTracks().forEach(track => state.peerConnection.addTrack(track, stream2));
    
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

    const videoElements = [uiElements.remoteVideo1, uiElements.remoteVideo2];
    const containerElements = [uiElements.remoteVideoContainer1, uiElements.remoteVideoContainer2];
    const resolutionDisplays = [uiElements.resolutionDisplay1, uiElements.resolutionDisplay2];
    const remoteTracks = {};
    let videoIndex = 0;
    const cameraNames = ['camera1', 'camera2']; 

    state.peerConnection.ontrack = event => {
      if (event.track.kind === 'video' && videoIndex < videoElements.length) {
        videoElements[videoIndex].srcObject = event.streams[0];
        containerElements[videoIndex].style.display = 'inline-block';

        const cameraName = cameraNames[videoIndex];
        remoteTracks[event.track.id] = {
            displayElement: resolutionDisplays[videoIndex],
            name: cameraName
        };

        videoIndex++;
      }
    };
    state.setRemoteTracks(remoteTracks);
    
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