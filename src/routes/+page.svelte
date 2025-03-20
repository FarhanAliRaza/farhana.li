<script lang="ts">
	import type { Post, Log, Project } from '$lib/types';
	import { formatDate } from '$lib/utils';
	import Header from './Header.svelte';
	import TimelineSection from '$lib/components/TimelineSection.svelte';
	import GridSection from '$lib/components/GridSection.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ProductsSection from '$lib/components/ProductsSection.svelte';
	import { siteConfig } from '$lib/config';

	let { data } = $props<{
		data: {
			projects: Project[];
			posts: Post[];
			logs: Log[];
		};
	}>();

	const { projects, posts, logs } = data;
</script>

<svelte:head>
	<title>Farhan - Developer Portfolio</title>
	<meta
		name="description"
		content="Welcome to Farhan's portfolio website featuring projects, blogs, and development logs."
	/>
	<meta property="og:title" content="Farhan - Developer Portfolio" />
	<meta
		property="og:description"
		content="Welcome to Farhan's portfolio website featuring projects, blogs, and development logs."
	/>
	<meta property="og:url" content="https://farhana.li/" />
	<meta name="twitter:title" content="Farhan - Developer Portfolio" />
	<meta
		name="twitter:description"
		content="Welcome to Farhan's portfolio website featuring projects, blogs, and development logs."
	/>
	<link rel="canonical" href="https://farhana.li/" />
</svelte:head>

<Header />

