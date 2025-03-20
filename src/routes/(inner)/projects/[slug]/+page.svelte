<script lang="ts">
	import { formatDate } from '$lib/utils';

	let { data } = $props<{
		data: {
			content: any;
			meta: {
				title: string;
				description: string;
				date: string;
				tags: string[];
				image: string;
				github?: string;
				demo?: string;
				slug: string;
			};
		};
	}>();

	const { content, meta } = data;
</script>

<svelte:head>
	<title>{meta.title} - Project - Farhan's Portfolio</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={`${meta.title} - Project - Farhan's Portfolio`} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://farhana.li/projects/${meta.slug}`} />
	<meta property="og:image" content={meta.image} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${meta.title} - Project - Farhan's Portfolio`} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image} />
	<meta property="article:published_time" content={new Date(meta.date).toISOString()} />
	<meta property="article:tag" content={meta.tags.join(',')} />
	<link rel="canonical" href={`https://farhana.li/projects/${meta.slug}`} />
</svelte:head>

<div class="container mx-auto max-w-5xl px-4 py-16">
	<!-- Back to projects navigation -->
	<div class="mb-8">
		<a
			href="/projects"
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
			<span>Back to projects</span>
		</a>
	</div>

	<article
		class="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/20 backdrop-blur-sm"
	>
		<!-- Hero image with overlay -->
		<div class="relative h-80 w-full overflow-hidden border-b border-gray-800">
			<img
				src={meta.image}
				alt={meta.title}
				class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
			/>
			<!-- Overlay gradient for better text readability -->
			<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>

			<!-- Project title overlay on image -->
			<div class="absolute bottom-0 left-0 right-0 p-8">
				<h1
					class="mb-4 bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-text)] bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
				>
					{meta.title}
				</h1>
				<p class="mb-4 max-w-3xl text-lg text-white/90">{meta.description}</p>
			</div>
		</div>

		<!-- Project details section -->
		<div class="border-b border-gray-800 p-8">
			<div class="flex flex-wrap items-center justify-between gap-6">
				<!-- Tags -->
				<div class="flex flex-wrap gap-2">
					{#each meta.tags as tag}
						<span
							class="bg-[var(--color-brand)]/10 rounded-full px-3 py-1 text-sm font-medium text-[var(--color-brand)] backdrop-blur-sm"
						>
							#{tag}
						</span>
					{/each}
				</div>

				<!-- Date -->
				<time class="text-sm font-medium text-gray-400">
					{formatDate(meta.date)}
				</time>
			</div>

			<!-- Project links -->
			<div class="mt-8 flex flex-wrap gap-4">
				{#if meta.demo}
					<a
						href={meta.demo}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:shadow-[var(--color-brand)]/20 flex items-center rounded-md bg-[var(--color-brand)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-opacity-80 hover:shadow-lg"
					>
						<span class="mr-2">
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
							>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								<polyline points="15 3 21 3 21 9" />
								<line x1="10" y1="14" x2="21" y2="3" />
							</svg>
						</span>
						View Live Demo
					</a>
				{/if}
				{#if meta.github}
					<a
						href={meta.github}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center rounded-md border border-gray-700 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-gray-600 hover:bg-gray-700"
					>
						<span class="mr-2">
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
							>
								<path
									d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
								/>
							</svg>
						</span>
						View on GitHub
					</a>
				{/if}
			</div>
		</div>

		<!-- Main content -->
		<div class="prose prose-lg prose-invert mx-auto max-w-none p-8 leading-relaxed md:prose-xl">
			<div
				class="prose-headings:font-bold prose-headings:text-[var(--color-brand)] prose-a:text-[var(--color-brand)] prose-a:no-underline prose-a:hover:underline prose-strong:text-white prose-code:rounded prose-code:bg-black/50 prose-code:p-1 prose-code:text-[var(--color-brand)] prose-img:rounded-xl prose-hr:border-gray-800"
			>
				{@render content()}
			</div>
		</div>
	</article>
</div>

<style>
	/* Enhance the visual styling of the markdown content */
	:global(.prose pre) {
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 0.5rem;
		margin: 1.5rem 0;
		padding: 1rem;
		border: 1px solid rgba(33, 158, 255, 0.2);
	}

	:global(.prose img) {
		border-radius: 0.5rem;
		border: 1px solid rgba(33, 158, 255, 0.2);
	}

	:global(.prose blockquote) {
		border-left-color: var(--color-brand);
		background-color: rgba(33, 158, 255, 0.05);
		padding: 1rem;
		border-radius: 0 0.5rem 0.5rem 0;
	}

	:global(.prose table) {
		border-collapse: separate;
		border-spacing: 0;
		margin: 2rem 0;
		overflow: hidden;
		border-radius: 0.5rem;
		border: 1px solid rgba(33, 158, 255, 0.2);
	}

	:global(.prose th) {
		background-color: rgba(33, 158, 255, 0.1);
		color: var(--color-brand);
		font-weight: 600;
		text-align: left;
		padding: 0.75rem 1rem;
	}

	:global(.prose td) {
		padding: 0.75rem 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}
</style>
