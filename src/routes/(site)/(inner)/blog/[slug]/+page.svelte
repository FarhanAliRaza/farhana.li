<script lang="ts">
	import type { Component } from 'svelte';
	import type { Post } from '$lib/types';
	import ArticleLayout from '$lib/components/ArticleLayout.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	let {
		data
	}: { data: { content: Component; meta: Post; relatedPosts: (Post & { relevance: number })[] } } =
		$props();
	const meta = $derived(data.meta);
	const Content = $derived(data.content);
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

{#if meta.layout === 'interactive'}
	{#key meta.slug}<Content />{/key}
{:else}
	<ArticleLayout
		title={meta.title}
		description={meta.description}
		date={meta.date}
		tags={meta.tags}
		image={meta.image}
		backHref="/blog"
		backLabel="All articles"
		categoryPath="/blog/category"
		kind="From the blog"
	>
		<Content />
		{#snippet related()}
			{#if data.relatedPosts.length}
				<section aria-labelledby="related-heading">
					<h2 class="bento-subheading" id="related-heading">Keep exploring.</h2>
					<div class="bento-list">
						{#each data.relatedPosts as post (post.slug)}<BlogCard {post} />{/each}
					</div>
				</section>
			{/if}
		{/snippet}
	</ArticleLayout>
{/if}
