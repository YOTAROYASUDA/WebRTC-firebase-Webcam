// src/aruco.js

import * as ptz from './ptz.js';
import * as state from './state.js';
import * as uiElements from './ui-elements.js';
import * as evaluation from './evaluation.js'; // 評価機能のインポート

// 処理解像度の幅（高さはアスペクト比を維持して自動計算）
const PROCESSING_RESOLUTION_WIDTH = 320;

// 何フレームごとにマーカー検出処理を行うかの間隔
const FRAME_PROCESSING_INTERVAL = 4;

// 評価データを何回の検出ごとに記録するかの間隔。
const LOG_INTERVAL = 5; 

let videoElement;
let canvasOutput;
let processCanvas;
let processCtx;
let trackingActive = false;
let animationFrameId;
let targetCameraName;

// ゲイン設定
const PID_GAINS = {
    pan:  { Kp: 84000, Ki: 0, Kd: 0 },
    tilt: { Kp: -85000, Ki: 0, Kd: 0}
};
let panState = { integral: 0, previousError: 0 };
let tiltState = { integral: 0, previousError: 0 };
let lastTime = 0;

let frameCounter = 0;
let logCounter = 0; // 評価ログ用のカウンター

let detector, src, gray, rgb, corners, ids;

// OpenCV.jsの初期化完了を待つPromise
const openCvReadyPromise = new Promise(resolve => {
    cv.onRuntimeInitialized = () => {
        console.log("OpenCV.js is fully initialized and ready.");
        const dictionary = cv.getPredefinedDictionary(cv.DICT_4X4_50);
        const parameters = new cv.aruco_DetectorParameters();
        const refineParameters = new cv.aruco_RefineParameters(10, 3, true);
        detector = new cv.aruco_ArucoDetector(dictionary, parameters, refineParameters);
        
        src = new cv.Mat();
        gray = new cv.Mat();
        rgb = new cv.Mat();
        corners = new cv.MatVector();
        ids = new cv.Mat();

        resolve();
    };
});

// OpenCV.jsの初期化を開始
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
    frameCounter = 0; // カウンターをリセット
    logCounter = 0;
    
    canvasOutput = document.createElement('canvas');
    videoElement.parentElement.appendChild(canvasOutput);
    canvasOutput.style.position = 'absolute';
    canvasOutput.style.pointerEvents = 'none';

    processCanvas = document.createElement('canvas');
    processCtx = processCanvas.getContext('2d', { willReadFrequently: true });

    processVideo();
}

// メインの処理ループ
function processVideo() {
    if (!trackingActive) {
        animationFrameId = requestAnimationFrame(processVideo);
        return;
    }

    try {
        // 指定した間隔のフレームでない場合は、処理をスキップ
        frameCounter++;
        if (frameCounter % FRAME_PROCESSING_INTERVAL !== 0) {
            animationFrameId = requestAnimationFrame(processVideo);
            return;
        }

        const originalWidth = videoElement.videoWidth;
        const originalHeight = videoElement.videoHeight;
        if (originalWidth === 0 || originalHeight === 0) {
            animationFrameId = requestAnimationFrame(processVideo);
            return;
        }

        // 処理解像度を計算
        const scale = PROCESSING_RESOLUTION_WIDTH / originalWidth;
        const processWidth = PROCESSING_RESOLUTION_WIDTH;
        const processHeight = Math.round(originalHeight * scale);

        // 処理用キャンバスのサイズを設定
        if (processCanvas.width !== processWidth || processCanvas.height !== processHeight) {
            processCanvas.width = processWidth;
            processCanvas.height = processHeight;
        }
        
        // オーバーレイ用キャンバスのサイズは元のビデオ表示サイズに合わせる
        if (canvasOutput.width !== originalWidth || canvasOutput.height !== originalHeight) {
             canvasOutput.width = originalWidth;
             canvasOutput.height = originalHeight;
             canvasOutput.style.width = videoElement.clientWidth + 'px';
             canvasOutput.style.height = videoElement.clientHeight + 'px';
             canvasOutput.style.top = videoElement.offsetTop + 'px';
             canvasOutput.style.left = videoElement.offsetLeft + 'px';
        }

        // ビデオフレームを"縮小して"内部キャンバスに描画
        processCtx.drawImage(videoElement, 0, 0, processWidth, processHeight);

        // Matオブジェクトのサイズも処理用に合わせる
        if (src.cols !== processWidth || src.rows !== processHeight) {
            if (!src.isDeleted()) src.delete();
            if (!gray.isDeleted()) gray.delete();
            if (!rgb.isDeleted()) rgb.delete();

            src = new cv.Mat(processHeight, processWidth, cv.CV_8UC4);
            gray = new cv.Mat(processHeight, processWidth, cv.CV_8UC1);
            rgb = new cv.Mat(processHeight, processWidth, cv.CV_8UC3);
        }

        const imageData = processCtx.getImageData(0, 0, processWidth, processHeight);
        src.data.set(imageData.data);

        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        detector.detectMarkers(gray, corners, ids);
        
        // 評価ログを記録するかどうかの判定
        logCounter++;
        const shouldLog = logCounter % LOG_INTERVAL === 0;

        const outputCtx = canvasOutput.getContext('2d');
        outputCtx.clearRect(0, 0, canvasOutput.width, canvasOutput.height); // 描画前にクリア

        if (ids.rows > 0) {
            // PTZ制御と評価データ計算
            const evalData = calculateAndApplyConstraint(corners.get(0), processWidth, processHeight);
            if (shouldLog) {
                evaluation.logData({ detected: 1, ...evalData });
            }

            // マーカーの枠を描画する
            const cornerPoints = corners.get(0).data32F;
            outputCtx.strokeStyle = 'red';
            outputCtx.lineWidth = 3;
            outputCtx.beginPath();
            // 座標を元の解像度スケールに戻して描画
            outputCtx.moveTo(cornerPoints[0] / scale, cornerPoints[1] / scale);
            for (let i = 2; i < cornerPoints.length; i += 2) {
                outputCtx.lineTo(cornerPoints[i] / scale, cornerPoints[i+1] / scale);
            }
            outputCtx.closePath();
            outputCtx.stroke();

        } else {
            if (shouldLog) {
                evaluation.logData({ 
                    detected: 0, markerX: null, markerY: null, errorX: null, errorY: null, 
                    panAdjustment: null, tiltAdjustment: null 
                });
            }
        }

    } catch (error) {
        console.error("ArUco追跡中にエラー:", error);
        uiElements.arucoTrackingStatus.textContent = "エラーが発生しました。";
        stop();
    }

    animationFrameId = requestAnimationFrame(processVideo);
}

