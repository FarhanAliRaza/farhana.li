<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { formatDate } from '$lib/utils';
	import '$lib/prose-styles.css';

	let {
		title,
		description,
		date,
		tags = [],
		image,
		backHref,
		backLabel,
		categoryPath,
		kind,
		actions,
		related,
		children
	}: {
		title: string;
		description?: string;
		date: string;
		tags?: string[];
		image?: string;
		backHref: string;
		backLabel: string;
		categoryPath?: string;
		kind: string;
		actions?: Snippet;
		related?: Snippet;
		children: Snippet;
	} = $props();
	let article: HTMLElement;
	let progress = $state(0);

	onMount(() => {
		const updateProgress = () => {
			const distance = article.offsetHeight - window.innerHeight;
			progress =
				distance > 0
					? Math.min(1, Math.max(0, -article.getBoundingClientRect().top / distance))
					: 1;
		};
		const observer = new ResizeObserver(updateProgress);
		observer.observe(article);
		window.addEventListener('scroll', updateProgress, { passive: true });
		window.addEventListener('resize', updateProgress);
		updateProgress();
		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', updateProgress);
			window.removeEventListener('resize', updateProgress);
		};
	});
</script>

<div class="reading-progress" aria-hidden="true">
	<div style:transform="scaleX({progress})"></div>
</div>
<main class="article-page">
	<div class="article-shell">
		<a class="bento-button back-link" href={backHref}
			><ArrowLeft size={16} aria-hidden="true" /> {backLabel}</a
		>
		<article bind:this={article} class="reading-card">
			<header class="reading-header">
				<div class="reading-meta">
					<span>{kind}</span><time datetime={date}>{formatDate(date)}</time>
				</div>
				<h1>{title}</h1>
				{#if description}<p class="reading-description">{description}</p>{/if}
				<div class="bento-card__tags">
					{#each tags as tag}
						{#if categoryPath}<a class="bento-tag" href="{categoryPath}/{encodeURIComponent(tag)}"
								>{tag}</a
							>{:else}<span class="bento-tag">{tag}</span>{/if}
					{/each}
				</div>
				{#if actions}<div class="reading-actions">{@render actions()}</div>{/if}
			</header>
			{#if image}<img class="reading-cover" src={image} alt={title} />{/if}
			<div class="reading-body">
				<div class="bento-prose prose prose-invert">{@render children()}</div>
			</div>
		</article>
		{#if related}<div class="reading-related">{@render related()}</div>{/if}
	</div>
</main>

<style>
	.article-page {
		padding: 108px var(--bento-gutter) 80px;
		background: #08070c;
		min-height: 100vh;
		color: #f5f1fa;
	}
	.article-shell {
		max-width: 1080px;
		margin-inline: auto;
		min-width: 0;
	}
	.back-link {
		margin-bottom: 24px;
	}
	.reading-card {
		border: 1px solid var(--bento-border);
		border-radius: var(--bento-radius);
		background: var(--bento-surface);
		overflow: hidden;
	}
	.reading-header {
		padding: clamp(24px, 4vw, 56px);
		border-bottom: 1px solid var(--bento-border);
	}
	.reading-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 24px;
		color: #cdb7df;
		font-size: 12px;
		margin-bottom: 24px;
	}
	.reading-meta > span {
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}
	h1 {
		max-width: 900px;
		font-size: clamp(2rem, 4vw, 3.8rem);
		letter-spacing: -0.045em;
		line-height: 1.12;
		font-weight: 600;
		overflow-wrap: anywhere;
		margin-bottom: 24px;
		text-wrap: balance;
	}
	.reading-description {
		max-width: 720px;
		font-size: clamp(15px, 1.5vw, 18px);
		line-height: 1.8;
		color: var(--bento-muted);
		margin-bottom: 24px;
	}
	.reading-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 24px;
	}
	.reading-cover {
		display: block;
		width: 100%;
		max-height: 540px;
		object-fit: contain;
		background: #0a0810;
	}
	.reading-body {
		padding: clamp(22px, 4vw, 56px);
	}
	.reading-related {
		margin-top: 48px;
	}
	.reading-progress {
		position: fixed;
		inset: 0 0 auto;
		height: 3px;
		z-index: 100;
		pointer-events: none;
	}
	.reading-progress div {
		height: 100%;
		transform-origin: left;
		background: #e9c2ff;
	}
	.article-page :global(a:focus-visible) {
		outline: 2px solid #e9c2ff;
		outline-offset: 4px;
	}
	@media (max-width: 639px) {
		.article-page {
			padding-top: 92px;
			padding-bottom: 48px;
		}
	}
</style>
