<script lang="ts">
	import { onMount } from 'svelte';
	import { ShapeRenderer } from '$lib/webgl/ShapeRenderer';

	let { container }: { container: HTMLDivElement } = $props();
	let renderer: ShapeRenderer;
	let isDragging = false;

	function getCanvasCoordinates(e: MouseEvent | Touch) {
		const canvas = document.getElementById('webglCanvas') as HTMLCanvasElement;
		const rect = canvas.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
		const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
		return { x, y };
	}

	function initRenderer() {
		const canvas = document.getElementById('webglCanvas') as HTMLCanvasElement;
		const containerInfo = {
			width: container.offsetWidth,
			height: container.offsetHeight
		};

		renderer = new ShapeRenderer();
		renderer.init({
			canvas,
			containerInfo,
			colorScheme: 'dark',
			scroll: 0,
			devicePixelRatio: window.devicePixelRatio || 1,
			debug: { localData: false }
		});

		// Mouse events
		window.addEventListener('mousemove', (e) => {
			const coords = getCanvasCoordinates(e);
			renderer.setMouse(coords.x, coords.y);
		});

		window.addEventListener('mouseleave', () => {
			renderer.setMouse(-1000, -1000);
		});

		// Touch events
		canvas.addEventListener(
			'touchstart',
			(e) => {
				e.preventDefault();
				isDragging = true;
				const touch = e.touches[0];
				const coords = getCanvasCoordinates(touch);
				renderer.setMouse(coords.x, coords.y);
			},
			{ passive: false }
		);

		canvas.addEventListener(
			'touchmove',
			(e) => {
				e.preventDefault();
				if (!isDragging) return;
				const touch = e.touches[0];
				const coords = getCanvasCoordinates(touch);
				renderer.setMouse(coords.x, coords.y);
			},
			{ passive: false }
		);

		const endTouch = () => {
			isDragging = false;
			renderer.setMouse(-1000, -1000);
		};

		canvas.addEventListener('touchend', endTouch);
		canvas.addEventListener('touchcancel', endTouch);

		window.addEventListener('resize', () => {
			renderer.updateContainerInfo({
				width: container.offsetWidth,
				height: container.offsetHeight
			});
		});
	}

	onMount(() => {
		initRenderer();

		return () => {
			renderer?.destroy();
		};
	});
</script>

<div class="relative">
	<canvas id="webglCanvas" class="test absolute left-0 top-0 z-10 h-[500px] w-full touch-none">
		Your browser does not support the canvas element.
	</canvas>
</div>
