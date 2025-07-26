<script lang="ts">
	import { formatDate } from '$lib/utils';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import type { Post } from '$lib/types';
	import '$lib/prose-styles.css';

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
				slug: string;
			};
			relatedPosts: (Post & { relevance: number })[];
		};
	}>();

	const { content, meta, relatedPosts } = data;
</script>

<svelte:head>
	<title>{meta.title} - Farhan's Blog</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://farhana.li/blog/${meta.slug}`} />
	{#if meta.image}
		<meta property="og:image" content={meta.image} />
		<meta name="twitter:image" content={meta.image} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta property="article:published_time" content={new Date(meta.date).toISOString()} />
	<meta property="article:tag" content={meta.tags.join(',')} />
	<link rel="canonical" href={`https://farhana.li/blog/${meta.slug}`} />
</svelte:head>

<div class="container mx-auto max-w-4xl py-16 md:px-4">
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
			<span>Back to blogs</span>
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
			<!-- {#if meta.description}
				<p class="mb-6 text-lg text-white/80">{meta.description}</p>
			{/if} -->

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
				class="prose prose-lg prose-invert relative z-10 mx-auto max-w-none p-4 leading-relaxed md:prose-xl md:p-8"
			>
				<div
					class="prose-headings:font-bold prose-headings:text-[var(--color-brand)] prose-a:text-[var(--color-brand)] prose-a:no-underline prose-a:hover:underline prose-strong:text-white prose-code:rounded prose-hr:border-gray-800"
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
				class="absolute inset-x-0 -top-10 h-40 bg-gradient-radial from-[rgba(33,158,255,0.05)] via-transparent to-transparent"
			></div>

			<h2 class="relative z-10 mb-8 text-2xl font-bold text-[var(--color-brand)]">Related Posts</h2>
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

