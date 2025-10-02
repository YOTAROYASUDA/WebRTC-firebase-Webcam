// main.js

import { updateRoleUI, populateCameraList, updateCameraCountUI } from './ui.js';
import * as uiElements from './ui-elements.js';
import * as state from './state.js';
import { startCall, joinCall, hangUp } from './webrtc.js';
import { sendPtzCommand, updateReceiverPtzControls } from './ptz.js';
import { startStatsRecording, stopStatsRecording, downloadStatsAsCsv } from './stats.js';
import { startRecording, stopRecording, downloadVideo } from './recording.js';
import { start as startArucoTracking, stop as stopArucoTracking } from './aruco.js';
import * as evaluation from './evaluation.js';


// =================================================================================
// --- イベントリスナーの初期化 (Initialize Event Listeners) ---
// =================================================================================

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

  // ArUco Tracking event listeners
  uiElements.startArucoTrackingBtn.addEventListener("click", () => {
    const target = uiElements.arucoTargetSelect.value;
    startArucoTracking(target);
    uiElements.startArucoTrackingBtn.disabled = true;
    uiElements.stopArucoTrackingBtn.disabled = false;
    uiElements.arucoTargetSelect.disabled = true;
  });

  uiElements.stopArucoTrackingBtn.addEventListener("click", () => {
    stopArucoTracking();
    uiElements.startArucoTrackingBtn.disabled = false;
    uiElements.stopArucoTrackingBtn.disabled = true;
    uiElements.arucoTargetSelect.disabled = false;
  });

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

  // PTZ操作のためのドラッグ状態を管理する変数
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let draggedElement = null;
  
  // 送信すべきPTZコマンドを一時的に保持するオブジェクト
  let ptzCommandQueue = { pan: null, tilt: null, zoom: null };
  // アニメーションループが実行中かどうかを示すフラグ
  let animationFrameId = null;

  // コマンドを定期的に処理して送信するループ関数
  function processPtzCommands() {
    // キューに溜まったコマンドがあれば送信する
    if (ptzCommandQueue.pan !== null) {
      sendPtzCommand('pan', ptzCommandQueue.pan);
      ptzCommandQueue.pan = null; // 送信後にキューを空にする
    }
    if (ptzCommandQueue.tilt !== null) {
      sendPtzCommand('tilt', ptzCommandQueue.tilt);
      ptzCommandQueue.tilt = null;
    }
    if (ptzCommandQueue.zoom !== null) {
        sendPtzCommand('zoom', ptzCommandQueue.zoom);
        ptzCommandQueue.zoom = null;
    }

    // ドラッグが続いていれば、次のフレームでもこの関数を実行するよう予約
    if (isDragging) {
      animationFrameId = requestAnimationFrame(processPtzCommands);
    } else {
      animationFrameId = null; // ドラッグが終わったらループを止める
    }
  }

  const handlePtzOnMouseMove = (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    const caps = getActiveCaps();

    // ここではコマンドを直接送信せず、キューに最新の値を入れるだけ
    if (caps.pan) {
      ptzCommandQueue.pan = getSliderValue('pan') - deltaX * (caps.pan.step / 10);
    }
    if (caps.tilt) {
      ptzCommandQueue.tilt = getSliderValue('tilt') + deltaY * (caps.tilt.step / 10);
    }
  };

  const handlePtzOnWheel = (event) => {
    event.preventDefault();
    const caps = getActiveCaps();

    if (caps.zoom) {
      // ズームも同様にキューに入れる
      const currentZoom = getSliderValue('zoom');
      ptzCommandQueue.zoom = currentZoom - event.deltaY * (caps.zoom.step / 100);
      
      // ホイール操作は連続しない場合があるので、ループが止まっていれば開始する
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(processPtzCommands);
      }
    }
  };

  const startDrag = (event) => {
    if (event.button !== 0) return;
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    draggedElement = event.currentTarget;
    draggedElement.classList.add('dragging');

    // ドラッグを開始したら、コマンド処理ループを開始する
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(processPtzCommands);
    }
  };

  const stopDrag = () => {
    if (isDragging) {
      isDragging = false;
      // ループは processPtzCommands 関数内で自動的に停止する
      if (draggedElement) {
        draggedElement.classList.remove('dragging');
        draggedElement = null;
      }
    }
  };
  
  const setupPtzMouseListeners = (container) => {
    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mousemove', handlePtzOnMouseMove);
    container.addEventListener('wheel', handlePtzOnWheel);
  };

  window.addEventListener('mouseup', stopDrag);
  
  setupPtzMouseListeners(uiElements.remoteVideoContainer1);
  setupPtzMouseListeners(uiElements.remoteVideoContainer2);
}

// =================================================================================
// --- 初期化 (Initialization) ---
// =================================================================================

updateRoleUI(document.querySelector('input[name="role"]:checked').value);
initializeEventListeners();
populateCameraList();

// 評価コントロールのイベントリスナーを設定
const startEvaluationBtn = document.getElementById('startEvaluationBtn');
const stopEvaluationBtn = document.getElementById('stopEvaluationBtn');
const downloadCsvBtn = document.getElementById('downloadCsvBtn');

startEvaluationBtn.addEventListener('click', evaluation.startEvaluation);
stopEvaluationBtn.addEventListener('click', evaluation.stopEvaluation);
downloadCsvBtn.addEventListener('click', evaluation.downloadCSV);