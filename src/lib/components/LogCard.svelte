<script lang="ts">
	import type { Log } from '$lib/types';
	import { formatDate } from '$lib/utils';

	/** The log entry to display with configuration options */
	let {
		log,
		timeline = true,
		animation = false,
		index = 0
	} = $props<{
		log: Log;
		timeline?: boolean;
		animation?: boolean;
		index?: number;
	}>();

	// Determine if this card should be on the left or right side (alternating)
	const isEven = index % 2 === 0;
</script>

{#if timeline}
	<div
		class="relative mb-10 flex md:mb-20 md:justify-center"
		style={animation ? `--delay: ${index * 0.15}s` : ''}
	>
		<!-- Timeline dot with pulse effect - smaller on mobile -->
		<div
			class="absolute left-3.5 top-10 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center md:left-1/2 md:top-12 md:h-12 md:w-12"
		>
			<!-- Inner solid dot with gradient -->
			<span
				class="absolute h-4 w-4 rounded-full bg-gradient-to-br from-[#21C6FB] to-[#1E85FB] md:h-6 md:w-6"
			></span>
			<!-- Pulse animation -->
			<span class="absolute h-4 w-4 animate-ping rounded-full bg-[#21C6FB] opacity-75 md:h-6 md:w-6"
			></span>
			<!-- Outer ring with gradient -->
			<span
				class="absolute h-8 w-8 rounded-full border-2 border-[#21C6FB] bg-gradient-to-br from-[#21C6FB]/10 to-[#1E85FB]/5 opacity-80 md:h-12 md:w-12"
			></span>
			<!-- Glow effect -->
			<span
				class="absolute h-10 w-10 rounded-full bg-[#21C6FB]/20 blur-sm md:h-14 md:w-14 md:blur-md"
			></span>
		</div>

		<!-- Content with glass morphism (alternating sides on desktop) -->
		<div
			class="{isEven
				? 'md:ml-16 md:mr-auto'
				: 'md:ml-auto md:mr-16'} ml-10 w-full rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:bg-black/40 md:w-[45%] md:max-w-md md:p-7"
		>
			<div class="flex items-center justify-between">
				<time class="text-xs font-medium text-[#21C6FB] md:text-sm">{formatDate(log.date)}</time>
			</div>

			<h3 class="mb-2 mt-1 text-lg font-semibold text-white md:mb-3 md:mt-2 md:text-xl">
				<a href="/logs/{log.slug}" class="transition-colors hover:text-[#21C6FB]">
					{log.title}
				</a>
			</h3>

			<div class="flex flex-wrap gap-1 md:gap-2">
				{#each log.tags as tag}
					<span
						class="rounded-full bg-[#21C6FB]/10 px-2 py-1 text-xs font-medium text-[#21C6FB] md:px-3 md:text-sm"
					>
						#{tag}
					</span>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<!-- Non-timeline variant -->
	<div
		class="rounded-xl border border-white/10 bg-black/25 p-7 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:bg-black/40"
	>
		<div class="flex items-center justify-between">
			<time class="text-sm font-medium text-[#21C6FB]">{formatDate(log.date)}</time>
		</div>

		<h3 class="mb-3 mt-2 text-xl font-semibold text-white">
			<a href="/logs/{log.slug}" class="transition-colors hover:text-[#21C6FB]">
				{log.title}
			</a>
		</h3>

		<div class="flex flex-wrap gap-2">
			{#each log.tags as tag}
				<span class="rounded-full bg-[#21C6FB]/10 px-3 py-1 text-sm font-medium text-[#21C6FB]">
					#{tag}
				</span>
			{/each}
		</div>
	</div>
{/if}

<style>
	/* Glass tube light animation styles */
	.light-particle {
		background: radial-gradient(
			ellipse at center,
			rgba(255, 255, 255, 0.95) 0%,
			rgba(33, 198, 251, 0.8) 40%,
			rgba(33, 81, 251, 0.4) 70%,
			transparent 100%
		);
		filter: blur(1px);
	}

	@keyframes flow-horizontal {
		0% {
			transform: translateX(-100%);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateX(200%);
			opacity: 0;
		}
	}

	.animate-flow-horizontal {
		animation: flow-horizontal 3s ease-in-out infinite;
	}
</style>
