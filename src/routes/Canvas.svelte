<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let { container }: { container: HTMLDivElement } = $props();
	// Local file data path
	const localDataPath = 'dat/';

	// WebGL implementation
	const defineProperty = Object.defineProperty;
	// @ts-ignore
	const throwTypeError = (message) => {
		throw TypeError(message);
	};
	// @ts-ignore
	const defineOrAssign = (obj, key, value) =>
		key in obj
			? defineProperty(obj, key, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				})
			: (obj[key] = value);
	// @ts-ignore
	const defineOrAssignStringKey = (obj, key, value) =>
		defineOrAssign(obj, typeof key != 'symbol' ? key + '' : key, value);
	// @ts-ignore
	const ensureHas = (obj, collection, action) =>
		collection.has(obj) || throwTypeError('Cannot ' + action);
	// @ts-ignore
	const readPrivateField = (obj, collection, getter) => (
		ensureHas(obj, collection, 'read from private field'),
		getter ? getter.call(obj) : collection.get(obj)
	);
	// @ts-ignore
	const addPrivateMember = (obj, collection, value) => {
		if (collection.has(obj)) throwTypeError('Cannot add the same private member more than once');
		return collection instanceof WeakSet ? collection.add(obj) : collection.set(obj, value);
	};
	// @ts-ignore
	const writePrivateField = (obj, collection, value, setter) => (
		ensureHas(obj, collection, 'write to private field'),
		setter ? setter.call(obj, value) : collection.set(obj, value),
		value
	);
	// @ts-ignore
	const accessPrivateMethod = (obj, collection, method) => (
		ensureHas(obj, collection, 'access private method'), method
	);

	function doSomething() {
		'use strict';
		// @ts-ignore
		let weakMapCanvas,
			// @ts-ignore
			weakMapContainerInfo,
			// @ts-ignore
			weakMapColorScheme,
			// @ts-ignore
			weakMapDevicePixelRatio,
			// @ts-ignore
			weakMapDebugOptions,
			// @ts-ignore
			weakMapLightColors,
			// @ts-ignore
			weakMapDarkColors,
			// @ts-ignore
			weakMapGradientColors,
			// @ts-ignore
			weakMapSnapshot,
			// @ts-ignore
			weakMapShapes,
			// @ts-ignore
			weakMapPointLimit,
			// @ts-ignore
			weakMapLoadedShapes,
			// @ts-ignore
			weakMapShapeDataMap,
			// @ts-ignore
			weakMapCurrentData,
			// @ts-ignore
			weakMapWebGLContext,
			// @ts-ignore
			weakMapProgram,
			// @ts-ignore
			weakMapProjectionMatrix,
			// @ts-ignore
			weakSetPrivateMethods,
			// @ts-ignore
			methodInit,
			// @ts-ignore
			timerHandle,
			// @ts-ignore
			methodMainLoop,
			createPerspectiveMatrix,
			// @ts-ignore
			resizeCanvas,
			// @ts-ignore
			compileShader,
			// @ts-ignore
			setUniformColor,
			// @ts-ignore
			updateColors;

		const predefinedShapes = new Set([
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
		const lightColorScheme = ['#0083cf', '#3300eb', '#b900d1'];
		const darkColorScheme = ['#ffd400', '#27b9dd', '#4c00bf', '#b900ce'];

		// @ts-ignore
		const hexToRgb = (hex) => {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result
				? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
				: null;
		};

		const shaderFragment = `precision mediump float;
            varying float v_z;
            varying float v_gradient;
            uniform vec3 u_color_top;
            uniform vec3 u_color_bottom;
            void main() {
              vec2 coord = gl_PointCoord - vec2(0.5, 0.5);
              float dist = length(coord);
              if (dist > 0.5) {
                discard;
              }
              vec3 color = mix(u_color_bottom, u_color_top, v_gradient);
              float alpha = max(0.3, v_z);
              gl_FragColor = vec4(color * alpha, alpha);
            }`;

		const shaderVertex = `attribute vec3 a_position;
            uniform mat4 u_matrix;
            uniform float u_scale;
            uniform mediump float u_z_offset;
            varying mediump float v_z;
            varying mediump float v_gradient;
            float near = -0.5;
            float far = 1.0;
            void main() {
              vec4 transformed_position = u_matrix * vec4(a_position, 1.0);
              gl_Position = transformed_position;
              gl_PointSize = u_scale;
              float z = (transformed_position.z + u_z_offset);
              v_z = clamp((far - z) / (far - near), 0.0, 1.0);
              v_gradient = a_position.y / 2.0 + 0.5;
            }`;

		// svelte-ignore perf_avoid_nested_class
		class ShapeRenderer {
			constructor() {
				// @ts-ignore
				addPrivateMember(this, weakSetPrivateMethods);

				// @ts-ignore
				addPrivateMember(this, weakMapCanvas);
				// @ts-ignore
				addPrivateMember(this, weakMapContainerInfo);
				// @ts-ignore
				addPrivateMember(this, weakMapColorScheme, 'light');
				// @ts-ignore
				addPrivateMember(this, weakMapDevicePixelRatio, 1);
				// @ts-ignore
				addPrivateMember(this, weakMapDebugOptions, { localData: false });
				// @ts-ignore
				addPrivateMember(this, weakMapLightColors, lightColorScheme);
				// @ts-ignore
				addPrivateMember(this, weakMapDarkColors, darkColorScheme);
				// @ts-ignore
				addPrivateMember(this, weakMapGradientColors, { top: '#ffffff', bottom: '#000000' });
				// @ts-ignore
				addPrivateMember(this, weakMapSnapshot);
				defineOrAssignStringKey(this, 'mouse', [-1000, -1000]);
				defineOrAssignStringKey(this, 'scroll', 0);

				// @ts-ignore
				addPrivateMember(this, weakMapShapes, predefinedShapes);
				// @ts-ignore
				addPrivateMember(this, weakMapPointLimit, 10000);
				// @ts-ignore
				addPrivateMember(this, weakMapLoadedShapes, []);
				// @ts-ignore
				addPrivateMember(this, weakMapShapeDataMap, new Map());

				// @ts-ignore
				addPrivateMember(this, weakMapCurrentData);
				// @ts-ignore
				addPrivateMember(this, weakMapWebGLContext);
				// @ts-ignore
				addPrivateMember(this, weakMapProgram);
				// @ts-ignore
				addPrivateMember(this, weakMapProjectionMatrix, []);
				// @ts-ignore
				addPrivateMember(this, timerHandle);
			}

			// @ts-ignore
			set snapshot(value) {
				// @ts-ignore
				writePrivateField(this, weakMapSnapshot, value);
				// @ts-ignore
				writePrivateField(this, weakMapGradientColors, value.colors);
				// @ts-ignore
				accessPrivateMethod(this, weakSetPrivateMethods, setUniformColor).call(this);
				// @ts-ignore
				clearTimeout(readPrivateField(this, timerHandle));
				this.loadNewShape();
			}

			async loadNewShape() {
				var snapshot;
				// @ts-ignore
				if (!readPrivateField(this, weakMapWebGLContext)) return;

				if (
					// @ts-ignore
					readPrivateField(this, weakMapShapes).size ===
					// @ts-ignore
					readPrivateField(this, weakMapLoadedShapes).length
				) {
					// @ts-ignore
					const lastShape = readPrivateField(this, weakMapLoadedShapes).at(-1);
					// @ts-ignore
					writePrivateField(this, weakMapLoadedShapes, [lastShape]);
				}

				// @ts-ignore
				const shapesToLoad = [...readPrivateField(this, weakMapShapes)].filter(
					// @ts-ignore
					(shape) => !readPrivateField(this, weakMapLoadedShapes).includes(shape)
				);
				const currentShapeName =
					// @ts-ignore
					((snapshot = readPrivateField(this, weakMapSnapshot)) == null
						? void 0
						: snapshot.shape) ?? shapesToLoad[Math.floor(Math.random() * shapesToLoad.length)];

				if (
					// @ts-ignore
					(readPrivateField(this, weakMapLoadedShapes).push(currentShapeName),
					// @ts-ignore
					!readPrivateField(this, weakMapShapeDataMap).has(currentShapeName))
				) {
					const dataUrl = localDataPath + currentShapeName + '.dat';
					const response = await fetch(dataUrl);

					if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

					const arrayBuffer = await response.arrayBuffer();
					const floatData = new Float32Array(arrayBuffer);
					// @ts-ignore
					readPrivateField(this, weakMapShapeDataMap).set(currentShapeName, floatData);
				}
				writePrivateField(
					this,
					// @ts-ignore
					weakMapCurrentData,
					// @ts-ignore
					readPrivateField(this, weakMapShapeDataMap).get(currentShapeName)
				);
			}

			// @ts-ignore
			async init({ canvas, containerInfo, colorScheme, scroll, devicePixelRatio, debug }) {
				// @ts-ignore
				writePrivateField(this, weakMapCanvas, canvas);
				// @ts-ignore
				writePrivateField(this, weakMapContainerInfo, containerInfo);
				// @ts-ignore
				writePrivateField(this, weakMapColorScheme, colorScheme);
				// @ts-ignore
				writePrivateField(this, weakMapDevicePixelRatio, devicePixelRatio);
				defineOrAssignStringKey(this, 'scroll', scroll);
				// @ts-ignore
				writePrivateField(this, weakMapDebugOptions, debug);
				// @ts-ignore
				await accessPrivateMethod(this, weakSetPrivateMethods, methodInit).call(this);
			}

			// @ts-ignore
			set isVisible(value) {
				value
					? (console.log('Resuming...'),
						// @ts-ignore
						accessPrivateMethod(this, weakSetPrivateMethods, methodMainLoop).call(this))
					: // @ts-ignore
						(console.log('Pausing...'), clearTimeout(readPrivateField(this, timerHandle)));
			}

			// @ts-ignore
			set containerInfo(value) {
				// @ts-ignore
				writePrivateField(this, weakMapContainerInfo, value);
				// @ts-ignore
				accessPrivateMethod(this, weakSetPrivateMethods, resizeCanvas).call(this);
			}

			// @ts-ignore
			set colorScheme(value) {
				// @ts-ignore
				if (readPrivateField(this, weakMapColorScheme) !== value) {
					// @ts-ignore
					writePrivateField(this, weakMapColorScheme, value);
					// @ts-ignore
					accessPrivateMethod(this, weakSetPrivateMethods, updateColors).call(this);
				}
			}

			destroy() {
				var context, loseContextExtension;
				console.log('Destroying Scene...');
				// @ts-ignore
				clearTimeout(readPrivateField(this, timerHandle));
				(loseContextExtension =
					// @ts-ignore
					(context = readPrivateField(this, weakMapWebGLContext)) == null
						? void 0
						: context.getExtension('WEBGL_lose_context')) == null ||
					loseContextExtension.loseContext();
				// @ts-ignore
				writePrivateField(this, weakMapWebGLContext, void 0);
				// @ts-ignore
				writePrivateField(this, weakMapProgram, void 0);
			}
		}

		weakMapCanvas = new WeakMap();
		weakMapContainerInfo = new WeakMap();
		weakMapColorScheme = new WeakMap();
		weakMapDevicePixelRatio = new WeakMap();
		weakMapDebugOptions = new WeakMap();
		weakMapLightColors = new WeakMap();
		weakMapDarkColors = new WeakMap();
		weakMapGradientColors = new WeakMap();
		weakMapSnapshot = new WeakMap();
		weakMapShapes = new WeakMap();
		weakMapPointLimit = new WeakMap();
		weakMapLoadedShapes = new WeakMap();
		weakMapShapeDataMap = new WeakMap();
		weakMapCurrentData = new WeakMap();
		weakMapWebGLContext = new WeakMap();
		weakMapProgram = new WeakMap();
		weakMapProjectionMatrix = new WeakMap();
		weakSetPrivateMethods = new WeakSet();

		methodInit = async function () {
			var snapshot;
			// @ts-ignore
			if (!readPrivateField(this, weakMapCanvas) || !readPrivateField(this, weakMapContainerInfo))
				throw new Error('Scene was not initialized.');
			const pointData = new Float32Array(10000 * 3);
			// @ts-ignore
			accessPrivateMethod(this, weakSetPrivateMethods, updateColors).call(this);
			// @ts-ignore
			const glContext = readPrivateField(this, weakMapCanvas).getContext('webgl', {
				alpha: true,
				antialias: true
			});
			if (!glContext) throw 'WebGL not supported';

			// @ts-ignore
			writePrivateField(this, weakMapWebGLContext, glContext);
			// @ts-ignore
			accessPrivateMethod(this, weakSetPrivateMethods, resizeCanvas).call(this);

			glContext.clearColor(0, 0, 0, 0);
			glContext.enable(glContext.DEPTH_TEST);

			const startTime = performance.now();
			let previousFrameTime = performance.now();

			function frameTime() {
				const deltaTime = (performance.now() - previousFrameTime) / 1000;
				previousFrameTime = performance.now();
				return [deltaTime, performance.now() - startTime];
			}

			// @ts-ignore
			const vertexShader = accessPrivateMethod(this, weakSetPrivateMethods, compileShader).call(
				// @ts-ignore
				this,
				glContext.VERTEX_SHADER,
				shaderVertex
			);
			// @ts-ignore
			const fragmentShader = accessPrivateMethod(this, weakSetPrivateMethods, compileShader).call(
				// @ts-ignore
				this,
				glContext.FRAGMENT_SHADER,
				shaderFragment
			);
			const program = glContext.createProgram();

			if (!program) throw (console.error('Unable to create program'), 'Unable to create program');

			// @ts-ignore
			writePrivateField(this, weakMapProgram, program);

			glContext.attachShader(program, vertexShader);
			glContext.attachShader(program, fragmentShader);
			glContext.linkProgram(program);

			if (!glContext.getProgramParameter(program, glContext.LINK_STATUS)) {
				console.error('Program Link Error: ' + glContext.getProgramInfoLog(program));
				return;
			}

			glContext.useProgram(program);

			const zOffsetLocation = glContext.getUniformLocation(program, 'u_z_offset');
			glContext.uniform1f(zOffsetLocation, -7);

			const scaleLocation = glContext.getUniformLocation(program, 'u_scale');

			if (
				// @ts-ignore
				(glContext.uniform1f(scaleLocation, readPrivateField(this, weakMapDevicePixelRatio) * 2),
				// @ts-ignore
				await this.loadNewShape(),
				// @ts-ignore
				!readPrivateField(this, weakMapCurrentData))
			)
				throw new Error('Shape was not loaded.');

			for (let i = 0; i < 10000; i++) {
				// @ts-ignore
				pointData[i * 3 + 0] = readPrivateField(this, weakMapCurrentData)[i * 3 + 0] * 1.4;
				// @ts-ignore
				pointData[i * 3 + 1] = readPrivateField(this, weakMapCurrentData)[i * 3 + 1] * 1.4;
				// @ts-ignore
				pointData[i * 3 + 2] = readPrivateField(this, weakMapCurrentData)[i * 3 + 2] - 7;
			}

			const buffer = glContext.createBuffer();
			glContext.bindBuffer(glContext.ARRAY_BUFFER, buffer);
			glContext.bufferData(glContext.ARRAY_BUFFER, pointData, glContext.DYNAMIC_DRAW);

			const positionLocation = glContext.getAttribLocation(program, 'a_position');
			glContext.enableVertexAttribArray(positionLocation);
			glContext.bindBuffer(glContext.ARRAY_BUFFER, buffer);
			glContext.vertexAttribPointer(positionLocation, 3, glContext.FLOAT, false, 0, 0);

			const matrixLocation = glContext.getUniformLocation(program, 'u_matrix');
			let rotationAngle =
				// @ts-ignore
				((snapshot = readPrivateField(this, weakMapSnapshot)) == null ? void 0 : snapshot.angle) ??
				0;

			const rotationSpeed = 0.22;
			const jitterMagnitude = 0.07;
			const dampingFactor = 0.06;
			const baseCycle = 400;
			const amplitude = 1000;

			const jitterArray = new Float32Array(10000 * 3);
			const temporaryArray = new Float32Array(10000 * 3);

			// @ts-ignore
			function updatePoints(data) {
				var snapshot;
				const [deltaTime, elapsedTime] = frameTime();

				rotationAngle =
					// @ts-ignore
					((snapshot = readPrivateField(this, weakMapSnapshot)) == null
						? void 0
						: snapshot.angle) ?? rotationAngle + rotationSpeed * deltaTime;

				const easingFactor = Math.min(2, deltaTime * 8);
				let cosineValue, sineValue;

				// @ts-ignore
				if (this.scroll <= 0) {
					cosineValue = Math.cos(rotationAngle);
					sineValue = Math.sin(rotationAngle);
				} else {
					// @ts-ignore
					const adjustment = Math.min(this.scroll, 500) / 100;
					const totalAngle = rotationAngle + adjustment;
					cosineValue = Math.cos(totalAngle);
					sineValue = Math.sin(totalAngle);
				}

				for (let i = 0; i < data.length / 3; i++) {
					const index = i * 3;
					// @ts-ignore
					const deltaX = pointData[index] - this.mouse[0] * 5;
					// @ts-ignore
					const deltaY = pointData[index + 1] - this.mouse[1] * 5;
					const distanceSquared = deltaX * deltaX + deltaY * deltaY;

					const currentPoint = [pointData[index], pointData[index + 1], pointData[index + 2] - -7];
					const cycle = baseCycle + Math.sin(i) * amplitude;

					if (Math.floor(elapsedTime / cycle) % 2 === 0) {
						jitterArray[i * 3 + 0] = Math.pow(Math.random(), 2) * jitterMagnitude;
						jitterArray[i * 3 + 1] = Math.pow(Math.random(), 2) * jitterMagnitude;
						jitterArray[i * 3 + 2] = Math.pow(Math.random(), 2) * jitterMagnitude;
					}

					temporaryArray[i * 3 + 0] +=
						(jitterArray[i * 3 + 0] - temporaryArray[i * 3 + 0]) * dampingFactor;
					temporaryArray[i * 3 + 1] +=
						(jitterArray[i * 3 + 1] - temporaryArray[i * 3 + 1]) * dampingFactor;
					temporaryArray[i * 3 + 2] +=
						(jitterArray[i * 3 + 2] - temporaryArray[i * 3 + 2]) * dampingFactor;

					const jitteredX = temporaryArray[i * 3 + 0];
					const jitteredY = temporaryArray[i * 3 + 1];
					const jitteredZ = temporaryArray[i * 3 + 2];
					const transformedPoint = [
						data[index] * cosineValue - data[index + 2] * sineValue + jitteredX,
						data[index + 1] + jitteredY,
						data[index] * sineValue + data[index + 2] * cosineValue + jitteredZ
					];

					if (distanceSquared < 1) {
						const distance = Math.sqrt(distanceSquared);
						const influence = (1 - distance) * 0.5;
						pointData[index] += (deltaX / distance) * influence + jitterArray[i * 3 + 0] / 2;
						pointData[index + 1] += (deltaY / distance) * influence + jitterArray[i * 3 + 1] / 2;
					} else {
						pointData[index] += (transformedPoint[0] - currentPoint[0]) * easingFactor;
						pointData[index + 1] += (transformedPoint[1] - currentPoint[1]) * easingFactor;
						pointData[index + 2] =
							currentPoint[2] + (transformedPoint[2] - currentPoint[2]) * easingFactor - 7;
					}
				}
			}

			function renderLoop() {
				if (
					// @ts-ignore
					!readPrivateField(this, weakMapWebGLContext) ||
					// @ts-ignore
					!readPrivateField(this, weakMapCurrentData)
				)
					return;

				// @ts-ignore
				updatePoints.call(this, readPrivateField(this, weakMapCurrentData));

				glContext.bindBuffer(glContext.ARRAY_BUFFER, buffer);
				glContext.bufferData(glContext.ARRAY_BUFFER, pointData, glContext.DYNAMIC_DRAW);

				glContext.uniformMatrix4fv(
					matrixLocation,
					false,
					// @ts-ignore
					readPrivateField(this, weakMapProjectionMatrix)
				);

				glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
				// @ts-ignore
				glContext.drawArrays(glContext.POINTS, 0, readPrivateField(this, weakMapPointLimit));
				// @ts-ignore
				requestAnimationFrame(renderLoop.bind(this));
			}
			// @ts-ignore
			renderLoop.call(this);
			// @ts-ignore
			accessPrivateMethod(this, weakSetPrivateMethods, methodMainLoop).call(this);
		};

		timerHandle = new WeakMap();

		methodMainLoop = function () {
			// @ts-ignore
			clearTimeout(readPrivateField(this, timerHandle));
			writePrivateField(
				// @ts-ignore
				this,
				timerHandle,
				setTimeout(async () => {
					// @ts-ignore
					await this.loadNewShape();
					// @ts-ignore
					accessPrivateMethod(this, weakSetPrivateMethods, methodMainLoop).call(this);
				}, 6000)
			);
		};

		// @ts-ignore
		createPerspectiveMatrix = function (fieldOfView, aspectRatio, nearClip, farClip) {
			const f = 1 / Math.tan(fieldOfView / 2);
			const rangeInverse = 1 / (nearClip - farClip);
			return [
				f / aspectRatio,
				0,
				0,
				0,
				0,
				f,
				0,
				0,
				0,
				0,
				(nearClip + farClip) * rangeInverse,
				-1,
				0,
				0,
				2 * nearClip * farClip * rangeInverse,
				0
			];
		};

		resizeCanvas = function () {
			if (
				// @ts-ignore
				!readPrivateField(this, weakMapWebGLContext) ||
				// @ts-ignore
				!readPrivateField(this, weakMapContainerInfo) ||
				// @ts-ignore
				!readPrivateField(this, weakMapCanvas)
			)
				return;

			// @ts-ignore
			const containerWidth = readPrivateField(this, weakMapContainerInfo).width;
			// @ts-ignore
			const containerHeight = readPrivateField(this, weakMapContainerInfo).height;
			// @ts-ignore
			const canvas = readPrivateField(this, weakMapCanvas);

			// @ts-ignore
			canvas.width = containerWidth * readPrivateField(this, weakMapDevicePixelRatio);
			// @ts-ignore
			canvas.height = containerHeight * readPrivateField(this, weakMapDevicePixelRatio);

			// @ts-ignore
			const gl = readPrivateField(this, weakMapWebGLContext);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.enable(gl.BLEND);

			const fieldOfView = Math.PI / 4;
			const aspectRatio = canvas.width / canvas.height;
			writePrivateField(
				// @ts-ignore
				this,
				weakMapProjectionMatrix,
				// @ts-ignore
				accessPrivateMethod(this, weakSetPrivateMethods, createPerspectiveMatrix).call(
					// @ts-ignore
					this,
					fieldOfView,
					aspectRatio,
					0.1,
					100
				)
			);
		};

		// @ts-ignore
		compileShader = function (type, source) {
			// @ts-ignore
			if (!readPrivateField(this, weakMapWebGLContext)) throw 'No gl context';

			// @ts-ignore
			const gl = readPrivateField(this, weakMapWebGLContext);
			const shader = gl.createShader(type);
			if (!shader) throw 'Unable to create shader';

			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.error('Shader Compile Error: ' + gl.getShaderInfoLog(shader));
				gl.deleteShader(shader);
				throw 'Unable to create shader';
			}
			return shader;
		};

		setUniformColor = function () {
			// @ts-ignore
			if (!readPrivateField(this, weakMapWebGLContext) || !readPrivateField(this, weakMapProgram))
				return;

			// @ts-ignore
			const gl = readPrivateField(this, weakMapWebGLContext);
			// @ts-ignore
			const location = gl.getUniformLocation(readPrivateField(this, weakMapProgram), 'u_color_top');
			// @ts-ignore
			const colorArray = hexToRgb(readPrivateField(this, weakMapGradientColors).top).map(
				(component) => component / 255
			);
			console.log({ colorArray });
			gl.uniform3fv(location, colorArray);

			const locationBottom = gl.getUniformLocation(
				// @ts-ignore
				readPrivateField(this, weakMapProgram),
				'u_color_bottom'
			);
			// @ts-ignore
			const colorArrayBottom = hexToRgb(readPrivateField(this, weakMapGradientColors).bottom).map(
				(component) => component / 255
			);

			gl.uniform3fv(locationBottom, colorArrayBottom);
		};

		updateColors = function () {
			const colors = [
				// @ts-ignore
				...(readPrivateField(this, weakMapColorScheme) === 'light'
					? // @ts-ignore
						readPrivateField(this, weakMapLightColors)
					: // @ts-ignore
						readPrivateField(this, weakMapDarkColors))
			];
			colors.sort(() => Math.random() - 0.5);
			console.log(colors);
			// @ts-ignore
			writePrivateField(this, weakMapGradientColors, { top: colors[0], bottom: colors[1] });
			// @ts-ignore
			accessPrivateMethod(this, weakSetPrivateMethods, setUniformColor).call(this);
		};

		const canvas = document.getElementById('webglCanvas');
		const containerInfo = { width: container.offsetWidth, height: container.offsetHeight };
		const shapeRendererInstance = new ShapeRenderer();
		console.log({ container });
		console.log({ shapeRendererInstance });
		shapeRendererInstance.init({
			canvas: canvas,
			containerInfo: containerInfo,
			colorScheme: 'dark', // or 'dark'
			scroll: 0,
			devicePixelRatio: window.devicePixelRatio || 1,
			debug: { localData: false }
		});
		updateColors.call(shapeRendererInstance);
		window.addEventListener('mousemove', (e) => {
			// @ts-ignore

			console.log(e.clientX, e.clientY);
			let m = [
				(e.clientX / container.offsetWidth) * 2 - 1,
				-((e.clientY / container.offsetHeight) * 2 - 1)
			];
			console.log(m);
			shapeRendererInstance.mouse = m;
		});

		window.addEventListener('resize', () => {
			const resizeInfo = { width: container.offsetWidth, height: container.offsetHeight };
			shapeRendererInstance.containerInfo = resizeInfo;
		});
	}

	onMount(() => {
		console.log('Canvas mounted', container);
		doSomething();
	});
</script>

<div class="relative">
	<canvas id="webglCanvas" class="test absolute left-0 top-0 z-10 h-[480px] w-full" />
</div>
