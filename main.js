import { db } from "./firebase-config.js";
import {
  collection, doc, setDoc, getDoc, onSnapshot, deleteDoc,
} from "firebase/firestore";

// --- HTMl要素の取得 ---
const roleInputs = document.querySelectorAll('input[name="role"]');
const senderControls = document.getElementById("senderControls");
const receiverControls = document.getElementById("receiverControls");
const callControls = document.getElementById("callControls");
const statsControls = document.getElementById("statsControls");
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
const startStatsRecordingBtn = document.getElementById("startStatsRecording");
const stopStatsRecordingBtn = document.getElementById("stopStatsRecording");
const downloadStatsBtn = document.getElementById("downloadStats");
const statsDisplay = document.getElementById("statsDisplay");
const ptzControls = document.getElementById("ptzControls");
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

// --- グローバル変数 ---
let peerConnection;
let localStream;
let callDocRef;
let offerCandidates, answerCandidates;
let videoTrack;
let ptzChannel;
let ptzCapabilities = {};
let statsInterval;
let recordedStats = [];
let isRecording = false;
let currentRole = "sender";
let lastReport = null;
const resolutions = {
  hd: { width: 1280, height: 720 },
  fhd: { width: 1920, height: 1080 },
  fourK: { width: 3840, height: 2160 },
};

// --- WebRTC関連の関数 ---

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

  peerConnection.onconnectionstatechange = () => {
      console.log(`PeerConnection state changed to: ${peerConnection.connectionState}`);
      if (peerConnection.connectionState === 'connected') {
          statsControls.style.display = 'block';
      } else if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed' || peerConnection.connectionState === 'closed') {
          statsControls.style.display = 'none';
          stopStatsRecording();
      }
  };
}

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

async function hangUp() {
  stopStatsRecording();
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  if (callDocRef) {
    await deleteDoc(callDocRef).catch(e => console.error("Error deleting document: ", e));
    callDocRef = null;
  }
  resetUI();
}

function resetUI() {
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    localVideo.style.display = 'none';
    remoteVideo.style.display = 'none';
    if (ptzChannel) {
        ptzChannel.close();
        ptzChannel = null;
    }
    ptzControls.style.display = "none";
    videoTrack = null;
    callControls.style.display = "none";
    statsControls.style.display = "none";
    callIdDisplay.textContent = "";
    callIdInput.value = "";
    copyCallIdBtn.textContent = "コピー";
    startCameraBtn.disabled = false;
    joinCallBtn.disabled = false;
    statsDisplay.textContent = "";
    recordedStats = [];
    isRecording = false;
    lastReport = null;
    startStatsRecordingBtn.disabled = false;
    stopStatsRecordingBtn.disabled = true;
    downloadStatsBtn.disabled = true;
}

