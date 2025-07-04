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

// 統計情報関連のHTML要素
const startStatsRecordingBtn = document.getElementById("startStatsRecording");
const stopStatsRecordingBtn = document.getElementById("stopStatsRecording");
const downloadStatsBtn = document.getElementById("downloadStats");
const statsDisplay = document.getElementById("statsDisplay");

// --- グローバル変数 ---
let peerConnection;
let localStream;
let callDocRef; // Firestoreのドキュメント参照を保持
let offerCandidates, answerCandidates; // サブコレクションの参照を保持

// 統計情報関連のグローバル変数
let statsInterval;
let recordedStats = []; // 記録された統計データを格納する配列
let isRecording = false; // 記録中かどうかを示すフラグ
let currentRole = "sender"; // 現在の役割を追跡する変数を追加
let lastReport = null; // ビットレート計算のために前回のレポートを保持

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

  // peerConnectionが確立されたら統計情報コントロールを表示
  peerConnection.onconnectionstatechange = () => {
      if (peerConnection.connectionState === 'connected') {
          statsControls.style.display = 'block';
      } else if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed' || peerConnection.connectionState === 'closed') {
          statsControls.style.display = 'none';
          stopStatsRecording(); // 接続が切れたら記録も停止
      }
  };
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
  stopStatsRecording(); // 通話終了時に統計記録を停止

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
    statsControls.style.display = "none"; // 統計情報コントロールも非表示に
    callIdDisplay.textContent = "";
    callIdInput.value = "";
    copyCallIdBtn.textContent = "コピー";
    
    // ボタンの状態をリセット
    startCameraBtn.disabled = false;
    joinCallBtn.disabled = false;

    // 統計情報関連のUIもリセット
    statsDisplay.textContent = "";
    recordedStats = [];
    isRecording = false;
    lastReport = null; // 統計情報リセット
    startStatsRecordingBtn.disabled = false;
    stopStatsRecordingBtn.disabled = true;
    downloadStatsBtn.disabled = true;
}


/**
 * 統計情報の収集を開始する
 */
async function startStatsRecording() {
  if (!peerConnection || isRecording) return;

  isRecording = true;
  recordedStats = []; // 新しい記録セッションのためにクリア
  lastReport = null; // 記録開始時にリセット

  startStatsRecordingBtn.disabled = true;
  stopStatsRecordingBtn.disabled = false;
  downloadStatsBtn.disabled = true; // 記録中はダウンロード不可に

  statsDisplay.textContent = "記録中...";

  statsInterval = setInterval(async () => {
    if (!peerConnection) return;
    const stats = await peerConnection.getStats();
    const currentTime = new Date().toISOString();
    let dataToRecord = { timestamp: currentTime };

    // --- 送信側の統計 (Sender Role) ---
    if (currentRole === "sender") {
      stats.forEach(report => {
        // 送信映像ストリームに関する情報
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

            } else {
              dataToRecord.sent_bitrate_kbps = 0;
              dataToRecord.packets_sent_per_second = 0;
            }
          } else {
            dataToRecord.sent_bitrate_kbps = 0;
            dataToRecord.packets_sent_per_second = 0;
          }
        }
        // 受信側からフィードバックされるリモート統計情報
        if (report.type === 'remote-inbound-rtp' && report.mediaType === 'video') {
            dataToRecord.receiver_jitter_ms = report.jitter !== undefined ? (report.jitter * 1000).toFixed(3) : 'N/A';
            dataToRecord.receiver_packets_lost = report.packetsLost;
            dataToRecord.receiver_fraction_lost = report.fractionLost;
            dataToRecord.rtt_rtcp_ms = report.roundTripTime !== undefined ? (report.roundTripTime * 1000).toFixed(3) : 'N/A';
        }
        // 接続経路に関する情報
        if (report.type === 'candidate-pair' && report.nominated && report.state === 'succeeded') {
            dataToRecord.available_outgoing_bitrate_kbps = report.availableOutgoingBitrate ? Math.round(report.availableOutgoingBitrate / 1000) : 'N/A';
            dataToRecord.rtt_ice_ms = report.currentRoundTripTime !== undefined ? (report.currentRoundTripTime * 1000).toFixed(3) : 'N/A';
        }
      });
    }
    // --- 受信側の統計 (Receiver Role) ---
    else {
      stats.forEach(report => {
        // 受信映像ストリームに関する情報
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

            } else {
              dataToRecord.received_bitrate_kbps = 0;
              dataToRecord.packets_received_per_second = 0;
            }
          } else {
            dataToRecord.received_bitrate_kbps = 0;
            dataToRecord.packets_received_per_second = 0;
          }
        }
      });
    }

    // 記録するデータがタイムスタンプ以外にあれば追加
    if (Object.keys(dataToRecord).length > 1) {
      recordedStats.push(dataToRecord);
      statsDisplay.textContent = `記録中... ${recordedStats.length} エントリ`;
    }

    // 次の計算のために現在のレポートを保持
    lastReport = stats;

  }, 1000); // 1秒ごとに統計情報を取得
}

