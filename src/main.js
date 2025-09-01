// main.js

import { updateRoleUI, populateCameraList } from './ui.js';
import * as uiElements from './ui-elements.js';
import * as state from './state.js';
import { startCall, joinCall, hangUp } from './webrtc.js';
import { sendPtzCommand } from './ptz.js';
import { startStatsRecording, stopStatsRecording, downloadStatsAsCsv } from './stats.js';

/**
 * アプリケーションのすべてのイベントリスナーを初期化する。
 */
function initializeEventListeners() {
  uiElements.roleInputs.forEach(input => {
    input.addEventListener("change", (e) => updateRoleUI(e.target.value));
  });

  uiElements.copyCallIdBtn.addEventListener("click", async () => {
    const callId = uiElements.callIdDisplay.textContent.trim();
    if (!callId) return;
    try {
      await navigator.clipboard.writeText(callId);
      uiElements.copyCallIdBtn.textContent = "コピー済み";
      setTimeout(() => { uiElements.copyCallIdBtn.textContent = "コピー"; }, 1500);
    } catch (err) {
      alert("コピーに失敗しました。");
      console.error("Failed to copy Call ID: ", err);
    }
  });

  uiElements.startCameraBtn.addEventListener("click", startCall);
  uiElements.joinCallBtn.addEventListener("click", joinCall);
  uiElements.hangUpBtn.addEventListener("click", hangUp);
  
  uiElements.startStatsRecordingBtn.addEventListener("click", startStatsRecording);
  uiElements.stopStatsRecordingBtn.addEventListener("click", stopStatsRecording);
  uiElements.downloadStatsBtn.addEventListener("click", downloadStatsAsCsv);

  const getSliderValue = (type) => parseFloat(document.getElementById(`${type}Slider`).value);
  
  uiElements.zoomInBtn.addEventListener("click", () => sendPtzCommand('zoom', getSliderValue('zoom') + state.ptzCapabilities.zoom.step));
  uiElements.zoomOutBtn.addEventListener("click", () => sendPtzCommand('zoom', getSliderValue('zoom') - state.ptzCapabilities.zoom.step));
  uiElements.zoomSlider.addEventListener("input", () => sendPtzCommand('zoom', getSliderValue('zoom')));
  
  uiElements.tiltUpBtn.addEventListener("click", () => sendPtzCommand('tilt', getSliderValue('tilt') + state.ptzCapabilities.tilt.step));
  uiElements.tiltDownBtn.addEventListener("click", () => sendPtzCommand('tilt', getSliderValue('tilt') - state.ptzCapabilities.tilt.step));
  uiElements.tiltSlider.addEventListener("input", () => sendPtzCommand('tilt', getSliderValue('tilt')));
  
  uiElements.panRightBtn.addEventListener("click", () => sendPtzCommand('pan', getSliderValue('pan') + state.ptzCapabilities.pan.step));
  uiElements.panLeftBtn.addEventListener("click", () => sendPtzCommand('pan', getSliderValue('pan') - state.ptzCapabilities.pan.step));
  uiElements.panSlider.addEventListener("input", () => sendPtzCommand('pan', getSliderValue('pan')));
  
  uiElements.ptzResetBtn.addEventListener("click", () => {
    if (state.ptzCapabilities.zoom) sendPtzCommand('zoom', state.ptzCapabilities.zoom.min);
    if (state.ptzCapabilities.tilt) sendPtzCommand('tilt', 0);
    if (state.ptzCapabilities.pan) sendPtzCommand('pan', 0);
  });

  window.addEventListener('keydown', (event) => {
    if (state.currentRole !== 'receiver' || uiElements.ptzControls.style.display === 'none' || ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
    }

    let commandSent = false;
    switch (event.key) {
        case 'ArrowUp': if (state.ptzCapabilities.tilt) { sendPtzCommand('tilt', getSliderValue('tilt') + state.ptzCapabilities.tilt.step); commandSent = true; } break;
        case 'ArrowDown': if (state.ptzCapabilities.tilt) { sendPtzCommand('tilt', getSliderValue('tilt') - state.ptzCapabilities.tilt.step); commandSent = true; } break;
        case 'ArrowLeft': if (state.ptzCapabilities.pan) { sendPtzCommand('pan', getSliderValue('pan') - state.ptzCapabilities.pan.step); commandSent = true; } break;
        case 'ArrowRight': if (state.ptzCapabilities.pan) { sendPtzCommand('pan', getSliderValue('pan') + state.ptzCapabilities.pan.step); commandSent = true; } break;
        case '+': case 'PageUp': if (state.ptzCapabilities.zoom) { sendPtzCommand('zoom', getSliderValue('zoom') + state.ptzCapabilities.zoom.step); commandSent = true; } break;
        case '-': case 'PageDown': if (state.ptzCapabilities.zoom) { sendPtzCommand('zoom', getSliderValue('zoom') - state.ptzCapabilities.zoom.step); commandSent = true; } break;
        case 'r': case 'R':
            if (state.ptzCapabilities.zoom) sendPtzCommand('zoom', state.ptzCapabilities.zoom.min);
            if (state.ptzCapabilities.tilt) sendPtzCommand('tilt', 0);
            if (state.ptzCapabilities.pan) sendPtzCommand('pan', 0);
            commandSent = true;
            break;
    }
    if (commandSent) event.preventDefault();
  });

  uiElements.fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        uiElements.remoteVideoContainer.requestFullscreen().catch(err => {
            alert(`フルスクリーンにできませんでした: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    uiElements.fullscreenBtn.textContent = document.fullscreenElement === uiElements.remoteVideoContainer ? '通常表示' : 'フルスクリーン';
  });
}

// =================================================================================
// --- 初期化 (Initialization) ---
// =================================================================================

// 最初に表示する役割に応じてUIを更新
updateRoleUI(document.querySelector('input[name="role"]:checked').value);
// すべてのイベントリスナーを設定
initializeEventListeners();
// カメラリストを取得して表示
populateCameraList();