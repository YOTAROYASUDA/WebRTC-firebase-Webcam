// stats.js

import * as state from './state.js';
import * as uiElements from './ui-elements.js';

/**
 * 定期的に受信映像の解像度を取得して表示を更新する。
 */
export async function updateResolutionDisplay() {
  if (!state.peerConnection || state.currentRole !== 'receiver' || state.peerConnection.connectionState !== 'connected') {
       return;
  }

  try {
      const stats = await state.peerConnection.getStats();

      // まず、すべての解像度表示を一旦非表示にする
      if (state.remoteTracks) {
          Object.values(state.remoteTracks).forEach(trackInfo => {
              if (trackInfo && trackInfo.displayElement) {
                trackInfo.displayElement.style.display = 'none';
              }
          });
      }

      stats.forEach(report => {
          // 受信中のビデオストリームに関するレポートをフィルタリング
          if (report.type === 'inbound-rtp' && report.mediaType === 'video' && state.remoteTracks) {
              const trackInfo = state.remoteTracks[report.trackIdentifier];

              // 対応するUI要素があり、解像度の情報があれば表示を更新
              if (trackInfo && trackInfo.displayElement && report.frameWidth && report.frameHeight) {
                  trackInfo.displayElement.textContent = `${report.frameWidth} x ${report.frameHeight}`;
                  trackInfo.displayElement.style.display = 'block';
              }
          }
      });

  } catch (error) {
      console.error("Error getting stats for resolution display:", error);
  }
}

/**
 * 送信者側の統計情報を収集する。
 * @param {RTCStatsReport} stats - getStats()から取得したレポート
 * @param {object} dataToRecord - 記録するデータを格納するオブジェクト
 */
function populateSenderStats(stats, dataToRecord) {
  const camera1TrackId = state.videoTracks.camera1?.id;
  const camera2TrackId = state.videoTracks.camera2?.id;

  // media-sourceレポートから mediaSourceId と trackIdentifier の対応マップを作成
  const sourceToTrackIdentifierMap = new Map();
  stats.forEach(report => {
    if (report.type === 'media-source') {
      sourceToTrackIdentifierMap.set(report.id, report.trackIdentifier);
    }
  });

  stats.forEach(report => {
    if (report.type === 'outbound-rtp' && report.mediaType === 'video') {
      // outbound-rtpレポートの mediaSourceId を使って、マップから trackIdentifier を取得
      const trackIdentifier = sourceToTrackIdentifierMap.get(report.mediaSourceId);
      if (!trackIdentifier) {
        return; 
      }

      let cameraName;
      if (trackIdentifier === camera1TrackId) {
        cameraName = 'camera1';
      } else if (trackIdentifier === camera2TrackId) {
        cameraName = 'camera2';
      }

      if (cameraName) {
        const lastOutboundReport = state.lastStatsReport?.get(report.id);
        const bytesSent = report.bytesSent - (lastOutboundReport?.bytesSent ?? 0);
        const packetsSent = report.packetsSent - (lastOutboundReport?.packetsSent ?? 0);

        dataToRecord[`${cameraName}_sent_resolution`] = `${report.frameWidth}x${report.frameHeight}`;
        dataToRecord[`${cameraName}_sent_fps`] = report.framesPerSecond;
        dataToRecord[`${cameraName}_sent_bitrate_kbps`] = Math.round((Math.max(0, bytesSent) * 8) / 1000);
        dataToRecord[`${cameraName}_packets_sent_per_second`] = Math.max(0, packetsSent);
        dataToRecord[`${cameraName}_total_encode_time_s`] = report.totalEncodeTime;
        dataToRecord[`${cameraName}_keyframes_encoded`] = report.keyFramesEncoded;
        dataToRecord[`${cameraName}_quality_limitation_reason`] = report.qualityLimitationReason;
        dataToRecord[`${cameraName}_quality_limitation_resolution_changes`] = report.qualityLimitationResolutionChanges;
        dataToRecord[`${cameraName}_retransmitted_packets_sent`] = report.retransmittedPacketsSent;
        dataToRecord[`${cameraName}_nack_count`] = report.nackCount;
      }
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
        dataToRecord.connection_type = remoteCandidate.candidateType;
      }
    }
  });
}


/**
 * 受信者側の統計情報を収集する。
 * @param {RTCStatsReport} stats - getStats()から取得したレポート
 * @param {object} dataToRecord - 記録するデータを格納するオブジェクト
 */
