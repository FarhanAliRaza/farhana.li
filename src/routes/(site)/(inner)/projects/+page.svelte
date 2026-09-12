<script lang="ts">
	import type { Project } from '$lib/types';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	let { data }: { data: { projects: Project[] } } = $props();
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

<main class="bento-page">
	<div class="bento-shell">
		<header class="bento-page__header">
			<div>
				<p class="bento-eyebrow">Selected work</p>
				<h1>Things I’ve built.</h1>
				<p class="bento-page__intro">
					Web applications, open-source tools, and experiments in making software work better.
				</p>
			</div>
			<span class="bento-page__count"
				>{data.projects.length} {data.projects.length === 1 ? 'project' : 'projects'}</span
			>
		</header>
		<div class="bento-list">
			{#each data.projects as project (project.slug)}<ProjectCard {project} />
			{:else}<p class="bento-empty">No projects published yet. Check back soon.</p>{/each}
		</div>
	</div>
</main>
