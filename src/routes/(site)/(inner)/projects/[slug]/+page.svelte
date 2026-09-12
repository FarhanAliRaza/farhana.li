<script lang="ts">
	import type { Component } from 'svelte';
	import type { Project } from '$lib/types';
	import { Github, ArrowUpRight } from 'lucide-svelte';
	import ArticleLayout from '$lib/components/ArticleLayout.svelte';
	let { data }: { data: { content: Component; meta: Project } } = $props();
	const meta = $derived(data.meta);
	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{meta.title} - Project - Farhan's Portfolio</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={`${meta.title} - Project - Farhan's Portfolio`} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://farhana.li/projects/${meta.slug}`} />
	{#if meta.image}
		<meta property="og:image" content={meta.image} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${meta.title} - Project - Farhan's Portfolio`} />
	<meta name="twitter:description" content={meta.description} />
	{#if meta.image}
		<meta name="twitter:image" content={meta.image} />
	{/if}
	<meta property="article:published_time" content={new Date(meta.date).toISOString()} />
	<meta property="article:tag" content={meta.tags.join(',')} />
	<link rel="canonical" href={`https://farhana.li/projects/${meta.slug}`} />
</svelte:head>

<ArticleLayout
	title={meta.title}
	description={meta.description}
	date={meta.date}
	tags={meta.tags}
	image={meta.image}
	backHref="/projects"
	backLabel="All projects"
	kind="Project notes"
>
	{#snippet actions()}
		{#if meta.demo}<a
				class="bento-button bento-button--primary"
				href={meta.demo}
				target="_blank"
				rel="noopener noreferrer">Visit site <ArrowUpRight size={16} aria-hidden="true" /></a
			>{/if}
		{#if meta.github}<a
				class="bento-button"
				href={meta.github}
				target="_blank"
				rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> View source</a
			>{/if}
	{/snippet}
	<Content />
</ArticleLayout>
