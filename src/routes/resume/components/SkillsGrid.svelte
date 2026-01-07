<script lang="ts">
	let { skills }: { skills: string[] } = $props();
</script>

<ul class="skills" aria-label="Skills">
	{#each skills as skill}
		<li class="skill">{skill}</li>
	{/each}
</ul>

<style>
	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.skill {
		padding: 6px 12px;
		border-radius: 6px;
		background-color: rgba(15, 23, 42, 0.85);
		font-size: 0.8125rem;
		color: white;
		font-weight: 500;
	}

	@media print {
		.skills {
			gap: 0.25rem;
		}

		.skill {
			padding: 2px 6px;
			font-size: 7pt;
			background-color: rgba(15, 23, 42, 0.85);
		}
	}
</style>
