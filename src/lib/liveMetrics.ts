const DEFAULT_ROTATION_WINDOW_MS = 5 * 1000;
const MIN_LIVE_CODERS = 1080;
const MAX_LIVE_CODERS = 1680;

function getNormalizedValue(seed: number) {
  return Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1;
}

export function getRotatingMetricValue(seed: number, min: number, max: number) {
  const normalized = getNormalizedValue(seed);
  return Math.round(min + normalized * (max - min));
}

export function getCurrentMetricWindow(rotationWindowMs = DEFAULT_ROTATION_WINDOW_MS) {
  return Math.floor(Date.now() / rotationWindowMs);
}

export function getSharedLiveCodersCount(windowKey: number) {
  return getRotatingMetricValue(windowKey, MIN_LIVE_CODERS, MAX_LIVE_CODERS);
}

export { DEFAULT_ROTATION_WINDOW_MS };
