<script lang="ts">
	import { formatDate } from '$lib/utils';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import type { Post } from '$lib/types';

	// Fix destructuring to get content and meta from data
	let { data } = $props<{
		data: {
			content: any;
			meta: {
				title: string;
				description: string;
				date: string;
				tags: string[];
				image?: string;
			};
			relatedPosts: (Post & { relevance: number })[];
		};
	}>();

	const { content, meta, relatedPosts } = data;
</script>

<div class="min-h-screen bg-black">
	<!-- Subtle background gradient similar to header -->
	<div
		class="bg-gradient-radial pointer-events-none absolute inset-0 from-[rgba(33,158,255,0.08)] via-transparent to-transparent"
	></div>

	<div class="container mx-auto max-w-4xl px-4 py-16">
		<!-- Back to blog navigation -->
		<div class="mb-8">
			<a
				href="/blog"
				class="group flex w-fit items-center gap-2 rounded-md border border-gray-800 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="transition-transform group-hover:-translate-x-1"
				>
					<path d="m15 18-6-6 6-6"></path>
				</svg>
				<span>Back to blog</span>
			</a>
		</div>

		<article
			class="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/20 shadow-lg shadow-[rgba(33,158,255,0.05)] backdrop-blur-sm"
		>
			<!-- Featured image -->
			{#if meta.image}
				<div class="relative h-72 w-full overflow-hidden border-b border-gray-800">
					<img
						src={meta.image}
						alt={meta.title}
						class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
					/>
					<!-- Overlay gradient for better text readability if needed -->
					<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
				</div>
			{/if}

			<!-- Header section with title, date and tags -->
			<header class="border-b border-gray-800 p-8">
				<!-- Date display -->
				<time class="mb-3 block text-sm font-medium text-[var(--color-brand)]">
					{formatDate(meta.date)}
				</time>

				<!-- Title with gradient -->
				<h1
					class="mb-4 bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-text)] bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
				>
					{meta.title}
				</h1>

				<!-- Description if available -->
				{#if meta.description}
					<p class="mb-6 text-lg text-white/80">{meta.description}</p>
				{/if}

				<!-- Tags as clickable links -->
				<div class="flex flex-wrap gap-2">
					{#each meta.tags as tag}
						<a
							href="/blog/category/{tag}"
							class="bg-[var(--color-brand)]/10 hover:bg-[var(--color-brand)]/30 hover:shadow-[var(--color-brand)]/10 rounded-full px-3 py-1 text-sm font-medium text-[var(--color-brand)] backdrop-blur-sm transition-all hover:shadow-md"
						>
							#{tag}
						</a>
					{/each}
				</div>
			</header>

			<!-- Main content with subtle gradient background -->
			<div class="relative overflow-hidden">
				<div
					class="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(33,158,255,0.03)] to-transparent"
				></div>
				<div
					class="prose prose-lg prose-invert relative z-10 mx-auto max-w-none p-8 leading-relaxed md:prose-xl"
				>
					<div
						class="prose-headings:font-bold prose-headings:text-[var(--color-brand)] prose-a:text-[var(--color-brand)] prose-a:no-underline prose-a:hover:underline prose-strong:text-white prose-code:rounded prose-code:bg-black/50 prose-code:p-1 prose-code:text-[var(--color-brand)] prose-hr:border-gray-800"
					>
						{@render content()}
					</div>
				</div>
			</div>
		</article>

		<!-- Related Posts Section with card design -->
		{#if relatedPosts.length > 0}
			<div class="relative mt-16">
				<!-- Subtle glow effect for related posts section -->
				<div
					class="bg-gradient-radial absolute inset-x-0 -top-10 h-40 from-[rgba(33,158,255,0.05)] via-transparent to-transparent"
				></div>

				<h2 class="relative z-10 mb-8 text-2xl font-bold text-[var(--color-brand)]">
					Related Posts
				</h2>
				<div class="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each relatedPosts as post}
						<a href="/blog/{post.slug}" class="group block h-full">
							<div
								class="hover:border-[var(--color-brand)]/50 flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm transition-all hover:bg-gray-900/40 hover:shadow-lg hover:shadow-[rgba(33,158,255,0.1)]"
							>
								<!-- Date -->
								<time class="text-[var(--color-brand)]/80 mb-3 block text-sm font-medium">
									{formatDate(post.date)}
								</time>

								<!-- Title -->
								<h3
									class="mb-4 text-xl font-bold text-white transition-colors group-hover:text-[var(--color-brand)]"
								>
									{post.title}
								</h3>

								<!-- Tags with enhanced clickable appearance -->
								<div class="mb-4 flex flex-wrap gap-2">
									{#each post.tags as tag}
										<span
											on:click|stopPropagation={() =>
												(window.location.href = `/blog/category/${tag}`)}
											class="bg-[var(--color-brand)]/10 text-[var(--color-brand)]/80 hover:bg-[var(--color-brand)]/30 cursor-pointer rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm transition-all"
										>
											#{tag}
										</span>
									{/each}
								</div>

								<!-- Description preview -->
								{#if post.description}
									<p class="mb-4 line-clamp-2 text-sm text-white/60">{post.description}</p>
								{/if}

								<!-- Relevance indicator -->
								<div class="mt-auto flex items-center text-xs text-white/50">
									<span class="flex items-center">
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
											class="mr-1"
											><path
												d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-4a2.5 2.5 0 0 1-2.5-2.5v-15A2.5 2.5 0 0 1 5.5 2h4Z"
											></path><path
												d="M19.5 7A2.5 2.5 0 0 1 22 9.5v10a2.5 2.5 0 0 1-2.5 2.5h-4a2.5 2.5 0 0 1-2.5-2.5v-10A2.5 2.5 0 0 1 15.5 7h4Z"
											></path></svg
										>
										{post.relevance} matching {post.relevance === 1 ? 'tag' : 'tags'}
									</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Enhance the visual styling of the markdown content */
	:global(.prose pre) {
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 0.5rem;
		margin: 1.5rem 0;
		padding: 1rem;
		border: 1px solid rgba(33, 158, 255, 0.2);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	:global(.prose img) {
		border-radius: 0.5rem;
		border: 1px solid rgba(33, 158, 255, 0.2);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	:global(.prose blockquote) {
		border-left-color: var(--color-brand);
		background-color: rgba(33, 158, 255, 0.05);
		padding: 1rem;
		border-radius: 0 0.5rem 0.5rem 0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* Radial gradient for background */
	.bg-gradient-radial {
		background-image: radial-gradient(
			circle at 50% 0%,
			var(--from),
			var(--via) 50%,
			var(--to) 100%
		);
	}
</style>
