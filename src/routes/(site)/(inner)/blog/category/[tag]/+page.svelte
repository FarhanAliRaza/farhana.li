<script lang="ts">
	import type { Post } from '$lib/types';
	import BlogCard from '$lib/components/BlogCard.svelte';

	let { data } = $props<{
		data: {
			tag: string;
			posts: Post[];
		};
	}>();

	const { tag, posts } = data;
</script>

<svelte:head>
	<title>{tag} - Blog Category - Farhan's Portfolio</title>
	<meta name="description" content={`Explore Farhan's blog posts about ${tag.toLowerCase()}`} />
	<meta property="og:title" content={`${tag} - Blog Category - Farhan's Portfolio`} />
	<meta
		property="og:description"
		content={`Explore Farhan's blog posts about ${tag.toLowerCase()}`}
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://farhana.li/blog/category/${tag.toLowerCase()}`} />
	<meta name="twitter:title" content={`${tag} - Blog Category - Farhan's Portfolio`} />
	<meta
		name="twitter:description"
		content={`Explore Farhan's blog posts about ${tag.toLowerCase()}`}
	/>
	<link rel="canonical" href={`https://farhana.li/blog/category/${tag.toLowerCase()}`} />
</svelte:head>

<div class="min-h-screen bg-black">
	<!-- Subtle background gradient -->
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(33,158,255,0.03)] to-transparent"
	></div>

	<div class="container mx-auto px-4 py-16">
		<!-- Navigation back to all blogs -->
		<div class="mb-8">
			<a
				href="/blog"
				class="group flex w-fit items-center gap-2 rounded-md border border-gray-800 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
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
					class="transition-transform group-hover:-translate-x-1"
				>
					<path d="m15 18-6-6 6-6"></path>
				</svg>
				<span>All Blog Posts</span>
			</a>
		</div>

		<!-- Category header -->
		<header class="mb-16">
			<h1 class="mb-3 text-4xl font-bold text-white md:text-5xl">
				Category: <span class="text-[var(--color-brand)]">#{tag}</span>
			</h1>
			<p class="text-lg text-white/70">
				{posts.length}
				{posts.length === 1 ? 'post' : 'posts'} in this category
			</p>
		</header>

		<!-- Blog posts grid -->
		{#if posts.length > 0}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each posts as post}
					<BlogCard {post} />
				{/each}
			</div>
		{:else}
			<div
				class="rounded-xl border border-gray-800 bg-gray-900/20 p-8 text-center backdrop-blur-sm"
			>
				<p class="text-lg text-white/70">No posts found in this category.</p>
			</div>
		{/if}
	</div>
</div>
