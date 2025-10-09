<script lang="ts">
	import type { Project } from '$lib/types';
	import GridSection from '$lib/components/GridSection.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let { data } = $props<{
		data: { projects: Project[] };
	}>();

	const { projects } = data;
</script>

<svelte:head>
	<title>Projects - Farhan's Developer Portfolio</title>
	<meta name="description" content="Explore Farhan's development projects and coding work." />
	<meta property="og:title" content="Projects - Farhan's Developer Portfolio" />
	<meta
		property="og:description"
		content="Explore Farhan's development projects and coding work."
	/>
	<meta property="og:url" content="https://farhana.li/projects" />
	<meta name="twitter:title" content="Projects - Farhan's Developer Portfolio" />
	<meta
		name="twitter:description"
		content="Explore Farhan's development projects and coding work."
	/>
	<link rel="canonical" href="https://farhana.li/projects" />
</svelte:head>

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
