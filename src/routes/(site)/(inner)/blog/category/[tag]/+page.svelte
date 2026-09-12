<script lang="ts">
	import type { Post } from '$lib/types';
	import BlogCard from '$lib/components/BlogCard.svelte';

	let { data } = $props<{
		data: {
			tag: string;
			posts: Post[];
		};
	}>();

	const tag = $derived(data.tag);
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

<main class="bento-page">
	<div class="bento-shell">
		<a class="bento-card__link" href="/blog">← All blog posts</a>
		<header class="bento-page__header">
			<div>
				<p class="bento-eyebrow">Browse a topic</p>
				<h1>{data.tag}</h1>
			</div>
			<span class="bento-page__count"
				>{data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'}</span
			>
		</header>
		<div class="bento-list">
			{#each data.posts as post (post.slug)}<BlogCard {post} />
			{:else}<p class="bento-empty">No posts found in this category.</p>{/each}
		</div>
	</div>
</main>
