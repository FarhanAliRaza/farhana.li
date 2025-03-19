<script lang="ts">
	/** Props for the GridSection component */
	let {
		title = '',
		highlightedText = '',
		viewAllLink = '',
		viewAllText = 'View all',
		bgClass = '',
		extraClass = ''
	} = $props<{
		title?: string;
		highlightedText?: string;
		viewAllLink?: string;
		viewAllText?: string;
		bgClass?: string;
		extraClass?: string;
	}>();
</script>

<section class={`relative py-12 md:py-24 ${bgClass} ${extraClass}`}>
	<div class="container mx-auto px-4 md:px-6">
		<div class="mb-8 md:mb-16 flex flex-col md:flex-row md:items-center justify-between">
			<h2
				class="text-[2rem] md:text-[2.5rem] font-bold leading-tight text-[var(--color-brand)] mb-4 md:mb-0"
			>
				{title}
			</h2>
			{#if viewAllLink}
				<a
					href={viewAllLink}
					class="group flex items-center gap-2 text-white/80 transition-colors hover:text-[var(--color-brand)]"
				>
					<span>{viewAllText}</span>
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

		<slot />
	</div>
</section>
