<script lang="ts">
	import { formatDate } from '$lib/utils';
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
				github?: string;
				demo?: string;
				slug: string;
			};
		};
	}>();

	const { content, meta } = data;

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
	<title>{meta.title} - Project - Farhan's Portfolio</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={`${meta.title} - Project - Farhan's Portfolio`} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://farhana.li/projects/${meta.slug}`} />
	{#if meta.image}
		<meta property="og:image" content={meta.image} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${meta.title} - Project - Farhan's Portfolio`} />
	<meta name="twitter:description" content={meta.description} />
	{#if meta.image}
		<meta name="twitter:image" content={meta.image} />
	{/if}
	<meta property="article:published_time" content={new Date(meta.date).toISOString()} />
	<meta property="article:tag" content={meta.tags.join(',')} />
	<link rel="canonical" href={`https://farhana.li/projects/${meta.slug}`} />
</svelte:head>

<!-- Reading Progress Bar -->
<div class="progress-container">
	<div class="progress-bar" style="transform: scaleX({scrollProgress})"></div>
	<div class="progress-glow" style="left: {scrollProgress * 100}%"></div>
</div>

<div class="project-wrapper">
	<!-- Scanline overlay -->
	<div class="scanlines"></div>

	<!-- Grid background -->
	<div class="grid-bg"></div>

	<div class="container mx-auto max-w-5xl px-4 py-16 relative z-10">
		<!-- Back navigation -->
		<div class="mb-12 animate-slide-in">
			<a href="/projects" class="back-link group">
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
				<span class="back-link-text">RETURN_TO_PROJECTS</span>
				<div class="back-link-line"></div>
			</a>
		</div>

		<article bind:this={articleEl} class="article-container animate-fade-in">
			<!-- Geometric corner decorations -->
			<div class="corner-decor top-left"></div>
			<div class="corner-decor top-right"></div>
			<div class="corner-decor bottom-left"></div>
			<div class="corner-decor bottom-right"></div>

			<!-- Featured image -->
			{#if meta.image}
				<div class="image-container">
					<img
						src={meta.image}
						alt={meta.title}
						class="featured-image"
					/>
					<div class="image-overlay"></div>
					<div class="image-scanlines"></div>

					<!-- Title overlay on image -->
					<div class="image-title-overlay">
						<h1 class="article-title">
							<span class="title-text">{meta.title}</span>
							<span class="title-glow" aria-hidden="true">{meta.title}</span>
						</h1>
						<p class="article-description">{meta.description}</p>
					</div>
				</div>
			{:else}
				<!-- Header without image -->
				<header class="article-header no-image">
					<h1 class="article-title">
						<span class="title-text">{meta.title}</span>
						<span class="title-glow" aria-hidden="true">{meta.title}</span>
					</h1>
					<p class="article-description">{meta.description}</p>
				</header>
			{/if}

			<!-- Project meta section -->
			<div class="meta-section">
				<div class="meta-row">
					<!-- Tags -->
					<div class="tags-container">
						{#each meta.tags as tag, i}
							<span
								class="tag-chip"
								style="animation-delay: {i * 0.1}s"
							>
								<span class="tag-hash">#</span>{tag}
							</span>
						{/each}
					</div>

					<!-- Terminal-style date -->
					<div class="terminal-date">
						<span class="terminal-prompt">></span>
						<span class="terminal-cmd">project.date</span>
						<span class="terminal-output">{formatDate(meta.date)}</span>
						<span class="cursor-blink">_</span>
					</div>
				</div>

				<!-- Project links -->
				<div class="action-buttons">
					{#if meta.demo}
						<a
							href={meta.demo}
							target="_blank"
							rel="noopener noreferrer"
							class="action-btn primary"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								<polyline points="15 3 21 3 21 9" />
								<line x1="10" y1="14" x2="21" y2="3" />
							</svg>
							<span>LAUNCH_DEMO</span>
							<div class="btn-glow"></div>
						</a>
					{/if}
					{#if meta.github}
						<a
							href={meta.github}
							target="_blank"
							rel="noopener noreferrer"
							class="action-btn secondary"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
								/>
							</svg>
							<span>VIEW_SOURCE</span>
						</a>
					{/if}
				</div>
			</div>

			<!-- Main content -->
			<div class="content-wrapper">
				<div class="content-border"></div>
				<div class="prose prose-lg prose-invert max-w-none project-content">
					{@render content()}
				</div>
			</div>
		</article>
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
	.project-wrapper {
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
		height: 400px;
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
			rgba(10, 10, 15, 0.2) 0%,
			rgba(10, 10, 15, 0.5) 50%,
			rgba(10, 10, 15, 0.95) 100%
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

	.image-title-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 2.5rem;
		z-index: 5;
	}

	/* Article header (no image) */
	.article-header.no-image {
		padding: 2.5rem;
		border-bottom: 1px solid rgba(0, 240, 255, 0.1);
	}

	/* Article title */
	.article-title {
		position: relative;
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 1rem;
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

	.article-description {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
		max-width: 48rem;
	}

	/* Meta section */
	.meta-section {
		padding: 2rem 2.5rem;
		border-bottom: 1px solid rgba(0, 240, 255, 0.1);
		position: relative;
	}

	.meta-section::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 2.5rem;
		right: 2.5rem;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-magenta), transparent);
		opacity: 0.5;
	}

	.meta-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
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

	.tag-hash {
		color: var(--neon-magenta);
		margin-right: 0.25rem;
	}

	/* Terminal date */
	.terminal-date {
		font-family: var(--font-mono);
		font-size: 0.8rem;
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

	/* Action buttons */
	.action-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem 1.5rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.action-btn.primary {
		background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
		color: #000;
		border: none;
		clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
	}

	.action-btn.primary:hover {
		box-shadow:
			0 0 30px rgba(0, 240, 255, 0.5),
			0 0 60px rgba(0, 240, 255, 0.3);
		transform: translateY(-2px);
	}

	.action-btn.primary .btn-glow {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			45deg,
			transparent 40%,
			rgba(255, 255, 255, 0.3) 50%,
			transparent 60%
		);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	.action-btn.primary:hover .btn-glow {
		transform: translateX(100%);
	}

	.action-btn.secondary {
		background: rgba(0, 240, 255, 0.05);
		color: var(--neon-cyan);
		border: 1px solid rgba(0, 240, 255, 0.3);
		clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
	}

	.action-btn.secondary:hover {
		background: rgba(0, 240, 255, 0.1);
		border-color: var(--neon-cyan);
		box-shadow:
			0 0 20px rgba(0, 240, 255, 0.3),
			inset 0 0 20px rgba(0, 240, 255, 0.1);
		transform: translateY(-2px);
	}

	/* Content wrapper */
	.content-wrapper {
		position: relative;
		padding: 3rem 2.5rem;
	}

	.content-border {
		position: absolute;
		top: 2rem;
		left: 1.5rem;
		bottom: 2rem;
		width: 2px;
		background: linear-gradient(180deg, var(--neon-cyan), var(--neon-magenta), transparent);
		opacity: 0.3;
	}

	/* Project content styling */
	.project-content {
		padding-left: 1.5rem;
	}

	.project-content :global(h1),
	.project-content :global(h2),
	.project-content :global(h3),
	.project-content :global(h4) {
		color: var(--neon-cyan) !important;
		font-family: var(--font-display);
		position: relative;
		margin-top: 2.5rem;
	}

	.project-content :global(h2)::before {
		content: '//';
		color: var(--neon-magenta);
		margin-right: 0.5rem;
		opacity: 0.7;
	}

	.project-content :global(p) {
		color: rgba(255, 255, 255, 0.85);
		line-height: 1.8;
		font-size: 1.1rem;
	}

	.project-content :global(a) {
		color: var(--neon-cyan) !important;
		text-decoration: none;
		border-bottom: 1px solid rgba(0, 240, 255, 0.3);
		transition: all 0.2s ease;
	}

	.project-content :global(a:hover) {
		border-bottom-color: var(--neon-cyan);
		text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
	}

	.project-content :global(code:not(pre code)) {
		background: rgba(0, 240, 255, 0.1) !important;
		border: 1px solid rgba(0, 240, 255, 0.2);
		color: var(--neon-cyan) !important;
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9em;
	}

	.project-content :global(pre) {
		background: rgba(5, 5, 8, 0.9) !important;
		border: 1px solid rgba(0, 240, 255, 0.2) !important;
		position: relative;
	}

	.project-content :global(pre)::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta));
	}

	.project-content :global(blockquote) {
		border-left: 3px solid var(--neon-magenta) !important;
		background: rgba(255, 0, 255, 0.05) !important;
		font-style: italic;
		position: relative;
	}

	.project-content :global(blockquote)::before {
		content: '"';
		position: absolute;
		top: -10px;
		left: 10px;
		font-size: 4rem;
		color: var(--neon-magenta);
		opacity: 0.2;
		font-family: Georgia, serif;
	}

	.project-content :global(strong) {
		color: white !important;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
	}

	.project-content :global(ul),
	.project-content :global(ol) {
		padding-left: 1.5rem;
	}

	.project-content :global(li) {
		position: relative;
		padding-left: 0.5rem;
	}

	.project-content :global(li::marker) {
		color: var(--neon-cyan);
	}

	.project-content :global(hr) {
		border: none;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-magenta), transparent);
		margin: 3rem 0;
	}

	.project-content :global(img) {
		border: 1px solid rgba(0, 240, 255, 0.2) !important;
		box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
		border-radius: 4px;
	}

	.project-content :global(table) {
		border-collapse: separate;
		border-spacing: 0;
		margin: 2rem 0;
		overflow: hidden;
		border: 1px solid rgba(0, 240, 255, 0.2);
		width: 100%;
	}

	.project-content :global(th) {
		background: rgba(0, 240, 255, 0.1);
		color: var(--neon-cyan);
		font-family: var(--font-mono);
		font-weight: 600;
		text-align: left;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid rgba(0, 240, 255, 0.2);
	}

	.project-content :global(td) {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.project-content :global(tr:last-child td) {
		border-bottom: none;
	}

	/* Animations */
	.animate-slide-in {
		animation: slideIn 0.6s ease forwards;
	}

	.animate-fade-in {
		animation: fadeIn 0.8s ease forwards;
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

	/* Responsive */
	@media (max-width: 768px) {
		.image-container {
			height: 300px;
		}

		.image-title-overlay {
			padding: 1.5rem;
		}

		.meta-section {
			padding: 1.5rem;
		}

		.meta-row {
			flex-direction: column;
			align-items: flex-start;
		}

		.content-wrapper {
			padding: 2rem 1.5rem;
		}

		.content-border {
			display: none;
		}

		.project-content {
			padding-left: 0;
		}

		.corner-decor {
			width: 20px;
			height: 20px;
		}

		.action-buttons {
			flex-direction: column;
		}

		.action-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
