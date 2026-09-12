<script lang="ts">
	import type { Component } from 'svelte';
	import type { Log } from '$lib/types';
	import ArticleLayout from '$lib/components/ArticleLayout.svelte';
	import LogCard from '$lib/components/LogCard.svelte';
	let {
		data
	}: {
		data: {
			content: Component;
			meta: Log;
			nextLogs: Log[];
			relatedLogs: (Log & { relevance: number })[];
		};
	} = $props();
	const meta = $derived(data.meta);
	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{meta.title} - Dev Log - Farhan's Portfolio</title>
	<meta name="description" content={`Development log entry: ${meta.title}`} />
	<meta property="og:title" content={`${meta.title} - Dev Log - Farhan's Portfolio`} />
	<meta property="og:description" content={`Development log entry: ${meta.title}`} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://farhana.li/logs/${meta.slug}`} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={`${meta.title} - Dev Log - Farhan's Portfolio`} />
	<meta name="twitter:description" content={`Development log entry: ${meta.title}`} />
	<meta property="article:published_time" content={new Date(meta.date).toISOString()} />
	<meta property="article:tag" content={meta.tags.join(',')} />
	<link rel="canonical" href={`https://farhana.li/logs/${meta.slug}`} />
</svelte:head>

<ArticleLayout
	title={meta.title}
	date={meta.date}
	tags={meta.tags}
	backHref="/logs"
	backLabel="All development logs"
	categoryPath="/logs/category"
	kind="Development log"
>
	<Content />
	{#snippet related()}
		{#if data.nextLogs.length}<section class="mb-10" aria-labelledby="next-heading">
				<h2 class="bento-subheading" id="next-heading">Continue reading.</h2>
				<div class="bento-list">
					{#each data.nextLogs as log (log.slug)}<LogCard {log} timeline={false} />{/each}
				</div>
			</section>{/if}
		{#if data.relatedLogs.length}<section aria-labelledby="related-heading">
				<h2 class="bento-subheading" id="related-heading">Related notes.</h2>
				<div class="bento-list">
					{#each data.relatedLogs as log (log.slug)}<LogCard {log} timeline={false} />{/each}
				</div>
			</section>{/if}
	{/snippet}
</ArticleLayout>
