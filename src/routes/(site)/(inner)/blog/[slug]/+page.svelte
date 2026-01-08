<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { Post } from '$lib/types';
	import '$lib/prose-styles.css';
	import { onMount } from 'svelte';

	let { data } = $props<{
		data: {
			content: any;
			meta: {
				title: string;
				description: string;
				date: string;
				tags: string[];
				image?: string;
				slug: string;
			};
			relatedPosts: (Post & { relevance: number })[];
		};
	}>();

	const { content, meta, relatedPosts } = data;

	let scrollProgress = $state(0);
	let articleEl: HTMLElement;

	onMount(() => {
		const updateProgress = () => {
			if (!articleEl) return;
			const rect = articleEl.getBoundingClientRect();
			const articleHeight = articleEl.offsetHeight;
			const viewportHeight = window.innerHeight;
			const scrolled = Math.max(0, -rect.top);
			const total = articleHeight - viewportHeight;
			scrollProgress = Math.min(1, Math.max(0, scrolled / total));
		};

		window.addEventListener('scroll', updateProgress, { passive: true });
		updateProgress();

		return () => window.removeEventListener('scroll', updateProgress);
	});
</script>

<svelte:head>
	<title>{meta.title} - Farhan's Blog</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://farhana.li/blog/${meta.slug}`} />
	{#if meta.image}
		<meta property="og:image" content={meta.image} />
		<meta name="twitter:image" content={meta.image} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta property="article:published_time" content={new Date(meta.date).toISOString()} />
	<meta property="article:tag" content={meta.tags.join(',')} />
	<link rel="canonical" href={`https://farhana.li/blog/${meta.slug}`} />
</svelte:head>

<!-- Reading Progress Bar -->
<div class="progress-container">
	<div class="progress-bar" style="transform: scaleX({scrollProgress})"></div>
	<div class="progress-glow" style="left: {scrollProgress * 100}%"></div>
</div>

<div class="blog-wrapper">
	<!-- Scanline overlay -->
	<div class="scanlines"></div>

	<!-- Grid background -->
	<div class="grid-bg"></div>

	<div class="container mx-auto max-w-4xl px-4 py-16 relative z-10">
		<!-- Back navigation -->
		<div class="mb-12 animate-slide-in">
			<a href="/blog" class="back-link group">
				<div class="back-link-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="transition-transform duration-300 group-hover:-translate-x-1"
					>
						<path d="m15 18-6-6 6-6"></path>
					</svg>
				</div>
				<span class="back-link-text">RETURN_TO_INDEX</span>
				<div class="back-link-line"></div>
			</a>
		</div>

		<article bind:this={articleEl} class="article-container animate-fade-in">
			<!-- Geometric corner decorations -->
			<div class="corner-decor top-left"></div>
			<div class="corner-decor top-right"></div>
			<div class="corner-decor bottom-left"></div>
			<div class="corner-decor bottom-right"></div>

			<!-- Featured image with glitch effect on hover -->
			{#if meta.image}
				<div class="image-container">
					<img
						src={meta.image}
						alt={meta.title}
						class="featured-image"
					/>
					<div class="image-overlay"></div>
					<div class="image-scanlines"></div>
				</div>
			{/if}

			<!-- Header section -->
			<header class="article-header">
				<!-- Terminal-style date display -->
				<div class="terminal-date">
					<span class="terminal-prompt">></span>
					<span class="terminal-cmd">log.date</span>
					<span class="terminal-output">{formatDate(meta.date)}</span>
					<span class="cursor-blink">_</span>
				</div>

				<!-- Glowing title -->
				<h1 class="article-title">
					<span class="title-text">{meta.title}</span>
					<span class="title-glow" aria-hidden="true">{meta.title}</span>
				</h1>

				<!-- Tags as chips -->
				<div class="tags-container">
					{#each meta.tags as tag, i}
						<a
							href="/blog/category/{tag}"
							class="tag-chip"
							style="animation-delay: {i * 0.1}s"
						>
							<span class="tag-hash">#</span>{tag}
						</a>
					{/each}
				</div>
			</header>

			<!-- Main content -->
			<div class="content-wrapper">
				<div class="content-border"></div>
				<div class="prose prose-lg prose-invert max-w-none blog-content">
					{@render content()}
				</div>
			</div>
		</article>

		<!-- Related Posts -->
		{#if relatedPosts.length > 0}
			<section class="related-section animate-slide-up">
				<div class="section-header">
					<div class="header-line"></div>
					<h2 class="section-title">
						<span class="title-bracket">[</span>
						RELATED_NODES
						<span class="title-bracket">]</span>
					</h2>
					<div class="header-line"></div>
				</div>

				<div class="related-grid">
					{#each relatedPosts as post, i}
						<a
							href="/blog/{post.slug}"
							class="related-card group"
							style="animation-delay: {i * 0.15}s"
						>
							<div class="card-border"></div>
							<div class="card-content">
								<time class="card-date">
									{formatDate(post.date)}
								</time>
								<h3 class="card-title">{post.title}</h3>
								<div class="card-tags">
									{#each post.tags.slice(0, 3) as tag}
										<span class="mini-tag">#{tag}</span>
									{/each}
								</div>
								{#if post.description}
									<p class="card-description">{post.description}</p>
								{/if}
								<div class="card-footer">
									<span class="relevance-indicator">
										<span class="relevance-dot"></span>
										{post.relevance} match{post.relevance === 1 ? '' : 'es'}
									</span>
									<span class="read-more">
										ACCESS
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="m9 18 6-6-6-6"></path>
										</svg>
									</span>
								</div>
							</div>
							<div class="card-glitch"></div>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>

<style>
	/* CSS Variables for the retro-futuristic theme */
	:global(:root) {
		--neon-cyan: #00f0ff;
		--neon-magenta: #ff00ff;
		--neon-blue: #219eff;
		--dark-bg: #0a0a0f;
		--darker-bg: #050508;
		--grid-color: rgba(0, 240, 255, 0.03);
	}

	/* Progress Bar */
	.progress-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--darker-bg);
		z-index: 100;
		overflow: visible;
	}

	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta));
		transform-origin: left;
		transition: transform 0.1s linear;
	}

	.progress-glow {
		position: absolute;
		top: 0;
		width: 100px;
		height: 3px;
		background: radial-gradient(ellipse at center, var(--neon-cyan), transparent);
		filter: blur(8px);
		transform: translateX(-50%);
	}

	/* Main wrapper */
	.blog-wrapper {
		position: relative;
		min-height: 100vh;
		background: var(--dark-bg);
		overflow: hidden;
	}

	/* Scanline effect */
	.scanlines {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 50;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(0, 0, 0, 0.1) 2px,
			rgba(0, 0, 0, 0.1) 4px
		);
		opacity: 0.3;
	}

	/* Grid background */
	.grid-bg {
		position: fixed;
		inset: 0;
		background-image:
			linear-gradient(var(--grid-color) 1px, transparent 1px),
			linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
		background-size: 50px 50px;
		mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
		pointer-events: none;
	}

	/* Back link */
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.25rem;
		background: rgba(0, 240, 255, 0.05);
		border: 1px solid rgba(0, 240, 255, 0.2);
		color: var(--neon-cyan);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		transition: all 0.3s ease;
		position: relative;
		clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
	}

	.back-link:hover {
		background: rgba(0, 240, 255, 0.1);
		border-color: var(--neon-cyan);
		box-shadow:
			0 0 20px rgba(0, 240, 255, 0.3),
			inset 0 0 20px rgba(0, 240, 255, 0.1);
	}

	.back-link-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-link-text {
		position: relative;
	}

	.back-link-line {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, var(--neon-cyan), transparent);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	.back-link:hover .back-link-line {
		transform: scaleX(1);
	}

	/* Article container */
	.article-container {
		position: relative;
		background: linear-gradient(180deg, rgba(10, 10, 15, 0.9) 0%, rgba(5, 5, 8, 0.95) 100%);
		border: 1px solid rgba(0, 240, 255, 0.15);
		overflow: hidden;
	}

	/* Corner decorations */
	.corner-decor {
		position: absolute;
		width: 30px;
		height: 30px;
		border: 2px solid var(--neon-cyan);
		opacity: 0.5;
		z-index: 10;
	}

	.corner-decor.top-left {
		top: -1px;
		left: -1px;
		border-right: none;
		border-bottom: none;
	}

	.corner-decor.top-right {
		top: -1px;
		right: -1px;
		border-left: none;
		border-bottom: none;
	}

	.corner-decor.bottom-left {
		bottom: -1px;
		left: -1px;
		border-right: none;
		border-top: none;
	}

	.corner-decor.bottom-right {
		bottom: -1px;
		right: -1px;
		border-left: none;
		border-top: none;
	}

	/* Image container */
	.image-container {
		position: relative;
		width: 100%;
		height: 350px;
		overflow: hidden;
	}

	.featured-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease, filter 0.3s ease;
	}

	.image-container:hover .featured-image {
		transform: scale(1.05);
		filter: saturate(1.2) contrast(1.1);
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			transparent 0%,
			rgba(10, 10, 15, 0.3) 50%,
			rgba(10, 10, 15, 0.9) 100%
		);
		pointer-events: none;
	}

	.image-scanlines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(0, 240, 255, 0.02) 2px,
			rgba(0, 240, 255, 0.02) 4px
		);
		pointer-events: none;
	}

	/* Article header */
	.article-header {
		padding: 2.5rem 2rem;
		border-bottom: 1px solid rgba(0, 240, 255, 0.1);
		position: relative;
	}

	.article-header::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 2rem;
		right: 2rem;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-magenta), transparent);
		opacity: 0.5;
	}

	/* Terminal date */
	.terminal-date {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.terminal-prompt {
		color: var(--neon-magenta);
	}

	.terminal-cmd {
		color: var(--neon-cyan);
	}

	.terminal-output {
		color: rgba(255, 255, 255, 0.8);
		padding-left: 0.5rem;
		border-left: 1px solid rgba(255, 255, 255, 0.2);
	}

	.cursor-blink {
		color: var(--neon-cyan);
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	/* Article title */
	.article-title {
		position: relative;
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 1.5rem;
	}

	.title-text {
		position: relative;
		z-index: 1;
		background: linear-gradient(135deg, #ffffff 0%, var(--neon-cyan) 50%, var(--neon-magenta) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.title-glow {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		color: var(--neon-cyan);
		filter: blur(20px);
		opacity: 0.4;
		-webkit-text-fill-color: var(--neon-cyan);
	}

	/* Tags */
	.tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.tag-chip {
		display: inline-flex;
		align-items: center;
		padding: 0.4rem 1rem;
		background: rgba(0, 240, 255, 0.08);
		border: 1px solid rgba(0, 240, 255, 0.3);
		color: var(--neon-cyan);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		transition: all 0.3s ease;
		animation: tag-appear 0.5s ease forwards;
		opacity: 0;
		transform: translateY(10px);
	}

	@keyframes tag-appear {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.tag-chip:hover {
		background: rgba(0, 240, 255, 0.15);
		border-color: var(--neon-cyan);
		box-shadow:
			0 0 15px rgba(0, 240, 255, 0.4),
			inset 0 0 15px rgba(0, 240, 255, 0.1);
		transform: translateY(-2px);
	}

	.tag-hash {
		color: var(--neon-magenta);
		margin-right: 0.25rem;
	}

	/* Content wrapper */
	.content-wrapper {
		position: relative;
		padding: 3rem 2rem;
	}

	.content-border {
		position: absolute;
		top: 2rem;
		left: 1rem;
		bottom: 2rem;
		width: 2px;
		background: linear-gradient(180deg, var(--neon-cyan), var(--neon-magenta), transparent);
		opacity: 0.3;
	}

	/* Blog content styling */
	.blog-content {
		padding-left: 1.5rem;
	}

	.blog-content :global(h1),
	.blog-content :global(h2),
	.blog-content :global(h3),
	.blog-content :global(h4) {
		color: var(--neon-cyan) !important;
		font-family: var(--font-display);
		position: relative;
		margin-top: 2.5rem;
	}

	.blog-content :global(h2)::before {
		content: '//';
		color: var(--neon-magenta);
		margin-right: 0.5rem;
		opacity: 0.7;
	}

	.blog-content :global(p) {
		color: rgba(255, 255, 255, 0.85);
		line-height: 1.8;
		font-size: 1.1rem;
	}

	.blog-content :global(a) {
		color: var(--neon-cyan) !important;
		text-decoration: none;
		border-bottom: 1px solid rgba(0, 240, 255, 0.3);
		transition: all 0.2s ease;
	}

	.blog-content :global(a:hover) {
		border-bottom-color: var(--neon-cyan);
		text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
	}

	.blog-content :global(code:not(pre code)) {
		background: rgba(0, 240, 255, 0.1) !important;
		border: 1px solid rgba(0, 240, 255, 0.2);
		color: var(--neon-cyan) !important;
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9em;
	}

	.blog-content :global(pre) {
		background: rgba(5, 5, 8, 0.9) !important;
		border: 1px solid rgba(0, 240, 255, 0.2) !important;
		position: relative;
	}

	.blog-content :global(pre)::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta));
	}

	.blog-content :global(blockquote) {
		border-left: 3px solid var(--neon-magenta) !important;
		background: rgba(255, 0, 255, 0.05) !important;
		font-style: italic;
		position: relative;
	}

	.blog-content :global(blockquote)::before {
		content: '"';
		position: absolute;
		top: -10px;
		left: 10px;
		font-size: 4rem;
		color: var(--neon-magenta);
		opacity: 0.2;
		font-family: Georgia, serif;
	}

	.blog-content :global(strong) {
		color: white !important;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
	}

	.blog-content :global(ul),
	.blog-content :global(ol) {
		padding-left: 1.5rem;
	}

	.blog-content :global(li) {
		position: relative;
		padding-left: 0.5rem;
	}

	.blog-content :global(li::marker) {
		color: var(--neon-cyan);
	}

	.blog-content :global(hr) {
		border: none;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-magenta), transparent);
		margin: 3rem 0;
	}

	.blog-content :global(img) {
		border: 1px solid rgba(0, 240, 255, 0.2) !important;
		box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
	}

	/* Related section */
	.related-section {
		margin-top: 5rem;
		padding-top: 3rem;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.header-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3));
	}

	.header-line:last-child {
		background: linear-gradient(90deg, rgba(0, 240, 255, 0.3), transparent);
	}

	.section-title {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		letter-spacing: 0.2em;
		color: var(--neon-cyan);
		text-transform: uppercase;
		white-space: nowrap;
	}

	.title-bracket {
		color: var(--neon-magenta);
	}

	/* Related grid */
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	/* Related card */
	.related-card {
		position: relative;
		display: block;
		background: rgba(10, 10, 15, 0.8);
		border: 1px solid rgba(0, 240, 255, 0.15);
		overflow: hidden;
		animation: card-appear 0.6s ease forwards;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.3s ease;
	}

	@keyframes card-appear {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.related-card:hover {
		border-color: var(--neon-cyan);
		transform: translateY(-5px);
		box-shadow:
			0 10px 40px rgba(0, 240, 255, 0.15),
			0 0 0 1px rgba(0, 240, 255, 0.1);
	}

	.card-border {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta));
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	.related-card:hover .card-border {
		transform: scaleX(1);
	}

	.card-content {
		padding: 1.5rem;
		position: relative;
		z-index: 1;
	}

	.card-date {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--neon-magenta);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.card-title {
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		color: white;
		margin: 0.75rem 0;
		line-height: 1.3;
		transition: color 0.3s ease;
	}

	.related-card:hover .card-title {
		color: var(--neon-cyan);
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.mini-tag {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: rgba(0, 240, 255, 0.7);
		background: rgba(0, 240, 255, 0.08);
		padding: 0.2rem 0.5rem;
		border-radius: 2px;
	}

	.card-description {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.relevance-indicator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.4);
	}

	.relevance-dot {
		width: 6px;
		height: 6px;
		background: var(--neon-cyan);
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.5); }
		50% { opacity: 0.7; box-shadow: 0 0 0 5px rgba(0, 240, 255, 0); }
	}

	.read-more {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--neon-cyan);
		letter-spacing: 0.1em;
		opacity: 0;
		transform: translateX(-10px);
		transition: all 0.3s ease;
	}

	.related-card:hover .read-more {
		opacity: 1;
		transform: translateX(0);
	}

	.card-glitch {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			45deg,
			transparent 0%,
			rgba(0, 240, 255, 0.03) 50%,
			transparent 100%
		);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.related-card:hover .card-glitch {
		opacity: 1;
	}

	/* Animations */
	.animate-slide-in {
		animation: slideIn 0.6s ease forwards;
	}

	.animate-fade-in {
		animation: fadeIn 0.8s ease forwards;
	}

	.animate-slide-up {
		animation: slideUp 0.6s ease forwards;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(-20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Responsive */
	@media (max-width: 768px) {
		.article-header {
			padding: 1.5rem 1.25rem;
		}

		.content-wrapper {
			padding: 2rem 1.25rem;
		}

		.content-border {
			display: none;
		}

		.blog-content {
			padding-left: 0;
		}

		.image-container {
			height: 250px;
		}

		.corner-decor {
			width: 20px;
			height: 20px;
		}
	}
</style>
