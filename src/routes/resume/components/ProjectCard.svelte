<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';

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

<article class="project">
	<header class="project-header">
		<div class="title-row">
			{#if url}
				<h3 class="title">
					<a href={url} target="_blank" rel="noopener noreferrer" class="title-link">
						{name}
						<ExternalLink size={12} />
					</a>
				</h3>
			{:else}
				<h3 class="title">{name}</h3>
			{/if}
			<ul class="tags">
				{#each tags as tag}
					<li class="tag">{tag}</li>
				{/each}
			</ul>
		</div>
	</header>
	<p class="description">{description}</p>
</article>

<style>
	.project {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.project-header {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.title {
		font-size: 0.9rem;
		font-weight: 600;
		margin: 0;
		line-height: 1.3;
	}

	.title-link {
		color: inherit;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}

	.title-link:hover {
		text-decoration: underline;
	}

	.description {
		font-family: var(--resume-font-mono);
		font-size: 0.8rem;
		color: rgba(15, 23, 42, 0.7);
		margin: 0;
		line-height: 1.5;
	}

	.tags {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.tag {
		padding: 2px 6px;
		border-radius: 4px;
		background-color: rgba(15, 23, 42, 0.08);
		font-family: var(--resume-font-mono);
		font-size: 0.7rem;
		color: rgba(15, 23, 42, 0.75);
		font-weight: 900;
	}

	@media print {
		.project {
			gap: 0.15rem;
		}

		.title {
			font-size: 8.5pt;
			font-weight: 600;
		}

		.description {
			font-size: 7.5pt;
			line-height: 1.3;
		}

		.tag {
			padding: 1px 4px;
			font-size: 6.5pt;
		}

		.tags {
			gap: 0.2rem;
		}
	}
</style>
