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
    // Verify we have valid data before proceeding
    if (!pointData || pointData.length === 0 || !currentData || currentData.length === 0) {
      return false;
    }
    
    // Set our initial buffer to ensure we have valid data to work with later
    this.pointBuffer = new Float32Array(pointData);
    
    if (!this.workerSupported) {
      return false;
    }

    // On non-mobile devices, we can skip worker offloading if performance is good
    if (!this.isMobile && !this.debugOptions.localData) {
      return false;
    }

    try {
      // Create worker and set up message handler
      this.worker = new Worker(new URL('./animation-worker.ts', import.meta.url), {
        type: 'module'
      });

      this.worker.onmessage = this.handleWorkerMessage.bind(this);
      this.worker.onerror = (error) => {
        this.worker = null;
        return false;
      };
      
      // Clone all data to ensure we don't transfer the originals
      const pointDataCopy = new Float32Array(pointData); 
      const currentDataCopy = new Float32Array(currentData);
      const jitterArrayCopy = new Float32Array(jitterArray);
      const temporaryArrayCopy = new Float32Array(temporaryArray);
      
      // Initialize worker with initial state
      sendToWorker(
        this.worker,
        {
          type: 'init',
          data: {
            pointData: pointDataCopy,
            currentShapeData: currentDataCopy,
            jitterArray: jitterArrayCopy,
            temporaryArray: temporaryArrayCopy,
            mouse,
            scroll,
            rotationAngle,
            elapsedTime: performance.now()
          }
        }
      );

      return true;
    } catch (err) {
      return false;
    }
  }

  // Handle messages from the worker
  private handleWorkerMessage(event: MessageEvent): void {
    const data = event.data;

    // Handle error messages from worker
    if (data.type === 'error') {
      this.isProcessing = false;
      return;
    }
    
    // Handle initialization complete
    if (data.type === 'initComplete') {
      this.isProcessing = false;
      return;
    }
    
    // Handle point data updates
    if (data.pointData) {
      // Verify the point data is valid
      if (data.pointData.length === 0) {
        this.isProcessing = false;
        return;
      }
      
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
    if (!this.worker || this.isProcessing) {
      return;
    }

    // Check if our buffers are valid
    if (this.pointBuffer.length === 0) {
      return;
    }

    // Create a new back buffer with a copy of the current point data
    // This ensures the worker has valid data to start with
    this.backBuffer = new Float32Array(this.POINT_LIMIT * 3);
    
    // If we have valid point data, copy it to the back buffer
    if (this.pointBuffer.length > 0) {
      this.backBuffer.set(this.pointBuffer);
    }
    
    // Mark as processing to prevent concurrent updates
    this.isProcessing = true;
    
    // Send update request to worker
    try {
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
    } catch (err) {
      this.isProcessing = false;
    }
  }

  // Update with a new shape
  public updateShape(shapeData: Float32Array, pointData: Float32Array): void {
    if (!this.worker || this.isProcessing) {
      return;
    }
    
    this.isProcessing = true;
    
    // Send new shape data to worker
    try {
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
    } catch (err) {
      this.isProcessing = false;
    }
  }

  // Clean up resources
  public destroy(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
} 