<script lang="ts">
	import { onMount } from 'svelte';
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

	// The strip shrinks as you scroll into it: 1 at the start, down to a floor.
	const SCALE_FLOOR = 0.68;
	const SCALE_DISTANCE = 4400;

	const shortName = (p: Project) => p.title.split(':')[0];
	const tagline = (p: Project) => p.description.split(/\.\s/)[0] + '.';

	function measure() {
		if (!track || !section || !minimap) return;
		travel = Math.max(0, track.scrollWidth - section.clientWidth);
		minimapW = minimap.clientWidth;
		update();
	}

	let targetScale = 1;
	let raf = 0;

	function update() {
		if (!section) return;
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
		if (!section) return;
		const top = section.getBoundingClientRect().top + window.scrollY;
		window.scrollTo({ top: top + (i / (projects.length - 1)) * travel, behavior: 'smooth' });
	}

	function tickOpacity(i: number) {
		const cx = (i / (TICKS - 1)) * minimapW;
		return cx >= trackerX - 2 && cx <= trackerX + TRACKER_W + 2 ? 0 : 1;
	}

	onMount(() => {
		measure();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', measure);
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
			window.removeEventListener('resize', measure);
			cancelAnimationFrame(raf);
		};
	});
</script>

<section
	class="strip"
	class:revealed
	bind:this={section}
	style="height: calc(100svh + {travel}px)"
	aria-labelledby="projects-strip-heading"
>
	<div class="viewport" bind:this={viewport}>
		<div class="strip-head">
			<h2 id="projects-strip-heading">Projects</h2>
			<div class="minimap" bind:this={minimap} aria-hidden="true">
				{#each Array(TICKS) as _, i}
					<span class="tick" style="opacity: {tickOpacity(i)}"></span>
				{/each}
				<span class="tracker" style="transform: translateX({trackerX}px)"></span>
			</div>
			<a class="all" href="/projects">View all</a>
		</div>

		<div
			class="track"
			bind:this={track}
			style="transform: translate3d({x}px, 0, 0) scale({scale}); transform-origin: {originX}px 50%; --inv: {1 /
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
	</div>
</section>

<style>
	.strip {
		--ease-out-soft: cubic-bezier(0.25, 1, 0.5, 1);
		--frame-w: min(74vw, calc(58svh * 5 / 3), 1100px);
		--gap: 40px;
		position: relative;
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

	.track {
		display: flex;
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

	@media (max-width: 700px) {
		.strip {
			--frame-w: 84vw;
			--gap: 16px;
		}
		.strip-head {
			padding: 80px 16px 0;
			flex-wrap: wrap;
		}
		.minimap {
			order: 3;
			width: 100%;
		}
		.tagline {
			max-width: 80%;
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
		.tick {
			transition: none;
		}
	}
</style>
