import { db } from "./firebase-config.js";
import {
  collection, doc, setDoc, getDoc, onSnapshot, deleteDoc,
} from "firebase/firestore";

// =================================================================================
// --- 定数定義 (Constants) ---
// =================================================================================

const RESOLUTIONS = {
  hd: { width: 1280, height: 720 },
  fhd: { width: 1920, height: 1080 },
  fourK: { width: 3840, height: 2160 },
};

/** WebRTC接続設定 */
const RTC_CONFIGURATION = {
  iceServers: [
    { urls: "stun:stun.relay.metered.ca:80" },
    { urls: "turn:a.relay.metered.ca:80", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
    { urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
    { urls: "turn:a.relay.metered.ca:443", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
    { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
  ],
  iceCandidatePoolSize: 10,
};

// =================================================================================
// --- DOM要素の取得 (DOM Element Selectors) ---
// =================================================================================

const roleInputs = document.querySelectorAll('input[name="role"]');
const senderControls = document.getElementById("senderControls");
const receiverControls = document.getElementById("receiverControls");
const callControls = document.getElementById("callControls");
const statsControls = document.getElementById("statsControls");
const ptzControls = document.getElementById("ptzControls");

const resolutionSelect = document.getElementById("resolution");
const framerateSelect = document.getElementById("framerate");
const codecSelect = document.getElementById("codecSelect");
const startCameraBtn = document.getElementById("startCamera");
const joinCallBtn = document.getElementById("joinCall");
const hangUpBtn = document.getElementById("hangUpBtn");
const callIdInput = document.getElementById("callIdInput");
const callIdDisplay = document.getElementById("callIdDisplay");
const copyCallIdBtn = document.getElementById("copyCallId");

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

// Stats-related elements
const startStatsRecordingBtn = document.getElementById("startStatsRecording");
const stopStatsRecordingBtn = document.getElementById("stopStatsRecording");
const downloadStatsBtn = document.getElementById("downloadStats");
const statsDisplay = document.getElementById("statsDisplay");

// PTZ-related elements
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomSlider = document.getElementById("zoomSlider");
const zoomValue = document.getElementById("zoomValue");
const tiltUpBtn = document.getElementById("tiltUpBtn");
const tiltDownBtn = document.getElementById("tiltDownBtn");
const tiltSlider = document.getElementById("tiltSlider");
const tiltValue = document.getElementById("tiltValue");
const panLeftBtn = document.getElementById("panLeftBtn");
const panRightBtn = document.getElementById("panRightBtn");
const panSlider = document.getElementById("panSlider");
const panValue = document.getElementById("panValue");
const ptzResetBtn = document.getElementById("ptzResetBtn");

// =================================================================================
// --- グローバル状態管理 (Global State) ---
// =================================================================================

let peerConnection;
let localStream;
let callDocRef;
let ptzChannel;
let ptzCapabilities = {};
let videoTrack;
let statsInterval;
let recordedStats = [];
let isRecordingStats = false;
let currentRole = "sender";
let lastStatsReport = null;

// =================================================================================
// --- UI関連の関数 (UI Functions) ---
// =================================================================================

/**
 * UIの状態を初期状態にリセットします。
 */
function resetUI() {
  localVideo.srcObject = null;
  remoteVideo.srcObject = null;
  localVideo.style.display = 'none';
  remoteVideo.style.display = 'none';

  ptzControls.style.display = "none";
  callControls.style.display = "none";
  statsControls.style.display = "none";

  callIdDisplay.textContent = "";
  callIdInput.value = "";
  copyCallIdBtn.textContent = "コピー";

  startCameraBtn.disabled = false;
  joinCallBtn.disabled = false;

  statsDisplay.textContent = "";
  recordedStats = [];
  lastStatsReport = null;
  startStatsRecordingBtn.disabled = false;
  stopStatsRecordingBtn.disabled = true;
  downloadStatsBtn.disabled = true;

  if (ptzChannel) {
    ptzChannel.close();
    ptzChannel = null;
  }
}

/**
 * 役割（送信者/受信者）の変更に応じてUIを更新します。
 * @param {string} role - 'sender' または 'receiver'
 */
function updateRoleUI(role) {
  currentRole = role;
  senderControls.style.display = role === "sender" ? "block" : "none";
  receiverControls.style.display = role === "receiver" ? "block" : "none";
  resetUI();
}

// =================================================================================
// --- WebRTCコア関数 (WebRTC Core Functions) ---
// =================================================================================

/**
 * RTCPeerConnectionインスタンスを作成し、イベントハンドラを設定します。
 * @returns {RTCPeerConnection} RTCPeerConnectionのインスタンス
 */
function createPeerConnection() {
  const pc = new RTCPeerConnection(RTC_CONFIGURATION);

  pc.onconnectionstatechange = () => {
    console.log(`PeerConnection state changed to: ${pc.connectionState}`);
    const isConnected = pc.connectionState === 'connected';
    statsControls.style.display = isConnected ? 'block' : 'none';
    if (!isConnected) {
      stopStatsRecording();
    }
  };

  return pc;
}

/**
 * SDP（Session Description Protocol）を操作して、指定されたコーデックを優先します。
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
 * 通話を終了し、すべてのリソースをクリーンアップします。
 */
async function hangUp() {
  stopStatsRecording();

  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }

  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }

  if (callDocRef) {
    await deleteDoc(callDocRef).catch(e => console.error("Error deleting document: ", e));
    callDocRef = null;
  }
  
  videoTrack = null;
  resetUI();
}

/**
 * ICE Candidateをリッスンし、Firestoreに保存します。
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
 * 相手のICE Candidateをリッスンし、PeerConnectionに追加します。
 * @param {CollectionReference} candidateCollection - 相手のICE Candidateが保存されているFirestoreコレクション
 */
function listenForRemoteCandidates(candidateCollection) {
  onSnapshot(candidateCollection, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        peerConnection.addIceCandidate(candidate);
      }
    });
  });
}


