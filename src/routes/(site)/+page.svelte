<script lang="ts">
	import type { Post, Project } from '$lib/types';
	import { formatDate } from '$lib/utils';
	import Header from './Header.svelte';
	import ShaderBackground from '$lib/components/ShaderBackground.svelte';
	import GridSection from '$lib/components/GridSection.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import ProjectStrip from '$lib/components/ProjectStrip.svelte';
	import ProductsSection from '$lib/components/ProductsSection.svelte';
	import { siteConfig } from '$lib/config';
	import CopyEmailButton from '$lib/components/CopyEmailButton.svelte';

	let { data } = $props<{
		data: {
			projects: Project[];
			posts: Post[];
		};
	}>();

	const { projects, posts } = data;
</script>

<svelte:head>
	<title>Farhan Ali Raza - OSS Engineer at Reflex</title>
	<meta name="description" content={siteConfig.description} />
	<meta property="og:title" content="Farhan Ali Raza - OSS Engineer at Reflex" />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:url" content="https://farhana.li/" />
	<meta name="twitter:title" content="Farhan Ali Raza - OSS Engineer at Reflex" />
	<meta name="twitter:description" content={siteConfig.description} />
	<link rel="canonical" href="https://farhana.li/" />
</svelte:head>

<div class="relative isolate">
	<ShaderBackground />
	<Header />

	<!-- Main content starts after the header -->
	<main class="relative bg-black/50">
		<!-- Products Section -->

		<!-- Blog Posts Section with Grid -->
		<section class="relative">
			<GridSection
				title="Latest Blog Posts"
				viewAllLink="/blog"
				viewAllText="View all posts"
				bgClass="relative z-10"
			>
				<div class="bento-list">
					{#each posts as post}
						<BlogCard {post} />
					{/each}
				</div>
			</GridSection>
		</section>

		<ProjectStrip {projects} />
	</main>

	<!-- Footer Section -->
	<footer class="relative bg-black/70 py-16">
		<!-- Top divider with glow effect -->
		<div class="absolute left-0 right-0 top-0 h-px w-full overflow-hidden">
			<div
				class="via-[var(--color-brand)]/20 h-px w-full bg-gradient-to-r from-transparent to-transparent"
			></div>
			<div
				class="bg-[var(--color-brand)]/30 mx-auto -mt-[1px] h-1 w-1/3 rounded-full blur-sm"
			></div>
		</div>

		<div class="container relative z-10 mx-auto grid gap-8 px-6 md:grid-cols-[1fr_auto_auto] md:gap-x-16">
			<!-- Logo and tagline -->
			<div>
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
			<div>
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
						<a href="/about" class="text-white/60 transition-colors hover:text-[var(--color-brand)]"
							>About</a
						>
					</li>
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h3 class="mb-4 text-lg font-semibold text-white">Contact</h3>
				<CopyEmailButton />
			</div>
		</div>

		<!-- Copyright -->
		<div class="container mx-auto mt-12 border-t border-gray-800 px-6 pt-8">
			<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
				<p class="text-center text-sm text-white/40 md:text-left">
					© {new Date().getFullYear()} Farhan Ali Raza. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</div>

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
</style>
