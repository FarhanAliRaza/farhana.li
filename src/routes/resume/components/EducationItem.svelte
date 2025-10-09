<script lang="ts">
	let { institution, degree, dateRange }: { institution: string; degree: string; dateRange: string } = $props();
</script>

<article class="education">
	<header class="header">
		<h3 class="institution">{institution}</h3>
		<span class="period">{dateRange}</span>
	</header>
	<p class="degree">{degree}</p>
</article>

<style>
	.education {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.institution {
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
	}

	.period {
		font-size: 0.875rem;
		color: rgba(15, 23, 42, 0.6);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.degree {
		font-size: 0.875rem;
		color: rgba(15, 23, 42, 0.75);
		margin: 0;
	}

	@media (max-width: 640px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media print {
		.education {
			break-inside: avoid;
			page-break-inside: avoid;
		}
	}
</style>
