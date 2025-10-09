<script lang="ts">
	import type { Post } from '$lib/types';
	import GridSection from '$lib/components/GridSection.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import { formatDate } from '$lib/utils';
	import { styling } from '$lib/config';

	// Fix destructuring to get posts from data
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

<GridSection title="All Posts" viewAllLink="" extraClass="relative z-10">
	<div class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as post}
			<BlogCard {post} />
		{/each}
	</div>
</GridSection>