/**
 * 統計情報の収集を停止する
 */
function stopStatsRecording() {
  if (!isRecording) return;

  clearInterval(statsInterval);
  isRecording = false;
  lastReport = null; // 状態をリセット

  startStatsRecordingBtn.disabled = false;
  stopStatsRecordingBtn.disabled = true;
  downloadStatsBtn.disabled = recordedStats.length === 0; // データがあればダウンロード可能に

  statsDisplay.textContent = `記録停止。${recordedStats.length} エントリ。`;
}

/**
 * 記録された統計情報をCSVとしてダウンロードする
 */
function downloadStatsAsCsv() {
  if (recordedStats.length === 0) {
      alert("ダウンロードするデータがありません。");
      return;
  }

  // ヘッダーを動的に生成する（記録された全データのキーを網羅する）
  const headerSet = new Set();
  recordedStats.forEach(row => {
    Object.keys(row).forEach(key => headerSet.add(key));
  });
  const headers = Array.from(headerSet);

  const csvRows = [];
  csvRows.push(headers.join(',')); // ヘッダー行

  recordedStats.forEach(row => {
      const values = headers.map(header => {
          const value = row[header] !== undefined ? row[header] : ''; // 未定義の場合は空文字
          // CSVフォーマットのためにカンマや引用符をエスケープ
          if (typeof value === 'string' && value.includes(',')) {
              return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
      });
      csvRows.push(values.join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  // ファイル名を役割に基づいて動的に設定
  const fileNameRole = currentRole === "sender" ? "sender" : "receiver";
  link.setAttribute('download', `webrtc_stats_${fileNameRole}_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // オブジェクトURLを解放
}


// --- UIイベントリスナー ---

// 役割（送信/受信）の切り替え
roleInputs.forEach(input => {
  input.addEventListener("change", () => {
    currentRole = document.querySelector('input[name="role"]:checked').value; // 役割を更新
    senderControls.style.display = currentRole === "sender" ? "block" : "none";
    receiverControls.style.display = currentRole === "receiver" ? "block" : "none";
    resetUI(); // 役割切り替え時にUIをリセット
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

  try {
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
  } catch (error) {
      console.error("カメラの開始または通話作成中にエラーが発生しました:", error);
      alert("カメラのアクセスに失敗しました。カメラが利用可能か確認してください。");
      resetUI();
  }
};

// [受信者] 通話に参加
joinCallBtn.onclick = async () => {
  const callId = callIdInput.value.trim();
  if (!callId) return alert("Call ID を入力してください");
  
  joinCallBtn.disabled = true;

  try {
      callDocRef = doc(db, "calls", callId);
      const callData = (await getDoc(callDocRef)).data();

      if (callData && callData.offer) {
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
      }
  } catch (error) {
      console.error("通話への参加中にエラーが発生しました:", error);
      alert("通話への参加中にエラーが発生しました。Call IDが正しいか確認してください。");
      resetUI();
  } finally {
      joinCallBtn.disabled = false; // エラーや完了に関わらずボタンを再度有効化
  }
};

// [共通] 通話を切る
hangUpBtn.onclick = hangUp;

// 統計情報記録のイベントリスナー
startStatsRecordingBtn.onclick = startStatsRecording;
stopStatsRecordingBtn.onclick = stopStatsRecording;
downloadStatsBtn.onclick = downloadStatsAsCsv;