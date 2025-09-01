// state.js

export let peerConnection;
export let localStream;
export let callDocRef;
export let ptzChannel;
export let ptzCapabilities = {};
export let videoTrack;
export let statsInterval;
export let recordedStats = [];
export let isRecordingStats = false;
export let currentRole = "sender";
export let lastStatsReport = null;
export let resolutionUpdateInterval = null;

// 状態を変更するための関数群
export function setPeerConnection(pc) { peerConnection = pc; }
export function setLocalStream(stream) { localStream = stream; }
export function setCallDocRef(ref) { callDocRef = ref; }
export function setPtzChannel(channel) { ptzChannel = channel; }
export function setPtzCapabilities(capabilities) { ptzCapabilities = capabilities; }
export function setVideoTrack(track) { videoTrack = track; }
export function setStatsInterval(interval) { statsInterval = interval; }
export function setRecordedStats(stats) { recordedStats = stats; }
export function setIsRecordingStats(isRecording) { isRecordingStats = isRecording; }
export function setCurrentRole(role) { currentRole = role; }
export function setLastStatsReport(report) { lastStatsReport = report; }
export function setResolutionUpdateInterval(interval) { resolutionUpdateInterval = interval; }