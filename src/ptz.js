// ptz.js

import * as state from './state.js';
import * as uiElements from './ui-elements.js';

/**
 * 送信者側で、カメラにPTZの制約を適用する。
 * @param {string} type - 'pan', 'tilt', or 'zoom'
 * @param {number} value - 適用する値
 */
async function applyPtzConstraint(type, value) {
  if (document.visibilityState !== 'visible') {
    console.warn(`SENDER: Page is not visible. Skipping PTZ command to prevent SecurityError.`);
    return;
  }
  if (!state.videoTrack || state.videoTrack.readyState !== 'live') {
    console.warn("SENDER: videoTrack is not available to apply PTZ constraints.");
    return;
  }
  
  console.log(`SENDER: Applying constraint - type: ${type}, value: ${value}`);
  try {
    await state.videoTrack.applyConstraints({ advanced: [{ [type]: value }] });
  } catch (err) {
    console.error(`SENDER: Error applying ${type} constraint:`, err);
  }
}

/**
 * 受信者側でPTZコントロールUIをセットアップする。
 * @param {object} capabilities - カメラから送られてきたPTZ機能
 */
function setupReceiverPtzControls(capabilities) {
  console.log("RECEIVER: Setting up PTZ controls with capabilities:", capabilities);
  state.setPtzCapabilities(capabilities);

  ['zoom', 'pan', 'tilt'].forEach(type => {
    const isSupported = !!state.ptzCapabilities[type];
    const slider = document.getElementById(`${type}Slider`);
    const valueDisplay = document.getElementById(`${type}Value`);
    
    document.querySelectorAll(`button[id$="${type.charAt(0).toUpperCase() + type.slice(1)}Btn"]`).forEach(btn => btn.disabled = !isSupported);
    if(slider) slider.disabled = !isSupported;

    if (isSupported) {
      const { min, max, step } = state.ptzCapabilities[type];
      slider.min = min;
      slider.max = max;
      slider.step = step;
      // パンとチルトは中央を初期値にする
      const initialValue = (type === 'pan' || type === 'tilt') && min < 0 && max > 0 ? 0 : min;
      slider.value = initialValue;
      valueDisplay.textContent = parseFloat(initialValue).toFixed(2);
    }
  });
}

/**
 * 受信者側からPTZコマンドを送信する。
 * @param {string} type - 'pan', 'tilt', or 'zoom'
 * @param {number} value - 送信する値
 */
export function sendPtzCommand(type, value) {
  if (state.peerConnection?.connectionState !== 'connected' || state.ptzChannel?.readyState !== 'open') {
    console.warn(`RECEIVER: Cannot send command. Connection state: ${state.peerConnection?.connectionState}, DataChannel state: ${state.ptzChannel?.readyState}`);
    return;
  }
  if (!state.ptzCapabilities[type]) {
    console.warn(`RECEIVER: PTZ type '${type}' is not supported.`);
    return;
  }

  const { min, max } = state.ptzCapabilities[type];
  const clampedValue = Math.max(min, Math.min(max, value));
  const command = { type: 'command', command: type, value: clampedValue };
  
  try {
    console.log("RECEIVER: Sending command:", command);
    state.ptzChannel.send(JSON.stringify(command));
    document.getElementById(`${type}Slider`).value = clampedValue;
    document.getElementById(`${type}Value`).textContent = clampedValue.toFixed(2);
  } catch (e) {
    console.error("RECEIVER: Error sending command via DataChannel:", e);
  }
}

/**
 * 送信者側でPTZコントロール用のデータチャネルを設定する。
 */
export function setupPtzDataChannel() {
    console.log("SENDER: Creating DataChannel 'ptz'...");
    const channel = state.peerConnection.createDataChannel('ptz');
    state.setPtzChannel(channel);
    
    state.ptzChannel.onopen = () => {
        console.log("SENDER: DataChannel is open. Sending capabilities...");
        const capabilities = state.videoTrack.getCapabilities();
        const caps = {
            zoom: capabilities.zoom || null,
            pan: capabilities.pan || null,
            tilt: capabilities.tilt || null,
        };
        state.setPtzCapabilities(caps);
        console.log("SENDER: Sending capabilities:", state.ptzCapabilities);
        state.ptzChannel.send(JSON.stringify({ type: 'capabilities', data: state.ptzCapabilities }));
    };
    
    state.ptzChannel.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log("SENDER: Received command:", msg);
        if (msg.type === 'command' && state.videoTrack) {
            applyPtzConstraint(msg.command, msg.value);
        }
    };
    
    state.ptzChannel.onclose = () => console.log("SENDER: DataChannel is closed.");
    state.ptzChannel.onerror = (error) => console.error("SENDER: DataChannel error:", error);
}

/**
 * 受信者側でデータチャネルイベントを処理する。
 * @param {RTCDataChannelEvent} event 
 */
export function handleReceiverDataChannel(event) {
    console.log(`RECEIVER: ondatachannel event fired. Channel label: '${event.channel.label}'`);
    if (event.channel.label === 'ptz') {
        state.setPtzChannel(event.channel);
        state.ptzChannel.onopen = () => console.log("RECEIVER: DataChannel is open.");
        state.ptzChannel.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            console.log("RECEIVER: Received message:", msg);
            if (msg.type === 'capabilities') {
                setupReceiverPtzControls(msg.data);
                uiElements.ptzControls.style.display = 'block';
            }
        };
        state.ptzChannel.onclose = () => {
            console.log("RECEIVER: DataChannel is closed.");
            uiElements.ptzControls.style.display = 'none';
        };
        state.ptzChannel.onerror = (error) => console.error("RECEIVER: DataChannel error:", error);
    }
}