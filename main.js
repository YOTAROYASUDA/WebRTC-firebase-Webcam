import { db } from "./firebase-config.js";
import {
  collection, doc, setDoc, getDoc, onSnapshot, deleteDoc,
} from "firebase/firestore";

// --- DOM要素の取得 ---
const roleInputs = document.querySelectorAll('input[name="role"]');
const senderControls = document.getElementById("senderControls");
const receiverControls = document.getElementById("receiverControls");
const callControls = document.getElementById("callControls");

const resolutionSelect = document.getElementById("resolution");
const codecSelect = document.getElementById("codecSelect");
const startCameraBtn = document.getElementById("startCamera");
const joinCallBtn = document.getElementById("joinCall");
const hangUpBtn = document.getElementById("hangUpBtn");

const callIdInput = document.getElementById("callIdInput");
const callIdDisplay = document.getElementById("callIdDisplay");
const copyCallIdBtn = document.getElementById("copyCallId");

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

// --- グローバル変数 ---
let peerConnection;
let localStream;
let callDocRef; // Firestoreのドキュメント参照を保持
let offerCandidates, answerCandidates; // サブコレクションの参照を保持

const resolutions = {
  hd: { width: 1280, height: 720 },
  fhd: { width: 1920, height: 1080 },
  fourK: { width: 3840, height: 2160 },
};

// --- WebRTC関連の関数 ---

/**
 * STUN/TURNサーバー設定を元にRTCPeerConnectionを初期化
 */
function setupConnection() {
  const configuration = {
    iceServers: [
      { urls: "stun:stun.relay.metered.ca:80" },
      { urls: "turn:a.relay.metered.ca:80", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
      { urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
      { urls: "turn:a.relay.metered.ca:443", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
      { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
    ],
    iceCandidatePoolSize: 10,
  };
  peerConnection = new RTCPeerConnection(configuration);
}

/**
 * SDPを操作して特定のビデオコーデックを優先する
 * @param {string} sdp - 元のSDP
 * @param {string} codecName - 優先したいコーデック名 (例: 'VP9', 'H264')
 * @returns {string} - 変更後のSDP
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
 * 通話を終了し、リソースを解放する
 */
async function hangUp() {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  if (callDocRef) {
    // Firestoreのドキュメントを削除してクリーンアップ
    await deleteDoc(callDocRef).catch(e => console.error("Error deleting document: ", e));
    callDocRef = null;
  }
  
  resetUI();
}

/**
 * UIを初期状態にリセットする
 */
function resetUI() {
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    // ビデオ要素を非表示にする
    localVideo.style.display = 'none';
    remoteVideo.style.display = 'none';

    callControls.style.display = "none";
    callIdDisplay.textContent = "";
    callIdInput.value = "";
    copyCallIdBtn.textContent = "コピー";
    
    // ボタンの状態をリセット
    startCameraBtn.disabled = false;
    joinCallBtn.disabled = false;
}


// --- UIイベントリスナー ---

// 役割（送信/受信）の切り替え
roleInputs.forEach(input => {
  input.addEventListener("change", () => {
    const role = document.querySelector('input[name="role"]:checked').value;
    senderControls.style.display = role === "sender" ? "block" : "none";
    receiverControls.style.display = role === "receiver" ? "block" : "none";
  });
});

// Call IDのコピー
copyCallIdBtn.onclick = () => {
  const callId = callIdDisplay.textContent.trim();
  if (!callId) return;
  navigator.clipboard.writeText(callId)
    .then(() => {
      copyCallIdBtn.textContent = "コピー済み";
      setTimeout(() => { copyCallIdBtn.textContent = "コピー"; }, 1500);
    })
    .catch(() => alert("コピーに失敗しました"));
};

// [送信者] カメラ開始 & 通話作成
startCameraBtn.onclick = async () => {
  startCameraBtn.disabled = true;

  const selectedResolution = resolutionSelect.value;
  const selectedCodec = codecSelect.value;
  const constraints = { video: resolutions[selectedResolution], audio: true };

  localStream = await navigator.mediaDevices.getUserMedia(constraints);
  localVideo.srcObject = localStream;
  localVideo.style.display = 'block'; // ローカルビデオを表示

  setupConnection();

  callDocRef = doc(collection(db, "calls"));
  offerCandidates = collection(callDocRef, "offerCandidates");
  answerCandidates = collection(callDocRef, "answerCandidates");

  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      setDoc(doc(offerCandidates), event.candidate.toJSON());
    }
  };

  const offer = await peerConnection.createOffer();
  const modifiedSDP = preferCodec(offer.sdp, selectedCodec);
  await peerConnection.setLocalDescription({ type: offer.type, sdp: modifiedSDP });
  await setDoc(callDocRef, { offer: { type: offer.type, sdp: modifiedSDP } });

  callIdDisplay.textContent = callDocRef.id;
  callControls.style.display = "block"; // 通話コントロールを表示

  // 相手のAnswerを待つ
  onSnapshot(callDocRef, snapshot => {
    const data = snapshot.data();
    if (data?.answer && !peerConnection.currentRemoteDescription) {
      const answerDesc = new RTCSessionDescription(data.answer);
      peerConnection.setRemoteDescription(answerDesc);
    }
  });
  
  // 相手のICE Candidateを待つ
  onSnapshot(answerCandidates, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
      }
    });
  });
};

// [受信者] 通話に参加
joinCallBtn.onclick = async () => {
  const callId = callIdInput.value.trim();
  if (!callId) return alert("Call ID を入力してください");
  
  joinCallBtn.disabled = true;

  callDocRef = doc(db, "calls", callId);
  offerCandidates = collection(callDocRef, "offerCandidates");
  answerCandidates = collection(callDocRef, "answerCandidates");

  setupConnection();

  peerConnection.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
    remoteVideo.style.display = 'block'; // リモートビデオを表示
  };

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      setDoc(doc(answerCandidates), event.candidate.toJSON());
    }
  };

  const callData = (await getDoc(callDocRef)).data();
  if (callData && callData.offer) {
    const offerDesc = new RTCSessionDescription(callData.offer);
    await peerConnection.setRemoteDescription(offerDesc);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    await setDoc(callDocRef, { answer: { type: answer.type, sdp: answer.sdp } }, { merge: true });
    
    callIdDisplay.textContent = callDocRef.id;
    callControls.style.display = "block"; // 通話コントロールを表示

    // 相手のICE Candidateを待つ
    onSnapshot(offerCandidates, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
        }
      });
    });
  } else {
    alert("指定されたCall IDが見つかりません。");
    resetUI();
    joinCallBtn.disabled = false; // エラーなのでボタンを再度有効化
  }
};

// [共通] 通話を切る
hangUpBtn.onclick = hangUp;