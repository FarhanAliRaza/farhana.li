<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { Log } from '$lib/types';
	import TimelineSection from '$lib/components/TimelineSection.svelte';
	import { styling } from '$lib/config';

	let { data } = $props<{
		data: {
			logs: Log[];
		};
	}>();

	const { logs } = data;
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

<!-- Timeline section -->
<section class="relative z-10 py-12 md:py-24">
	<div class="container mx-auto px-4 md:px-6">
		<TimelineSection {logs} title="All Logs" />
	</div>
</section>
