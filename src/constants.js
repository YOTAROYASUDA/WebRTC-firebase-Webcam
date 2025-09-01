// =================================================================================
// --- 定数定義 (Constants) ---
// =================================================================================

export const RESOLUTIONS = {
  hd: { width: 1280, height: 720 },
  fhd: { width: 1920, height: 1080 },
  fourK: { width: 3840, height: 2160 },
};

/** WebRTC接続設定 */
export const RTC_CONFIGURATION = {
  iceServers: [
    { urls: "stun:stun.relay.metered.ca:80" },
    { urls: "turn:a.relay.metered.ca:80", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
    { urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
    { urls: "turn:a.relay.metered.ca:443", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
    { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "3c2899b6892a0dd428438fa2", credential: "UjVDP6QSI1bu0yiq" },
  ],
  iceCandidatePoolSize: 10,
};