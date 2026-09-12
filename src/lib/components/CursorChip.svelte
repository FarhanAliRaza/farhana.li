<script lang="ts">
	// A glass chip that trails the pointer on a spring and labels whatever is under it.
	// Any element with `data-cursor-text="..."` hides the native cursor and shows the chip.
	import { onMount } from 'svelte';

	let chip = $state<HTMLDivElement>();
	let label = $state('');
	let visible = $state(false);
	let x = $state(-100);
	let y = $state(-100);

	const words = $derived(label.split(' '));
	const circle = $derived(words.length === 2);

	onMount(() => {
		if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

		// Spring (stiffness 800, damping 35) integrated per frame
		let tx = x,
			ty = y,
			vx = 0,
			vy = 0,
			raf = 0,
			last = 0;
		const K = 800,
			C = 35;

		const tick = (now: number) => {
			raf = 0;
			const dt = Math.min((now - last) / 1000, 1 / 30);
			last = now;
			vx += (-K * (x - tx) - C * vx) * dt;
			vy += (-K * (y - ty) - C * vy) * dt;
			x += vx * dt;
			y += vy * dt;
			if (Math.hypot(x - tx, y - ty) > 0.1 || Math.hypot(vx, vy) > 1) {
				raf = requestAnimationFrame(tick);
			} else {
				x = tx;
				y = ty;
				vx = vy = 0;
			}
		};
		const kick = () => {
			if (raf) return;
			last = performance.now();
			raf = requestAnimationFrame(tick);
		};

		const move = (e: PointerEvent) => {
			tx = e.clientX;
			ty = e.clientY;
			if (chip && visible) {
				const { width, height } = chip.getBoundingClientRect();
				tx = Math.max(width / 2 + 10, Math.min(window.innerWidth - width / 2 - 10, tx));
				ty = Math.max(height / 2 + 10, Math.min(window.innerHeight - height / 2 - 10, ty));
				kick();
			} else {
				// hidden: snap so the chip appears right under the pointer
				x = tx;
				y = ty;
			}
		};
		const over = (e: PointerEvent) => {
			const el = (e.target as Element).closest<HTMLElement>('[data-cursor-text]');
			visible = !!el;
			if (el) label = el.dataset.cursorText ?? '';
		};

		window.addEventListener('pointermove', move, { passive: true });
		window.addEventListener('pointerover', over);
		return () => {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerover', over);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div
	class="cursor-chip"
	class:is-visible={visible}
	class:is-circle={circle}
	aria-hidden="true"
	bind:this={chip}
	style="transform: translate3d({x}px, {y}px, 0) translate(-50%, -50%)"
>
	<div class="cursor-chip__surface">
		<span class="cursor-chip__content">
			{#if circle}<span>{words[0]}</span><span>{words[1]}</span>{:else}{label}{/if}
		</span>
	</div>
	<div class="cursor-chip__shadow"></div>
</div>

<style>
	@media (pointer: fine) {
		:global([data-cursor-text]),
		:global([data-cursor-text] *) {
			cursor: none !important;
		}
	}

	.cursor-chip {
		--pop: linear(
			0 0%,
			0.075 4.2%,
			0.245 8.3%,
			0.444 12.5%,
			0.633 16.7%,
			0.79 20.8%,
			0.907 25%,
			0.985 29.2%,
			1.032 33.3%,
			1.053 37.5%,
			1.058 41.7%,
			1.053 45.8%,
			1.043 50%,
			1.031 54.2%,
			1.02 58.3%,
			1.011 62.5%,
			1.005 66.7%,
			1 70.8%,
			0.998 75%,
			0.997 83.3%,
			0.998 91.7%,
			1 100%
		);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		display: inline-flex;
		isolation: isolate;
		pointer-events: none;
		color: #fff;
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: 999vw;
		opacity: 0;
		scale: 0.8;
		transition:
			opacity 200ms ease,
			scale 200ms ease;
	}
	.cursor-chip.is-visible {
		opacity: 1;
		scale: 1;
		transition:
			opacity 460ms var(--pop),
			scale 460ms var(--pop);
	}
	.cursor-chip.is-circle {
		width: 96px;
		height: 96px;
	}
	.cursor-chip__surface {
		position: relative;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: 999vw;
		background: linear-gradient(-75deg, #ffffff05, #ffffff14, #ffffff05);
		box-shadow:
			inset 0 0.125em 0.125em #ffffff0d,
			inset 0 -0.125em 0.125em #ffffff40,
			0 0.25em 0.125em -0.125em #000000b3,
			0 0 0.1em 0.25em inset #ffffff26;
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}
	/* Bright rim: a conic highlight masked down to a 1px ring */
	.cursor-chip__surface::after {
		content: '';
		position: absolute;
		inset: -0.5px;
		padding: 1px;
		border-radius: 999vw;
		background:
			conic-gradient(
				from -75deg at 50% 50%,
				#ffffffb3,
				#fff0 5% 40%,
				#ffffffb3 50%,
				#fff0 60% 95%,
				#ffffffb3
			),
			linear-gradient(180deg, #fff3, #ffffff1a);
		box-shadow: inset 0 0 0 0.5px #ffffff80;
		mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
		mask-clip: content-box, border-box;
		mask-composite: exclude;
		-webkit-mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
		-webkit-mask-clip: content-box, border-box;
		-webkit-mask-composite: xor;
	}
	.cursor-chip__content {
		position: relative;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 8px 16px;
		line-height: 1;
		white-space: nowrap;
	}
	.is-circle .cursor-chip__content {
		flex-direction: column;
		gap: 4px;
		padding: 8px;
		line-height: 1.15;
	}
	.cursor-chip__shadow {
		position: absolute;
		inset: -1em;
		z-index: -1;
		filter: blur(clamp(2px, 0.125em, 12px));
	}
	.cursor-chip__shadow::after {
		content: '';
		position: absolute;
		top: 1.5em;
		left: 1.125em;
		width: calc(100% - 2.25em);
		height: calc(100% - 2.25em);
		padding: 0.125em;
		border-radius: 999vw;
		background: linear-gradient(180deg, #000000d9, #0000008c);
		mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
		mask-clip: content-box, border-box;
		mask-composite: exclude;
		-webkit-mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
		-webkit-mask-clip: content-box, border-box;
		-webkit-mask-composite: xor;
	}
	@media (prefers-reduced-motion: reduce) {
		.cursor-chip,
		.cursor-chip.is-visible {
			transition: opacity 150ms ease;
			scale: 1;
		}
	}
</style>
