// src/aruco.js

import * as ptz from './ptz.js';
import * as state from './state.js';
import * as uiElements from './ui-elements.js';

let videoElement;
let canvasOutput;
let processCanvas;
let processCtx;
let trackingActive = false;
let animationFrameId;
let targetCameraName;

// --- PID制御のための設定 (変更なし) ---
const PID_GAINS = {
    pan:  { Kp: 0.01, Ki: -0.01, Kd: -0.3 },
    tilt: { Kp: 0.01, Ki: -0.01, Kd: -0.3 }
};
let panState = { integral: 0, previousError: 0 };
let tiltState = { integral: 0, previousError: 0 };
let lastTime = 0;

let frameCounter = 0;

// --- 再利用するOpenCVオブジェクト ---
let detector, src, gray, rgb, corners, ids;

// OpenCVの初期化が完了したかを管理するPromise
const openCvReadyPromise = new Promise(resolve => {
    cv.onRuntimeInitialized = () => {
        console.log("OpenCV.js is fully initialized and ready.");
        // 検出器などを一度だけ初期化
        const dictionary = cv.getPredefinedDictionary(cv.DICT_4X4_50);
        const parameters = new cv.aruco_DetectorParameters();
        const refineParameters = new cv.aruco_RefineParameters(10, 3, true);
        detector = new cv.aruco_ArucoDetector(dictionary, parameters, refineParameters);
        
        // Matオブジェクトはここで一度生成する
        src = new cv.Mat();
        gray = new cv.Mat();
        rgb = new cv.Mat();
        corners = new cv.MatVector();
        ids = new cv.Mat();

        resolve();
    };
});

/**
 * ArUcoマーカーの追跡を開始する
 */
export async function start(target) {
    if (trackingActive) return;
    
    targetCameraName = target;
    videoElement = target === 'camera1' ? uiElements.localVideo1 : uiElements.localVideo2;

    if (!videoElement || !videoElement.srcObject || videoElement.readyState < 3) {
        alert("対象のローカルビデオストリームが準備できていません。");
        return;
    }
    
    uiElements.arucoTrackingStatus.textContent = "OpenCVを初期化中...";
    await openCvReadyPromise;
    uiElements.arucoTrackingStatus.textContent = "追跡を開始します...";
    
    trackingActive = true;
    
    panState = { integral: 0, previousError: 0 };
    tiltState = { integral: 0, previousError: 0 };
    lastTime = performance.now();
    
    canvasOutput = document.createElement('canvas');
    videoElement.parentElement.appendChild(canvasOutput);
    canvasOutput.style.width = videoElement.clientWidth + 'px';
    canvasOutput.style.height = videoElement.clientHeight + 'px';
    canvasOutput.style.position = 'absolute';
    canvasOutput.style.top = videoElement.offsetTop + 'px';
    canvasOutput.style.left = videoElement.offsetLeft + 'px';
    canvasOutput.style.pointerEvents = 'none';

    processCanvas = document.createElement('canvas');
    processCtx = processCanvas.getContext('2d', { willReadFrequently: true });

    processVideo();
}

/**
 * ビデオフレームを処理し、マーカーを検出して追跡するループ
 */
