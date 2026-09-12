<script lang="ts">
	import { ArrowUpRight, ArrowRight, Code2, Github } from 'lucide-svelte';
	import type { Project } from '$lib/types';

	let { project }: { project: Project } = $props();
</script>

<article class="bento-card bento-card--project">
	{#if project.image}
		<a class="bento-card__image" href="/projects/{project.slug}" tabindex="-1" aria-hidden="true"
			><img src={project.image} alt="" loading="lazy" /></a
		>
	{/if}
	<div class="bento-card__body">
		<div class="bento-card__meta">
			<span class="bento-card__icon"><Code2 size={20} aria-hidden="true" /></span><span
				>Selected project</span
			>
		</div>
		<h3 class="bento-card__title"><a href="/projects/{project.slug}">{project.title}</a></h3>
		<p class="bento-card__description">{project.description}</p>
		<div class="bento-card__tags">
			{#each project.tags ?? [] as tag}<span class="bento-tag">{tag}</span>{/each}
		</div>
		<div class="bento-card__actions">
			<a class="bento-card__link" href="/projects/{project.slug}"
				>View project <ArrowRight size={16} aria-hidden="true" /></a
			>
			{#if project.demo}<a
					class="bento-card__link bento-card__link--quiet"
					href={project.demo}
					target="_blank"
					rel="noopener noreferrer">Visit site <ArrowUpRight size={15} aria-hidden="true" /></a
				>{/if}
			{#if project.github}<a
					class="bento-card__link bento-card__link--quiet"
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"><Github size={15} aria-hidden="true" /> Code</a
				>{/if}
		</div>
	</div>
</article>
