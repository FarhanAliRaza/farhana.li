<script lang="ts">
	import { onMount } from 'svelte';
	import type { ShaderMount } from '@paper-design/shaders';

	let container: HTMLDivElement;

	onMount(() => {
		let shader: ShaderMount | undefined;
		let disposed = false;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotion = () => shader?.setSpeed(reducedMotion.matches ? 0 : 1);
		reducedMotion.addEventListener('change', updateMotion);

		// Load only in the browser; the solid background also covers loading and WebGL failures.
		async function mountTexture() {
			try {
				const {
					ShaderMount,
					grainGradientFragmentShader,
					GrainGradientShapes,
					ShaderFitOptions,
					getShaderColorFromString,
					getShaderNoiseTexture
				} = await import('@paper-design/shaders');

				const noiseTexture = getShaderNoiseTexture();
				await noiseTexture?.decode();
				if (disposed) return;
				const colors = ['#7300ff', '#eba8ff', '#00bfff', '#2b00ff'];

				shader = new ShaderMount(
					container,
					grainGradientFragmentShader,
					{
						u_colorBack: getShaderColorFromString('#000000'),
						u_colors: colors.map(getShaderColorFromString),
						u_colorsCount: colors.length,
						u_softness: 0.5,
						u_intensity: 0.5,
						u_noise: 0.25,
						u_shape: GrainGradientShapes.corners,
						u_noiseTexture: noiseTexture,
						u_fit: ShaderFitOptions.contain,
						u_scale: 1,
						u_rotation: 0,
						u_originX: 0.5,
						u_originY: 0.5,
						u_offsetX: 0,
						u_offsetY: 0,
						u_worldWidth: 0,
						u_worldHeight: 0
					},
					{ alpha: false, antialias: false, powerPreference: 'low-power' },
					reducedMotion.matches ? 0 : 1,
					0,
					1,
					1920 * 1080
				);
			} catch {
				// Decorative only: leave the dark fallback if WebGL or the module is unavailable.
				if (!disposed) container.replaceChildren();
			}
		}

		void mountTexture();

		return () => {
			disposed = true;
			reducedMotion.removeEventListener('change', updateMotion);
			shader?.dispose();
		};
	});
</script>

<div bind:this={container} class="shader-background" aria-hidden="true"></div>

<style>
	.shader-background {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
		background: #000000;
	}

	/* Keep bright shader phases behind the foreground's contrast range. */
	.shader-background :global(canvas) {
		opacity: 0.4;
	}
</style>
