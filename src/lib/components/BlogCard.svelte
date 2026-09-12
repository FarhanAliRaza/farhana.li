<script lang="ts">
	import { ArrowUpRight, ArrowRight, BookOpen } from 'lucide-svelte';
	import type { Post } from '$lib/types';
	import { formatDate } from '$lib/utils';

	let { post, compact = false }: { post: Post; compact?: boolean } = $props();
</script>

<article class="bento-card">
	{#if post.image}
		<a class="bento-card__image" href="/blog/{post.slug}" tabindex="-1" aria-hidden="true">
			<enhanced:img
				src={post.image}
				alt=""
				loading="lazy"
				sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
			/>
		</a>
	{/if}
	<div class="bento-card__body">
		<div class="bento-card__meta">
			<time datetime={post.date}>{formatDate(post.date)}</time><BookOpen
				size={17}
				aria-hidden="true"
			/>
		</div>
		<h3 class="bento-card__title"><a href="/blog/{post.slug}">{post.title}</a></h3>
		{#if !compact}<p class="bento-card__description">{post.description}</p>{/if}
		{#if post.tags?.length}
			<div class="bento-card__tags">
				{#each post.tags as tag}<a class="bento-tag" href="/blog/category/{encodeURIComponent(tag)}"
						>{tag}</a
					>{/each}
			</div>
		{/if}
		<div class="bento-card__actions">
			<a class="bento-card__link" href="/blog/{post.slug}"
				>Read article <ArrowRight size={16} aria-hidden="true" /></a
			><ArrowUpRight size={17} aria-hidden="true" class="ml-auto text-[#b8afc4]" />
		</div>
	</div>
</article>