// =================================================================================
// --- 送信者（Sender）側のロジック ---
// =================================================================================

/**
 * カメラを起動し、WebRTCのOfferを作成して通話を開始します。
 */
async function startCall() {
  startCameraBtn.disabled = true;
  const selectedResolution = resolutionSelect.value;
  const selectedFramerate = parseInt(framerateSelect.value, 10);
  const selectedCodec = codecSelect.value;
  const constraints = {
    video: { 
        ...RESOLUTIONS[selectedResolution], 
        frameRate: { ideal: selectedFramerate},
        pan: true, 
        tilt: true, 
        zoom: true 
    },
    audio: true
  };

  try {
    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideo.srcObject = localStream;
    localVideo.style.display = 'block';
    [videoTrack] = localStream.getVideoTracks();

    peerConnection = createPeerConnection();
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    
    // PTZ用データチャネルを作成
    setupPtzDataChannel();

    // Firestoreのドキュメント参照を作成
    callDocRef = doc(collection(db, "calls"));
    const offerCandidates = collection(callDocRef, "offerCandidates");
    const answerCandidates = collection(callDocRef, "answerCandidates");

    handleIceCandidates(peerConnection, offerCandidates);
    listenForRemoteCandidates(answerCandidates);

    const offer = await peerConnection.createOffer();
    const modifiedSDP = preferCodec(offer.sdp, selectedCodec);
    await peerConnection.setLocalDescription({ type: offer.type, sdp: modifiedSDP });

    await setDoc(callDocRef, { offer: { type: offer.type, sdp: modifiedSDP } });

    callIdDisplay.textContent = callDocRef.id;
    callControls.style.display = "block";

    // Answerを待機
    onSnapshot(callDocRef, snapshot => {
      const data = snapshot.data();
      if (data?.answer && !peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

  } catch (error) {
    console.error("Error starting camera or creating call:", error);
    alert("Failed to access the camera. Please ensure it is available and permissions are granted.");
    resetUI();
  }
}

/**
 * PTZコントロール用のデータチャネルを設定します。
 */
function setupPtzDataChannel() {
  console.log("SENDER: Creating DataChannel 'ptz'...");
  ptzChannel = peerConnection.createDataChannel('ptz');
  
  ptzChannel.onopen = () => {
    console.log("SENDER: DataChannel is open. Sending capabilities...");
    const capabilities = videoTrack.getCapabilities();
    ptzCapabilities = {
      zoom: capabilities.zoom || null,
      pan: capabilities.pan || null,
      tilt: capabilities.tilt || null,
    };
    console.log("SENDER: Sending capabilities:", ptzCapabilities);
    ptzChannel.send(JSON.stringify({ type: 'capabilities', data: ptzCapabilities }));
  };
  
  ptzChannel.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    console.log("SENDER: Received command:", msg);
    if (msg.type === 'command' && videoTrack) {
      applyPtzConstraint(msg.command, msg.value);
    }
  };
  
  ptzChannel.onclose = () => console.log("SENDER: DataChannel is closed.");
  ptzChannel.onerror = (error) => console.error("SENDER: DataChannel error:", error);
}

// =================================================================================
// --- 受信者（Receiver）側のロジック ---
// =================================================================================

/**
 * Call IDを使って既存の通話に参加します。
 */
async function joinCall() {
  const callId = callIdInput.value.trim();
  if (!callId) {
    alert("Please enter a Call ID.");
    return;
  }
  joinCallBtn.disabled = true;

  try {
    callDocRef = doc(db, "calls", callId);
    const callSnapshot = await getDoc(callDocRef);
    if (!callSnapshot.exists() || !callSnapshot.data().offer) {
      alert("Invalid Call ID.");
      resetUI();
      return;
    }
    
    const offer = callSnapshot.data().offer;
    
    peerConnection = createPeerConnection();
    
    const offerCandidates = collection(callDocRef, "offerCandidates");
    const answerCandidates = collection(callDocRef, "answerCandidates");

    // リモートトラックとデータチャネルのイベントをリッスン
    peerConnection.ontrack = event => {
      remoteVideo.srcObject = event.streams[0];
      remoteVideo.style.display = 'block';
    };
    peerConnection.ondatachannel = handleReceiverDataChannel;
    
    handleIceCandidates(peerConnection, answerCandidates);
    listenForRemoteCandidates(offerCandidates);

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    await setDoc(callDocRef, { answer }, { merge: true });

    callIdDisplay.textContent = callDocRef.id;
    callControls.style.display = "block";

  } catch (error) {
    console.error("Error joining call:", error);
    alert("An error occurred while joining the call. Please check the Call ID.");
    resetUI();
  } finally {
    joinCallBtn.disabled = false;
  }
}

/**
 * 受信者側でデータチャネルイベントを処理します。
 * @param {RTCDataChannelEvent} event 
 */
function handleReceiverDataChannel(event) {
  console.log(`RECEIVER: ondatachannel event fired. Channel label: '${event.channel.label}'`);
  if (event.channel.label === 'ptz') {
    ptzChannel = event.channel;
    ptzChannel.onopen = () => console.log("RECEIVER: DataChannel is open.");
    ptzChannel.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      console.log("RECEIVER: Received message:", msg);
      if (msg.type === 'capabilities') {
        setupReceiverPtzControls(msg.data);
        ptzControls.style.display = 'block';
      }
    };
    ptzChannel.onclose = () => {
      console.log("RECEIVER: DataChannel is closed.");
      ptzControls.style.display = 'none';
    };
    ptzChannel.onerror = (error) => console.error("RECEIVER: DataChannel error:", error);
  }
}

// =================================================================================
// --- PTZコントロール関連の関数 (PTZ Control Functions) ---
// =================================================================================

/**
 * 送信者側で、カメラにPTZの制約を適用します。
 * @param {string} type - 'pan', 'tilt', or 'zoom'
 * @param {number} value - 適用する値
 */
async function applyPtzConstraint(type, value) {
  if (document.visibilityState !== 'visible') {
    console.warn(`SENDER: Page is not visible. Skipping PTZ command to prevent SecurityError.`);
    return;
  }
  if (!videoTrack || videoTrack.readyState !== 'live') {
    console.warn("SENDER: videoTrack is not available to apply PTZ constraints.");
    return;
  }
  
  console.log(`SENDER: Applying constraint - type: ${type}, value: ${value}`);
  try {
    await videoTrack.applyConstraints({ advanced: [{ [type]: value }] });
  } catch (err) {
    console.error(`SENDER: Error applying ${type} constraint:`, err);
  }
}

/**
 * 受信者側でPTZコントロールUIをセットアップします。
 * @param {object} capabilities - カメラから送られてきたPTZ機能
 */
function setupReceiverPtzControls(capabilities) {
  console.log("RECEIVER: Setting up PTZ controls with capabilities:", capabilities);
  ptzCapabilities = capabilities;

  ['zoom', 'pan', 'tilt'].forEach(type => {
    const isSupported = !!ptzCapabilities[type];
    const slider = document.getElementById(`${type}Slider`);
    const valueDisplay = document.getElementById(`${type}Value`);
    
    // ボタンの有効/無効化
    document.querySelectorAll(`[data-ptz-type="${type}"]`).forEach(btn => btn.disabled = !isSupported);
    if(slider) slider.disabled = !isSupported;

    if (isSupported) {
      const { min, max, step } = ptzCapabilities[type];
      slider.min = min;
      slider.max = max;
      slider.step = step;
      // Pan/Tiltは中央を初期値に、Zoomは最小値を初期値に設定
      const initialValue = (type === 'pan' || type === 'tilt') && min < 0 && max > 0 ? 0 : min;
      slider.value = initialValue;
      valueDisplay.textContent = parseFloat(initialValue).toFixed(2);
    }
  });
}

/**
 * 受信者側からPTZコマンドを送信します。
 * @param {string} type - 'pan', 'tilt', or 'zoom'
 * @param {number} value - 送信する値
 */
function sendPtzCommand(type, value) {
  if (peerConnection?.connectionState !== 'connected' || ptzChannel?.readyState !== 'open') {
    console.warn(`RECEIVER: Cannot send command. Connection state: ${peerConnection?.connectionState}, DataChannel state: ${ptzChannel?.readyState}`);
    return;
  }
  if (!ptzCapabilities[type]) {
    console.warn(`RECEIVER: PTZ type '${type}' is not supported.`);
    return;
  }

  const { min, max } = ptzCapabilities[type];
  const clampedValue = Math.max(min, Math.min(max, value));
  const command = { type: 'command', command: type, value: clampedValue };
  
  try {
    console.log("RECEIVER: Sending command:", command);
    ptzChannel.send(JSON.stringify(command));
    document.getElementById(`${type}Slider`).value = clampedValue;
    document.getElementById(`${type}Value`).textContent = clampedValue.toFixed(2);
  } catch (e) {
    console.error("RECEIVER: Error sending command via DataChannel:", e);
  }
}


// =================================================================================
// --- 統計情報関連の関数 (Statistics Functions) ---
// =================================================================================

/**
 * 統計情報の記録を開始します。
 */
function startStatsRecording() {
  if (!peerConnection || isRecordingStats) return;
  
  isRecordingStats = true;
  recordedStats = [];
  lastStatsReport = null;
  
  startStatsRecordingBtn.disabled = true;
  stopStatsRecordingBtn.disabled = false;
  downloadStatsBtn.disabled = true;
  statsDisplay.textContent = "記録中...";

  statsInterval = setInterval(async () => {
    if (!peerConnection) return;
    
    const stats = await peerConnection.getStats();
    const dataToRecord = { timestamp: new Date().toISOString() };

    if (currentRole === "sender") {
      populateSenderStats(stats, dataToRecord);
    } else {
      populateReceiverStats(stats, dataToRecord);
    }

    if (Object.keys(dataToRecord).length > 1) {
      recordedStats.push(dataToRecord);
      statsDisplay.textContent = `記録中... ${recordedStats.length} 個`;
    }
    lastStatsReport = stats;
  }, 1000);
}

/**
 * 送信者側の統計情報を収集します。
 * @param {RTCStatsReport} stats - getStats()から取得したレポート
 * @param {object} dataToRecord - 記録するデータを格納するオブジェクト
 */
function populateSenderStats(stats, dataToRecord) {
  stats.forEach(report => {
    if (report.type === 'outbound-rtp' && report.mediaType === 'video') {
      const lastOutboundReport = lastStatsReport?.get(report.id);
      const bytesSent = report.bytesSent - (lastOutboundReport?.bytesSent ?? 0);
      const packetsSent = report.packetsSent - (lastOutboundReport?.packetsSent ?? 0);
      
      dataToRecord.sent_resolution = `${report.frameWidth}x${report.frameHeight}`;
      dataToRecord.sent_fps = report.framesPerSecond;
      dataToRecord.sent_bitrate_kbps = Math.round((Math.max(0, bytesSent) * 8) / 1000);
      dataToRecord.packets_sent_per_second = Math.max(0, packetsSent);
      dataToRecord.total_encode_time_s = report.totalEncodeTime;
      dataToRecord.keyframes_encoded = report.keyFramesEncoded;
      dataToRecord.quality_limitation_reason = report.qualityLimitationReason;
      dataToRecord.quality_limitation_resolution_changes = report.qualityLimitationResolutionChanges;
      dataToRecord.retransmitted_packets_sent = report.retransmittedPacketsSent;
      dataToRecord.nack_count = report.nackCount;
    }
    if (report.type === 'remote-inbound-rtp' && report.mediaType === 'video') {
      dataToRecord.receiver_jitter_ms = (report.jitter * 1000)?.toFixed(4) ?? 'N/A';
      dataToRecord.receiver_packets_lost = report.packetsLost;
      dataToRecord.receiver_fraction_lost = report.fractionLost;
      dataToRecord.rtt_rtcp_ms = (report.roundTripTime * 1000)?.toFixed(4) ?? 'N/A';
    }
    if (report.type === 'candidate-pair' && report.nominated && report.state === 'succeeded') {
      dataToRecord.available_outgoing_bitrate_kbps = report.availableOutgoingBitrate ? Math.round(report.availableOutgoingBitrate / 1000) : 'N/A';
      dataToRecord.rtt_ice_ms = (report.currentRoundTripTime * 1000)?.toFixed(4) ?? 'N/A';
      const remoteCandidate = stats.get(report.remoteCandidateId);
      if (remoteCandidate && remoteCandidate.candidateType) {
        // remoteCandidate.candidateTypeの値を直接記録するように変更
        dataToRecord.connection_type = remoteCandidate.candidateType;
      }
    }
  });
}

/**
 * 受信者側の統計情報を収集します。
 * @param {RTCStatsReport} stats - getStats()から取得したレポート
 * @param {object} dataToRecord - 記録するデータを格納するオブジェクト
 */
function populateReceiverStats(stats, dataToRecord) {
  stats.forEach(report => {
    if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
      const lastInboundReport = lastStatsReport?.get(report.id);
      const bytesReceived = report.bytesReceived - (lastInboundReport?.bytesReceived ?? 0);
      const packetsReceived = report.packetsReceived - (lastInboundReport?.packetsReceived ?? 0);
      
      dataToRecord.received_resolution = `${report.frameWidth}x${report.frameHeight}`;
      dataToRecord.received_fps = report.framesPerSecond;
      dataToRecord.received_bitrate_kbps = Math.round((Math.max(0, bytesReceived) * 8) / 1000);
      dataToRecord.packets_received_per_second = Math.max(0, packetsReceived);
      dataToRecord.jitter_ms = (report.jitter * 1000)?.toFixed(4) ?? 'N/A';
      dataToRecord.packets_lost = report.packetsLost;
      dataToRecord.frames_dropped = report.framesDropped;
      dataToRecord.total_decode_time_s = report.totalDecodeTime;
      dataToRecord.keyframes_decoded = report.keyFramesDecoded;
      dataToRecord.jitter_buffer_delay_s = report.jitterBufferDelay;
      dataToRecord.fir_count = report.firCount;
      dataToRecord.pli_count = report.pliCount;
      dataToRecord.jitter_buffer_emitted_count = report.jitterBufferEmittedCount;
    }
    if (report.type === 'candidate-pair' && report.nominated && report.state === 'succeeded') {
      const remoteCandidate = stats.get(report.remoteCandidateId);
      if (remoteCandidate && remoteCandidate.candidateType) {
        // remoteCandidate.candidateTypeの値を直接記録するように変更
        dataToRecord.connection_type = remoteCandidate.candidateType;
      }
    }
  });
}


