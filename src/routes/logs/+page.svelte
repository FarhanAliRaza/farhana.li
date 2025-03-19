<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { Log } from '$lib/types';
	import TimelineSection from '$lib/components/TimelineSection.svelte';

	let { data } = $props<{
		data: {
			logs: Log[];
		};
	}>();

	const { logs } = data;
</script>

<div class="min-h-screen bg-black relative overflow-hidden">
	<!-- Header section with gradient background -->
	<div
		class="bg-gradient-radial pointer-events-none absolute inset-0 from-[rgba(33,158,255,0.3)] to-transparent z-0"
		style="background-position: center top; background-size: 100% 100%;"
	></div>

	<!-- Timeline section -->
	<section class="relative py-12 md:py-24 z-10">
		<div class="container mx-auto px-4 md:px-6">
			<TimelineSection {logs} title="All Logs" />
		</div>
	</section>
</div>
