<script lang="ts">
	import { onMount } from 'svelte';
	import { ShapeRenderer } from '$lib/webgl/ShapeRenderer';

	let { container }: { container: HTMLDivElement } = $props();
	let renderer: ShapeRenderer;
	let isDragging = false;
	let lastTouchDistance = 0;
	let canvasElement: HTMLCanvasElement;
	let isMobile = $state(false);
	let initializationTimestamp: number = 0;
	let lastTouchEvent: number = 0;
	let touchResetTimer: number | null = null;

	// Check if device is mobile
	function checkMobile() {
		const wasMobile = isMobile;
		isMobile = window.innerWidth < 768;

		if (isMobile !== wasMobile) {
			// Device type changed
		}
	}

	function getCanvasCoordinates(e: MouseEvent | Touch) {
		if (!canvasElement) return { x: 0, y: 0 };

		const rect = canvasElement.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
		const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
		return { x, y };
	}

	function handleMultiTouch(e: TouchEvent) {
		if (e.touches.length >= 2) {
			// Calculate distance between two touch points
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];
			const dx = touch1.clientX - touch2.clientX;
			const dy = touch1.clientY - touch2.clientY;
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Calculate midpoint coordinates
			const midX = (touch1.clientX + touch2.clientX) / 2;
			const midY = (touch1.clientY + touch2.clientY) / 2;

			// Create a midpoint touch-like object
			const midpoint = {
				clientX: midX,
				clientY: midY
			};

			// Pass midpoint coordinates to the renderer
			const coords = getCanvasCoordinates(midpoint as Touch);
			renderer.setMouse(coords.x, coords.y);

			// Handle pinch zoom if needed (add renderer.setZoom() if you implement this)
			if (lastTouchDistance > 0) {
				const deltaDistance = distance - lastTouchDistance;
				// You can implement zoom functionality here if needed
				// renderer.setZoom(deltaDistance / 100);
			}

			lastTouchDistance = distance;
		} else if (e.touches.length === 1) {
			// Single touch handling
			const touch = e.touches[0];
			const coords = getCanvasCoordinates(touch);
			renderer.setMouse(coords.x, coords.y);
			lastTouchDistance = 0;
		}
	}

	// Function to reset mouse after a delay
	function resetMouseAfterDelay(delay = 100) {
		// Clear any existing timer
		if (touchResetTimer !== null) {
			clearTimeout(touchResetTimer);
		}

		// Set a new timer
		touchResetTimer = setTimeout(() => {
			// Only reset if not dragging (no active touches)
			if (!isDragging && renderer) {
				renderer.setMouse(-1000, -1000);
			}
			touchResetTimer = null;
		}, delay) as unknown as number;
	}

	function initRenderer() {
		initializationTimestamp = performance.now();

		canvasElement = document.getElementById('webglCanvas') as HTMLCanvasElement;
		if (!canvasElement) {
			return;
		}

		// Set canvas dimensions to match container
		canvasElement.width = container.offsetWidth;
		canvasElement.height = container.offsetHeight;

		const containerInfo = {
			width: container.offsetWidth,
			height: container.offsetHeight
		};

		try {
			renderer = new ShapeRenderer();
			renderer.init({
				canvas: canvasElement,
				containerInfo,
				colorScheme: 'dark',
				scroll: 0,
				devicePixelRatio: window.devicePixelRatio || 1,
				debug: { localData: false }
			});
		} catch (err) {
			// Silently handle renderer errors
		}

		// Mouse events
		const handleMouseMove = (e: MouseEvent) => {
			const coords = getCanvasCoordinates(e);
			renderer.setMouse(coords.x, coords.y);
		};

		const handleMouseLeave = () => {
			renderer.setMouse(-1000, -1000);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseleave', handleMouseLeave);

		// Touch events - works on both mobile and desktop
		const handleTouchStart = (e: TouchEvent) => {
			const now = performance.now();
			lastTouchEvent = now;

			// Only prevent default on desktop or when touching the canvas directly on mobile
			if (!isMobile || e.target === canvasElement) {
				e.preventDefault();
			}

			isDragging = true;

			// Clear any reset timer when a new touch starts
			if (touchResetTimer !== null) {
				clearTimeout(touchResetTimer);
				touchResetTimer = null;
			}

			// Directly use first touch point for immediate response
			if (e.touches.length > 0) {
				const touch = e.touches[0];
				const coords = getCanvasCoordinates(touch);
				renderer.setMouse(coords.x, coords.y);
			}

			// Process multi-touch if needed
			handleMultiTouch(e);
		};

		const handleTouchEnd = (e: TouchEvent) => {
			const now = performance.now();
			lastTouchEvent = now;

			// If no touches remain, reset dragging state
			if (e.touches.length === 0) {
				isDragging = false;
				lastTouchDistance = 0;
				// Schedule mouse position reset after a short delay
				resetMouseAfterDelay(200); // Using a longer delay for more reliable reset
			} else {
				// Still has touches, update with the remaining ones
				handleMultiTouch(e);
			}
		};

		const handleTouchCancel = (e: TouchEvent) => {
			const now = performance.now();
			lastTouchEvent = now;

			// Ensure we reset everything on cancel
			isDragging = false;
			lastTouchDistance = 0;
			// Reset mouse immediately on cancel events
			renderer.setMouse(-1000, -1000);

			// Clear any pending reset timers
			if (touchResetTimer !== null) {
				clearTimeout(touchResetTimer);
				touchResetTimer = null;
			}
		};

		// Global touch event handlers to ensure we catch all end events
		const handleGlobalTouchEnd = (e: TouchEvent) => {
			const now = performance.now();

			if (e.touches.length === 0) {
				isDragging = false;
				lastTouchDistance = 0;
				renderer.setMouse(-1000, -1000);
			}
		};

		const handleTouchMove = (e: TouchEvent) => {
			const now = performance.now();
			lastTouchEvent = now;

			// Only prevent default on desktop or when touching the canvas directly on mobile
			if (!isMobile || e.target === canvasElement) {
				e.preventDefault();
			}

			if (!isDragging) {
				return;
			}

			// Reset any pending timers during active movement
			if (touchResetTimer !== null) {
				clearTimeout(touchResetTimer);
				touchResetTimer = null;
			}

			// Direct coordinate update for smoother response
			if (e.touches.length > 0) {
				const touch = e.touches[0];
				const coords = getCanvasCoordinates(touch);
				renderer.setMouse(coords.x, coords.y);
			} else {
				// No touches detected during move - this is likely a stuck touch
				isDragging = false;
				renderer.setMouse(-1000, -1000);
			}

			// Then handle multi-touch cases
			handleMultiTouch(e);
		};

		// Set event options
		const canvasOptions = { passive: false }; // Canvas needs preventDefault
		const containerOptions = { passive: isMobile }; // Container should be passive on mobile

		// Add event listeners to canvas - always active
		canvasElement.addEventListener('touchstart', handleTouchStart, canvasOptions);
		canvasElement.addEventListener('touchmove', handleTouchMove, canvasOptions);
		canvasElement.addEventListener('touchend', handleTouchEnd, canvasOptions);
		canvasElement.addEventListener('touchcancel', handleTouchCancel, canvasOptions);

		// Add global touch listeners to catch all touch events
		window.addEventListener('touchend', handleGlobalTouchEnd);
		window.addEventListener('touchcancel', handleGlobalTouchEnd);

		// Add a blur handler to reset touch state when the window loses focus
		const handleBlur = () => {
			isDragging = false;
			lastTouchDistance = 0;
			renderer.setMouse(-1000, -1000);
		};

		window.addEventListener('blur', handleBlur);

		// Container should be passive on mobile for scrolling
		container.addEventListener('touchstart', handleTouchStart, containerOptions);
		container.addEventListener('touchmove', handleTouchMove, containerOptions);
		container.addEventListener('touchend', handleTouchEnd, containerOptions);
		container.addEventListener('touchcancel', handleTouchCancel, containerOptions);

		// Handle resize for mobile orientation changes
		const handleResize = () => {
			checkMobile();
			if (!canvasElement) return;

			const width = container.offsetWidth;
			const height = container.offsetHeight;

			canvasElement.width = width;
			canvasElement.height = height;

			renderer.updateContainerInfo({
				width,
				height
			});
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);

		// Initial check
		checkMobile();

		// Debug interval
		const debugInterval = setInterval(() => {
			// Keep empty but available for future debugging
		}, 1000);

		return {
			handleMouseMove,
			handleMouseLeave,
			handleTouchStart,
			handleTouchMove,
			handleTouchEnd,
			handleTouchCancel,
			handleGlobalTouchEnd,
			handleBlur,
			handleResize,
			debugInterval
		};
	}

	onMount(() => {
		const handlers = initRenderer();

		return () => {
			renderer?.destroy();

			// Clear debug interval
			if (handlers && handlers.debugInterval) {
				clearInterval(handlers.debugInterval);
			}

			// Clear any active timeout when component unmounts
			if (touchResetTimer !== null) {
				clearTimeout(touchResetTimer);
				touchResetTimer = null;
			}

			// Clean up event listeners properly
			if (handlers) {
				window.removeEventListener('mousemove', handlers.handleMouseMove);
				window.removeEventListener('mouseleave', handlers.handleMouseLeave);
				window.removeEventListener('resize', handlers.handleResize);
				window.removeEventListener('orientationchange', handlers.handleResize);
				window.removeEventListener('touchend', handlers.handleGlobalTouchEnd);
				window.removeEventListener('touchcancel', handlers.handleGlobalTouchEnd);
				window.removeEventListener('blur', handlers.handleBlur);

				if (canvasElement) {
					canvasElement.removeEventListener('touchstart', handlers.handleTouchStart);
					canvasElement.removeEventListener('touchmove', handlers.handleTouchMove);
					canvasElement.removeEventListener('touchend', handlers.handleTouchEnd);
					canvasElement.removeEventListener('touchcancel', handlers.handleTouchCancel);
				}

				if (container) {
					container.removeEventListener('touchstart', handlers.handleTouchStart);
					container.removeEventListener('touchmove', handlers.handleTouchMove);
					container.removeEventListener('touchend', handlers.handleTouchEnd);
					container.removeEventListener('touchcancel', handlers.handleTouchCancel);
				}
			}
		};
	});
</script>

<div class="relative h-full w-full">
	<canvas
		id="webglCanvas"
		class="absolute left-0 top-0 z-10 h-full w-full select-none"
		style="touch-action: {isMobile ? 'pan-y' : 'none'};"
	>
		Your browser does not support the canvas element.
	</canvas>
</div>
