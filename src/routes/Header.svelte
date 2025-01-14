<script>
	import Canvas from './Canvas.svelte';
	let container = $state();

	$inspect(container);
</script>

<div bind:this={container} class="hero svelte-3fdd2q relative mt-28">
	<h1
		class="  absolute
    left-1/2
    top-1/2
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
	<div class="canvas-container svelte-phldos">
		{#if container}
			<Canvas {container} />
		{/if}
		<div class="scroll-trap svelte-phldos"></div>
	</div>
</div>

<style>
	.hero {
		position: relative;
	}

	.canvas-container {
		position: relative;
		height: 480px;
		width: 100%;
	}

	.container.svelte-phldos .scroll-trap:where(.svelte-phldos) {
		bottom: 35%;
		content: '';
		touch-action: none;
		z-index: 10;
	}

	.container.svelte-phldos .scroll-trap:where(.svelte-phldos),
	.hero.svelte-jp3qa6 {
		height: max(30rem, 50vh);
		margin: -10rem 0 -2rem;
		position: relative;
	}

	.hero.svelte-3fdd2q {
		position: relative;
	}

	.hero.svelte-3fdd2q h1:where(.svelte-3fdd2q) {
		background: linear-gradient(to bottom, var(--color-brand), var(--color-text));
		-webkit-background-clip: text;
		background-clip: text;
		color: var(--color-text);
		font-size: clamp(3rem, 2.1rem + 3vw, 4.5rem);
		font-weight: 800;
		left: 50%;
		padding-bottom: 0.5em;
		padding-top: 0.5em;
		position: absolute;
		text-align: center;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
