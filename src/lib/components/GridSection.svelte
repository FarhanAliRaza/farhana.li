<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let {
		title = '',
		highlightedText = '',
		viewAllLink = '',
		viewAllText = 'View all',
		bgClass = '',
		extraClass = '',
		children
	}: {
		title?: string;
		highlightedText?: string;
		viewAllLink?: string;
		viewAllText?: string;
		bgClass?: string;
		extraClass?: string;
		children: Snippet;
	} = $props();
</script>

<section class="bento-section relative {bgClass} {extraClass}">
	<div class="bento-shell">
		<div class="bento-section__header">
			<h2>
				{title}{#if highlightedText}
					<span class="text-[#e9c2ff]">{highlightedText}</span>{/if}
			</h2>
			{#if viewAllLink}<a href={viewAllLink}
					>{viewAllText} <ArrowUpRight size={17} aria-hidden="true" /></a
				>{/if}
		</div>
		{@render children()}
	</div>
</section>
