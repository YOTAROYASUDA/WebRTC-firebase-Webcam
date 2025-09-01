// ui-elements.js

export const roleInputs = document.querySelectorAll('input[name="role"]');
export const senderControls = document.getElementById("senderControls");
export const receiverControls = document.getElementById("receiverControls");
export const callControls = document.getElementById("callControls");
export const statsControls = document.getElementById("statsControls");
export const ptzControls = document.getElementById("ptzControls");

export const cameraSelect = document.getElementById("cameraSelect");
export const resolutionSelect = document.getElementById("resolution");
export const framerateSelect = document.getElementById("framerate");
export const codecSelect = document.getElementById("codecSelect");
export const startCameraBtn = document.getElementById("startCamera");
export const joinCallBtn = document.getElementById("joinCall");
export const hangUpBtn = document.getElementById("hangUpBtn");
export const callIdInput = document.getElementById("callIdInput");
export const callIdDisplay = document.getElementById("callIdDisplay");
export const copyCallIdBtn = document.getElementById("copyCallId");

export const localVideo = document.getElementById("localVideo");
export const remoteVideo = document.getElementById("remoteVideo");
export const remoteVideoContainer = document.getElementById("remoteVideoContainer");
export const resolutionDisplay = document.getElementById("resolutionDisplay");
export const fullscreenBtn = document.getElementById("fullscreenBtn");

// Stats-related elements
export const startStatsRecordingBtn = document.getElementById("startStatsRecording");
export const stopStatsRecordingBtn = document.getElementById("stopStatsRecording");
export const downloadStatsBtn = document.getElementById("downloadStats");
export const statsDisplay = document.getElementById("statsDisplay");

// PTZ-related elements
export const zoomInBtn = document.getElementById("zoomInBtn");
export const zoomOutBtn = document.getElementById("zoomOutBtn");
export const zoomSlider = document.getElementById("zoomSlider");
export const zoomValue = document.getElementById("zoomValue");
export const tiltUpBtn = document.getElementById("tiltUpBtn");
export const tiltDownBtn = document.getElementById("tiltDownBtn");
export const tiltSlider = document.getElementById("tiltSlider");
export const tiltValue = document.getElementById("tiltValue");
export const panLeftBtn = document.getElementById("panLeftBtn");
export const panRightBtn = document.getElementById("panRightBtn");
export const panSlider = document.getElementById("panSlider");
export const panValue = document.getElementById("panValue");
export const ptzResetBtn = document.getElementById("ptzResetBtn");