// PTZ制御の計算と適用
function calculateAndApplyConstraint(markerCorners, frameWidth, frameHeight) {
    const now = performance.now();
    const dt = (now - lastTime) / 1000.0;
    lastTime = now;
    
    let centerX = 0;
    let centerY = 0;
    for (let i = 0; i < 4; ++i) {
        centerX += markerCorners.data32F[i * 2];
        centerY += markerCorners.data32F[i * 2 + 1];
    }
    centerX /= 4;
    centerY /= 4;

    const errorX = (centerX - frameWidth / 2) / frameWidth;
    const errorY = (centerY - frameHeight / 2) / frameHeight;

    uiElements.arucoTrackingStatus.textContent = `マーカー検出: (x: ${Math.round(centerX)}, y: ${Math.round(centerY)})`;

    const track = state.videoTracks[targetCameraName];
    if (!track) return null;

    const settings = track.getSettings();
    const capabilities = track.getCapabilities();
    
    let panAdjustment = 0;
    let tiltAdjustment = 0;

    if (settings.pan !== undefined && capabilities.pan) {
        panState.integral = Math.max(-1, Math.min(1, panState.integral + errorX * dt));
        const derivative = (errorX - panState.previousError) / dt;
        panState.previousError = errorX;
        panAdjustment = (PID_GAINS.pan.Kp * errorX) + (PID_GAINS.pan.Ki * panState.integral) + (PID_GAINS.pan.Kd * derivative);
        const newPan = Math.max(capabilities.pan.min, Math.min(capabilities.pan.max, settings.pan + panAdjustment));
        ptz.applyPtzConstraint(targetCameraName, 'pan', newPan);
    }
    
    if (settings.tilt !== undefined && capabilities.tilt) {
        tiltState.integral = Math.max(-1, Math.min(1, tiltState.integral + errorY * dt));
        const derivative = (errorY - tiltState.previousError) / dt;
        tiltState.previousError = errorY;
        tiltAdjustment = (PID_GAINS.tilt.Kp * errorY) + (PID_GAINS.tilt.Ki * tiltState.integral) + (PID_GAINS.tilt.Kd * derivative);
        const newTilt = Math.max(capabilities.tilt.min, Math.min(capabilities.tilt.max, settings.tilt + tiltAdjustment));
        ptz.applyPtzConstraint(targetCameraName, 'tilt', newTilt);
    }
    
    return {
        markerX: centerX, markerY: centerY, errorX, errorY, panAdjustment, tiltAdjustment
    };
}

// PTZ制御と評価データ計算
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