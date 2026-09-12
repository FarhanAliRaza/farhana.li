<script lang="ts">
	import type { Post } from '$lib/types';
	import BlogCard from '$lib/components/BlogCard.svelte';
	let { data }: { data: { posts: Post[] } } = $props();
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

<main class="bento-page">
	<div class="bento-shell">
		<header class="bento-page__header">
			<div>
				<p class="bento-eyebrow">Writing & ideas</p>
				<h1>Notes from the workbench.</h1>
				<p class="bento-page__intro">
					Experiments, engineering deep dives, and lessons from building things for the web.
				</p>
			</div>
			<span class="bento-page__count"
				>{data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'}</span
			>
		</header>
		<div class="bento-list">
			{#each data.posts as post (post.slug)}<BlogCard {post} />
			{:else}<p class="bento-empty">No posts published yet. Check back soon.</p>{/each}
		</div>
	</div>
</main>
