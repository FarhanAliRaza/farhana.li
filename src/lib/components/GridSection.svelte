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

<section class={`relative py-24 ${bgClass} ${extraClass}`}>
	<div class="container mx-auto px-6">
		<div class="mb-16 flex items-center justify-between">
			<h2 class="text-[2.5rem] font-bold leading-tight text-white">
				{#if highlightedText}
					{title} <span class="text-[var(--color-brand)]">{highlightedText}</span>
				{:else}
					{title}
				{/if}
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