function populateReceiverStats(stats, dataToRecord) {
  stats.forEach(report => {
    if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
      const trackInfo = state.remoteTracks[report.trackIdentifier];
      const cameraName = trackInfo ? trackInfo.name : null;

      if (cameraName) {
        const lastInboundReport = state.lastStatsReport?.get(report.id);
        const bytesReceived = report.bytesReceived - (lastInboundReport?.bytesReceived ?? 0);
        const packetsReceived = report.packetsReceived - (lastInboundReport?.packetsReceived ?? 0);

        dataToRecord[`${cameraName}_received_resolution`] = `${report.frameWidth}x${report.frameHeight}`;
        dataToRecord[`${cameraName}_received_fps`] = report.framesPerSecond;
        dataToRecord[`${cameraName}_received_bitrate_kbps`] = Math.round((Math.max(0, bytesReceived) * 8) / 1000);
        dataToRecord[`${cameraName}_packets_received_per_second`] = Math.max(0, packetsReceived);
        dataToRecord[`${cameraName}_jitter_ms`] = (report.jitter * 1000)?.toFixed(4) ?? 'N/A';
        dataToRecord[`${cameraName}_packets_lost`] = report.packetsLost;
        dataToRecord[`${cameraName}_frames_dropped`] = report.framesDropped;
        dataToRecord[`${cameraName}_total_decode_time_s`] = report.totalDecodeTime;
        dataToRecord[`${cameraName}_keyframes_decoded`] = report.keyFramesDecoded;
        dataToRecord[`${cameraName}_jitter_buffer_delay_s`] = report.jitterBufferDelay;
        dataToRecord[`${cameraName}_fir_count`] = report.firCount;
        dataToRecord[`${cameraName}_pli_count`] = report.pliCount;
        dataToRecord[`${cameraName}_jitter_buffer_emitted_count`] = report.jitterBufferEmittedCount;
      }
    }
    if (report.type === 'candidate-pair' && report.nominated && report.state === 'succeeded') {
      const remoteCandidate = stats.get(report.remoteCandidateId);
      if (remoteCandidate && remoteCandidate.candidateType) {
        dataToRecord.connection_type = remoteCandidate.candidateType;
      }
    }
  });
}


/**
 * 統計情報の記録を開始する。
 */
export function startStatsRecording() {
  if (!state.peerConnection || state.isRecordingStats) return;

  state.setIsRecordingStats(true);
  state.setRecordedStats([]);
  state.setLastStatsReport(null);

  uiElements.startStatsRecordingBtn.disabled = true;
  uiElements.stopStatsRecordingBtn.disabled = false;
  uiElements.downloadStatsBtn.disabled = true;
  uiElements.statsDisplay.textContent = "記録中...";

  const interval = setInterval(async () => {
    if (!state.peerConnection) return;

    const stats = await state.peerConnection.getStats();
    const dataToRecord = { timestamp: new Date().toISOString() };

    if (state.currentRole === "sender") {
      populateSenderStats(stats, dataToRecord);
    } else {
      populateReceiverStats(stats, dataToRecord);
    }

    // タイムスタンプ以外に何かしらのデータが記録された場合のみ追加
    if (Object.keys(dataToRecord).length > 1) {
      state.recordedStats.push(dataToRecord);
      uiElements.statsDisplay.textContent = `記録中... ${state.recordedStats.length} 個`;
    }
    state.setLastStatsReport(stats);
  }, 1000);
  state.setStatsInterval(interval);
}

/**
 * 統計情報の記録を停止する。
 */
export function stopStatsRecording() {
  if (!state.isRecordingStats) return;

  clearInterval(state.statsInterval);
  state.setIsRecordingStats(false);
  state.setLastStatsReport(null);

  uiElements.startStatsRecordingBtn.disabled = false;
  uiElements.stopStatsRecordingBtn.disabled = true;
  uiElements.downloadStatsBtn.disabled = state.recordedStats.length === 0;
  uiElements.statsDisplay.textContent = `記録停止。${state.recordedStats.length} 個`;
}

/**
 * 記録した統計情報をCSVファイルとしてダウンロードする。
 */
export function downloadStatsAsCsv() {
  if (state.recordedStats.length === 0) {
    alert("ダウンロードするデータがありません");
    return;
  }

  const headerSet = new Set();
  state.recordedStats.forEach(row => Object.keys(row).forEach(key => headerSet.add(key)));
  const headers = Array.from(headerSet);

  const csvRows = [
    headers.join(','),
    ...state.recordedStats.map(row =>
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
  link.download = `webrtc_stats_${state.currentRole}_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}