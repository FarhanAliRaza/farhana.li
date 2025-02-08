import {
	vertexShader as vertexShaderSource,
	fragmentShader as fragmentShaderSource
} from './shaders';

export interface ContainerInfo {
	width: number;
	height: number;
}

export interface DebugOptions {
	localData: boolean;
}

export interface ShapeRendererOptions {
	canvas: HTMLCanvasElement;
	containerInfo: ContainerInfo;
	colorScheme: 'light' | 'dark';
	scroll: number;
	devicePixelRatio: number;
	debug: DebugOptions;
}

export interface GradientColors {
	top: string;
	bottom: string;
}

export class ShapeRenderer {
	private canvas?: HTMLCanvasElement;
	private containerInfo?: ContainerInfo;
	private colorScheme: 'light' | 'dark' = 'light';
	private devicePixelRatio: number = 1;
	private debugOptions: DebugOptions = { localData: false };
	private readonly lightColors: string[] = ['#0083cf', '#3300eb', '#b900d1'];
	private readonly darkColors: string[] = ['#ffd400', '#27b9dd', '#4c00bf', '#b900ce'];
	private gradientColors: GradientColors = { top: '#ffffff', bottom: '#000000' };
	private mouse: [number, number] = [-1000, -1000];
	private scroll: number = 0;

	private shapeChangeTimer?: number = 6000; // Add this line

	private readonly predefinedShapes = new Set([
		'imac',
		'heart',
		'bulb',
		'semicolon',
		'x',
		'greater',
		'curly-brackets',
		'hash',
		'camera',
		'gear'
	]);

	private gl?: WebGLRenderingContext;
	private program?: WebGLProgram;
	private projectionMatrix: number[] = [];
	private currentData?: Float32Array;
	private loadedShapes: string[] = [];
	private shapeDataMap = new Map<string, Float32Array>();
	private animationTimer?: number;
	private buffer?: WebGLBuffer;
	private pointData: Float32Array;
	private startTime: number;
	private previousFrameTime: number;
	private rotationAngle: number = 0;
	private readonly POINT_LIMIT = 10000;
	private jitterArray: Float32Array;
	private temporaryArray: Float32Array;
	private readonly jitterMagnitude = 0.07;
	private readonly dampingFactor = 0.06;
	private readonly baseCycle = 400;
	private readonly amplitude = 1000;

	constructor() {
		this.startTime = performance.now();
		this.previousFrameTime = performance.now();
		this.pointData = new Float32Array(this.POINT_LIMIT * 3);
		this.jitterArray = new Float32Array(this.POINT_LIMIT * 3);
		this.temporaryArray = new Float32Array(this.POINT_LIMIT * 3);
		this.bindMethods();
	}

	private bindMethods() {
		this.render = this.render.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.updateColors = this.updateColors.bind(this);
		this.updatePoints = this.updatePoints.bind(this);
	}

	public async init(options: ShapeRendererOptions) {
		this.canvas = options.canvas;
		this.containerInfo = options.containerInfo;
		this.colorScheme = options.colorScheme;
		this.scroll = options.scroll;
		this.devicePixelRatio = options.devicePixelRatio;
		this.debugOptions = options.debug;

		await this.initWebGL();
		this.handleResize();
		this.startRenderLoop();
		this.startShapeChangeTimer(); // Add this line
	}

	private async initWebGL() {
		if (!this.canvas) throw new Error('Canvas not initialized');

		const gl = this.canvas.getContext('webgl', {
			alpha: true,
			antialias: true
		});

		if (!gl) throw new Error('WebGL not supported');

		this.gl = gl;
		this.setupWebGLContext();
		await this.initShaders();
		await this.loadInitialShape();
	}

