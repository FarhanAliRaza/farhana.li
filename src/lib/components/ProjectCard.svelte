<script lang="ts">
	import type { Project } from '$lib/types';
	import { onMount } from 'svelte';

	/** The project to display */
	let { project } = $props<{
		project: Project;
	}>();

	let canvas: HTMLCanvasElement;

	onMount(() => {
		if (!project.image && canvas) {
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			let animationId: number;
			let time = 0;

			// Set canvas size
			const updateSize = () => {
				const rect = canvas.getBoundingClientRect();
				canvas.width = rect.width;
				canvas.height = rect.height;
			};

			updateSize();

			const animate = () => {
				const width = canvas.width;
				const height = canvas.height;

				// Fill with black background
				ctx.fillStyle = 'rgb(7, 33, 53)';
				ctx.fillRect(0, 0, width, height);

				const t = time * 0.001;

				// First blob (purple/pink) - moves in circular motion
				const blob1X = width * 0.3 + Math.sin(t * 0.8) * width * 0.15;
				const blob1Y = height * 0.3 + Math.cos(t * 0.6) * height * 0.15;
				const gradient1 = ctx.createRadialGradient(
					blob1X,
					blob1Y,
					0,
					blob1X,
					blob1Y,
					Math.max(width, height) * 0.5
				);
				gradient1.addColorStop(0, 'rgba(219, 39, 119, 0.6)'); // Pink
				gradient1.addColorStop(0.3, 'rgba(147, 51, 234, 0.5)'); // Purple
				gradient1.addColorStop(0.6, 'rgba(79, 70, 229, 0.3)'); // Indigo
				gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparent

				ctx.fillStyle = gradient1;
				ctx.fillRect(0, 0, width, height);

				// Second blob (cyan/blue) - moves in opposite circular motion
				const blob2X = width * 0.7 + Math.sin(t * 0.7 + Math.PI) * width * 0.15;
				const blob2Y = height * 0.7 + Math.cos(t * 0.5 + Math.PI) * height * 0.15;
				const gradient2 = ctx.createRadialGradient(
					blob2X,
					blob2Y,
					0,
					blob2X,
					blob2Y,
					Math.max(width, height) * 0.5
				);
				gradient2.addColorStop(0, 'rgba(6, 182, 212, 0.6)'); // Cyan
				gradient2.addColorStop(0.3, 'rgba(59, 130, 246, 0.5)'); // Blue
				gradient2.addColorStop(0.6, 'rgba(79, 70, 229, 0.3)'); // Indigo
				gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparent

				ctx.globalCompositeOperation = 'screen'; // Blend mode for color mixing
				ctx.fillStyle = gradient2;
				ctx.fillRect(0, 0, width, height);
				ctx.globalCompositeOperation = 'source-over'; // Reset blend mode

				// Add grain/noise effect
				const imageData = ctx.getImageData(0, 0, width, height);
				const pixels = imageData.data;

				for (let i = 0; i < pixels.length; i += 4) {
					const noise = (Math.random() - 0.5) * 80; // Adjust grain intensity
					pixels[i] += noise; // R
					pixels[i + 1] += noise; // G
					pixels[i + 2] += noise; // B
				}

				ctx.putImageData(imageData, 0, 0);

				time += 1;
				animationId = requestAnimationFrame(animate);
			};

			animate();

			return () => {
				cancelAnimationFrame(animationId);
			};
		}
	});
</script>

<article
	class="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-md transition-all duration-300 hover:-translate-y-2"
>
	<!-- Image with overlay -->
	{#if project.image}
		<div class="relative h-40 overflow-hidden sm:h-52">
			<img
				src={project.image}
				alt={project.title}
				class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
				loading="lazy"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
		</div>
	{:else}
		<!-- Animated canvas shader with title -->
		<div class="relative h-40 overflow-hidden bg-black/50 sm:h-52">
			<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
			<div class="absolute inset-0 flex items-center justify-center bg-black/20">
				<h3 class="px-4 text-center text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
					{project.title}
				</h3>
			</div>
			<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
		</div>
	{/if}

	<div class="flex h-[calc(100%-10rem)] flex-col p-4 sm:h-[calc(100%-13rem)] sm:p-7">
		<h3 class="mb-2 text-xl font-semibold text-white sm:mb-3 sm:text-2xl">
			<a href="/projects/{project.slug}" class="transition-colors hover:text-[var(--color-brand)]">
				{project.title}
			</a>
		</h3>

		<p class="mb-3 line-clamp-3 flex-grow text-sm text-gray-300 sm:mb-4 sm:text-base">
			{project.description}
		</p>

		<div class="mt-auto">
			<div class="mb-3 flex flex-wrap gap-1 sm:mb-5 sm:gap-2">
				{#each project.tags as tag}
					<span
						class="bg-[var(--color-brand)]/10 rounded-full px-2 py-0.5 text-xs font-medium text-[var(--color-brand)] sm:px-3 sm:py-1 sm:text-sm"
					>
						#{tag}
					</span>
				{/each}
			</div>

			<div class="flex gap-3 sm:gap-4">
				{#if project.demo}
					<a
						href={project.demo}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-[var(--color-brand)] sm:text-base"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="sm:h-[18px] sm:w-[18px]"
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
						class="flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-[var(--color-brand)] sm:text-base"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="sm:h-[18px] sm:w-[18px]"
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