async function startStatsRecording() {
  if (!peerConnection || isRecording) return;
  isRecording = true;
  recordedStats = [];
  lastReport = null;
  startStatsRecordingBtn.disabled = true;
  stopStatsRecordingBtn.disabled = false;
  downloadStatsBtn.disabled = true;
  statsDisplay.textContent = "記録中...";
  statsInterval = setInterval(async () => {
    if (!peerConnection) return;
    const stats = await peerConnection.getStats();
    const currentTime = new Date().toISOString();
    let dataToRecord = { timestamp: currentTime };
    if (currentRole === "sender") {
      stats.forEach(report => {
        if (report.type === 'outbound-rtp' && report.mediaType === 'video') {
          dataToRecord.sent_resolution = `${report.frameWidth}x${report.frameHeight}`;
          dataToRecord.sent_fps = report.framesPerSecond;
          dataToRecord.total_encode_time_s = report.totalEncodeTime;
          dataToRecord.keyframes_encoded = report.keyFramesEncoded;
          dataToRecord.quality_limitation_reason = report.qualityLimitationReason;
          if (lastReport) {
            const lastOutboundReport = lastReport.get(report.id);
            if (lastOutboundReport && typeof lastOutboundReport.bytesSent === 'number') {
              const bytesSent = report.bytesSent - lastOutboundReport.bytesSent;
              dataToRecord.sent_bitrate_kbps = Math.round((Math.max(0, bytesSent) * 8) / 1000);
              const packetsSent = report.packetsSent - lastOutboundReport.packetsSent;
              dataToRecord.packets_sent_per_second = Math.max(0, packetsSent);
            } else { dataToRecord.sent_bitrate_kbps = 0; dataToRecord.packets_sent_per_second = 0;}
          } else { dataToRecord.sent_bitrate_kbps = 0; dataToRecord.packets_sent_per_second = 0; }
        }
        if (report.type === 'remote-inbound-rtp' && report.mediaType === 'video') {
            dataToRecord.receiver_jitter_ms = report.jitter !== undefined ? (report.jitter * 1000).toFixed(3) : 'N/A';
            dataToRecord.receiver_packets_lost = report.packetsLost;
            dataToRecord.receiver_fraction_lost = report.fractionLost;
            dataToRecord.rtt_rtcp_ms = report.roundTripTime !== undefined ? (report.roundTripTime * 1000).toFixed(3) : 'N/A';
        }
        if (report.type === 'candidate-pair' && report.nominated && report.state === 'succeeded') {
            dataToRecord.available_outgoing_bitrate_kbps = report.availableOutgoingBitrate ? Math.round(report.availableOutgoingBitrate / 1000) : 'N/A';
            dataToRecord.rtt_ice_ms = report.currentRoundTripTime !== undefined ? (report.currentRoundTripTime * 1000).toFixed(3) : 'N/A';
        }
      });
    } else {
      stats.forEach(report => {
        if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
          dataToRecord.received_resolution = `${report.frameWidth}x${report.frameHeight}`;
          dataToRecord.received_fps = report.framesPerSecond;
          dataToRecord.jitter_ms = report.jitter !== undefined ? (report.jitter * 1000).toFixed(3) : 'N/A';
          dataToRecord.packets_lost = report.packetsLost;
          dataToRecord.frames_dropped = report.framesDropped;
          dataToRecord.total_decode_time_s = report.totalDecodeTime;
          dataToRecord.keyframes_decoded = report.keyFramesDecoded;
          dataToRecord.jitter_buffer_delay_s = report.jitterBufferDelay;
          if (lastReport) {
            const lastInboundReport = lastReport.get(report.id);
            if (lastInboundReport && typeof lastInboundReport.bytesReceived === 'number') {
              const bytesReceived = report.bytesReceived - lastInboundReport.bytesReceived;
              dataToRecord.received_bitrate_kbps = Math.round((Math.max(0, bytesReceived) * 8) / 1000);
              const packetsReceived = report.packetsReceived - lastInboundReport.packetsReceived;
              dataToRecord.packets_received_per_second = Math.max(0, packetsReceived);
            } else { dataToRecord.received_bitrate_kbps = 0; dataToRecord.packets_received_per_second = 0; }
          } else { dataToRecord.received_bitrate_kbps = 0; dataToRecord.packets_received_per_second = 0; }
        }
      });
    }
    if (Object.keys(dataToRecord).length > 1) {
      recordedStats.push(dataToRecord);
      statsDisplay.textContent = `記録中... ${recordedStats.length} エントリ`;
    }
    lastReport = stats;
  }, 1000);
}

function stopStatsRecording() {
  if (!isRecording) return;
  clearInterval(statsInterval);
  isRecording = false;
  lastReport = null;
  startStatsRecordingBtn.disabled = false;
  stopStatsRecordingBtn.disabled = true;
  downloadStatsBtn.disabled = recordedStats.length === 0;
  statsDisplay.textContent = `記録停止。${recordedStats.length} エントリ。`;
}

