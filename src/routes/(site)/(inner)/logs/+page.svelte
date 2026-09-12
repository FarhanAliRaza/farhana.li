<script lang="ts">
	import type { Log } from '$lib/types';
	import LogCard from '$lib/components/LogCard.svelte';
	let { data }: { data: { logs: Log[] } } = $props();
</script>

<svelte:head>
	<title>Development Logs - Farhan's Developer Portfolio</title>
	<meta
		name="description"
		content="Check out Farhan's development logs and progress updates on various projects."
	/>
	<meta property="og:title" content="Development Logs - Farhan's Developer Portfolio" />
	<meta
		property="og:description"
		content="Check out Farhan's development logs and progress updates on various projects."
	/>
	<meta property="og:url" content="https://farhana.li/logs" />
	<meta name="twitter:title" content="Development Logs - Farhan's Developer Portfolio" />
	<meta
		name="twitter:description"
		content="Check out Farhan's development logs and progress updates on various projects."
	/>
	<link rel="canonical" href="https://farhana.li/logs" />
</svelte:head>

<main class="bento-page">
	<div class="bento-shell">
		<header class="bento-page__header">
			<div>
				<p class="bento-eyebrow">Development logs</p>
				<h1>The work in progress.</h1>
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
