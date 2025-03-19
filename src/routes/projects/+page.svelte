<script lang="ts">
	import type { Project } from '$lib/types';
	import GridSection from '$lib/components/GridSection.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let { data } = $props<{
		data: { projects: Project[] };
	}>();

	const { projects } = data;
</script>

<div class="min-h-screen bg-black">
	<GridSection title="All" highlightedText="Projects" viewAllLink="">
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</GridSection>
</div>