<!-- Main content starts after the header -->
<main class="relative bg-black">
	<!-- Main gradient background -->
	<div
		class="pointer-events-none absolute inset-0 z-0 bg-gradient-radial from-[rgba(33,158,255,0.3)] to-transparent"
		style="background-position: center top; background-size: 100% 100%;"
	></div>

	<!-- Logs Timeline Section -->
	<section class="relative">
		<TimelineSection {logs} limit={3} title="Development Logs" viewAllLink="/logs" />

		<!-- Divider with glow effect -->
		<div class="absolute bottom-0 left-0 right-0 h-px w-full overflow-hidden">
			<div
				class="via-[var(--color-brand)]/20 h-px w-full bg-gradient-to-r from-transparent to-transparent"
			></div>
			<div
				class="bg-[var(--color-brand)]/30 mx-auto -mt-[1px] h-1 w-1/3 rounded-full blur-sm"
			></div>
		</div>
	</section>

	<!-- Products Section -->

	<!-- Projects Section with Grid -->
	<section class="relative">
		<!-- Projects specific gradient -->
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 to-black/0"
		></div>
		<div
			class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(33,158,255,0.05),transparent_70%)]"
		></div>

		<GridSection
			title="Featured Projects"
			viewAllLink="/projects"
			viewAllText="View all projects"
			bgClass="relative z-10 backdrop-blur-sm"
		>
			<div class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each projects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		</GridSection>

		<!-- Divider with glow effect -->
		<div class="absolute bottom-0 left-0 right-0 h-px w-full overflow-hidden">
			<div
				class="via-[var(--color-brand)]/20 h-px w-full bg-gradient-to-r from-transparent to-transparent"
			></div>
			<div
				class="bg-[var(--color-brand)]/30 mx-auto -mt-[1px] h-1 w-1/3 rounded-full blur-sm"
			></div>
		</div>
	</section>

	<!-- Blog Posts Section with Grid -->
	<section class="relative">
		<!-- Blog specific gradient -->
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 to-black/0"
		></div>
		<div
			class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(33,158,255,0.05),transparent_70%)]"
		></div>

		<GridSection
			title="Latest Blog Posts"
			viewAllLink="/blog"
			viewAllText="View all posts"
			bgClass="relative z-10 backdrop-blur-sm"
		>
			<div
				class="grid grid-cols-1 gap-6 gap-y-8 sm:gap-x-8 sm:gap-y-12 md:grid-cols-2 lg:grid-cols-3"
			>
				{#each posts as post}
					<BlogCard {post} />
				{/each}
			</div>
		</GridSection>
	</section>
</main>

<!-- Footer Section -->
<footer class="relative bg-black py-16">
	<!-- Footer gradient background -->
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(33,158,255,0.03)] to-transparent"
	></div>
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(33,158,255,0.05),transparent_70%)]"
	></div>

	<!-- Top divider with glow effect -->
	<div class="absolute left-0 right-0 top-0 h-px w-full overflow-hidden">
		<div
			class="via-[var(--color-brand)]/20 h-px w-full bg-gradient-to-r from-transparent to-transparent"
		></div>
		<div class="bg-[var(--color-brand)]/30 mx-auto -mt-[1px] h-1 w-1/3 rounded-full blur-sm"></div>
	</div>

	<div class="container relative z-10 mx-auto grid gap-8 px-6 md:grid-cols-4 lg:grid-cols-12">
		<!-- Logo and tagline -->
		<div class="md:col-span-4">
			<div class="mb-4 text-2xl font-bold text-white">
				<h5
					class="bg-gradient-to-b from-[var(--color-brand)] to-[var(--color-text)] bg-clip-text text-[clamp(2.3rem,2rem+3vw,5rem)] font-bold leading-tight text-transparent"
				>
					Farhan
				</h5>
			</div>
			<p class="mb-6 text-white/60">Engineering solutions, sculpting ideas</p>
			<div class="flex space-x-4">
				<a
					href={siteConfig.links.github}
					target="_blank"
					aria-label="GitHub"
					rel="noopener noreferrer"
					class="text-white/60 transition-colors hover:text-[var(--color-brand)]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
						></path></svg
					>
				</a>
				<a
					href={siteConfig.links.linkedin}
					target="_blank"
					aria-label="LinkedIn"
					rel="noopener noreferrer"
					class="text-white/60 transition-colors hover:text-[var(--color-brand)]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"
						></circle></svg
					>
				</a>
				<a
					href={siteConfig.links.twitter}
					target="_blank"
					aria-label="Twitter"
					rel="noopener noreferrer"
					class="text-white/60 transition-colors hover:text-[var(--color-brand)]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
						></path></svg
					>
				</a>
			</div>
		</div>

		<!-- Quick Links -->
		<div class="md:col-span-2 lg:col-span-2 lg:col-start-6">
			<h3 class="mb-4 text-lg font-semibold text-white">Quick Links</h3>
			<ul class="space-y-2">
				<li>
					<a href="/" class="text-white/60 transition-colors hover:text-[var(--color-brand)]"
						>Home</a
					>
				</li>
				<li>
					<a
						href="/projects"
						class="text-white/60 transition-colors hover:text-[var(--color-brand)]">Projects</a
					>
				</li>
				<li>
					<a href="/blog" class="text-white/60 transition-colors hover:text-[var(--color-brand)]"
						>Blog</a
					>
				</li>
				<li>
					<a href="/logs" class="text-white/60 transition-colors hover:text-[var(--color-brand)]"
						>Logs</a
					>
				</li>
				<li>
					<a href="/about" class="text-white/60 transition-colors hover:text-[var(--color-brand)]"
						>About</a
					>
				</li>
			</ul>
		</div>

		<!-- Categories -->
		<div class="md:col-span-2 lg:col-span-2">
			<h3 class="mb-4 text-lg font-semibold text-white">Categories</h3>
			<ul class="space-y-2">
				<li>
					<a
						href="/blog/category/sveltekit"
						class="text-white/60 transition-colors hover:text-[var(--color-brand)]">SvelteKit</a
					>
				</li>
				<li>
					<a
						href="/blog/category/tutorial"
						class="text-white/60 transition-colors hover:text-[var(--color-brand)]">Tutorials</a
					>
				</li>
				<li>
					<a
						href="/blog/category/web-development"
						class="text-white/60 transition-colors hover:text-[var(--color-brand)]"
						>Web Development</a
					>
				</li>
			</ul>
		</div>

		<!-- Contact -->
		<div class="md:col-span-2 lg:col-span-2">
			<h3 class="mb-4 text-lg font-semibold text-white">Contact</h3>
			<ul class="space-y-2">
				<li class="flex items-center gap-2 text-white/60">
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
						><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
						></path><polyline points="22,6 12,13 2,6"></polyline></svg
					>
					<span>{siteConfig.email}</span>
				</li>
			</ul>
		</div>
	</div>

	<!-- Copyright -->
	<div class="container mx-auto mt-12 border-t border-gray-800 px-6 pt-8">
		<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
			<p class="text-center text-sm text-white/40 md:text-left">
				© {new Date().getFullYear()} Farhan Ali Raza. All rights reserved.
			</p>
			<p class="text-center text-sm text-white/40 md:text-right">
				Built with <a
					href="https://kit.svelte.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="text-[var(--color-brand)]/60 transition-colors hover:text-[var(--color-brand)]"
					>SvelteKit</a
				> and ❤️
			</p>
		</div>
	</div>
</footer>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	section {
		animation: fadeInUp 0.8s ease forwards;
		animation-delay: var(--delay, 0s);
	}

	.bg-gradient-radial {
		background-image: radial-gradient(
			circle at 50% 0%,
			var(--from),
			var(--via) 50%,
			var(--to) 100%
		);
	}
</style>
