<script lang="ts">
	import { onMount } from 'svelte';

	// Animation effect for skills
	onMount(() => {
		const skillBars = document.querySelectorAll<HTMLDivElement>('.skill-bar');

		// Animate skill bars
		skillBars.forEach((bar, index) => {
			setTimeout(() => {
				const width = bar.getAttribute('data-width');
				bar.style.width = width || '0%';
			}, 200 * index);
		});
	});
</script>

<div class="relative min-h-screen bg-black overflow-hidden">
	<!-- Main gradient background -->
	<div
		class="bg-gradient-radial pointer-events-none absolute inset-0 from-[rgba(33,158,255,0.3)] to-transparent z-0"
		style="background-position: center top; background-size: 100% 100%;"
	></div>

	<main class="container relative z-10 mx-auto px-6 py-16">
		<!-- Header Section -->
		<header class="mb-16 text-center">
			<h1 class="mb-4 text-4xl font-bold md:text-5xl">
				<span
					class="bg-gradient-to-r from-[var(--color-brand)] to-white bg-clip-text text-transparent"
				>
					About Me
				</span>
			</h1>
			<p class="mx-auto max-w-2xl text-lg text-white/70">
				Passionate full-stack developer with a focus on creating beautiful, functional, and
				accessible web experiences.
			</p>
		</header>

		<!-- Profile Section -->
		<div class="mb-16 grid gap-12 md:grid-cols-3">
			<!-- Profile Image -->
			<div class="flex justify-center md:col-span-1">
				<div
					class="border-[var(--color-brand)]/30 relative h-64 w-64 overflow-hidden rounded-full border-2"
				>
					<div
						class="from-[var(--color-brand)]/10 absolute inset-0 bg-gradient-to-b to-transparent"
					></div>
					<!-- Replace with your profile picture -->
					<div
						class="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 text-[var(--color-brand)]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="64"
							height="64"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
							<circle cx="12" cy="7" r="4"></circle>
						</svg>
					</div>
				</div>
			</div>

			<!-- Profile Info -->
			<div class="md:col-span-2">
				<h2 class="mb-4 text-2xl font-semibold text-white">About Me</h2>

				<p class="mb-4 text-white/70">
					I'm a full-stack developer with over 5 years of experience building web applications. I
					specialize in modern JavaScript frameworks, particularly SvelteKit and React, with a
					strong foundation in backend technologies.
				</p>

				<p class="mb-6 text-white/70">
					My approach to development focuses on creating intuitive user experiences backed by clean,
					maintainable code. I'm passionate about web performance, accessibility, and building
					systems that scale.
				</p>

				<!-- Contact Info -->
				<div class="mb-6 flex flex-col gap-4 sm:flex-row">
					<a
						href="mailto:hello@example.com"
						class="flex items-center gap-2 text-white/70 transition-colors hover:text-[var(--color-brand)]"
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
						>
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
							></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
						<span>hello@example.com</span>
					</a>

					<a
						href="tel:+11234567890"
						class="flex items-center gap-2 text-white/70 transition-colors hover:text-[var(--color-brand)]"
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
						>
							<path
								d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
							></path>
						</svg>
						<span>(123) 456-7890</span>
					</a>
				</div>

				<!-- Social Links -->
				<div class="flex gap-4">
					<a
						href="https://github.com/yourusername"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-full bg-gray-800 p-2 text-white/70 transition-colors hover:text-[var(--color-brand)]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
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
					</a>

					<a
						href="https://linkedin.com/in/yourusername"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-full bg-gray-800 p-2 text-white/70 transition-colors hover:text-[var(--color-brand)]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
							></path>
							<rect x="2" y="9" width="4" height="12"></rect>
							<circle cx="4" cy="4" r="2"></circle>
						</svg>
					</a>

					<a
						href="https://twitter.com/yourusername"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-full bg-gray-800 p-2 text-white/70 transition-colors hover:text-[var(--color-brand)]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
							></path>
						</svg>
					</a>
				</div>
			</div>
		</div>

		<!-- Skills Section -->
		<section class="mb-16">
			<h2 class="mb-8 text-2xl font-semibold text-white">Skills & Expertise</h2>

			<div class="grid gap-8 md:grid-cols-2">
				<!-- Technical Skills -->
				<div>
					<h3 class="mb-4 text-xl font-medium text-white/90">Technical Skills</h3>

					<div class="space-y-4">
						<div>
							<div class="mb-1 flex justify-between">
								<span class="text-white/80">Frontend Development</span>
								<span class="text-white/60">90%</span>
							</div>
							<div class="h-2 overflow-hidden rounded-full bg-gray-800">
								<div
									class="skill-bar bg-[var(--color-brand)]/70 h-full rounded-full"
									style="width: 0%;"
									data-width="90%"
								></div>
							</div>
						</div>

						<div>
							<div class="mb-1 flex justify-between">
								<span class="text-white/80">SvelteKit</span>
								<span class="text-white/60">85%</span>
							</div>
							<div class="h-2 overflow-hidden rounded-full bg-gray-800">
								<div
									class="skill-bar bg-[var(--color-brand)]/70 h-full rounded-full"
									style="width: 0%;"
									data-width="85%"
								></div>
							</div>
						</div>

						<div>
							<div class="mb-1 flex justify-between">
								<span class="text-white/80">Backend Development</span>
								<span class="text-white/60">80%</span>
							</div>
							<div class="h-2 overflow-hidden rounded-full bg-gray-800">
								<div
									class="skill-bar bg-[var(--color-brand)]/70 h-full rounded-full"
									style="width: 0%;"
									data-width="80%"
								></div>
							</div>
						</div>

						<div>
							<div class="mb-1 flex justify-between">
								<span class="text-white/80">UI/UX Design</span>
								<span class="text-white/60">75%</span>
							</div>
							<div class="h-2 overflow-hidden rounded-full bg-gray-800">
								<div
									class="skill-bar bg-[var(--color-brand)]/70 h-full rounded-full"
									style="width: 0%;"
									data-width="75%"
								></div>
							</div>
						</div>
					</div>
				</div>

				<!-- Technologies -->
				<div>
					<h3 class="mb-4 text-xl font-medium text-white/90">Technologies</h3>

					<div class="flex flex-wrap gap-3">
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">JavaScript</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">TypeScript</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">SvelteKit</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">React</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Node.js</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Express</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">MongoDB</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">PostgreSQL</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">TailwindCSS</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">HTML/CSS</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Git</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Docker</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">AWS</span>
						<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Figma</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Experience Section -->
		<section>
			<h2 class="mb-8 text-2xl font-semibold text-white">Experience & Education</h2>

			<div class="grid gap-12 md:grid-cols-2">
				<!-- Work Experience -->
				<div>
					<h3 class="mb-4 text-xl font-medium text-white/90">Work Experience</h3>

					<div class="space-y-8">
						<div class="relative border-l border-gray-800 pl-6">
							<div
								class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
							></div>
							<h4 class="text-lg font-medium text-white/90">Senior Frontend Developer</h4>
							<p class="text-[var(--color-brand)]/80">Company Name - 2021 to Present</p>
							<p class="mt-2 text-white/70">
								Led the development of modern web applications using SvelteKit and TailwindCSS.
								Implemented responsive designs and optimized performance.
							</p>
						</div>

						<div class="relative border-l border-gray-800 pl-6">
							<div
								class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
							></div>
							<h4 class="text-lg font-medium text-white/90">Full Stack Developer</h4>
							<p class="text-[var(--color-brand)]/80">Previous Company - 2018 to 2021</p>
							<p class="mt-2 text-white/70">
								Developed and maintained web applications using React, Node.js, and MongoDB.
								Collaborated closely with designers to implement UI/UX improvements.
							</p>
						</div>
					</div>
				</div>

				<!-- Education -->
				<div>
					<h3 class="mb-4 text-xl font-medium text-white/90">Education</h3>

					<div class="space-y-8">
						<div class="relative border-l border-gray-800 pl-6">
							<div
								class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
							></div>
							<h4 class="text-lg font-medium text-white/90">Master's in Computer Science</h4>
							<p class="text-[var(--color-brand)]/80">University Name - 2016 to 2018</p>
							<p class="mt-2 text-white/70">
								Specialized in web technologies and software engineering. Graduated with honors.
							</p>
						</div>

						<div class="relative border-l border-gray-800 pl-6">
							<div
								class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
							></div>
							<h4 class="text-lg font-medium text-white/90">Bachelor's in Computer Science</h4>
							<p class="text-[var(--color-brand)]/80">University Name - 2012 to 2016</p>
							<p class="mt-2 text-white/70">
								Core focus on programming fundamentals, data structures, and algorithms.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	/* Skills animation */
	.skill-bar {
		transition: width 1s ease-in-out;
	}

	.animate-skill {
		width: attr(data-width);
	}
</style>
