// ui.js

import * as state from './state.js';
import * as uiElements from './ui-elements.js';

/**
 * UIの状態を初期状態にリセットする。
 */
export function resetUI() {
  uiElements.localVideo.srcObject = null;
  uiElements.remoteVideo.srcObject = null;
  uiElements.localVideo.style.display = 'none';
  uiElements.remoteVideoContainer.style.display = 'none';
  uiElements.resolutionDisplay.style.display = 'none';

  uiElements.ptzControls.style.display = "none";
  uiElements.callControls.style.display = "none";
  uiElements.statsControls.style.display = "none";

  uiElements.callIdDisplay.textContent = "";
  uiElements.callIdInput.value = "";
  uiElements.copyCallIdBtn.textContent = "コピー";

  uiElements.startCameraBtn.disabled = false;
  uiElements.joinCallBtn.disabled = false;

  uiElements.statsDisplay.textContent = "";
  state.setRecordedStats([]);
  state.setLastStatsReport(null);
  uiElements.startStatsRecordingBtn.disabled = false;
  uiElements.stopStatsRecordingBtn.disabled = true;
  uiElements.downloadStatsBtn.disabled = true;

  if (state.ptzChannel) {
    state.ptzChannel.close();
    state.setPtzChannel(null);
  }
  
  if (state.resolutionUpdateInterval) {
    clearInterval(state.resolutionUpdateInterval);
    state.setResolutionUpdateInterval(null);
  }
}

/**
 * 役割（送信者/受信者）の変更に応じてUIを更新する。
 * @param {string} role - 'sender' または 'receiver'
 */
export function updateRoleUI(role) {
  state.setCurrentRole(role);
  uiElements.senderControls.style.display = role === "sender" ? "block" : "none";
  uiElements.receiverControls.style.display = role === "receiver" ? "block" : "none";
  resetUI();
}

/**
 * 利用可能なカメラデバイスをリストアップし、選択メニューを生成する。
 */
export async function populateCameraList() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    uiElements.cameraSelect.innerHTML = '';

    if (videoDevices.length === 0) {
      uiElements.cameraSelect.innerHTML = '<option>カメラが見つかりません</option>';
      uiElements.cameraSelect.disabled = true;
      uiElements.startCameraBtn.disabled = true;
      return;
    }

    videoDevices.forEach((device, index) => {
      const option = document.createElement('option');
      option.value = device.deviceId;
      option.text = device.label || `カメラ ${index + 1}`;
      uiElements.cameraSelect.appendChild(option);
    });
    uiElements.cameraSelect.disabled = false;
    uiElements.startCameraBtn.disabled = false;

  } catch (error) {
    console.error("Error enumerating devices:", error);
    alert("カメラデバイスの取得に失敗しました。");
  }
}