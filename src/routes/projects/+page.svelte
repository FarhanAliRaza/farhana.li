<script lang="ts">
	import type { Project } from '$lib/types';
	import GridSection from '$lib/components/GridSection.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let { data } = $props<{
		data: { projects: Project[] };
	}>();

	const { projects } = data;
</script>

<div class="min-h-screen bg-black relative overflow-hidden">
	<!-- Header section with gradient background -->
	<div
		class="bg-gradient-radial pointer-events-none absolute inset-0 from-[rgba(33,158,255,0.3)] to-transparent z-0"
		style="background-position: center top; background-size: 100% 100%;"
	></div>

	<GridSection
		title="Projects Case Studies"
		highlightedText=""
		viewAllLink=""
		extraClass="relative z-10"
	>
		<div class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</GridSection>
</div>
