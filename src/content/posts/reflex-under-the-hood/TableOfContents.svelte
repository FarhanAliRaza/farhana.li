<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft, ChevronDown } from 'lucide-svelte';

	const chapters = [
		['app', 'The app'],
		['architecture', 'Architecture'],
		['compile', 'Compilation'],
		['load', 'First load'],
		['browser-events', 'Browser event loop'],
		['explorer', 'Follow a click'],
		['representations', 'Data formats'],
		['capture', 'Real messages'],
		['server', 'Server internals'],
		['render', 'React updates'],
		['routing', 'Routing'],
		['sessions', 'Sessions & storage'],
		['advanced', 'Other paths'],
		['debug', 'Inspect it yourself'],
		['sources', 'Source map']
	];
	let active = $state('');
	let expanded = $state(false);
	let toggle: HTMLButtonElement;

	onMount(() => {
		const sections = chapters.map(([id]) => document.getElementById(id));
		let frame = 0;
		const update = () => {
			frame = 0;
			let current = '';
			for (const section of sections) {
				if (section && section.getBoundingClientRect().top <= 150) current = section.id;
			}
			active = current;
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		const observer = new ResizeObserver(schedule);
		const article = document.querySelector('.reflex-walkthrough');
		if (article) observer.observe(article);
		update();
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			observer.disconnect();
		};
	});

	function select(id: string) {
		active = id;
		expanded = false;
		if (matchMedia('(max-width: 850px)').matches) toggle.focus({ preventScroll: true });
	}
</script>

<aside class="article-toc" aria-label="Article contents" data-expanded={expanded}>
	<p class="toc-heading">On this page</p>
	<button
		class="toc-toggle"
		bind:this={toggle}
		aria-expanded={expanded}
		aria-controls="walkthrough-chapters"
		onclick={() => (expanded = !expanded)}
	>
		<span>On this page</span><ChevronDown size={16} aria-hidden="true" />
	</button>
	<nav id="walkthrough-chapters" aria-label="Guide chapters">
		{#each chapters as [id, label], i}
			<a
				href={`#${id}`}
				aria-current={active === id ? 'location' : undefined}
				onclick={() => select(id)}
			>
				<span class="toc-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
				<span>{label}</span>
			</a>
		{/each}
	</nav>
	<a class="toc-back" href="/blog"><ArrowLeft size={13} aria-hidden="true" /> All articles</a>
</aside>

<style>
	.article-toc {
		position: fixed;
		inset: 116px auto auto 28px;
		z-index: 10;
		display: flex;
		flex-direction: column;
		width: 208px;
		max-height: calc(100dvh - 144px);
		font-family: 'Public Sans', sans-serif;
	}
	.article-toc .toc-heading {
		margin: 0 0 18px 13px;
		color: #827a8b;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.14em;
		line-height: 1.5;
		text-transform: uppercase;
	}
	.article-toc nav {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: stretch;
		gap: 2px;
		min-height: 0;
		margin: 0;
		padding: 0 8px 0 0;
		border: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: thin;
		scrollbar-color: #332c3b transparent;
	}
	.article-toc nav a {
		position: relative;
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 32px;
		padding: 6px 10px 6px 13px;
		border-left: 1px solid #27232c;
		border-radius: 0 6px 6px 0;
		color: #9c95a5;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;
		text-decoration: none;
		transition:
			color 120ms,
			background-color 120ms;
	}
	.article-toc .toc-number {
		flex: 0 0 15px;
		color: #5d5567;
		font-family: 'Chivo Mono', monospace;
		font-size: 9px;
		font-variant-numeric: tabular-nums;
	}
	.article-toc nav a:hover {
		background: #100d16;
		color: #eee8f5;
	}
	.article-toc nav a[aria-current='location'] {
		border-left-color: #e9c2ff;
		background: #1b1323;
		color: #f0d9ff;
	}
	.article-toc nav a[aria-current='location'] .toc-number {
		color: #c69fdc;
	}
	.article-toc .toc-back {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
		margin-top: 20px;
		padding: 14px 0 0 13px;
		border-top: 1px solid #211c28;
		color: #827a8b;
		font-size: 11px;
		text-decoration: none;
	}
	.article-toc .toc-back:hover {
		color: #e9c2ff;
	}
	.article-toc :focus-visible {
		outline: 2px solid #e9c2ff;
		outline-offset: -2px;
	}
	.article-toc .toc-toggle {
		display: none;
	}
	@media (max-width: 1100px) {
		.article-toc {
			left: 20px;
			width: 180px;
		}
	}
	@media (max-width: 850px) {
		.article-toc {
			position: relative;
			inset: auto;
			width: auto;
			max-height: none;
			margin: 12px 20px 0;
			padding: 0;
			border: 1px solid #28222f;
			border-radius: 10px;
			background: #09070d;
		}
		.article-toc .toc-heading,
		.article-toc .toc-back {
			display: none;
		}
		.article-toc .toc-toggle {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			min-height: 48px;
			padding: 12px 16px;
			border: 0;
			border-radius: 10px;
			background: transparent;
			color: #cfc3db;
			font-size: 12px;
		}
		.article-toc nav {
			display: none;
			max-height: 55dvh;
			padding: 0 12px 12px;
		}
		.article-toc[data-expanded='true'] nav {
			display: flex;
		}
		.article-toc[data-expanded='true'] .toc-toggle :global(svg) {
			transform: rotate(180deg);
		}
		.article-toc nav a {
			min-height: 44px;
			font-size: 13px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.article-toc nav a {
			transition: none;
		}
	}
	@media print {
		.article-toc {
			display: none;
		}
	}
</style>
