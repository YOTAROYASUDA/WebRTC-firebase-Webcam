// ptz.js

import * as state from './state.js';
import * as uiElements from './ui-elements.js';

/**
 * 送信者側で、指定されたカメラにPTZの制約を適用する。
 * @param {string} target - 'camera1' or 'camera2'
 * @param {string} type - 'pan', 'tilt', or 'zoom'
 * @param {number} value - 適用する値
 */
async function applyPtzConstraint(target, type, value) {
  const track = state.videoTracks[target];
  if (document.visibilityState !== 'visible' || !track || track.readyState !== 'live') {
    console.warn(`SENDER: Cannot apply PTZ to ${target}. Page not visible or track not live.`);
    return;
  }
  
  console.log(`SENDER: Applying to ${target} - type: ${type}, value: ${value}`);
  try {
    await track.applyConstraints({ advanced: [{ [type]: value }] });
  } catch (err) {
    console.error(`SENDER: Error applying ${type} constraint to ${target}:`, err);
  }
}

/**
 * 受信者側のPTZコントロールUIを指定されたカメラの機能で更新する。
 * @param {string} target - 'camera1' or 'camera2'
 */
export function updateReceiverPtzControls(target) {
  console.log(`RECEIVER: Updating PTZ controls for ${target}`);
  state.setActivePtzTarget(target);
  const capabilities = state.ptzCapabilities[target];

  ['zoom', 'pan', 'tilt'].forEach(type => {
    const isSupported = !!(capabilities && capabilities[type]);
    const slider = document.getElementById(`${type}Slider`);
    const valueDisplay = document.getElementById(`${type}Value`);
    
    document.querySelectorAll(`button[id$="${type.charAt(0).toUpperCase() + type.slice(1)}Btn"]`).forEach(btn => btn.disabled = !isSupported);
    if(slider) slider.disabled = !isSupported;

    if (isSupported) {
      const { min, max, step } = capabilities[type];
      slider.min = min;
      slider.max = max;
      slider.step = step;
      const currentValue = parseFloat(slider.value);
      slider.value = Math.max(min, Math.min(max, currentValue));
      valueDisplay.textContent = parseFloat(slider.value).toFixed(2);
    } else if (valueDisplay) {
      valueDisplay.textContent = 'N/A';
    }
  });
}

/**
 * 受信者側からPTZコマンドを送信する。
 * @param {string} type - 'pan', 'tilt', or 'zoom'
 * @param {number} value - 送信する値
 */
export function sendPtzCommand(type, value) {
  const target = state.activePtzTarget;
  const capabilities = state.ptzCapabilities[target];
  
  if (state.peerConnection?.connectionState !== 'connected' || state.ptzChannel?.readyState !== 'open') {
    console.warn(`RECEIVER: Cannot send command. Connection not ready.`);
    return;
  }
  if (!capabilities || !capabilities[type]) {
    console.warn(`RECEIVER: PTZ type '${type}' is not supported for ${target}.`);
    return;
  }

  const { min, max } = capabilities[type];
  const clampedValue = Math.max(min, Math.min(max, value));
  const command = { type: 'command', target, command: type, value: clampedValue };
  
  try {
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
    const channel = state.peerConnection.createDataChannel('ptz');
    state.setPtzChannel(channel);
    
    channel.onopen = () => {
        console.log("SENDER: DataChannel is open. Sending capabilities...");
        const caps = {
            camera1: state.videoTracks.camera1.getCapabilities(),
            camera2: state.videoTracks.camera2.getCapabilities()
        };
        const ptzCaps = {
            camera1: { zoom: caps.camera1.zoom, pan: caps.camera1.pan, tilt: caps.camera1.tilt },
            camera2: { zoom: caps.camera2.zoom, pan: caps.camera2.pan, tilt: caps.camera2.tilt }
        };
        channel.send(JSON.stringify({ type: 'capabilities', data: ptzCaps }));
    };
    
    channel.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === 'command' && state.videoTracks[msg.target]) {
            applyPtzConstraint(msg.target, msg.command, msg.value);
        }
    };
    
    channel.onclose = () => console.log("SENDER: DataChannel is closed.");
    channel.onerror = (error) => console.error("SENDER: DataChannel error:", error);
}

/**
 * 受信者側でデータチャネルイベントを処理する。
 * @param {RTCDataChannelEvent} event 
 */
export function handleReceiverDataChannel(event) {
    if (event.channel.label !== 'ptz') return;
    
    const channel = event.channel;
    state.setPtzChannel(channel);
    
    channel.onopen = () => console.log("RECEIVER: DataChannel is open.");
    channel.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.type === 'capabilities') {
            state.setPtzCapabilities(msg.data);
            uiElements.ptzControls.style.display = 'block';
            updateReceiverPtzControls(state.activePtzTarget);
        }
    };
    channel.onclose = () => {
        uiElements.ptzControls.style.display = 'none';
    };
    channel.onerror = (error) => console.error("RECEIVER: DataChannel error:", error);
}