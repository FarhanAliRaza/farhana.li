// TypeScript declarations for Web Workers in our application

// Extend the Worker interface for TypeScript
interface WorkerGlobalScope {
  // Add proper typing for postMessage in a worker context
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any): void;
}

// Ensure self has the right type in worker context
declare var self: WorkerGlobalScope; 