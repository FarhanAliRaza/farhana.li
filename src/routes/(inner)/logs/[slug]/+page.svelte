<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { Log } from '$lib/types';
	import '$lib/prose-styles.css';

	let { data } = $props<{
		data: {
			content: any;
			meta: {
				title: string;
				date: string;
				tags: string[];
				slug: string;
				excerpt: string;
			};
			nextLogs: Log[];
			relatedLogs: (Log & { relevance: number })[];
		};
	}>();

	const { content, meta, nextLogs, relatedLogs } = data;
</script>

<svelte:head>
	<title>{meta.title} - Dev Log - Farhan's Portfolio</title>
	<meta name="description" content={meta.excerpt} />
	<meta property="og:title" content={`${meta.title} - Dev Log - Farhan's Portfolio`} />
	<meta property="og:description" content={meta.excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://farhana.li/logs/${meta.slug}`} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={`${meta.title} - Dev Log - Farhan's Portfolio`} />
	<meta name="twitter:description" content={`Development log entry: ${meta.title}`} />
	<meta property="article:published_time" content={new Date(meta.date).toISOString()} />
	<meta property="article:tag" content={meta.tags.join(',')} />
	<link rel="canonical" href={`https://farhana.li/logs/${meta.slug}`} />
</svelte:head>

<div class="container mx-auto max-w-4xl px-4 py-16">
	<!-- Back to logs navigation -->
	<div class="mb-8">
		<a
			href="/logs"
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
			<span>Back to logs</span>
		</a>
	</div>

	<article class="rounded-xl border border-gray-800 bg-gray-900/20 backdrop-blur-sm">
		<!-- Header section with title, date and tags -->
		<header class="border-b border-gray-800 p-8">
			<!-- Date display -->
			<time class="mb-3 block text-sm font-medium text-[var(--color-brand)]">
				{formatDate(meta.date)}
			</time>

			<!-- Title with gradient -->
			<h1
				class="mb-6 bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-text)] bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
			>
				{meta.title}
			</h1>

			<!-- Tags as clickable links -->
			<div class="flex flex-wrap gap-2">
				{#each meta.tags as tag}
					<a
						href="/logs/category/{tag}"
						class="bg-[var(--color-brand)]/10 hover:bg-[var(--color-brand)]/20 rounded-full px-3 py-1 text-sm font-medium text-[var(--color-brand)] backdrop-blur-sm transition-all"
					>
						#{tag}
					</a>
				{/each}
			</div>
		</header>

		<!-- Main content -->
		<div class="prose prose-lg prose-invert mx-auto max-w-none p-8 leading-relaxed md:prose-xl">
			<div
				class="prose-headings:font-bold prose-headings:text-[var(--color-brand)] prose-a:text-[var(--color-brand)] prose-a:no-underline prose-a:hover:underline prose-strong:text-white prose-code:rounded prose-hr:border-gray-800"
			>
				{@render content()}
			</div>
		</div>
	</article>

	<!-- Next Logs Section -->
	{#if nextLogs.length > 0}
		<div class="mt-16">
			<h2 class="mb-8 text-2xl font-bold text-[var(--color-brand)]">Continue Reading</h2>
			<div class="space-y-6">
				{#each nextLogs as log}
					<a
						href="/logs/{log.slug}"
						class="hover:border-[var(--color-brand)]/50 block rounded-xl border border-gray-800 bg-gray-900/20 p-6 backdrop-blur-sm transition-all hover:bg-gray-900/30"
					>
						<time class="text-[var(--color-brand)]/80 mb-2 block text-sm font-medium">
							{formatDate(log.date)}
						</time>
						<h3 class="mb-3 text-xl font-bold text-white">{log.title}</h3>
						<div class="flex flex-wrap gap-2">
							{#each log.tags as tag}
								<span
									class="bg-[var(--color-brand)]/10 text-[var(--color-brand)]/80 rounded-full px-2 py-0.5 text-xs font-medium"
								>
									#{tag}
								</span>
							{/each}
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Related Logs by Category -->
	{#if relatedLogs.length > 0}
		<div class="mt-16">
			<h2 class="mb-8 text-2xl font-bold text-[var(--color-brand)]">Related by Category</h2>
			<div class="space-y-6">
				{#each relatedLogs as log}
					<a
						href="/logs/{log.slug}"
						class="hover:border-[var(--color-brand)]/50 block rounded-xl border border-gray-800 bg-gray-900/20 p-6 backdrop-blur-sm transition-all hover:bg-gray-900/30"
					>
						<time class="text-[var(--color-brand)]/80 mb-2 block text-sm font-medium">
							{formatDate(log.date)}
						</time>
						<h3 class="mb-3 text-xl font-bold text-white">{log.title}</h3>
						<div class="flex flex-wrap gap-2">
							{#each log.tags as tag}
								<span
									class="bg-[var(--color-brand)]/10 text-[var(--color-brand)]/80 rounded-full px-2 py-0.5 text-xs font-medium"
								>
									#{tag}
								</span>
							{/each}
						</div>
						<div class="mt-2 text-sm text-white/60">
							{log.relevance} matching {log.relevance === 1 ? 'category' : 'categories'}
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

