// WebGL animation worker
// Handles point calculations and shape transformations

interface WorkerData {
  pointData: Float32Array;
  currentShapeData: Float32Array;
  jitterArray: Float32Array;
  temporaryArray: Float32Array;
  mouse: [number, number];
  scroll: number;
  rotationAngle: number;
  elapsedTime: number;
}

interface WorkerMessage {
  type: 'init' | 'update' | 'newShape';
  data: any;
}

// Animation constants
const JITTER_MAGNITUDE = 0.07;
const DAMPING_FACTOR = 0.06;
const BASE_CYCLE = 400;
const AMPLITUDE = 1000;

// Worker state
let state: WorkerData | null = null;
let lastFrameTime = 0;

// Handle messages from main thread
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const message = event.data;

  switch (message.type) {
    case 'init':
      // Initialize worker state
      state = {
        pointData: message.data.pointData,
        currentShapeData: message.data.currentShapeData,
        jitterArray: message.data.jitterArray,
        temporaryArray: message.data.temporaryArray,
        mouse: message.data.mouse,
        scroll: message.data.scroll,
        rotationAngle: message.data.rotationAngle,
        elapsedTime: message.data.elapsedTime
      };
      lastFrameTime = performance.now();
      break;

    case 'update':
      // Update state with new inputs
      if (!state) return;
      
      const deltaTime = (performance.now() - lastFrameTime) / 1000;
      lastFrameTime = performance.now();
      
      // Update with data from main thread
      state.mouse = message.data.mouse;
      state.scroll = message.data.scroll;
      state.elapsedTime = message.data.elapsedTime || state.elapsedTime + deltaTime * 1000;
      
      // Process animation step
      updatePoints(deltaTime);
      
      // Send updated point data back to main thread
      const result = {
        pointData: state.pointData,
        rotationAngle: state.rotationAngle
      };
      
      // Use transferable objects to avoid copying the buffer
      const transferList: Transferable[] = [state.pointData.buffer];
      self.postMessage(result, transferList);
      
      // Lost reference to buffer due to transfer, need to update reference
      state.pointData = new Float32Array(0); // Initialize with empty array
      break;

    case 'newShape':
      // Update shape data
      if (!state) return;
      
      state.currentShapeData = message.data.shapeData;
      state.pointData = message.data.pointData;
      
      // Reset animation state
      state.jitterArray = new Float32Array(state.pointData.length);
      state.temporaryArray = new Float32Array(state.pointData.length);
      
      self.postMessage({ type: 'shapeReady' });
      break;
  }
};

function updatePoints(deltaTime: number): void {
  if (!state) return;

  // Increment rotation angle
  state.rotationAngle += 0.22 * deltaTime;

  const easingFactor = Math.min(2, deltaTime * 8);
  let cosineValue, sineValue;

  if (state.scroll <= 0) {
    cosineValue = Math.cos(state.rotationAngle);
    sineValue = Math.sin(state.rotationAngle);
  } else {
    const adjustment = Math.min(state.scroll, 500) / 100;
    const totalAngle = state.rotationAngle + adjustment;
    cosineValue = Math.cos(totalAngle);
    sineValue = Math.sin(totalAngle);
  }

  for (let i = 0; i < state.currentShapeData.length / 3; i++) {
    const idx = i * 3;
    const deltaX = state.pointData[idx] - state.mouse[0] * 5;
    const deltaY = state.pointData[idx + 1] - state.mouse[1] * 5;
    const distanceSquared = deltaX * deltaX + deltaY * deltaY;

    const currentPoint = [
      state.pointData[idx],
      state.pointData[idx + 1],
      state.pointData[idx + 2] - -7
    ];

    const cycle = BASE_CYCLE + Math.sin(i) * AMPLITUDE;

    // Update jitter based on time cycles
    if (Math.floor(state.elapsedTime / cycle) % 2 === 0) {
      state.jitterArray[idx] = Math.pow(Math.random(), 2) * JITTER_MAGNITUDE;
      state.jitterArray[idx + 1] = Math.pow(Math.random(), 2) * JITTER_MAGNITUDE;
      state.jitterArray[idx + 2] = Math.pow(Math.random(), 2) * JITTER_MAGNITUDE;
    }

    // Apply damping
    state.temporaryArray[idx] +=
      (state.jitterArray[idx] - state.temporaryArray[idx]) * DAMPING_FACTOR;
    state.temporaryArray[idx + 1] +=
      (state.jitterArray[idx + 1] - state.temporaryArray[idx + 1]) * DAMPING_FACTOR;
    state.temporaryArray[idx + 2] +=
      (state.jitterArray[idx + 2] - state.temporaryArray[idx + 2]) * DAMPING_FACTOR;

    // Calculate transformed point with jitter
    const transformedPoint = [
      state.currentShapeData[idx] * cosineValue -
        state.currentShapeData[idx + 2] * sineValue +
        state.temporaryArray[idx],
      state.currentShapeData[idx + 1] + state.temporaryArray[idx + 1],
      state.currentShapeData[idx] * sineValue +
        state.currentShapeData[idx + 2] * cosineValue +
        state.temporaryArray[idx + 2]
    ];

    // Match interaction behavior
    if (distanceSquared < 1) {
      const distance = Math.sqrt(distanceSquared);
      const influence = (1 - distance) * 0.5;
      state.pointData[idx] += (deltaX / distance) * influence + state.jitterArray[idx] / 2;
      state.pointData[idx + 1] += (deltaY / distance) * influence + state.jitterArray[idx + 1] / 2;
    } else {
      state.pointData[idx] += (transformedPoint[0] - currentPoint[0]) * easingFactor;
      state.pointData[idx + 1] += (transformedPoint[1] - currentPoint[1]) * easingFactor;
      state.pointData[idx + 2] =
        currentPoint[2] + (transformedPoint[2] - currentPoint[2]) * easingFactor - 7;
    }
  }
} 