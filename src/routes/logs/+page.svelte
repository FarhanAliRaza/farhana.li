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

<!-- Subtle background gradient -->
<section class="relative">
	<TimelineSection {logs} title="Development Logs" viewAllLink="/logs" />

	<!-- Divider with glow effect -->
	<div class="absolute bottom-0 left-0 right-0 h-px w-full overflow-hidden">
		<div
			class="via-[var(--color-brand)]/20 h-px w-full bg-gradient-to-r from-transparent to-transparent"
		></div>
		<div class="bg-[var(--color-brand)]/30 mx-auto -mt-[1px] h-1 w-1/3 rounded-full blur-sm"></div>
	</div>
</section>
