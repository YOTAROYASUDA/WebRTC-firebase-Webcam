// main.js

import { updateRoleUI, populateCameraList, updateCameraCountUI } from './ui.js';
import * as uiElements from './ui-elements.js';
import * as state from './state.js';
import { startCall, joinCall, hangUp } from './webrtc.js';
import { sendPtzCommand, updateReceiverPtzControls } from './ptz.js';
import { startStatsRecording, stopStatsRecording, downloadStatsAsCsv } from './stats.js';
import { startRecording, stopRecording, downloadVideo } from './recording.js';

/**
 * アプリケーションのすべてのイベントリスナーを初期化する。
 */
function initializeEventListeners() {
  uiElements.roleInputs.forEach(input => {
    input.addEventListener("change", (e) => updateRoleUI(e.target.value));
  });

  uiElements.cameraCountSelect.addEventListener("change", updateCameraCountUI);

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

  // Recording button event listeners
  uiElements.startRecordingBtn1.addEventListener("click", () => startRecording('camera1'));
  uiElements.stopRecordingBtn1.addEventListener("click", () => stopRecording('camera1'));
  uiElements.downloadVideoBtn1.addEventListener("click", () => downloadVideo('camera1'));

  uiElements.startRecordingBtn2.addEventListener("click", () => startRecording('camera2'));
  uiElements.stopRecordingBtn2.addEventListener("click", () => stopRecording('camera2'));
  uiElements.downloadVideoBtn2.addEventListener("click", () => downloadVideo('camera2'));

  uiElements.ptzTargetInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        updateReceiverPtzControls(e.target.value);
      }
    });
  });

  const getSliderValue = (type) => parseFloat(document.getElementById(`${type}Slider`).value);
  
  const getActiveCaps = () => state.ptzCapabilities[state.activePtzTarget] || {};

  uiElements.zoomInBtn.addEventListener("click", () => {
      const caps = getActiveCaps();
      if (caps.zoom) sendPtzCommand('zoom', getSliderValue('zoom') + caps.zoom.step);
  });
  uiElements.zoomOutBtn.addEventListener("click", () => {
      const caps = getActiveCaps();
      if (caps.zoom) sendPtzCommand('zoom', getSliderValue('zoom') - caps.zoom.step);
  });
  uiElements.zoomSlider.addEventListener("input", () => sendPtzCommand('zoom', getSliderValue('zoom')));
  
  uiElements.tiltUpBtn.addEventListener("click", () => {
      const caps = getActiveCaps();
      if (caps.tilt) sendPtzCommand('tilt', getSliderValue('tilt') + caps.tilt.step);
  });
  uiElements.tiltDownBtn.addEventListener("click", () => {
      const caps = getActiveCaps();
      if (caps.tilt) sendPtzCommand('tilt', getSliderValue('tilt') - caps.tilt.step);
  });
  uiElements.tiltSlider.addEventListener("input", () => sendPtzCommand('tilt', getSliderValue('tilt')));
  
  uiElements.panRightBtn.addEventListener("click", () => {
      const caps = getActiveCaps();
      if (caps.pan) sendPtzCommand('pan', getSliderValue('pan') + caps.pan.step);
  });
  uiElements.panLeftBtn.addEventListener("click", () => {
      const caps = getActiveCaps();
      if (caps.pan) sendPtzCommand('pan', getSliderValue('pan') - caps.pan.step);
  });
  uiElements.panSlider.addEventListener("input", () => sendPtzCommand('pan', getSliderValue('pan')));
  
  uiElements.ptzResetBtn.addEventListener("click", () => {
    const caps = getActiveCaps();
    if (caps.zoom) sendPtzCommand('zoom', caps.zoom.min);
    if (caps.tilt) sendPtzCommand('tilt', 0);
    if (caps.pan) sendPtzCommand('pan', 0);
  });

  window.addEventListener('keydown', (event) => {
    if (state.currentRole !== 'receiver' || uiElements.ptzControls.style.display === 'none' || ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
    }

    let commandSent = false;
    const caps = getActiveCaps();
    switch (event.key) {
        case 'ArrowUp': if (caps.tilt) { sendPtzCommand('tilt', getSliderValue('tilt') + caps.tilt.step); commandSent = true; } break;
        case 'ArrowDown': if (caps.tilt) { sendPtzCommand('tilt', getSliderValue('tilt') - caps.tilt.step); commandSent = true; } break;
        case 'ArrowLeft': if (caps.pan) { sendPtzCommand('pan', getSliderValue('pan') - caps.pan.step); commandSent = true; } break;
        case 'ArrowRight': if (caps.pan) { sendPtzCommand('pan', getSliderValue('pan') + caps.pan.step); commandSent = true; } break;
        case '+': case 'PageUp': if (caps.zoom) { sendPtzCommand('zoom', getSliderValue('zoom') + caps.zoom.step); commandSent = true; } break;
        case '-': case 'PageDown': if (caps.zoom) { sendPtzCommand('zoom', getSliderValue('zoom') - caps.zoom.step); commandSent = true; } break;
        case 'r': case 'R':
            if (caps.zoom) sendPtzCommand('zoom', caps.zoom.min);
            if (caps.tilt) sendPtzCommand('tilt', 0);
            if (caps.pan) sendPtzCommand('pan', 0);
            commandSent = true;
            break;
    }
    if (commandSent) event.preventDefault();
  });

  uiElements.fullscreenBtn1.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        uiElements.remoteVideoContainer1.requestFullscreen().catch(err => {
            alert(`フルスクリーンにできませんでした: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  });
  uiElements.fullscreenBtn2.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        uiElements.remoteVideoContainer2.requestFullscreen().catch(err => {
            alert(`フルスクリーンにできませんでした: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const isFullscreen = !!document.fullscreenElement;
    uiElements.fullscreenBtn1.textContent = isFullscreen && document.fullscreenElement === uiElements.remoteVideoContainer1 ? '通常表示' : 'フルスクリーン';
    uiElements.fullscreenBtn2.textContent = isFullscreen && document.fullscreenElement === uiElements.remoteVideoContainer2 ? '通常表示' : 'フルスクリーン';
  });

  /**
   * マウス操作によるPTZコントロールをセットアップする関数
   * @param {HTMLElement} container - ビデオのコンテナ要素
   */
  const setupPtzMouseControls = (container) => {
    container.classList.add('video-draggable');

    let isDragging = false;
    let lastX, lastY;

    const videoElement = container.querySelector('video');
    if (videoElement) {
        videoElement.addEventListener('wheel', (event) => {
            if (state.currentRole !== 'receiver') return;
            const delta = Math.sign(event.deltaY);
            const caps = getActiveCaps();
            if (caps.zoom) {
                const currentZoom = getSliderValue('zoom');
                const newZoom = currentZoom - (delta * caps.zoom.step * 5);
                sendPtzCommand('zoom', newZoom);
            }
            event.preventDefault();
        });
    }

    const startDragging = (event) => {
      // 左クリックのみを対象
      if (event.button !== 0 || state.currentRole !== 'receiver') return;
      
      isDragging = true;
      container.classList.add('video-dragging');
      lastX = event.clientX;
      lastY = event.clientY;

      // ドキュメント全体でマウスの動きとボタンを離したことを監視
      document.addEventListener('mousemove', onDragging);
      document.addEventListener('mouseup', stopDragging);
      
      event.preventDefault();
    };

    // --- 変更点：ドラッグ中の処理 ---
    const onDragging = (event) => {
      if (!isDragging) return;

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      
      const caps = getActiveCaps();

      if (caps.pan && Math.abs(dx) > 2) {
        const newPan = getSliderValue('pan') - (Math.sign(dx) * caps.pan.step);
        sendPtzCommand('pan', newPan);
        lastX = event.clientX;
      }

      if (caps.tilt && Math.abs(dy) > 2) {
        const newTilt = getSliderValue('tilt') + (Math.sign(dy) * caps.tilt.step);
        sendPtzCommand('tilt', newTilt);
        lastY = event.clientY;
      }
      
      event.preventDefault();
    };

    const stopDragging = () => {
      if (isDragging) {
        isDragging = false;
        container.classList.remove('video-dragging');
        
        document.removeEventListener('mousemove', onDragging);
        document.removeEventListener('mouseup', stopDragging);
      }
    };
    
    container.addEventListener('mousedown', startDragging);
  };

  // 各リモートビデオコンテナにマウス操作をセットアップ
  setupPtzMouseControls(uiElements.remoteVideoContainer1);
  setupPtzMouseControls(uiElements.remoteVideoContainer2);
}

// =================================================================================
// --- 初期化 (Initialization) ---
// =================================================================================

updateRoleUI(document.querySelector('input[name="role"]:checked').value);
initializeEventListeners();
populateCameraList();