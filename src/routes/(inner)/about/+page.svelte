<script lang="ts">
	import { onMount } from 'svelte';
	import { styling, aboutMe, socialLinks, siteConfig } from '$lib/config';

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

<svelte:head>
	<title>About Farhan - Developer Portfolio</title>
	<meta
		name="description"
		content="Learn more about Farhan's background, skills, and experience as a developer."
	/>
	<meta property="og:title" content="About Farhan - Developer Portfolio" />
	<meta
		property="og:description"
		content="Learn more about Farhan's background, skills, and experience as a developer."
	/>
	<meta property="og:url" content="https://farhana.li/about" />
	<meta name="twitter:title" content="About Farhan - Developer Portfolio" />
	<meta
		name="twitter:description"
		content="Learn more about Farhan's background, skills, and experience as a developer."
	/>
	<link rel="canonical" href="https://farhana.li/about" />
</svelte:head>

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
				I am full stack developer with a passion for building scalable and efficient web
				applications. Software for me is not an abstract thing, i see it as a solution to a problem.
				I love to build products that help people and make their lives easier.
			</p>

			<!-- Contact Info -->
			<div class="mb-6 flex flex-col gap-4 sm:flex-row">
				<a
					aria-label="Email"
					onclick={() => {
						window.open(`mailto:farhanalirazaazeemi@gmail.com`, '_blank');
					}}
					class="flex items-center gap-2 text-white/70 transition-colors hover:cursor-pointer hover:text-[var(--color-brand)]"
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
					<span>{siteConfig.email}</span>
				</a>
			</div>

			<!-- Social Links -->
			<div class="flex gap-4">
				<a
					href={siteConfig.links.github}
					target="_blank"
					aria-label="GitHub"
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
					href={siteConfig.links.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
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
						<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						></path>
						<rect x="2" y="9" width="4" height="12"></rect>
						<circle cx="4" cy="4" r="2"></circle>
					</svg>
				</a>

				<a
					href={siteConfig.links.twitter}
					target="_blank"
					aria-label="Twitter"
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

			<!-- Technologies -->
			<div>
				<h3 class="mb-4 text-xl font-medium text-white/90">Technologies that i have worked with</h3>

				<div class="flex flex-wrap gap-3">
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Python</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">JavaScript</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">TypeScript</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Go Lang</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Django</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Django Rest Framework</span
					>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">SvelteKit</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">React | Next.js</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Flutter</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Docker</span>
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
						<h4 class="text-lg font-medium text-white/90">Founder</h4>
						<p class="text-[var(--color-brand)]/80">Self Employed - 2024 to Present</p>
						<p class="mt-2 text-white/70">
							I have been developing and maintaining multiple projects of my own you can see them
							<a class="text-[var(--color-brand)] underline" href="/products">here</a>
							<br />
						</p>
					</div>
					<div class="relative border-l border-gray-800 pl-6">
						<div
							class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
						></div>
						<h4 class="text-lg font-medium text-white/90">Software Engineer</h4>
						<p class="text-[var(--color-brand)]/80">MedGebra - 2024 to Present</p>
						<p class="mt-2 text-white/70">
							Responsible for developing, scaling and maintaining the medical chatbot for doctors. I
							have built a pipeline for processing 100s of GBs of pdf files and generating emeddings
							and chunking and then using them into a chatbot. This is now used by 100s of doctors
							worldwide.
							<br />
							Tech Stack: Python, Django, Django Rest Framework, Next.js, PostgreSQL, Docker, Redis,
							TailwindCSS
						</p>
					</div>
					<div class="relative border-l border-gray-800 pl-6">
						<div
							class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
						></div>
						<h4 class="text-lg font-medium text-white/90">Software Engineer</h4>
						<p class="text-[var(--color-brand)]/80">Bulk Email Verifier - 2020 to Present</p>
						<p class="mt-2 text-white/70">
							Responsible for developing, scaling and maintaining the bulk email verifier
							application. Learned a lot about backend development and SMTP protocols and scraping
							tools and task queues and scaled the project to 1000s of users validating millions of
							emails.
							<br />
							Tech Stack: Python, Golang, Django, Django Rest Framework, PostgreSQL, Docker, OVH Baremetal,
							SvelteKit, RabbitMQ, Redis, Puppeteer
						</p>
					</div>

					<div class="relative border-l border-gray-800 pl-6">
						<div
							class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
						></div>
						<h4 class="text-lg font-medium text-white/90">Freelance</h4>
						<p class="text-[var(--color-brand)]/80">Fiverr & Upwork - 2020 to Present</p>
						<p class="mt-2 text-white/70">
							Developed multiple web application for clients using different technologies and
							frameworks. 5 stars rating on Fiverr after delivering 50+ projects and 100% project
							success rate on Upwork.
						</p>
					</div>
				</div>
			</div>

			<!-- Education -->
			<div class="space-y-8">
				<div class="">
					<h3 class="mb-4 text-xl font-medium text-white/90">Education</h3>

					<div class="space-y-8">
						<div class="relative border-l border-gray-800 pl-6">
							<div
								class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
							></div>
							<h4 class="text-lg font-medium text-white/90">Bachelor's in Computer Science</h4>
							<p class="text-[var(--color-brand)]/80">
								Islamia University of Bahawalpur - 2019 to 2023
							</p>
							<p class="mt-2 text-white/70">
								Core focus on programming fundamentals, data structures, and algorithms.
							</p>
						</div>
					</div>
				</div>
				<div>
					<h3 class="mb-4 text-xl font-medium text-white/90">Open Source Contributions</h3>

					<div class="space-y-8">
						<div class="relative border-l border-gray-800 pl-6">
							<div
								class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
							></div>
							<h4 class="text-lg font-medium text-white/90">Djangnaut Space Session Organizer</h4>
							<p class="text-[var(--color-brand)]/80">Djangonaut Space - 2025</p>
							<p class="mt-2 text-white/70">
								As a session organizer, I was responsible for organizing and running sessions for
								the Djangonauts.
							</p>
						</div>
						<div class="relative border-l border-gray-800 pl-6">
							<div
								class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
							></div>
							<h4 class="text-lg font-medium text-white/90">Djangnaut</h4>
							<p class="text-[var(--color-brand)]/80">Djangonaut Space - 2024</p>
							<p class="mt-2 text-white/70">
								This program places an emphasis on group-learning, sustainability and longevity.
								Djangonauts are members of the community who wish to level up their current Django
								code contributions and potentially take on leadership roles in Django in the future.
								🦄 This is a free, 8-week group mentoring program where individuals will work
								self-paced in a semi-structured learning environment.
								<br />
								<span class="underline">
									My 14 Pull requests got merged into djangopackages.org
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	/* Skills animation */
	.skill-bar {
		transition: width 1s ease-in-out;
	}

	.animate-skill {
		width: attr(data-width);
	}
</style>
