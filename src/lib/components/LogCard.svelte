<script lang="ts">
	import { ArrowRight, Terminal } from 'lucide-svelte';
	import type { Log } from '$lib/types';
	import { formatDate } from '$lib/utils';
	let {
		log,
		timeline = false,
		animation = false,
		index = 0
	}: { log: Log; timeline?: boolean; animation?: boolean; index?: number } = $props();
</script>

<article
	class="bento-card"
	data-href="/logs/{log.slug}"
	data-cursor-text="Read entry"
	class:timeline-entry={timeline}
	data-animated={animation || undefined}
	style:--entry-index={index}
>
	<div class="bento-card__body">
		<div class="bento-card__meta">
			<time datetime={log.date}>{formatDate(log.date)}</time><Terminal
				size={17}
				aria-hidden="true"
			/>
		</div>
		<h3 class="bento-card__title"><a href="/logs/{log.slug}">{log.title}</a></h3>
		<div class="bento-card__tags">
			{#each log.tags as tag}<a class="bento-tag" href="/logs/category/{encodeURIComponent(tag)}"
					>{tag}</a
				>{/each}
		</div>
		<div class="bento-card__actions">
			<a class="bento-card__link" href="/logs/{log.slug}"
				>Read entry <ArrowRight size={16} aria-hidden="true" /></a
			>
		</div>
	</div>
</article>

<style>
	.timeline-entry {
		margin-bottom: 16px;
		height: auto;
	}
</style>
