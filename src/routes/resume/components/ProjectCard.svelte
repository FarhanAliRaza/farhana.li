<script lang="ts">
	let {
		name,
		description,
		tags,
		url
	}: {
		name: string;
		description: string;
		tags: string[];
		url?: string;
	} = $props();
</script>

<article class="card">
	<header class="card-header">
		{#if url}
			<h3 class="title">
				<a href={url} target="_blank" rel="noopener noreferrer" class="title-link">
					{name}
					<span class="live-dot" aria-label="Live project"></span>
				</a>
			</h3>
			<a href={url} target="_blank" rel="noopener noreferrer" class="print-url" aria-hidden="true">
				{new URL(url).hostname + new URL(url).pathname}
			</a>
		{:else}
			<h3 class="title">{name}</h3>
		{/if}
	</header>
	<p class="description">{description}</p>
	<footer class="card-footer">
		<ul class="tags">
			{#each tags as tag}
				<li class="tag">{tag}</li>
			{/each}
		</ul>
	</footer>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		height: 100%;
		border: 1px solid rgba(15, 23, 42, 0.12);
		border-radius: 8px;
		padding: 1.25rem;
		gap: 0.75rem;
		background: white;
	}

	.card-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
	}

	.title {
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
		line-height: 1.4;
	}

	.print-url {
		display: none;
		font-family: var(--resume-font-mono);
		font-size: 0.75rem;
		text-decoration: underline;
		color: rgba(15, 23, 42, 0.6);
	}

	.title-link {
		color: inherit;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
	}

	.title-link:hover {
		text-decoration: underline;
	}

	.live-dot {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background-color: #22c55e;
		flex-shrink: 0;
		margin-left: 0.05rem;
	}

	@media (prefers-color-scheme: dark) {
		.live-dot {
			background-color: #4ade80;
		}
	}

	.description {
		flex: 1;
		font-size: 0.875rem;
		color: rgba(15, 23, 42, 0.75);
		margin: 0;
		line-height: 1.6;
	}

	.card-footer {
		margin-top: auto;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.tag {
		padding: 4px 10px;
		border-radius: 4px;
		background-color: rgba(15, 23, 42, 0.06);
		font-size: 0.75rem;
		color: rgba(15, 23, 42, 0.75);
		font-weight: 500;
	}

	@media print {
		.card {
			break-inside: avoid;
			page-break-inside: avoid;
			padding: 0.625rem 0.75rem;
			margin-bottom: 0.375rem;
			border: 1px solid rgba(15, 23, 42, 0.15);
			gap: 0.5rem;
			width: 100%;
			box-sizing: border-box;
		}

		.card-header {
			gap: 0.125rem;
		}

		.title {
			font-size: 10pt;
			font-weight: 600;
			line-height: 1.3;
		}

		.live-dot {
			width: 5px;
			height: 5px;
			background-color: #22c55e;
		}

		.print-url {
			display: block;
			font-size: 7.5pt;
			color: rgba(15, 23, 42, 0.55);
			text-decoration: underline;
		}

		.description {
			font-size: 8.5pt;
			line-height: 1.4;
		}

		.tag {
			padding: 2px 7px;
			font-size: 7.5pt;
		}

		.tags {
			gap: 0.25rem;
			flex-wrap: wrap;
		}
	}
</style>