function downloadStatsAsCsv() {
  if (recordedStats.length === 0) {
      alert("ダウンロードするデータがありません。");
      return;
  }
  const headerSet = new Set();
  recordedStats.forEach(row => { Object.keys(row).forEach(key => headerSet.add(key)); });
  const headers = Array.from(headerSet);
  const csvRows = [];
  csvRows.push(headers.join(','));
  recordedStats.forEach(row => {
      const values = headers.map(header => {
          const value = row[header] !== undefined ? row[header] : '';
          if (typeof value === 'string' && value.includes(',')) { return `"${value.replace(/"/g, '""')}"`; }
          return value;
      });
      csvRows.push(values.join(','));
  });
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const fileNameRole = currentRole === "sender" ? "sender" : "receiver";
  link.setAttribute('download', `webrtc_stats_${fileNameRole}_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// --- UIイベントリスナー ---

roleInputs.forEach(input => {
  input.addEventListener("change", () => {
    currentRole = document.querySelector('input[name="role"]:checked').value;
    senderControls.style.display = currentRole === "sender" ? "block" : "none";
    receiverControls.style.display = currentRole === "receiver" ? "block" : "none";
    resetUI();
  });
});

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

startCameraBtn.onclick = async () => {
  startCameraBtn.disabled = true;
  const selectedResolution = resolutionSelect.value;
  const selectedCodec = codecSelect.value;
  const constraints = { 
    video: { ...resolutions[selectedResolution], pan: true, tilt: true, zoom: true }, 
    audio: true 
  };

  try {
      localStream = await navigator.mediaDevices.getUserMedia(constraints);
      localVideo.srcObject = localStream;
      localVideo.style.display = 'block';
      [videoTrack] = localStream.getVideoTracks();

      setupConnection();

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

      callDocRef = doc(collection(db, "calls"));
      offerCandidates = collection(callDocRef, "offerCandidates");
      answerCandidates = collection(callDocRef, "answerCandidates");

      localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

      peerConnection.onicecandidate = event => {
        if (event.candidate) setDoc(doc(offerCandidates), event.candidate.toJSON());
      };

      const offer = await peerConnection.createOffer();
      const modifiedSDP = preferCodec(offer.sdp, selectedCodec);
      await peerConnection.setLocalDescription({ type: offer.type, sdp: modifiedSDP });
      await setDoc(callDocRef, { offer: { type: offer.type, sdp: modifiedSDP } });

      callIdDisplay.textContent = callDocRef.id;
      callControls.style.display = "block";

      onSnapshot(callDocRef, snapshot => {
        const data = snapshot.data();
        if (data?.answer && !peerConnection.currentRemoteDescription) {
          peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
      });
      
      onSnapshot(answerCandidates, snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
        });
      });
  } catch (error) {
      console.error("カメラの開始または通話作成中にエラーが発生しました:", error);
      alert("カメラのアクセスに失敗しました。カメラが利用可能か確認してください。");
      resetUI();
  }
};

joinCallBtn.onclick = async () => {
  const callId = callIdInput.value.trim();
  if (!callId) return alert("Call ID を入力してください");
  joinCallBtn.disabled = true;

  try {
      callDocRef = doc(db, "calls", callId);
      const callData = (await getDoc(callDocRef)).data();

      if (callData && callData.offer) {
        setupConnection();

        peerConnection.ondatachannel = (event) => {
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
        };

        offerCandidates = collection(callDocRef, "offerCandidates");
        answerCandidates = collection(callDocRef, "answerCandidates");
        peerConnection.ontrack = event => {
          remoteVideo.srcObject = event.streams[0];
          remoteVideo.style.display = 'block';
        };
        peerConnection.onicecandidate = event => {
          if (event.candidate) setDoc(doc(answerCandidates), event.candidate.toJSON());
        };

        await peerConnection.setRemoteDescription(new RTCSessionDescription(callData.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        await setDoc(callDocRef, { answer: { type: answer.type, sdp: answer.sdp } }, { merge: true });
        callIdDisplay.textContent = callDocRef.id;
        callControls.style.display = "block";

        onSnapshot(offerCandidates, snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
          });
        });
      } else {
        alert("指定されたCall IDが見つかりません。");
        resetUI();
      }
  } catch (error) {
      console.error("通話への参加中にエラーが発生しました:", error);
      alert("通話への参加中にエラーが発生しました。Call IDが正しいか確認してください。");
      resetUI();
  } finally {
      joinCallBtn.disabled = false;
  }
};

hangUpBtn.onclick = hangUp;
startStatsRecordingBtn.onclick = startStatsRecording;
stopStatsRecordingBtn.onclick = stopStatsRecording;
downloadStatsBtn.onclick = downloadStatsAsCsv;

// --- PTZ関連のヘルパー関数 ---

async function applyPtzConstraint(type, value) {
  // ページが表示されているかチェック
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

function setupReceiverPtzControls(capabilities) {
  console.log("RECEIVER: Setting up PTZ controls with capabilities:", capabilities);
  ptzCapabilities = capabilities;

  const sendCommand = (type, value) => {
    // 接続状態のチェックを強化
    if (!peerConnection || peerConnection.connectionState !== 'connected') {
        console.warn(`RECEIVER: Cannot send command, PeerConnection not connected. State: ${peerConnection?.connectionState}`);
        return;
    }
    if (!ptzChannel || ptzChannel.readyState !== 'open') {
        console.warn(`RECEIVER: Cannot send command, DataChannel not open. State: ${ptzChannel?.readyState}`);
        return;
    }
    if(!ptzCapabilities[type]) {
        console.warn(`RECEIVER: PTZ type '${type}' is not supported by the camera.`);
        return;
    }

    const { min, max } = ptzCapabilities[type];
    const clampedValue = Math.max(min, Math.min(max, value));
    const command = { type: 'command', command: type, value: clampedValue };
    
    // コマンド送信処理をtry...catchで囲む
    try {
        console.log("RECEIVER: Attempting to send command:", command);
        ptzChannel.send(JSON.stringify(command));
        console.log("RECEIVER: Command sent successfully.");
    } catch (e) {
        console.error("RECEIVER: Error sending command via DataChannel:", e);
    }
    
    document.getElementById(`${type}Slider`).value = clampedValue;
    document.getElementById(`${type}Value`).textContent = clampedValue.toFixed(2);
  };
  
  // UI要素の初期化
  ['zoom', 'pan', 'tilt'].forEach(type => {
      const isSupported = !!ptzCapabilities[type];
      const elements = {
          inBtn: document.getElementById(`${type}InBtn`) || document.getElementById(`${type}UpBtn`) || document.getElementById(`${type}RightBtn`),
          outBtn: document.getElementById(`${type}OutBtn`) || document.getElementById(`${type}DownBtn`) || document.getElementById(`${type}LeftBtn`),
          slider: document.getElementById(`${type}Slider`),
          value: document.getElementById(`${type}Value`)
      };
      
      if (elements.inBtn) elements.inBtn.disabled = !isSupported;
      if (elements.outBtn) elements.outBtn.disabled = !isSupported;
      if (elements.slider) elements.slider.disabled = !isSupported;

      if (isSupported) {
          const { min, max, step } = ptzCapabilities[type];
          elements.slider.min = min;
          elements.slider.max = max;
          elements.slider.step = step;
          const initialValue = (type === 'tilt' || type === 'pan') && min < 0 && max > 0 ? 0 : min;
          elements.slider.value = initialValue;
          elements.value.textContent = parseFloat(initialValue).toFixed(2);
      }
  });

  const getSliderValue = (type) => parseFloat(document.getElementById(`${type}Slider`).value);
  
  // イベントリスナーの設定
  zoomInBtn.onclick = () => { if (ptzCapabilities.zoom) sendCommand('zoom', getSliderValue('zoom') + ptzCapabilities.zoom.step); };
  zoomOutBtn.onclick = () => { if (ptzCapabilities.zoom) sendCommand('zoom', getSliderValue('zoom') - ptzCapabilities.zoom.step); };
  zoomSlider.oninput = () => { if (ptzCapabilities.zoom) sendCommand('zoom', getSliderValue('zoom')); };
  tiltUpBtn.onclick = () => { if (ptzCapabilities.tilt) sendCommand('tilt', getSliderValue('tilt') + ptzCapabilities.tilt.step); };
  tiltDownBtn.onclick = () => { if (ptzCapabilities.tilt) sendCommand('tilt', getSliderValue('tilt') - ptzCapabilities.tilt.step); };
  tiltSlider.oninput = () => { if (ptzCapabilities.tilt) sendCommand('tilt', getSliderValue('tilt')); };
  panRightBtn.onclick = () => { if (ptzCapabilities.pan) sendCommand('pan', getSliderValue('pan') + ptzCapabilities.pan.step); };
  panLeftBtn.onclick = () => { if (ptzCapabilities.pan) sendCommand('pan', getSliderValue('pan') - ptzCapabilities.pan.step); };
  panSlider.oninput = () => { if (ptzCapabilities.pan) sendCommand('pan', getSliderValue('pan')); };
  ptzResetBtn.onclick = () => {
      if(ptzCapabilities.zoom) sendCommand('zoom', ptzCapabilities.zoom.min);
      if(ptzCapabilities.tilt) sendCommand('tilt', 0);
      if(ptzCapabilities.pan) sendCommand('pan', 0);
  };
}
