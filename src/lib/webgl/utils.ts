/**
 * Utility functions for WebGL and Web Worker support
 */

/**
 * Checks if the browser supports Web Workers
 */
export function isWorkerSupported(): boolean {
  return typeof Worker !== 'undefined';
}

/**
 * Checks if the device is likely a mobile device
 */
export function isMobileDevice(): boolean {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Check for mobile-specific strings in user agent
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  // Check for touch support as an additional indicator
  const hasTouchSupport = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0 || 
                          (navigator as any).msMaxTouchPoints > 0;
  
  return mobileRegex.test(userAgent) || hasTouchSupport;
}

/**
 * Creates a transferable Float32Array that can be sent to a worker
 */
export function createTransferableArray(size: number): Float32Array {
  return new Float32Array(size);
}

/**
 * Detects WebGL support level
 */
export function detectWebGLSupport(): { supported: boolean; version: 1 | 2 | 0 } {
  // Try WebGL 2 first
  let canvas = document.createElement('canvas');
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
  
  try {
    // Try WebGL 2
    gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    if (gl) {
      return { supported: true, version: 2 };
    }
    
    // Fall back to WebGL 1
    gl = (
      canvas.getContext('webgl') as WebGLRenderingContext | null || 
      canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    );
    
    if (gl) {
      return { supported: true, version: 1 };
    }
  } catch (e) {
    // Error occurred, assume not supported
  }
  
  return { supported: false, version: 0 };
}

/**
 * Converts milliseconds to a human-readable duration 
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
}

/**
 * Helper for sending data to worker with proper typing
 */
export function sendToWorker(
  worker: Worker, 
  message: any, 
  transferables?: Transferable[]
): void {
  if (transferables && transferables.length > 0) {
    worker.postMessage(message, transferables);
  } else {
    worker.postMessage(message);
  }
} 