<script lang="ts">
	import type { Post } from '$lib/types';
	import { formatDate } from '$lib/utils';

	let { data } = $props<{
		data: { posts: Post[] };
	}>();

	const { posts } = data;
</script>

<svelte:head>
	<title>Blog - Farhan's Developer Portfolio</title>
	<meta
		name="description"
		content="Read Farhan's blog posts about development, programming, and technology."
	/>
	<meta property="og:title" content="Blog - Farhan's Developer Portfolio" />
	<meta
		property="og:description"
		content="Read Farhan's blog posts about development, programming, and technology."
	/>
	<meta property="og:url" content="https://farhana.li/blog" />
	<meta name="twitter:title" content="Blog - Farhan's Developer Portfolio" />
	<meta
		name="twitter:description"
		content="Read Farhan's blog posts about development, programming, and technology."
	/>
	<link rel="canonical" href="https://farhana.li/blog" />
</svelte:head>

<div class="page-wrapper">
	<!-- Scanline overlay -->
	<div class="scanlines"></div>

	<!-- Grid background -->
	<div class="grid-bg"></div>

	<div class="container mx-auto max-w-7xl px-4 py-16 relative z-10">
		<!-- Header Section -->
		<header class="page-header animate-slide-down">
			<div class="header-decoration">
				<div class="deco-line"></div>
				<div class="deco-box"></div>
				<div class="deco-line"></div>
			</div>

			<div class="title-container">
				<span class="title-prefix">[</span>
				<h1 class="page-title">
					<span class="title-text">BLOG_INDEX</span>
					<span class="title-glow" aria-hidden="true">BLOG_INDEX</span>
				</h1>
				<span class="title-suffix">]</span>
			</div>

			<p class="page-subtitle">
				<span class="terminal-prompt">></span>
				<span class="typing-text">Exploring code, technology & development insights</span>
				<span class="cursor-blink">_</span>
			</p>

			<div class="header-stats">
				<div class="stat-item">
					<span class="stat-value">{posts.length}</span>
					<span class="stat-label">TOTAL_POSTS</span>
				</div>
				<div class="stat-divider"></div>
				<div class="stat-item">
					<span class="stat-value">{new Set(posts.flatMap(p => p.tags)).size}</span>
					<span class="stat-label">CATEGORIES</span>
				</div>
			</div>
		</header>

		<!-- Posts Grid -->
		<div class="posts-grid">
			{#each posts as post, i}
				<article
					class="post-card group"
					style="animation-delay: {i * 0.1}s"
				>
					<div class="card-border-top"></div>
					<div class="card-corner tl"></div>
					<div class="card-corner tr"></div>
					<div class="card-corner bl"></div>
					<div class="card-corner br"></div>

					{#if post.image}
						<div class="card-image">
							<img
								src={post.image}
								alt={post.title}
								loading="lazy"
							/>
							<div class="image-overlay"></div>
							<div class="image-scanlines"></div>
						</div>
					{/if}

					<div class="card-content">
						<div class="card-meta">
							<time class="card-date">
								<span class="date-bracket">[</span>
								{formatDate(post.date)}
								<span class="date-bracket">]</span>
							</time>
						</div>

						{#if post.tags && post.tags.length > 0}
							<div class="card-tags">
								{#each post.tags as tag}
									<a href="/blog/category/{tag}" class="tag">
										<span class="tag-hash">#</span>{tag}
									</a>
								{/each}
							</div>
						{/if}

						<h2 class="card-title">
							<a href="/blog/{post.slug}">{post.title}</a>
						</h2>

						<p class="card-description">{post.description}</p>

						<a href="/blog/{post.slug}" class="card-link">
							<span>ACCESS_POST</span>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M5 12h14"></path>
								<path d="m12 5 7 7-7 7"></path>
							</svg>
						</a>
					</div>

					<div class="card-glitch"></div>
				</article>
			{/each}
		</div>
	</div>
</div>

<style>
	/* CSS Variables */
	:global(:root) {
		--neon-cyan: #00f0ff;
		--neon-magenta: #ff00ff;
		--neon-blue: #219eff;
		--dark-bg: #0a0a0f;
		--darker-bg: #050508;
		--grid-color: rgba(0, 240, 255, 0.03);
	}

	/* Page wrapper */
	.page-wrapper {
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

	/* Page Header */
	.page-header {
		text-align: center;
		margin-bottom: 4rem;
		padding-top: 2rem;
	}

	.header-decoration {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.deco-line {
		width: 100px;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--neon-cyan));
	}

	.deco-line:last-child {
		background: linear-gradient(90deg, var(--neon-cyan), transparent);
	}

	.deco-box {
		width: 10px;
		height: 10px;
		border: 2px solid var(--neon-cyan);
		transform: rotate(45deg);
		animation: pulse-box 2s ease-in-out infinite;
	}

	@keyframes pulse-box {
		0%, 100% { box-shadow: 0 0 5px var(--neon-cyan); }
		50% { box-shadow: 0 0 20px var(--neon-cyan), 0 0 30px var(--neon-cyan); }
	}

	.title-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.title-prefix,
	.title-suffix {
		font-family: var(--font-mono);
		font-size: 2.5rem;
		color: var(--neon-magenta);
		font-weight: 300;
	}

	.page-title {
		position: relative;
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 700;
		letter-spacing: 0.1em;
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
		filter: blur(25px);
		opacity: 0.5;
		-webkit-text-fill-color: var(--neon-cyan);
	}

	.page-subtitle {
		font-family: var(--font-mono);
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.terminal-prompt {
		color: var(--neon-magenta);
	}

	.typing-text {
		color: rgba(255, 255, 255, 0.7);
	}

	.cursor-blink {
		color: var(--neon-cyan);
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.header-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.stat-value {
		font-family: var(--font-mono);
		font-size: 2rem;
		font-weight: 700;
		color: var(--neon-cyan);
		text-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.4);
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: linear-gradient(180deg, transparent, var(--neon-cyan), transparent);
	}

	/* Posts Grid */
	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 2rem;
	}

	/* Post Card */
	.post-card {
		position: relative;
		background: linear-gradient(180deg, rgba(10, 10, 15, 0.9) 0%, rgba(5, 5, 8, 0.95) 100%);
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

	.post-card:hover {
		border-color: var(--neon-cyan);
		transform: translateY(-8px);
		box-shadow:
			0 20px 40px rgba(0, 240, 255, 0.15),
			0 0 0 1px rgba(0, 240, 255, 0.1);
	}

	.card-border-top {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta));
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.4s ease;
	}

	.post-card:hover .card-border-top {
		transform: scaleX(1);
	}

	/* Corner decorations */
	.card-corner {
		position: absolute;
		width: 12px;
		height: 12px;
		border: 1px solid var(--neon-cyan);
		opacity: 0.4;
		transition: opacity 0.3s ease;
	}

	.post-card:hover .card-corner {
		opacity: 0.8;
	}

	.card-corner.tl { top: 4px; left: 4px; border-right: none; border-bottom: none; }
	.card-corner.tr { top: 4px; right: 4px; border-left: none; border-bottom: none; }
	.card-corner.bl { bottom: 4px; left: 4px; border-right: none; border-top: none; }
	.card-corner.br { bottom: 4px; right: 4px; border-left: none; border-top: none; }

	/* Card image */
	.card-image {
		position: relative;
		height: 200px;
		overflow: hidden;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease, filter 0.3s ease;
	}

	.post-card:hover .card-image img {
		transform: scale(1.1);
		filter: saturate(1.2) contrast(1.1);
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			transparent 0%,
			rgba(10, 10, 15, 0.5) 60%,
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

	/* Card content */
	.card-content {
		padding: 1.5rem;
	}

	.card-meta {
		margin-bottom: 0.75rem;
	}

	.card-date {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--neon-magenta);
		letter-spacing: 0.05em;
	}

	.date-bracket {
		color: rgba(255, 255, 255, 0.3);
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--neon-cyan);
		background: rgba(0, 240, 255, 0.08);
		border: 1px solid rgba(0, 240, 255, 0.2);
		padding: 0.25rem 0.75rem;
		transition: all 0.2s ease;
	}

	.tag:hover {
		background: rgba(0, 240, 255, 0.15);
		border-color: var(--neon-cyan);
		box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
	}

	.tag-hash {
		color: var(--neon-magenta);
		margin-right: 0.15rem;
	}

	.card-title {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		line-height: 1.3;
	}

	.card-title a {
		color: white;
		transition: color 0.2s ease;
	}

	.post-card:hover .card-title a {
		color: var(--neon-cyan);
	}

	.card-description {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.6;
		margin-bottom: 1.25rem;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		color: var(--neon-cyan);
		padding: 0.5rem 1rem;
		border: 1px solid rgba(0, 240, 255, 0.3);
		background: rgba(0, 240, 255, 0.05);
		transition: all 0.3s ease;
	}

	.card-link:hover {
		background: rgba(0, 240, 255, 0.1);
		border-color: var(--neon-cyan);
		box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
	}

	.card-link svg {
		transition: transform 0.3s ease;
	}

	.card-link:hover svg {
		transform: translateX(4px);
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
		pointer-events: none;
	}

	.post-card:hover .card-glitch {
		opacity: 1;
	}

	/* Animations */
	.animate-slide-down {
		animation: slideDown 0.8s ease forwards;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Responsive */
	@media (max-width: 768px) {
		.posts-grid {
			grid-template-columns: 1fr;
		}

		.page-title {
			letter-spacing: 0.05em;
		}

		.title-prefix,
		.title-suffix {
			font-size: 1.5rem;
		}

		.header-stats {
			gap: 1.5rem;
		}

		.stat-value {
			font-size: 1.5rem;
		}

		.deco-line {
			width: 50px;
		}
	}
</style>
