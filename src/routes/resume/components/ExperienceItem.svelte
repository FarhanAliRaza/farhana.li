<script lang="ts">
	let {
		company,
		tags,
		dateRange,
		jobTitle,
		responsibilities
	}: {
		company: string;
		tags: string[];
		dateRange: string;
		jobTitle: string;
		responsibilities: string[];
	} = $props();
</script>

<article class="experience">
	<header class="header">
		<h3 class="role">{jobTitle}</h3>
		<span class="period">{dateRange}</span>
	</header>

	<div class="company">{company}</div>

	<ul class="badges">
		{#each tags as tag}
			<li class="badge">{tag}</li>
		{/each}
	</ul>

	<p class="description font-mono">
		{@html responsibilities[0]}
	</p>

	{#if responsibilities.length > 1}
		<ul class="highlights font-mono">
			{#each responsibilities.slice(1) as responsibility}
				<li>{@html responsibility}</li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	.experience {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.company {
		font-size: 0.9rem;
		font-weight: 500;
		color: rgba(15, 23, 42, 0.7);
		margin: 0;
	}

	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.badge {
		padding: 3px 8px;
		border-radius: 4px;
		background-color: rgba(15, 23, 42, 0.08);
		font-family: var(--resume-font-mono);
		font-size: 0.75rem;
		color: rgba(15, 23, 42, 0.75);
		font-weight: 900;
	}

	.period {
		font-size: 0.875rem;
		color: rgba(15, 23, 42, 0.6);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.role {
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
		color: rgba(15, 23, 42, 1);
	}

	.description {
		font-size: 0.875rem;
		line-height: 1.6;
		color: rgba(15, 23, 42, 0.75);
		margin: 0.25rem 0 0 0;
	}

	.highlights {
		font-size: 0.875rem;
		line-height: 1.6;
		color: rgba(15, 23, 42, 0.75);
		margin: 0.5rem 0 0 0;
		padding-left: 1.25rem;
	}

	.highlights li {
		margin-bottom: 0.375rem;
	}

	.highlights li:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 640px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media print {
		.experience {
			gap: 0.15rem;
		}

		.header {
			gap: 0.5rem;
		}

		.role {
			font-size: 10pt;
		}

		.company {
			font-size: 9pt;
		}

		.badge {
			font-size: 7pt;
			padding: 2px 5px;
		}

		.badges {
			gap: 0.3rem;
		}

		.period {
			font-size: 8pt;
		}

		.description,
		.highlights {
			font-size: 8pt;
			line-height: 1.35;
		}

		.description {
			margin: 0;
		}

		.highlights {
			margin: 0.15rem 0 0 0;
			padding-left: 1rem;
		}

		.highlights li {
			margin-bottom: 0.15rem;
		}
	}
</style>
