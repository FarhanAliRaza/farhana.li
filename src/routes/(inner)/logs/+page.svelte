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

<!-- Timeline section -->
<section class="relative z-10 py-12 md:py-24">
	<div class="container mx-auto px-4 md:px-6">
		<TimelineSection {logs} title="All Logs" />
	</div>
</section>
