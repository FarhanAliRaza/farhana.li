<script>
	import Canvas from './Canvas.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';

	let container = $state();
	let windowWidth = $state(0);
	let isMobile = $state(false);

	// Update window size on resize
	function updateWindowSize() {
		windowWidth = window.innerWidth;
		isMobile = windowWidth < 768;
	}

	onMount(() => {
		updateWindowSize();
		window.addEventListener('resize', updateWindowSize);
		window.addEventListener('orientationchange', updateWindowSize);

		return () => {
			window.removeEventListener('resize', updateWindowSize);
			window.removeEventListener('orientationchange', updateWindowSize);
		};
	});
</script>

<div bind:this={container} class="hero relative mt-0 overflow-hidden">
	<!-- Enhanced gradient background at top of header -->
	<div class="absolute inset-0 z-10">
		<!-- Main top gradient - more intense blue -->
		<div
			class="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[rgba(33,158,255,0.25)] via-[rgba(33,158,255,0.1)] to-transparent"
		></div>
		<!-- Radial glow effect -->
		<div
			class="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(33,158,255,0.3),transparent_70%)]"
		></div>
		<!-- Extra side gradients for depth -->
		<div
			class="absolute left-0 top-0 h-64 w-64 bg-[radial-gradient(circle_at_top_left,rgba(33,158,255,0.2),transparent_70%)]"
		></div>
		<div
			class="absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle_at_top_right,rgba(33,158,255,0.2),transparent_70%)]"
		></div>
	</div>

	<!-- Black overlay to deepen the background -->
	<div class="absolute inset-0 z-5 bg-black/20"></div>

	<!-- Canvas container - balanced approach for mobile -->
	<div class="canvas-container absolute z-15 {isMobile ? 'inset-x-0 top-0 h-[50vh]' : 'inset-0'}">
		{#if container}
			<Canvas {container} />
		{/if}
	</div>

	<!-- Navbar with higher z-index -->
	<div class="relative z-[200]">
		<Navbar />
	</div>

	<!-- Content container with better spacing, adjusted for mobile -->
	<div
		class="relative z-[150] flex flex-col items-center justify-center px-4 pt-20 md:pt-24 {isMobile
			? ''
			: 'pointer-events-none'}"
		style="height: {isMobile ? '50vh' : '75vh'};"
	>
		<h1
			class="bg-gradient-to-b from-[var(--color-brand)] to-[var(--color-text)] bg-clip-text py-2 text-center text-[clamp(2.3rem,2rem+3vw,5rem)] font-bold leading-tight text-transparent"
		>
			Code<br />&amp; Craft
		</h1>

		<!-- Description with better styling and spacing -->
		<div
			class="mt-8 md:mt-8 max-w-md md:px-8 px-5 text-center glassmorphic-card relative z-[190] pointer-events-auto"
		>
			<p class="md:text-base text-sm text-white/90 md:my-3 my-2">
				Full-stack developer building SaaS products and modern web experiences with cutting-edge
				technology.
			</p>
			<div class="flex justify-center gap-4 md:pt-2 pt-1 md:pb-4 pb-3">
				<a
					href="/about"
					class="inline-block text-[var(--color-brand)] hover:text-[var(--color-brand)]/80 hover:underline relative z-[200]"
					style="touch-action: manipulation;"
				>
					<span class="flex items-center md:text-lg text-base">
						More About Me
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="ml-1"
						>
							<path d="M5 12h14"></path>
							<path d="m12 5 7 7-7 7"></path>
						</svg>
					</span>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.hero {
		position: relative;
		min-height: 60vh;
		overflow: hidden;
	}

	.canvas-container {
		position: absolute;
		height: 100%;
		width: 100%;
	}

	/* Mobile-specific canvas styles */
	@media (max-width: 767px) {
		.canvas-container {
			/* Allow vertical scrolling on mobile */
			pointer-events: none !important;
		}
		.hero {
			min-height: 50vh;
		}
	}

	/* Glassmorphic card effect */
	.glassmorphic-card {
		background: rgba(13, 18, 30, 0.6);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	@media (max-width: 767px) {
		.glassmorphic-card {
			padding-top: 0.75rem;
			padding-bottom: 0.75rem;
		}
	}
</style>
