<script lang="ts">
	import type { Log } from '$lib/types';
	import { formatDate } from '$lib/utils';

	let { data } = $props<{
		data: {
			tag: string;
			logs: Log[];
		};
	}>();

	const { tag, logs } = data;
</script>

<svelte:head>
	<title>{tag} - Logs Category - Farhan's Portfolio</title>
	<meta
		name="description"
		content={`Explore Farhan's development logs about ${tag.toLowerCase()}`}
	/>
	<meta property="og:title" content={`${tag} - Logs Category - Farhan's Portfolio`} />
	<meta
		property="og:description"
		content={`Explore Farhan's development logs about ${tag.toLowerCase()}`}
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://farhana.li/logs/category/${tag.toLowerCase()}`} />
	<meta name="twitter:title" content={`${tag} - Logs Category - Farhan's Portfolio`} />
	<meta
		name="twitter:description"
		content={`Explore Farhan's development logs about ${tag.toLowerCase()}`}
	/>
	<link rel="canonical" href={`https://farhana.li/logs/category/${tag.toLowerCase()}`} />
</svelte:head>

<div class="container mx-auto px-4 py-16">
	<!-- Navigation back to all logs -->
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
			<span>All Development Logs</span>
		</a>
	</div>

	<!-- Category header -->
	<header class="mb-16">
		<h1 class="mb-3 text-4xl font-bold text-white md:text-5xl">
			Category: <span class="text-[var(--color-brand)]">#{tag}</span>
		</h1>
		<p class="text-lg text-white/70">
			{logs.length}
			{logs.length === 1 ? 'log' : 'logs'} in this category
		</p>
	</header>

	<!-- Logs list -->
	{#if logs.length > 0}
		<div class="grid gap-8">
			{#each logs as log}
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
								class="bg-[var(--color-brand)]/10 text-[var(--color-brand)]/80 rounded-full px-3 py-1 text-xs font-medium"
							>
								#{tag}
							</span>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div class="rounded-xl border border-gray-800 bg-gray-900/20 p-8 text-center backdrop-blur-sm">
			<p class="text-lg text-white/70">No logs found in this category.</p>
		</div>
	{/if}
</div>
