// src/aruco.js

import * as ptz from './ptz.js';
import * as state from './state.js';
import * as uiElements from './ui-elements.js';

let videoElement;
let canvasOutput; // ユーザーに見せるためのCanvas
let processCanvas; // 処理用の非表示Canvas
let processCtx; // 処理用CanvasのContext
let trackingActive = false;
let animationFrameId;
let targetCameraName; // 'camera1' or 'camera2'

// OpenCV objects
let detector;

// ★★★ 修正点：追跡感度を調整するための定数を追加 ★★★
const MOVEMENT_SENSITIVITY = 0.01; // この値を大きくすると速く、小さくすると遅くなる

const PID_GAINS = {
    pan: { Kp: 0.3 }, // 水平方向の向きを反転（-1で固定）
    tilt: { Kp: -0.3 }  // 垂直方向の向きを反転（-1で固定）
};

// --- OpenCV 初期化管理 ---
const openCvReadyPromise = new Promise(resolve => {
    // この関数は、index.htmlでopencv.jsが読み込まれた後に自動で設定される
    cv.onRuntimeInitialized = () => {
        console.log("OpenCV.js is fully initialized and ready.");
        resolve();
    };
});
// --- ここまで ---


/**
 * ArUcoマーカーの追跡を開始する
 * @param {string} target - 'camera1' or 'camera2'
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
    
    // --- Canvasのセットアップ ---
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
    // --- ここまで ---

    const dictionary = cv.getPredefinedDictionary(cv.DICT_4X4_50);
    const parameters = new cv.aruco_DetectorParameters();
    const refineParameters = new cv.aruco_RefineParameters(10, 3, true);
    detector = new cv.aruco_ArucoDetector(dictionary, parameters, refineParameters);

    processVideo();
}

/**
 * ビデオフレームを処理し、マーカーを検出して追跡するループ
 */
function processVideo() {
    if (!trackingActive) return;

    let src, gray, rgb;
    const corners = new cv.MatVector();
    const ids = new cv.Mat();

    try {
        const w = videoElement.videoWidth;
        const h = videoElement.videoHeight;
        if (w === 0 || h === 0) {
            animationFrameId = requestAnimationFrame(processVideo);
            return;
        }
        if (processCanvas.width !== w || processCanvas.height !== h) {
            processCanvas.width = w;
            processCanvas.height = h;
        }

        processCtx.drawImage(videoElement, 0, 0, w, h);
        const imageData = processCtx.getImageData(0, 0, w, h);
        src = cv.matFromImageData(imageData);
        gray = new cv.Mat();
        rgb = new cv.Mat();

        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        detector.detectMarkers(gray, corners, ids);
        
        if (ids.rows > 0) {
            cv.cvtColor(src, rgb, cv.COLOR_RGBA2RGB);
            cv.drawDetectedMarkers(rgb, corners, ids);
            calculateAndApplyConstraint(corners.get(0), w, h);
        }

        cv.imshow(canvasOutput, ids.rows > 0 ? rgb : src);

    } catch (error) {
        console.error("ArUco追跡中にエラー:", error);
        uiElements.arucoTrackingStatus.textContent = "エラーが発生しました。";
        stop();
        return;
    } finally {
        if (src) src.delete();
        if (gray) gray.delete();
        if (rgb) rgb.delete();
        corners.delete();
        ids.delete();
    }

    animationFrameId = requestAnimationFrame(processVideo);
}

/**
 * マーカー位置からPTZコマンドを計算して適用する
 * @param {cv.Mat} markerCorners - 検出されたマーカーの角の座標
 * @param {number} frameWidth - フレームの幅
 * @param {number} frameHeight - フレームの高さ
 */
function calculateAndApplyConstraint(markerCorners, frameWidth, frameHeight) {
    let centerX = 0;
    let centerY = 0;
    for (let i = 0; i < 4; ++i) {
        centerX += markerCorners.data32S[i * 2];
        centerY += markerCorners.data32S[i * 2 + 1];
    }
    centerX /= 4;
    centerY /= 4;

    const errorX = centerX - frameWidth / 2;
    const errorY = centerY - frameHeight / 2;
    
    uiElements.arucoTrackingStatus.textContent = `マーカー検出: (x: ${Math.round(centerX)}, y: ${Math.round(centerY)})`;

    const track = state.videoTracks[targetCameraName];
    if (!track) return;

    const settings = track.getSettings();
    const capabilities = track.getCapabilities();

    if (settings.pan !== undefined && capabilities.pan) {
        // ★★★ 修正点：計算式を変更 ★★★
        const panAdjustment = PID_GAINS.pan.Kp * (errorX / frameWidth) * MOVEMENT_SENSITIVITY;
        const newPan = Math.max(capabilities.pan.min, Math.min(capabilities.pan.max, settings.pan + panAdjustment));
        ptz.applyPtzConstraint(targetCameraName, 'pan', newPan);
    }
    if (settings.tilt !== undefined && capabilities.tilt) {
        // ★★★ 修正点：計算式を変更 ★★★
        const tiltAdjustment = PID_GAINS.tilt.Kp * (errorY / frameHeight) * MOVEMENT_SENSITIVITY;
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
        canvasOutput.remove();
        canvasOutput = null;
    }
    
    processCanvas = null;
    processCtx = null;
    
    if (detector) {
        detector.delete();
        detector = null;
    }

    uiElements.arucoTrackingStatus.textContent = "停止しました。";
    console.log("ArUco tracking stopped.");
}