/**
 * 統計情報の記録を停止します。
 */
function stopStatsRecording() {
  if (!isRecordingStats) return;
  
  clearInterval(statsInterval);
  isRecordingStats = false;
  lastStatsReport = null;

  startStatsRecordingBtn.disabled = false;
  stopStatsRecordingBtn.disabled = true;
  downloadStatsBtn.disabled = recordedStats.length === 0;
  statsDisplay.textContent = `記録停止。${recordedStats.length} 個`;
}

/**
 * 記録した統計情報をCSVファイルとしてダウンロードします。
 */
function downloadStatsAsCsv() {
  if (recordedStats.length === 0) {
    alert("ダウンロードするデータがありません");
    return;
  }

  const headerSet = new Set();
  recordedStats.forEach(row => Object.keys(row).forEach(key => headerSet.add(key)));
  const headers = Array.from(headerSet);
  
  const csvRows = [
    headers.join(','),
    ...recordedStats.map(row => 
      headers.map(header => {
        const value = row[header] ?? '';
        return typeof value === 'string' && value.includes(',') ? `"${value.replace(/"/g, '""')}"` : value;
      }).join(',')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `webrtc_stats_${currentRole}_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// =================================================================================
// --- イベントリスナーの設定 (Event Listener Setup) ---
// =================================================================================

/**
 * アプリケーションのすべてのイベントリスナーを初期化します。
 */
function initializeEventListeners() {
  roleInputs.forEach(input => {
    input.addEventListener("change", (e) => updateRoleUI(e.target.value));
  });

  copyCallIdBtn.addEventListener("click", async () => {
    const callId = callIdDisplay.textContent.trim();
    if (!callId) return;
    try {
      await navigator.clipboard.writeText(callId);
      copyCallIdBtn.textContent = "コピー済み";
      setTimeout(() => { copyCallIdBtn.textContent = "コピー"; }, 1500);
    } catch (err) {
      alert("コピーに失敗");
      console.error("Failed to copy Call ID: ", err);
    }
  });

  startCameraBtn.addEventListener("click", startCall);
  joinCallBtn.addEventListener("click", joinCall);
  hangUpBtn.addEventListener("click", hangUp);
  
  // Stats listeners
  startStatsRecordingBtn.addEventListener("click", startStatsRecording);
  stopStatsRecordingBtn.addEventListener("click", stopStatsRecording);
  downloadStatsBtn.addEventListener("click", downloadStatsAsCsv);

  // PTZ listeners
  const getSliderValue = (type) => parseFloat(document.getElementById(`${type}Slider`).value);
  
  zoomInBtn.addEventListener("click", () => sendPtzCommand('zoom', getSliderValue('zoom') + ptzCapabilities.zoom.step));
  zoomOutBtn.addEventListener("click", () => sendPtzCommand('zoom', getSliderValue('zoom') - ptzCapabilities.zoom.step));
  zoomSlider.addEventListener("input", () => sendPtzCommand('zoom', getSliderValue('zoom')));
  
  tiltUpBtn.addEventListener("click", () => sendPtzCommand('tilt', getSliderValue('tilt') + ptzCapabilities.tilt.step));
  tiltDownBtn.addEventListener("click", () => sendPtzCommand('tilt', getSliderValue('tilt') - ptzCapabilities.tilt.step));
  tiltSlider.addEventListener("input", () => sendPtzCommand('tilt', getSliderValue('tilt')));
  
  panRightBtn.addEventListener("click", () => sendPtzCommand('pan', getSliderValue('pan') + ptzCapabilities.pan.step));
  panLeftBtn.addEventListener("click", () => sendPtzCommand('pan', getSliderValue('pan') - ptzCapabilities.pan.step));
  panSlider.addEventListener("input", () => sendPtzCommand('pan', getSliderValue('pan')));
  
  ptzResetBtn.addEventListener("click", () => {
    if (ptzCapabilities.zoom) sendPtzCommand('zoom', ptzCapabilities.zoom.min);
    if (ptzCapabilities.tilt) sendPtzCommand('tilt', 0);
    if (ptzCapabilities.pan) sendPtzCommand('pan', 0);
  });
}

// =================================================================================
// --- 初期化 (Initialization) ---
// =================================================================================

// 初期UI状態を設定
updateRoleUI(document.querySelector('input[name="role"]:checked').value);
// イベントリスナーを起動
initializeEventListeners();
