<script>
	import Canvas from './Canvas.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	let container = $state();

	$inspect(container);
</script>

<div bind:this={container} class="hero relative mt-8">
	<!-- Changed from mt-16 -->
	<Navbar />
	<h1
		class="absolute
				left-1/2
				top-1/2
				z-20
				-translate-x-1/2
				-translate-y-1/2
				bg-gradient-to-b
				from-[var(--color-brand)]
				to-[var(--color-text)]
				bg-clip-text
				py-2
				text-center
				text-[clamp(3rem,2.1rem+3vw,4.5rem)]
				font-bold
				text-transparent"
	>
		Development<br /> &amp; Design
	</h1>
	<div class="canvas-container">
		{#if container}
			<Canvas {container} />
		{/if}
	</div>
</div>

<style>
	.hero {
		position: relative;
	}

	.canvas-container {
		position: relative;
		height: 50vh; /* Changed from 70vh to 50vh */
		width: 100%;
	}
</style>
