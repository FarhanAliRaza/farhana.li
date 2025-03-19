<script lang="ts">
	import type { Project } from '$lib/types';

	/** The project to display */
	let { project } = $props<{
		project: Project;
	}>();
</script>

<article
	class="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-md transition-all duration-300 hover:-translate-y-2"
>
	<!-- Image with overlay -->
	<div class="relative h-52 overflow-hidden">
		<enhanced:img
			src={project.image}
			alt={project.title}
			class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
			loading="lazy"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
	</div>

	<div class="flex h-[calc(100%-13rem)] flex-col p-7">
		<h3 class="mb-3 text-2xl font-semibold text-white">
			<a href="/projects/{project.slug}" class="transition-colors hover:text-[var(--color-brand)]">
				{project.title}
			</a>
		</h3>

		<p class="mb-4 line-clamp-3 flex-grow text-gray-300">
			{project.description}
		</p>

		<div class="mt-auto">
			<div class="mb-5 flex flex-wrap gap-2">
				{#each project.tags as tag}
					<span
						class="bg-[var(--color-brand)]/10 rounded-full px-3 py-1 text-sm font-medium text-[var(--color-brand)]"
					>
						#{tag}
					</span>
				{/each}
			</div>

			<div class="flex gap-4">
				{#if project.demo}
					<a
						href={project.demo}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-1 text-white/80 transition-colors hover:text-[var(--color-brand)]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
							<polyline points="15 3 21 3 21 9"></polyline>
							<line x1="10" y1="14" x2="21" y2="3"></line>
						</svg>
						Live Demo
					</a>
				{/if}
				{#if project.github}
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-1 text-white/80 transition-colors hover:text-[var(--color-brand)]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
							></path>
						</svg>
						GitHub
					</a>
				{/if}
			</div>
		</div>
	</div>
</article>
