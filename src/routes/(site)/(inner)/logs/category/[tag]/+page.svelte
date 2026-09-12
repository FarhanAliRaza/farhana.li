<script lang="ts">
	import type { Log } from '$lib/types';
	import LogCard from '$lib/components/LogCard.svelte';
	let { data }: { data: { logs: Log[]; tag: string } } = $props();
	const tag = $derived(data.tag);
</script>

<svelte:head>
	<title>{tag} - Logs Category - Farhan's Portfolio</title>
	<meta
		name="description"
		content={`Explore Farhan's development logs about ${tag.toLowerCase()}`}
	/>
	<meta property="og:title" content={`${tag} - Logs Category - Farhan's Portfolio`} />
	<meta
		property="og:description"
		content={`Explore Farhan's development logs about ${tag.toLowerCase()}`}
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://farhana.li/logs/category/${tag.toLowerCase()}`} />
	<meta name="twitter:title" content={`${tag} - Logs Category - Farhan's Portfolio`} />
	<meta
		name="twitter:description"
		content={`Explore Farhan's development logs about ${tag.toLowerCase()}`}
	/>
	<link rel="canonical" href={`https://farhana.li/logs/category/${tag.toLowerCase()}`} />
</svelte:head>

<main class="bento-page">
	<div class="bento-shell">
		<a class="bento-card__link" href="/logs">← All development logs</a>
		<header class="bento-page__header">
			<div>
				<p class="bento-eyebrow">Development logs</p>
				<h1>{data.tag}</h1>
				<p class="bento-page__intro">
					Progress updates, experiments, and notes from building in the open.
				</p>
			</div>
			<span class="bento-page__count"
				>{data.logs.length} {data.logs.length === 1 ? 'entry' : 'entries'}</span
			>
		</header>
		<div class="bento-list">
			{#each data.logs as log (log.slug)}<LogCard {log} timeline={false} />{:else}<p
					class="bento-empty"
				>
					No development logs here yet.
				</p>{/each}
		</div>
	</div>
</main>
