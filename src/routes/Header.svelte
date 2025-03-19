<script>
	import Canvas from './Canvas.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	let container = $state();

	$inspect(container);
</script>

<div bind:this={container} class="hero relative mt-0">
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
	<div class="z-5 absolute inset-0 bg-black/20"></div>

	<Navbar />

	<!-- Content container with better spacing -->
	<div class="relative z-20 flex flex-col items-center justify-center pt-20" style="height: 65vh;">
		<h1
			class="bg-gradient-to-b from-[var(--color-brand)] to-[var(--color-text)] bg-clip-text py-2 text-center text-[clamp(3.5rem,2.5rem+3vw,5rem)] font-bold leading-tight text-transparent"
		>
			Development<br /> &amp; Design
		</h1>

		<!-- Description with better styling and spacing -->
		<div class="mt-6 max-w-md px-6 text-center">
			<p class="text-lg text-white/80">
				Full-stack developer crafting modern web experiences with cutting-edge technology.
			</p>
			<a
				href="/about"
				class="mt-3 inline-block font-medium text-[var(--color-brand)] hover:underline"
			>
				Learn more about me →
			</a>
		</div>
	</div>

	<div class="canvas-container absolute inset-0">
		{#if container}
			<Canvas {container} />
		{/if}
	</div>
</div>

<style>
	.hero {
		position: relative;
		min-height: 65vh;
		overflow: hidden;
	}

	.canvas-container {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 15;
	}
</style>
