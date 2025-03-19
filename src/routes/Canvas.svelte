<script lang="ts">
	import { onMount } from 'svelte';
	import { ShapeRenderer } from '$lib/webgl/ShapeRenderer';

	let { container }: { container: HTMLDivElement } = $props();
	let renderer: ShapeRenderer;
	let isDragging = false;
	let lastTouchDistance = 0;
	let canvasElement: HTMLCanvasElement;
	let isMobile = $state(false);

	// Check if device is mobile
	function checkMobile() {
		isMobile = window.innerWidth < 768;
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

	function initRenderer() {
		canvasElement = document.getElementById('webglCanvas') as HTMLCanvasElement;
		if (!canvasElement) {
			console.error('Canvas element not found');
			return;
		}

		// Set canvas dimensions to match container
		canvasElement.width = container.offsetWidth;
		canvasElement.height = container.offsetHeight;

		const containerInfo = {
			width: container.offsetWidth,
			height: container.offsetHeight
		};

		renderer = new ShapeRenderer();
		renderer.init({
			canvas: canvasElement,
			containerInfo,
			colorScheme: 'dark',
			scroll: 0,
			devicePixelRatio: window.devicePixelRatio || 1,
			debug: { localData: false }
		});

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
			// Only prevent default on desktop or when touching the canvas directly on mobile
			if (!isMobile || e.target === canvasElement) {
				e.preventDefault();
			}

			isDragging = true;

			// Directly use first touch point for immediate response
			if (e.touches.length > 0) {
				const touch = e.touches[0];
				const coords = getCanvasCoordinates(touch);
				renderer.setMouse(coords.x, coords.y);
			}

			// Process multi-touch if needed
			handleMultiTouch(e);
		};

		const handleTouchMove = (e: TouchEvent) => {
			// Only prevent default on desktop or when touching the canvas directly on mobile
			if (!isMobile || e.target === canvasElement) {
				e.preventDefault();
			}

			if (!isDragging) return;

			// Direct coordinate update for smoother response
			if (e.touches.length > 0) {
				const touch = e.touches[0];
				const coords = getCanvasCoordinates(touch);
				renderer.setMouse(coords.x, coords.y);
			}

			// Then handle multi-touch cases
			handleMultiTouch(e);
		};

		const handleTouchEnd = (e: TouchEvent) => {
			if (e.touches.length > 0) {
				handleMultiTouch(e);
			} else {
				// Otherwise, reset
				isDragging = false;
				lastTouchDistance = 0;
				renderer.setMouse(-1000, -1000);
			}
		};

		// Set event options
		const canvasOptions = { passive: false }; // Canvas needs preventDefault
		const containerOptions = { passive: isMobile }; // Container should be passive on mobile

		// Add event listeners to canvas - always active
		canvasElement.addEventListener('touchstart', handleTouchStart, canvasOptions);
		canvasElement.addEventListener('touchmove', handleTouchMove, canvasOptions);
		canvasElement.addEventListener('touchend', handleTouchEnd, canvasOptions);
		canvasElement.addEventListener('touchcancel', handleTouchEnd, canvasOptions);

		// Container should be passive on mobile for scrolling
		container.addEventListener('touchstart', handleTouchStart, containerOptions);
		container.addEventListener('touchmove', handleTouchMove, containerOptions);
		container.addEventListener('touchend', handleTouchEnd, containerOptions);
		container.addEventListener('touchcancel', handleTouchEnd, containerOptions);

		// Handle resize for mobile orientation changes
		const handleResize = () => {
			checkMobile();
			if (!canvasElement) return;

			canvasElement.width = container.offsetWidth;
			canvasElement.height = container.offsetHeight;

			renderer.updateContainerInfo({
				width: container.offsetWidth,
				height: container.offsetHeight
			});
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);

		// Initial check
		checkMobile();

		return {
			handleMouseMove,
			handleMouseLeave,
			handleTouchStart,
			handleTouchMove,
			handleTouchEnd,
			handleResize
		};
	}

	onMount(() => {
		const handlers = initRenderer();

		return () => {
			renderer?.destroy();
			// Clean up event listeners properly
			if (handlers) {
				window.removeEventListener('mousemove', handlers.handleMouseMove);
				window.removeEventListener('mouseleave', handlers.handleMouseLeave);
				window.removeEventListener('resize', handlers.handleResize);
				window.removeEventListener('orientationchange', handlers.handleResize);

				if (canvasElement) {
					canvasElement.removeEventListener('touchstart', handlers.handleTouchStart);
					canvasElement.removeEventListener('touchmove', handlers.handleTouchMove);
					canvasElement.removeEventListener('touchend', handlers.handleTouchEnd);
					canvasElement.removeEventListener('touchcancel', handlers.handleTouchEnd);
				}

				if (container) {
					container.removeEventListener('touchstart', handlers.handleTouchStart);
					container.removeEventListener('touchmove', handlers.handleTouchMove);
					container.removeEventListener('touchend', handlers.handleTouchEnd);
					container.removeEventListener('touchcancel', handlers.handleTouchEnd);
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
