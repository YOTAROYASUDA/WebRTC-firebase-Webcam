// src/aruco-worker.js

// vite.config.jsで設定された 'base' パスを考慮に入れる
importScripts('/WebRTC-firebase-Webcam/opencv.js');

// --- グローバル変数 ---
// OpenCVオブジェクトは一度だけ初期化し、ワーカーが終了するまで再利用する
let detector, src, gray, corners, ids;
// ImageBitmapを処理するためのオフスクリーンキャンバス
let offscreenCanvas, ctx;

/**
 * メインスレッドからのメッセージを処理するリスナー
 */
self.onmessage = (e) => {
    // データが不正な場合は何もしない
    if (!e || !e.data) {
        return;
    }
    const { type, payload } = e.data;

    switch (type) {
        case 'init':
            initializeOpenCV();
            break;
        case 'processFrame':
            processVideoFrame(payload);
            break;
        case 'terminate':
            cleanupAndClose();
            break;
    }
};

/**
 * OpenCVと関連オブジェクトを初期化する
 */
function initializeOpenCV() {
    cv.onRuntimeInitialized = () => {
        // ArUco検出器のセットアップ
        const dictionary = cv.getPredefinedDictionary(cv.DICT_4X4_50);
        const parameters = new cv.aruco_DetectorParameters();
        const refineParameters = new cv.aruco_RefineParameters(10, 3, true);
        detector = new cv.aruco_ArucoDetector(dictionary, parameters, refineParameters);

        // 再利用するMatオブジェクトを生成
        src = new cv.Mat();
        gray = new cv.Mat();
        corners = new cv.MatVector();
        ids = new cv.Mat();
        
        // ImageBitmapをImageDataに変換するための中間キャンバスを作成
        offscreenCanvas = new OffscreenCanvas(1, 1);
        ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
        
        // メインスレッドに準備完了を通知
        self.postMessage({ type: 'ready' });
        console.log("ArUco Worker is ready and stable.");
    };
}

/**
 * ビデオフレームを処理し、マーカーを検出する
 * @param {object} payload - メインスレッドから送られたデータ
 */
function processVideoFrame(payload) {
    if (!detector || !payload || !payload.imageBitmap) {
        return;
    }

    const { imageBitmap } = payload;
    const w = imageBitmap.width;
    const h = imageBitmap.height;

    try {
        // --- 安定化のための修正点 ---
        // 処理ループ内でメモリの解放(delete)は一切行わない。
        // OpenCVの関数が内部で適切にメモリを上書き・管理することを信頼する。

        // 1. Matのサイズがフレームと異なれば、リサイズする
        if (src.cols !== w || src.rows !== h) {
            resizeMats(w, h);
        }

        // 2. ImageBitmapをMatに変換
        ctx.drawImage(imageBitmap, 0, 0, w, h);
        src.data.set(ctx.getImageData(0, 0, w, h).data);

        // 3. グレースケール変換とマーカー検出
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        detector.detectMarkers(gray, corners, ids);
        
        // 4. 検出結果を処理
        let markerData = null;
        if (ids.rows > 0) {
            cv.drawDetectedMarkers(src, corners, ids);
            markerData = {
                ids: Array.from(ids.data32S),
                corners: Array.from(corners.get(0).data32S)
            };
        }

        // 5. 結果をメインスレッドに送信
        const resultImageData = new ImageData(new Uint8ClampedArray(src.data), src.cols, src.rows);
        self.postMessage({ type: 'result', payload: { imageData: resultImageData, markerData } }, [resultImageData.data.buffer]);

    } catch (error) {
        console.error("Error in ArUco worker:", error);
        self.postMessage({ type: 'error', payload: error.toString() });
    } finally {
        // 転送されたImageBitmapは閉じる
        imageBitmap.close();
    }
}

/**
 * Matオブジェクトとキャンバスのサイズを変更する
 * @param {number} width - 新しい幅
 * @param {number} height - 新しい高さ
 */
function resizeMats(width, height) {
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;

    // 既存のMatを解放してから再生成
    if (!src.isDeleted()) src.delete();
    if (!gray.isDeleted()) gray.delete();
    
    src = new cv.Mat(height, width, cv.CV_8UC4);
    gray = new cv.Mat(height, width, cv.CV_8UC1);
}

/**
 * ワーカー終了時にリソースをクリーンアップする
 */
function cleanupAndClose() {
    console.log("Terminating ArUco worker and cleaning up resources.");
    if (src && !src.isDeleted()) src.delete();
    if (gray && !gray.isDeleted()) gray.delete();
    if (corners && !corners.isDeleted()) corners.delete();
    if (ids && !ids.isDeleted()) ids.delete();
    self.close();
}