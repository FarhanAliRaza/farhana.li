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
		gap: 0.55rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.skill {
		padding: 7px 13px;
		border-radius: 6px;
		background-color: rgba(15, 23, 42, 0.85);
		font-size: 0.875rem;
		color: white;
		font-weight: 600;
	}

	@media print {
		.skills {
			gap: 0.3rem;
		}

		.skill {
			padding: 2px 7px;
			font-size: 7.8pt;
			font-weight: 600;
			background-color: rgba(15, 23, 42, 0.85);
		}
	}
</style>
