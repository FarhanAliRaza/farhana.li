<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import type { Project } from '$lib/types';

	let { projects } = $props<{ projects: Project[] }>();

	const TICKS = 24;
	const TRACKER_W = 30;

	let section = $state<HTMLElement>();
	let track = $state<HTMLDivElement>();
	let viewport = $state<HTMLDivElement>();
	let minimap = $state<HTMLDivElement>();

	let travel = $state(0); // horizontal distance the strip needs to move
	let x = $state(0);
	let scale = $state(1);
	let originX = $state(0);
	let progress = $state(0);
	let trackerX = $state(0);
	let minimapW = $state(0);
	let revealed = $state(false);
	let nativeScroll = $state(false);
	let reducedMotion = false;

	// The strip shrinks as you scroll into it: 1 at the start, down to a floor.
	const SCALE_FLOOR = 0.68;
	const SCALE_DISTANCE = 4400;

	const shortName = (p: Project) => p.title.split(':')[0];
	const tagline = (p: Project) => p.description.split(/\.\s/)[0] + '.';

	function measure() {
		if (!track || !section || !minimap) return;
		travel = Math.max(
			0,
			track.scrollWidth - (nativeScroll ? track.clientWidth : section.clientWidth)
		);
		minimapW = minimap.clientWidth;
		update();
	}

	let targetScale = 1;
	let raf = 0;

	function update() {
		if (!section) return;
		if (nativeScroll) {
			x = 0;
			scale = targetScale = 1;
			progress = travel && track ? Math.min(1, Math.max(0, track.scrollLeft / travel)) : 0;
			trackerX = progress * Math.max(0, minimapW - TRACKER_W);
			return;
		}
		const top = section.getBoundingClientRect().top + window.scrollY;
		const y = window.scrollY;
		progress = travel ? Math.min(1, Math.max(0, (y - top) / travel)) : 0;
		x = -progress * travel;
		originX = section.clientWidth / 2 - x; // scale around the viewport centre
		trackerX = progress * (minimapW - TRACKER_W);

		const scrolled = Math.max(0, y - top);
		targetScale = Math.max(SCALE_FLOOR, 1 - scrolled / SCALE_DISTANCE);
		if (!raf) raf = requestAnimationFrame(settle);
	}

	function settle() {
		raf = 0;
		scale += (targetScale - scale) * 0.14;
		if (Math.abs(targetScale - scale) > 0.0005) raf = requestAnimationFrame(settle);
		else scale = targetScale;
	}

	function scrollToFrame(i: number) {
		if (!section || !track || projects.length < 2) return;
		const behavior = reducedMotion ? 'instant' : 'smooth';
		if (nativeScroll) {
			const frames = track.querySelectorAll<HTMLElement>('.frame');
			track.scrollTo({ left: frames[i].offsetLeft - frames[0].offsetLeft, behavior });
			return;
		}
		const top = section.getBoundingClientRect().top + window.scrollY;
		window.scrollTo({ top: top + (i / (projects.length - 1)) * travel, behavior });
	}

	function stepFrame(direction: number) {
		if (!track) return;
		const frames = [...track.querySelectorAll<HTMLElement>('.frame')];
		const current = frames.reduce(
			(nearest, frame, i) =>
				Math.abs(frame.offsetLeft - frames[0].offsetLeft - track!.scrollLeft) <
				Math.abs(frames[nearest].offsetLeft - frames[0].offsetLeft - track!.scrollLeft)
					? i
					: nearest,
			0
		);
		scrollToFrame(Math.max(0, Math.min(projects.length - 1, current + direction)));
	}

	function tickOpacity(i: number) {
		const cx = (i / (TICKS - 1)) * minimapW;
		return cx >= trackerX - 2 && cx <= trackerX + TRACKER_W + 2 ? 0 : 1;
	}

	onMount(() => {
		// Match the CSS layout: compact/short viewports and reduced motion use native scrolling.
		const compact = window.matchMedia('(max-width: 1023px), (max-height: 600px)');
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		function syncLayout() {
			nativeScroll = compact.matches || reduced.matches;
			reducedMotion = reduced.matches;
			cancelAnimationFrame(raf);
			raf = 0;
			if (!nativeScroll && track) track.scrollLeft = 0;
			measure();
		}
		syncLayout();
		window.addEventListener('scroll', update, { passive: true });
		compact.addEventListener('change', syncLayout);
		reduced.addEventListener('change', syncLayout);
		const resizeObserver = new ResizeObserver(measure);
		if (section) resizeObserver.observe(section);
		if (track) resizeObserver.observe(track);
		if (minimap) resizeObserver.observe(minimap);
		// Intro plays once, the first time the strip comes into view
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					revealed = true;
					io.disconnect();
				}
			},
			{ threshold: 0.35 }
		);
		if (viewport) io.observe(viewport);
		return () => {
			io.disconnect();
			window.removeEventListener('scroll', update);
			compact.removeEventListener('change', syncLayout);
			reduced.removeEventListener('change', syncLayout);
			resizeObserver.disconnect();
			cancelAnimationFrame(raf);
		};
	});
