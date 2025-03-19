<script lang="ts">
	import type { Log } from '$lib/types';
	import LogCard from './LogCard.svelte';

	/** The logs to display in the timeline */
	let {
		logs,
		limit = 0,
		title = 'Development Logs',
		viewAllLink = '/logs'
	} = $props<{
		logs: Log[];
		limit?: number;
		title?: string;
		viewAllLink?: string;
	}>();

	// If limit is provided and greater than 0, slice the logs array
	let displayLogs = $derived(limit > 0 ? logs.slice(0, limit) : logs);
</script>

<section class="relative py-24">
	<div class="container mx-auto px-6">
		<div class="mb-16 flex items-center justify-between">
			<h2 class="text-[2.5rem] font-bold leading-tight text-[var(--color-brand)]">
				{title}
			</h2>
			{#if viewAllLink}
				<a
					href={viewAllLink}
					class="group flex items-center gap-2 text-white/80 transition-colors hover:text-[var(--color-brand)]"
				>
					<span>View all logs</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="transition-transform group-hover:translate-x-1"
					>
						<path d="M5 12h14"></path>
						<path d="m12 5 7 7-7 7"></path>
					</svg>
				</a>
			{/if}
		</div>

		<div class="relative">
			<!-- Glass rod shadow for depth -->
			<div
				class="absolute bottom-0 left-4 top-0 h-full w-2 rounded-full bg-[#0a1525]/90 blur-[1px] md:left-1/2 md:-ml-1"
			></div>

			<!-- Glass rod with internal light -->
			<div
				class="glass-rod absolute bottom-0 left-4 top-0 z-[5] h-full w-2 overflow-hidden rounded-full md:left-1/2 md:-ml-1"
			>
				<!-- We'll make the glass more transparent to see the light inside better -->
				<div
					class="glass-effect absolute inset-0 bg-gradient-to-r from-[#21C6FB]/10 via-transparent to-[#21C6FB]/10"
				></div>

				<!-- Internal flowing light - INSIDE the tube -->
				<div class="light-container absolute inset-0 overflow-hidden">
					<!-- Multiple light segments to ensure continuous flow -->
					<div class="light-segment light-1 absolute inset-x-0 h-[120%] w-full"></div>
					<div class="light-segment light-2 absolute inset-x-0 h-[120%] w-full"></div>
					<div class="light-segment light-3 absolute inset-x-0 h-[120%] w-full"></div>
				</div>

				<!-- Glass highlights for realism -->
				<div
					class="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-white/30 to-transparent"
				></div>
				<div
					class="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-white/20 to-transparent"
				></div>

				<!-- Glass tube border for definition -->
				<div class="absolute inset-0 rounded-full border border-[#21C6FB]/50"></div>
			</div>

			{#each displayLogs as log, i}
				<LogCard {log} timeline={true} animation={true} index={i} />
			{/each}
		</div>
	</div>
</section>

<style>
	/* Glass rod and light beam effects */
	.glass-effect {
		border-radius: 100%;
	}

	/* Light container to clip the light segments */
	.light-container {
		mask-image: linear-gradient(to bottom, white 0%, white 100%);
	}

	/* Multiple smaller light segments for continuous flow */
	.light-segment {
		background: linear-gradient(
			to bottom,
			transparent 0%,
			rgba(33, 198, 251, 0.4) 10%,
			rgba(33, 198, 251, 0.9) 20%,
			#21c6fb 30%,
			white 40%,
			#21c6fb 50%,
			rgba(30, 133, 251, 0.9) 60%,
			rgba(30, 133, 251, 0.4) 70%,
			transparent 100%
		);
	}

	/* Staggered animations for continuous light flow */
	.light-1 {
		top: -40%;
		animation: light-flow 18s linear infinite;
		animation-delay: 0s;
	}

	.light-2 {
		top: 20%;
		animation: light-flow 18s linear infinite;
		animation-delay: -6s;
	}

	.light-3 {
		top: 80%;
		animation: light-flow 18s linear infinite;
		animation-delay: -12s;
	}

	@keyframes light-flow {
		0% {
			transform: translateY(0%);
		}
		100% {
			transform: translateY(100%);
		}
	}

	/* Glass rod styling */
	.glass-rod {
		box-shadow: inset 0 0 3px rgba(255, 255, 255, 0.2);
	}
</style>
