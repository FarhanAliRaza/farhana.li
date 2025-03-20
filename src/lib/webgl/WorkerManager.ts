import type { DebugOptions } from './ShapeRenderer';
import { isWorkerSupported, sendToWorker, isMobileDevice } from './utils';

export class WorkerManager {
  private worker: Worker | null = null;
  private readonly POINT_LIMIT = 10000;
  private pointBuffer: Float32Array;
  private backBuffer: Float32Array;
  private isProcessing = false;
  private debugOptions: DebugOptions;
  private onPointsUpdated: (buffer: Float32Array, rotationAngle: number) => void;
  private workerSupported = false;
  private isMobile = false;

  constructor(
    debugOptions: DebugOptions,
    onPointsUpdated: (buffer: Float32Array, rotationAngle: number) => void
  ) {
    this.debugOptions = debugOptions;
    this.onPointsUpdated = onPointsUpdated;
    this.pointBuffer = new Float32Array(this.POINT_LIMIT * 3);
    this.backBuffer = new Float32Array(this.POINT_LIMIT * 3);
    this.workerSupported = isWorkerSupported();
    this.isMobile = isMobileDevice();
  }

  // Initialize the worker
  public init(
    pointData: Float32Array,
    currentData: Float32Array,
    jitterArray: Float32Array,
    temporaryArray: Float32Array,
    mouse: [number, number],
    scroll: number,
    rotationAngle: number
  ): boolean {
    if (!this.workerSupported) {
      if (this.debugOptions.localData) {
        console.warn('Web Workers not supported in this browser. Using main thread instead.');
      }
      return false;
    }

    // On non-mobile devices, we can skip worker offloading if performance is good
    if (!this.isMobile && !this.debugOptions.localData) {
      if (this.debugOptions.localData) {
        console.info('Non-mobile device detected, using main thread for animation.');
      }
      return false;
    }

    try {
      // Create worker and set up message handler
      this.worker = new Worker(new URL('./animation-worker.ts', import.meta.url), {
        type: 'module'
      });

      this.worker.onmessage = this.handleWorkerMessage.bind(this);

      // Initialize worker with initial state
      sendToWorker(
        this.worker,
        {
          type: 'init',
          data: {
            pointData: pointData.slice(), // Clone to avoid transferring initial buffer
            currentShapeData: currentData.slice(),
            jitterArray: jitterArray.slice(),
            temporaryArray: temporaryArray.slice(),
            mouse,
            scroll,
            rotationAngle,
            elapsedTime: performance.now()
          }
        }
      );

      if (this.debugOptions.localData) {
        console.log('WebGL animation worker initialized successfully');
      }

      return true;
    } catch (err) {
      console.error('Failed to initialize WebGL animation worker:', err);
      return false;
    }
  }

  // Handle messages from the worker
  private handleWorkerMessage(event: MessageEvent): void {
    const data = event.data;

    // Handle point data updates
    if (data.pointData) {
      // Store the updated point data
      this.pointBuffer = data.pointData;
      
      // Call the callback with updated points
      this.onPointsUpdated(this.pointBuffer, data.rotationAngle);
      
      // Mark as not processing anymore
      this.isProcessing = false;
    } else if (data.type === 'shapeReady') {
      // Handle shape data loaded
      this.isProcessing = false;
    }
  }

  // Request a new animation frame calculation
  public updatePoints(mouse: [number, number], scroll: number): void {
    if (!this.worker || this.isProcessing) return;

    // Prepare the back buffer for transfer
    this.backBuffer = new Float32Array(this.POINT_LIMIT * 3);
    
    // Mark as processing to prevent concurrent updates
    this.isProcessing = true;
    
    // Send update request to worker
    sendToWorker(
      this.worker,
      {
        type: 'update',
        data: {
          mouse,
          scroll,
          pointData: this.backBuffer,
          elapsedTime: performance.now()
        }
      },
      [this.backBuffer.buffer]
    );
  }

  // Update with a new shape
  public updateShape(shapeData: Float32Array, pointData: Float32Array): void {
    if (!this.worker || this.isProcessing) return;
    
    this.isProcessing = true;
    
    // Send new shape data to worker
    sendToWorker(
      this.worker,
      {
        type: 'newShape',
        data: {
          shapeData: shapeData.slice(),
          pointData: pointData.slice()
        }
      }
    );
  }

  // Clean up resources
  public destroy(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
} 