</script>

<section
	class="strip"
	class:revealed
	bind:this={section}
	style="--travel: {travel}px"
	aria-labelledby="projects-strip-heading"
>
	<div class="viewport" bind:this={viewport}>
		<div class="strip-head">
			<h2 id="projects-strip-heading">Projects</h2>
			<div class="minimap" bind:this={minimap} aria-hidden="true">
				{#each [...Array(TICKS).keys()] as i}
					<span class="tick" style="opacity: {tickOpacity(i)}"></span>
				{/each}
				<span class="tracker" style="transform: translateX({trackerX}px)"></span>
			</div>
			<a class="all" href="/projects">View all</a>
		</div>

		<div
			class="track"
			bind:this={track}
			onscroll={() => {
				if (nativeScroll) update();
			}}
			style="--strip-x: {x}px; --strip-scale: {scale}; --strip-origin: {originX}px; --inv: {1 /
				scale}"
		>
			{#each projects as project, i}
				<a
					class="frame"
					href="/projects/{project.slug}"
					aria-label={project.title}
					onfocus={() => scrollToFrame(i)}
				>
					<span class="label">{shortName(project)} · {new Date(project.date).getFullYear()}</span>
					<div class="sheet">
						<span class="big" aria-hidden="true">{shortName(project)}</span>
						<span class="tagline">{tagline(project)}</span>
					</div>
				</a>
			{/each}
		</div>
		{#if projects.length > 1}
			<div class="strip-controls">
				<span>{Math.round(progress * (projects.length - 1)) + 1} / {projects.length}</span>
				<div>
					<button
						type="button"
						aria-label="Previous project"
						disabled={progress <= 0.001}
						onclick={() => stepFrame(-1)}><ArrowLeft size={18} aria-hidden="true" /></button
					>
					<button
						type="button"
						aria-label="Next project"
						disabled={progress >= 0.999}
						onclick={() => stepFrame(1)}><ArrowRight size={18} aria-hidden="true" /></button
					>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.strip {
		--ease-out-soft: cubic-bezier(0.25, 1, 0.5, 1);
		--frame-w: min(74vw, calc(58svh * 5 / 3), 1100px);
		--gap: 40px;
		position: relative;
		min-width: 0;
		height: calc(100svh + var(--travel, 0px));
		color: #f5f1fa;
	}
	.viewport {
		position: sticky;
		top: 0;
		height: 100svh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.strip-head {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		max-width: 1240px;
		margin: 0 auto;
		padding: 96px 28px 0;
	}
	h2 {
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.03em;
	}
	.all {
		font-size: 13px;
		color: #bdb2ca;
	}
	.all:hover {
		color: #f1d7ff;
	}

	/* Minimap: a ruler of ticks with a tracker box sliding across it */
	.minimap {
		position: relative;
		display: flex;
		justify-content: space-between;
		width: 200px;
		height: 18px;
	}
	.tick {
		width: 1px;
		height: 100%;
		background: #6f6880;
		transition: opacity 150ms;
	}
	.tracker {
		position: absolute;
		top: 0;
		left: 0;
		width: 30px;
		height: 100%;
		box-shadow: inset 0 0 0 1px #e9c2ff;
		border-radius: 2px;
	}

	.strip-controls {
		display: none;
	}
	.track {
		position: relative;
		display: flex;
		transform: translate3d(var(--strip-x, 0px), 0, 0) scale(var(--strip-scale, 1));
		transform-origin: var(--strip-origin, 0px) 50%;
		gap: var(--gap);
		padding-left: calc((100vw - var(--frame-w)) / 2);
		padding-right: calc((100vw - var(--frame-w)) / 2);
		width: max-content;
		will-change: transform;
		opacity: 0;
	}
	.revealed .track {
		animation: strip-in 400ms ease-out both;
	}
	.frame {
		position: relative;
		flex: 0 0 var(--frame-w);
		min-width: 0;
		text-decoration: none;
		color: inherit;
	}
	.revealed .frame:first-child {
		animation: frame-pop 1.7s cubic-bezier(0.16, 1, 0.3, 1) both;
		transform-origin: center;
	}
	/* Labels counter-scale so they stay the same size while the strip shrinks */
	.label {
		position: absolute;
		top: calc(-28px * var(--inv, 1));
		left: 0;
		font-size: 12px;
		color: #9993a5;
		white-space: nowrap;
		transform: scale(var(--inv, 1));
		transform-origin: 0 100%;
	}
	@keyframes strip-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes frame-pop {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}
	.sheet {
		position: relative;
		aspect-ratio: 5 / 3;
		width: 100%;
		overflow: hidden;
		border: 1px solid rgba(235, 168, 255, 0.14);
		border-radius: 4px;
		background: rgba(15, 12, 22, 0.96);
		transition: border-color 200ms;
	}
	.frame:hover .sheet {
		border-color: rgba(235, 168, 255, 0.4);
	}
	.big {
		position: absolute;
		left: 4%;
		top: 50%;
		transform: translateY(-50%);
		font-family: var(--font-display);
		font-size: calc(var(--frame-w) * 0.34);
		font-weight: 600;
		line-height: 1;
		letter-spacing: -0.06em;
		white-space: nowrap;
		color: #f5f1fa;
		transition: transform 900ms var(--ease-out-soft);
	}
	.frame:hover .big {
		transform: translate(-3%, -50%);
	}
	.tagline {
		position: absolute;
		left: 4%;
		bottom: 5%;
		max-width: 60%;
		font-size: 13px;
		line-height: 1.5;
		color: #b5aebf;
	}
	a:focus-visible .sheet {
		outline: 2px solid #e9c2ff;
		outline-offset: 4px;
	}

	@media (max-width: 1023px), (max-height: 600px), (prefers-reduced-motion: reduce) {
		.strip {
			--frame-w: min(84vw, 560px);
			--gap: 16px;
			height: auto;
			padding-block: 36px;
		}
		.viewport {
			position: relative;
			height: auto;
			overflow: visible;
		}
		.strip-head {
			position: static;
			width: 100%;
			max-width: none;
			padding: 0 var(--bento-gutter) 24px;
			gap: 20px;
			flex-wrap: wrap;
		}
		h2 {
			font-size: clamp(1.8rem, 5vw, 2.5rem);
		}
		.all {
			display: inline-flex;
			align-items: center;
			min-height: 44px;
			flex-shrink: 0;
		}
		.minimap {
			order: 3;
			width: 100%;
			height: 14px;
		}
		.track {
			width: 100%;
			padding: 4px var(--bento-gutter) 16px;
			overflow-x: auto;
			overscroll-behavior-x: contain;
			scroll-snap-type: x mandatory;
			scroll-padding-inline: var(--bento-gutter);
			scrollbar-width: none;
			transform: none;
			will-change: auto;
			opacity: 1;
		}
		.track::-webkit-scrollbar {
			display: none;
		}
		.frame {
			display: flex;
			flex-direction: column;
			gap: 12px;
			scroll-snap-align: start;
		}
		.revealed .frame:first-child {
			animation: none;
		}
		.label {
			position: static;
			transform: none;
			white-space: normal;
			overflow-wrap: anywhere;
		}
		.sheet {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			gap: 40px;
			min-height: 240px;
			aspect-ratio: auto;
			padding: clamp(20px, 4vw, 32px);
			border-radius: var(--bento-radius);
		}
		.big {
			position: static;
			transform: none;
			font-size: clamp(1.75rem, 7vw, 3.5rem);
			line-height: 1.1;
			white-space: normal;
			overflow-wrap: anywhere;
		}
		.frame:hover .big {
			transform: none;
		}
		.tagline {
			position: static;
			max-width: none;
			font-size: 14px;
			overflow-wrap: anywhere;
		}
		.strip-controls {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 16px;
			padding: 4px var(--bento-gutter) 0;
			color: var(--bento-muted);
			font-family: var(--font-mono);
			font-size: 12px;
		}
		.strip-controls > div {
			display: flex;
			gap: 8px;
		}
		.strip-controls button {
			display: grid;
			place-items: center;
			width: 44px;
			height: 44px;
			border: 1px solid var(--bento-border);
			border-radius: 50%;
			background: var(--bento-surface);
			color: var(--bento-accent);
			transition:
				background 180ms,
				scale 400ms var(--bento-spring);
		}
		.strip-controls button:disabled {
			opacity: 0.35;
		}
		.strip-controls button:enabled:hover {
			background: #30203e;
		}
		.strip-controls button:enabled:active {
			scale: 0.94;
		}
		button:focus-visible,
		.all:focus-visible {
			outline: 2px solid var(--bento-accent);
			outline-offset: 4px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.track {
			opacity: 1;
		}
		.revealed .track,
		.revealed .frame:first-child {
			animation: none;
		}
		.big,
		.tick,
		.strip-controls button {
			transition: none;
		}
		.strip-controls button:enabled:active {
			scale: none;
		}
	}
</style>
