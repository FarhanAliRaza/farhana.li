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
				<a href={url} target="_blank" rel="noopener noreferrer" class="title-link">{name}</a>
			</h3>
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
		align-items: flex-start;
		gap: 0.5rem;
	}

	.title {
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
		line-height: 1.4;
	}

	.title-link {
		color: inherit;
		text-decoration: none;
	}

	.title-link:hover {
		text-decoration: underline;
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
		}
	}
</style>