function processVideo() {
    if (!trackingActive) return;

    try {
        frameCounter++;
        if (frameCounter % 2 !== 0) {
            animationFrameId = requestAnimationFrame(processVideo);
            return;
        }

        const w = videoElement.videoWidth;
        const h = videoElement.videoHeight;
        if (w === 0 || h === 0) {
            animationFrameId = requestAnimationFrame(processVideo);
            return;
        }
        
        // ★★★ 最終修正点：Matオブジェクトのサイズも変更する ★★★
        if (processCanvas.width !== w || processCanvas.height !== h) {
            processCanvas.width = w;
            processCanvas.height = h;
            canvasOutput.width = w;
            canvasOutput.height = h;

            // 既存のMatを解放し、正しいサイズで再生成する
            if (!src.isDeleted()) src.delete();
            if (!gray.isDeleted()) gray.delete();
            if (!rgb.isDeleted()) rgb.delete();

            src = new cv.Mat(h, w, cv.CV_8UC4);
            gray = new cv.Mat(h, w, cv.CV_8UC1);
            rgb = new cv.Mat(h, w, cv.CV_8UC3);
        }

        // ビデオフレームを内部キャンバスに描画し、Matに変換
        processCtx.drawImage(videoElement, 0, 0, w, h);
        const imageData = processCtx.getImageData(0, 0, w, h);
        src.data.set(imageData.data);

        // グレースケール変換とマーカー検出
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        detector.detectMarkers(gray, corners, ids);
        
        if (ids.rows > 0) {
            cv.cvtColor(src, rgb, cv.COLOR_RGBA2RGB);
            cv.drawDetectedMarkers(rgb, corners, ids);
            calculateAndApplyConstraint(corners.get(0), w, h);
            cv.imshow(canvasOutput, rgb);
        } else {
            cv.imshow(canvasOutput, src);
        }

    } catch (error) {
        console.error("ArUco追跡中にエラー:", error);
        uiElements.arucoTrackingStatus.textContent = "エラーが発生しました。";
        stop();
        return;
    }

    animationFrameId = requestAnimationFrame(processVideo);
}

/**
 * PID制御に基づいてPTZコマンドを計算して適用する (変更なし)
 */
function calculateAndApplyConstraint(markerCorners, frameWidth, frameHeight) {
    const now = performance.now();
    const dt = (now - lastTime) / 1000.0;
    lastTime = now;
    
    let centerX = 0;
    let centerY = 0;
    for (let i = 0; i < 4; ++i) {
        centerX += markerCorners.data32S[i * 2];
        centerY += markerCorners.data32S[i * 2 + 1];
    }
    centerX /= 4;
    centerY /= 4;

    const errorX = (centerX - frameWidth / 2) / frameWidth;
    const errorY = (centerY - frameHeight / 2) / frameHeight;

    uiElements.arucoTrackingStatus.textContent = `マーカー検出: (x: ${Math.round(centerX)}, y: ${Math.round(centerY)})`;

    const track = state.videoTracks[targetCameraName];
    if (!track) return;

    const settings = track.getSettings();
    const capabilities = track.getCapabilities();
    
    if (settings.pan !== undefined && capabilities.pan) {
        panState.integral += errorX * dt;
        panState.integral = Math.max(-1, Math.min(1, panState.integral));
        const derivative = (errorX - panState.previousError) / dt;
        panState.previousError = errorX;
        const panAdjustment = (PID_GAINS.pan.Kp * errorX) + (PID_GAINS.pan.Ki * panState.integral) + (PID_GAINS.pan.Kd * derivative);
        const newPan = Math.max(capabilities.pan.min, Math.min(capabilities.pan.max, settings.pan + panAdjustment));
        ptz.applyPtzConstraint(targetCameraName, 'pan', newPan);
    }
    
    if (settings.tilt !== undefined && capabilities.tilt) {
        tiltState.integral += errorY * dt;
        tiltState.integral = Math.max(-1, Math.min(1, tiltState.integral));
        const derivative = (errorY - tiltState.previousError) / dt;
        tiltState.previousError = errorY;
        const tiltAdjustment = (PID_GAINS.tilt.Kp * errorY) + (PID_GAINS.tilt.Ki * tiltState.integral) + (PID_GAINS.tilt.Kd * derivative);
        const newTilt = Math.max(capabilities.tilt.min, Math.min(capabilities.tilt.max, settings.tilt + tiltAdjustment));
        ptz.applyPtzConstraint(targetCameraName, 'tilt', newTilt);
    }
}

/**
 * ArUcoマーカーの追跡を停止する
 */
export function stop() {
    if (!trackingActive) return;
    trackingActive = false;
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    if (canvasOutput) {
        const ctx = canvasOutput.getContext('2d');
        ctx.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
        canvasOutput.remove();
        canvasOutput = null;
    }
    
    processCanvas = null;
    processCtx = null;
    
    uiElements.arucoTrackingStatus.textContent = "停止しました。";
    console.log("ArUco tracking stopped.");
}