<script lang="ts">
	import type { Project } from '$lib/types';

	let { data } = $props<{
		data: { projects: Project[] };
	}>();

	const { projects } = data;
</script>

<svelte:head>
	<title>Projects - Farhan's Developer Portfolio</title>
	<meta name="description" content="Explore Farhan's development projects and coding work." />
	<meta property="og:title" content="Projects - Farhan's Developer Portfolio" />
	<meta
		property="og:description"
		content="Explore Farhan's development projects and coding work."
	/>
	<meta property="og:url" content="https://farhana.li/projects" />
	<meta name="twitter:title" content="Projects - Farhan's Developer Portfolio" />
	<meta
		name="twitter:description"
		content="Explore Farhan's development projects and coding work."
	/>
	<link rel="canonical" href="https://farhana.li/projects" />
</svelte:head>

<div class="page-wrapper">
	<!-- Scanline overlay -->
	<div class="scanlines"></div>

	<!-- Grid background -->
	<div class="grid-bg"></div>

	<!-- Floating particles -->
	<div class="particles">
		{#each Array(20) as _, i}
			<div class="particle" style="--delay: {i * 0.5}s; --x: {Math.random() * 100}%; --duration: {10 + Math.random() * 20}s"></div>
		{/each}
	</div>

	<div class="container mx-auto max-w-7xl px-4 py-16 relative z-10">
		<!-- Header Section -->
		<header class="page-header animate-slide-down">
			<div class="header-decoration">
				<div class="deco-line"></div>
				<div class="deco-hex">
					<svg width="24" height="28" viewBox="0 0 24 28" fill="none">
						<path d="M12 0L24 7V21L12 28L0 21V7L12 0Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
					</svg>
				</div>
				<div class="deco-line"></div>
			</div>

			<div class="title-container">
				<span class="title-prefix">&lt;</span>
				<h1 class="page-title">
					<span class="title-text">PROJECTS</span>
					<span class="title-glow" aria-hidden="true">PROJECTS</span>
				</h1>
				<span class="title-suffix">/&gt;</span>
			</div>

			<p class="page-subtitle">
				<span class="terminal-prompt">$</span>
				<span class="typing-text">ls -la ~/projects --sort=date</span>
				<span class="cursor-blink">█</span>
			</p>

			<div class="header-stats">
				<div class="stat-item">
					<span class="stat-value">{projects.length}</span>
					<span class="stat-label">REPOSITORIES</span>
				</div>
				<div class="stat-divider"></div>
				<div class="stat-item">
					<span class="stat-value">{new Set(projects.flatMap(p => p.tags)).size}</span>
					<span class="stat-label">TECHNOLOGIES</span>
				</div>
				<div class="stat-divider"></div>
				<div class="stat-item">
					<span class="stat-value">{projects.filter(p => p.demo).length}</span>
					<span class="stat-label">LIVE_DEMOS</span>
				</div>
			</div>
		</header>

		<!-- Projects Grid -->
		<div class="projects-grid">
			{#each projects as project, i}
				<article
					class="project-card group"
					style="animation-delay: {i * 0.1}s"
				>
					<div class="card-border-top"></div>
					<div class="card-border-left"></div>

					<!-- Image or animated canvas placeholder -->
					<div class="card-visual">
						{#if project.image}
							<img
								src={project.image}
								alt={project.title}
								loading="lazy"
							/>
						{:else}
							<div class="placeholder-visual">
								<div class="placeholder-grid"></div>
								<div class="placeholder-text">{project.title.charAt(0)}</div>
							</div>
						{/if}
						<div class="visual-overlay"></div>
						<div class="visual-scanlines"></div>

						<!-- Floating tech badges on image -->
						<div class="floating-badges">
							{#each project.tags.slice(0, 3) as tag}
								<span class="floating-badge">{tag}</span>
							{/each}
						</div>
					</div>

					<div class="card-content">
						<h2 class="card-title">
							<a href="/projects/{project.slug}">{project.title}</a>
						</h2>

						<p class="card-description">{project.description}</p>

						<div class="card-tags">
							{#each project.tags as tag}
								<span class="tag">
									<span class="tag-hash">#</span>{tag}
								</span>
							{/each}
						</div>

						<div class="card-actions">
							{#if project.demo}
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									class="action-btn primary"
								>
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
										<polyline points="15 3 21 3 21 9" />
										<line x1="10" y1="14" x2="21" y2="3" />
									</svg>
									<span>DEMO</span>
								</a>
							{/if}
							{#if project.github}
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									class="action-btn secondary"
								>
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
									</svg>
									<span>CODE</span>
								</a>
							{/if}
							<a href="/projects/{project.slug}" class="action-btn tertiary">
								<span>DETAILS</span>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="m9 18 6-6-6-6"></path>
								</svg>
							</a>
						</div>
					</div>

					<div class="card-glitch"></div>
					<div class="card-shine"></div>
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

	/* Floating particles */
	.particles {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.particle {
		position: absolute;
		width: 2px;
		height: 2px;
		background: var(--neon-cyan);
		border-radius: 50%;
		left: var(--x);
		animation: float var(--duration) linear infinite;
		animation-delay: var(--delay);
		opacity: 0.3;
	}

	@keyframes float {
		0% {
			transform: translateY(100vh) scale(0);
			opacity: 0;
		}
		10% {
			opacity: 0.3;
		}
		90% {
			opacity: 0.3;
		}
		100% {
			transform: translateY(-100px) scale(1);
			opacity: 0;
		}
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
		gap: 1.5rem;
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

	.deco-hex {
		color: var(--neon-cyan);
		animation: rotate-hex 10s linear infinite;
	}

	@keyframes rotate-hex {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.title-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.title-prefix,
	.title-suffix {
		font-family: var(--font-mono);
		font-size: 2rem;
		color: var(--neon-magenta);
		font-weight: 300;
	}

	.page-title {
		position: relative;
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 700;
		letter-spacing: 0.15em;
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
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.terminal-prompt {
		color: var(--neon-cyan);
	}

	.typing-text {
		color: rgba(255, 255, 255, 0.5);
	}

	.cursor-blink {
		color: var(--neon-cyan);
		animation: blink 1s step-end infinite;
		font-size: 0.8rem;
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
		flex-wrap: wrap;
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
		font-size: 0.65rem;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.4);
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: linear-gradient(180deg, transparent, var(--neon-cyan), transparent);
	}

	/* Projects Grid */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 2rem;
	}

	/* Project Card */
	.project-card {
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

	.project-card:hover {
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

	.project-card:hover .card-border-top {
		transform: scaleX(1);
	}

	.card-border-left {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(180deg, var(--neon-cyan), var(--neon-magenta), transparent);
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 0.4s ease 0.2s;
	}

	.project-card:hover .card-border-left {
		transform: scaleY(1);
	}

	/* Card visual */
	.card-visual {
		position: relative;
		height: 200px;
		overflow: hidden;
	}

	.card-visual img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease, filter 0.3s ease;
	}

	.project-card:hover .card-visual img {
		transform: scale(1.1);
		filter: saturate(1.2) contrast(1.1);
	}

	.placeholder-visual {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.placeholder-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}

	.placeholder-text {
		font-family: var(--font-display);
		font-size: 4rem;
		font-weight: 700;
		color: var(--neon-cyan);
		text-shadow: 0 0 30px rgba(0, 240, 255, 0.5);
		z-index: 1;
	}

	.visual-overlay {
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

	.visual-scanlines {
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

	.floating-badges {
		position: absolute;
		top: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		opacity: 0;
		transform: translateX(10px);
		transition: all 0.3s ease;
	}

	.project-card:hover .floating-badges {
		opacity: 1;
		transform: translateX(0);
	}

	.floating-badge {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: white;
		background: rgba(0, 0, 0, 0.7);
		border: 1px solid var(--neon-cyan);
		padding: 0.25rem 0.5rem;
		backdrop-filter: blur(4px);
	}

	/* Card content */
	.card-content {
		padding: 1.5rem;
	}

	.card-title {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		line-height: 1.3;
	}

	.card-title a {
		color: white;
		transition: color 0.2s ease;
	}

	.project-card:hover .card-title a {
		color: var(--neon-cyan);
	}

	.card-description {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.6;
		margin-bottom: 1rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: rgba(0, 240, 255, 0.7);
		background: rgba(0, 240, 255, 0.05);
		padding: 0.2rem 0.5rem;
	}

	.tag-hash {
		color: var(--neon-magenta);
		margin-right: 0.1rem;
	}

	.card-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		padding: 0.5rem 0.875rem;
		transition: all 0.3s ease;
	}

	.action-btn.primary {
		background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
		color: #000;
		border: none;
	}

	.action-btn.primary:hover {
		box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
		transform: translateY(-2px);
	}

	.action-btn.secondary {
		background: rgba(255, 0, 255, 0.1);
		color: var(--neon-magenta);
		border: 1px solid rgba(255, 0, 255, 0.3);
	}

	.action-btn.secondary:hover {
		background: rgba(255, 0, 255, 0.2);
		border-color: var(--neon-magenta);
		box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
	}

	.action-btn.tertiary {
		background: rgba(0, 240, 255, 0.05);
		color: var(--neon-cyan);
		border: 1px solid rgba(0, 240, 255, 0.2);
	}

	.action-btn.tertiary:hover {
		background: rgba(0, 240, 255, 0.1);
		border-color: var(--neon-cyan);
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

	.project-card:hover .card-glitch {
		opacity: 1;
	}

	.card-shine {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.03),
			transparent
		);
		transition: left 0.5s ease;
		pointer-events: none;
	}

	.project-card:hover .card-shine {
		left: 100%;
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
		.projects-grid {
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
			gap: 1rem;
		}

		.stat-value {
			font-size: 1.5rem;
		}

		.stat-divider {
			display: none;
		}

		.deco-line {
			width: 40px;
		}

		.card-actions {
			flex-direction: column;
		}

		.action-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