	private render() {
		if (!this.gl || !this.currentData) return;

		this.updatePoints();

		// Update buffer with new point positions
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer!);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.pointData, this.gl.DYNAMIC_DRAW);

		// Update uniforms
		if (this.program) {
			const matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix');
			this.gl.uniformMatrix4fv(matrixLocation, false, this.projectionMatrix);
		}

		// Clear and draw
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.drawArrays(this.gl.POINTS, 0, this.POINT_LIMIT);

		// Request next frame
		this.animationTimer = requestAnimationFrame(this.render);
	}

	private frameTime() {
		const deltaTime = (performance.now() - this.previousFrameTime) / 1000;
		this.previousFrameTime = performance.now();
		return [deltaTime, performance.now() - this.startTime];
	}

	private updatePoints() {
		if (!this.currentData) return;

		const [deltaTime, elapsedTime] = this.frameTime();
		this.rotationAngle += 0.22 * deltaTime; // Use exact rotation speed from reference

		const easingFactor = Math.min(2, deltaTime * 8);
		let cosineValue, sineValue;

		if (this.scroll <= 0) {
			cosineValue = Math.cos(this.rotationAngle);
			sineValue = Math.sin(this.rotationAngle);
		} else {
			const adjustment = Math.min(this.scroll, 500) / 100;
			const totalAngle = this.rotationAngle + adjustment;
			cosineValue = Math.cos(totalAngle);
			sineValue = Math.sin(totalAngle);
		}

		for (let i = 0; i < this.currentData.length / 3; i++) {
			const idx = i * 3;
			const deltaX = this.pointData[idx] - this.mouse[0] * 5;
			const deltaY = this.pointData[idx + 1] - this.mouse[1] * 5;
			const distanceSquared = deltaX * deltaX + deltaY * deltaY;

			const currentPoint = [
				this.pointData[idx],
				this.pointData[idx + 1],
				this.pointData[idx + 2] - -7
			];

			const cycle = this.baseCycle + Math.sin(i) * this.amplitude;

			// Update jitter based on time cycles
			if (Math.floor(elapsedTime / cycle) % 2 === 0) {
				this.jitterArray[idx] = Math.pow(Math.random(), 2) * this.jitterMagnitude;
				this.jitterArray[idx + 1] = Math.pow(Math.random(), 2) * this.jitterMagnitude;
				this.jitterArray[idx + 2] = Math.pow(Math.random(), 2) * this.jitterMagnitude;
			}

			// Apply damping exactly as in reference
			this.temporaryArray[idx] +=
				(this.jitterArray[idx] - this.temporaryArray[idx]) * this.dampingFactor;
			this.temporaryArray[idx + 1] +=
				(this.jitterArray[idx + 1] - this.temporaryArray[idx + 1]) * this.dampingFactor;
			this.temporaryArray[idx + 2] +=
				(this.jitterArray[idx + 2] - this.temporaryArray[idx + 2]) * this.dampingFactor;

			// Calculate transformed point with jitter
			const transformedPoint = [
				this.currentData[idx] * cosineValue -
					this.currentData[idx + 2] * sineValue +
					this.temporaryArray[idx],
				this.currentData[idx + 1] + this.temporaryArray[idx + 1],
				this.currentData[idx] * sineValue +
					this.currentData[idx + 2] * cosineValue +
					this.temporaryArray[idx + 2]
			];

			// Match exact interaction behavior from reference
			if (distanceSquared < 1) {
				const distance = Math.sqrt(distanceSquared);
				const influence = (1 - distance) * 0.5;
				this.pointData[idx] += (deltaX / distance) * influence + this.jitterArray[idx] / 2;
				this.pointData[idx + 1] += (deltaY / distance) * influence + this.jitterArray[idx + 1] / 2;
			} else {
				this.pointData[idx] += (transformedPoint[0] - currentPoint[0]) * easingFactor;
				this.pointData[idx + 1] += (transformedPoint[1] - currentPoint[1]) * easingFactor;
				this.pointData[idx + 2] =
					currentPoint[2] + (transformedPoint[2] - currentPoint[2]) * easingFactor - 7;
			}
		}
	}

	private startRenderLoop() {
		if (this.animationTimer) {
			cancelAnimationFrame(this.animationTimer);
		}
		this.render();
	}

	private async loadInitialShape() {
		if (!this.gl) return;

		// Create and bind buffer
		this.buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.pointData, this.gl.DYNAMIC_DRAW);

		// Setup attributes
		if (this.program) {
			const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
			this.gl.enableVertexAttribArray(positionLocation);
			this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
		}

		// Load initial shape data
		await this.loadNewShape();
	}

	private async loadNewShape() {
		// Load actual shape data from dat files
		const shapeName = [...this.predefinedShapes][
			Math.floor(Math.random() * this.predefinedShapes.size)
		];

		if (!this.shapeDataMap.has(shapeName)) {
			try {
				const response = await fetch(`/dat/${shapeName}.dat`);
				if (!response.ok) throw new Error(`Failed to load shape: ${shapeName}`);
				const buffer = await response.arrayBuffer();
				const data = new Float32Array(buffer);
				this.shapeDataMap.set(shapeName, data);
			} catch (error) {
				console.error('Error loading shape:', error);
				return;
			}
		}

		this.currentData = this.shapeDataMap.get(shapeName)!;

		// Apply initial transformation as in reference
		for (let i = 0; i < this.POINT_LIMIT; i++) {
			const idx = i * 3;
			this.pointData[idx] = this.currentData[idx] * 1.4;
			this.pointData[idx + 1] = this.currentData[idx + 1] * 1.4;
			this.pointData[idx + 2] = this.currentData[idx + 2] - 7;
		}
	}

	private handleResize() {
		if (!this.gl || !this.canvas || !this.containerInfo) return;

		this.canvas.width = this.containerInfo.width * this.devicePixelRatio;
		this.canvas.height = this.containerInfo.height * this.devicePixelRatio;

		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

		// Adjusted field of view for better visibility
		const fieldOfView = Math.PI / 3; // Changed from PI/4 for wider view
		const aspect = this.canvas.width / this.canvas.height;
		this.projectionMatrix = this.createPerspectiveMatrix(fieldOfView, aspect, 0.1, 100);
	}

	private createPerspectiveMatrix(
		fieldOfView: number,
		aspect: number,
		near: number,
		far: number
	): number[] {
		const f = 1.0 / Math.tan(fieldOfView / 2);
		const rangeInv = 1 / (near - far);

		// Adjusted projection matrix for better visibility
		return [
			f / aspect,
			0,
			0,
			0,
			0,
			f,
			0,
			0,
			0,
			0,
			(near + far) * rangeInv,
			-1,
			0,
			0,
			near * far * rangeInv * 2,
			0
		];
	}

	private hexToRgb(hex: string): [number, number, number] {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? [
					parseInt(result[1], 16) / 255,
					parseInt(result[2], 16) / 255,
					parseInt(result[3], 16) / 255
				]
			: [0, 0, 0];
	}

	private updateColors() {
		if (!this.gl || !this.program) return;

		const colors = this.colorScheme === 'light' ? this.lightColors : this.darkColors;
		const [topColor, bottomColor] = colors;

		const topColorLocation = this.gl.getUniformLocation(this.program, 'u_color_top');
		const bottomColorLocation = this.gl.getUniformLocation(this.program, 'u_color_bottom');

		this.gl.uniform3fv(topColorLocation, this.hexToRgb(topColor));
		this.gl.uniform3fv(bottomColorLocation, this.hexToRgb(bottomColor));
	}

	public destroy() {
		if (this.animationTimer) {
			cancelAnimationFrame(this.animationTimer);
		}
		if (this.gl) {
			const ext = this.gl.getExtension('WEBGL_lose_context');
			ext?.loseContext();
			this.gl = undefined;
		}
		this.program = undefined;
	}

	public updateContainerInfo(info: ContainerInfo) {
		this.containerInfo = info;
		this.handleResize();
	}

	public setScroll(value: number) {
		this.scroll = value;
	}

	public setMouse(x: number, y: number) {
		this.mouse = [x, y];
	}

	private compileShader(type: number, source: string): WebGLShader {
		if (!this.gl) throw new Error('WebGL context not initialized');
		const shader = this.gl.createShader(type);
		if (!shader) throw new Error('Failed to create shader');
		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);
		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			const error = this.gl.getShaderInfoLog(shader);
			this.gl.deleteShader(shader);
			throw new Error(`Shader compilation error: ${error}`);
		}
		return shader;
	}

	private async initShaders() {
		if (!this.gl) return;
		const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
		const program = this.gl.createProgram();
		if (!program) throw new Error('Unable to create shader program');

		this.gl.attachShader(program, vertexShader);
		this.gl.attachShader(program, fragmentShader);
		this.gl.linkProgram(program);

		if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
			throw new Error('Failed to link shader program: ' + this.gl.getProgramInfoLog(program));
		}

		this.gl.useProgram(program);
		this.program = program;

		// Set initial uniforms
		const zOffsetLocation = this.gl.getUniformLocation(program, 'u_z_offset');
		this.gl.uniform1f(zOffsetLocation, -7.0);

		const scaleLocation = this.gl.getUniformLocation(program, 'u_scale');
		this.gl.uniform1f(scaleLocation, this.devicePixelRatio * 2);

		// Set initial colors
		this.updateColors();
	}

	private setupWebGLContext() {
		if (!this.gl) return;
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.clearColor(0, 0, 0, 0);
		this.gl.enable(this.gl.DEPTH_TEST);
	}

	// Add method to change shapes periodically
	private startShapeChangeTimer() {
		setTimeout(async () => {
			await this.loadNewShape();
			this.startShapeChangeTimer();
		}, this.shapeChangeTimer); // Changed from 6000 to 10000 (10 seconds)
	}
}
