<script lang="ts">
	import type { Post } from '$lib/types';
	import { formatDate } from '$lib/utils';

	/** The blog post to display with configuration options */
	let { post, compact = false } = $props<{
		post: Post;
		compact?: boolean;
	}>();
</script>

<article
	class="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-md transition-all duration-300 hover:-translate-y-2"
>
	<!-- Image container with overlay and hover effect -->
	{#if post.image}
		<div class="relative h-40 sm:h-52 overflow-hidden">
			<enhanced:img
				src={post.image}
				alt={post.title}
				class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
				loading="lazy"
				sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70"
			></div>
		</div>
	{/if}

	<div class="flex h-full flex-col p-4 sm:p-7">
		<div class="mb-2 sm:mb-3 flex items-center gap-3">
			<time class="text-xs sm:text-sm font-medium text-[var(--color-brand)]">
				{formatDate(post.date)}
			</time>
		</div>

		<!-- Display all tags as clickable links -->
		{#if post.tags && post.tags.length > 0}
			<div class="mb-3 sm:mb-4 flex flex-wrap gap-1 sm:gap-2">
				{#each post.tags as tag}
					<a
						href="/blog/category/{tag}"
						class="bg-[var(--color-brand)]/10 hover:bg-[var(--color-brand)]/20 rounded-full px-1.5 sm:px-2 py-0.5 text-xs font-medium text-[var(--color-brand)] backdrop-blur-sm transition-all"
					>
						#{tag}
					</a>
				{/each}
			</div>
		{/if}

		<h3
			class="mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold text-white transition-colors group-hover:text-[var(--color-brand)]"
		>
			<a href="/blog/{post.slug}">
				{post.title}
			</a>
		</h3>

		{#if !compact}
			<p class="mb-4 sm:mb-5 line-clamp-3 flex-grow text-sm sm:text-base text-gray-400">
				{post.description}
			</p>
		{/if}

		<a
			href="/blog/{post.slug}"
			class="hover:text-[var(--color-brand)]/80 mt-auto flex w-fit items-center gap-1 sm:gap-2 text-sm sm:text-base text-[var(--color-brand)] transition-colors"
		>
			<span>Read more</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1"
			>
				<path d="M5 12h14"></path>
				<path d="m12 5 7 7-7 7"></path>
			</svg>
		</a>
	</div>
</article>
