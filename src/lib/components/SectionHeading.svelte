<script lang="ts">
	/** Props for the SectionHeading component */
	let {
		title = '',
		viewAllLink = '',
		viewAllText = 'View all'
	} = $props<{
		title: string;
		viewAllLink?: string;
		viewAllText?: string;
	}>();
</script>

<div class="mb-16 flex items-center justify-between">
	<h2 class="text-[2.5rem] font-bold leading-tight text-[var(--color-brand)]">
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
				class="transition-transform duration-300 group-hover:translate-x-1"
			>
				<path d="M5 12h14"></path>
				<path d="m12 5 7 7-7 7"></path>
			</svg>
		</a>
	{/if}
</div>
