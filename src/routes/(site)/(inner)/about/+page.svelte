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
	<title>About Farhan Ali - Full Stack Developer</title>
	<meta
		name="description"
		content="Learn about Farhan Ali, a results-oriented Full Stack Developer with over 5 years of experience in building scalable web applications and AI systems."
	/>
	<meta property="og:title" content="About Farhan Ali - Full Stack Developer" />
	<meta
		property="og:description"
		content="Learn about Farhan Ali, a results-oriented Full Stack Developer with over 5 years of experience in building scalable web applications and AI systems."
	/>
	<meta property="og:url" content="https://farhana.li/about" />
	<meta name="twitter:title" content="About Farhan Ali - Full Stack Developer" />
	<meta
		name="twitter:description"
		content="Learn about Farhan Ali, a results-oriented Full Stack Developer with over 5 years of experience in building scalable web applications and AI systems."
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
				Farhan Ali
			</span>
		</h1>
		<h2 class="text-xl text-white/80 md:text-2xl">Full Stack Developer</h2>
	</header>

	<!-- Profile Section -->
	<div class="mb-16">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-4 text-2xl font-semibold text-white">About Me</h2>

			<p class="mb-4 text-white/70">
				A results-oriented Full Stack Developer with over 5 years of experience architecting and
				building scalable web applications and complex AI systems. Proven expertise in solving
				real-world problems, demonstrated by single-handedly developing <b>MedGebra</b>, an
				AI-powered medical chatbot, and an email validation system that has processed over 100
				million emails. Currently contributing to the core of a major open-source project as a
				Google Summer of Code 2025 participant with the Django Software Foundation.
			</p>

			<!-- Contact Info -->
			<div class="mb-6 flex flex-col gap-4 sm:flex-row">
				<div class="flex items-center gap-2 text-white/70">
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
						<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
						<circle cx="12" cy="10" r="3"></circle>
					</svg>
					<span>Bahawalnagar, Pakistan</span>
				</div>
			</div>

			<!-- Social Links -->
			<div class="flex gap-4">
				<a
					href="https://github.com/FarhanAliRaza"
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
					href="https://www.linkedin.com/in/farhanaliraza/"
					target="_blank"
					aria-label="LinkedIn"
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
						<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						></path>
						<rect x="2" y="9" width="4" height="12"></rect>
						<circle cx="4" cy="4" r="2"></circle>
					</svg>
				</a>
			</div>
		</div>
	</div>

	<!-- Resume Banner -->
	<div class="mb-16">
		<div class="mx-auto max-w-4xl">
			<a
				href="resume"
				target="_blank"
				class="group relative block overflow-hidden rounded-2xl p-1 transition-all duration-300 hover:scale-[1.02]"
			>
				<!-- Animated gradient border -->
				<div
					class="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-75 blur-sm transition-opacity group-hover:opacity-100"
				></div>

				<!-- Inner content container -->
				<div class="relative rounded-xl bg-gray-900/95 p-8 backdrop-blur-xl">
					<!-- Animated background gradient -->
					<div class="absolute inset-0 rounded-xl opacity-30">
						<div
							class="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20"
						></div>
						<div
							class="absolute inset-0 bg-gradient-to-tr from-pink-600/10 via-transparent to-purple-600/10"
						></div>
					</div>

					<!-- Floating particles effect -->
					<div class="absolute inset-0 overflow-hidden rounded-xl">
						<div
							class="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-purple-500/20 blur-xl transition-colors group-hover:bg-purple-500/30"
						></div>
						<div
							class="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-blue-500/20 blur-xl transition-colors group-hover:bg-blue-500/30"
						></div>
						<div
							class="absolute left-1/3 top-1/2 h-20 w-20 rounded-full bg-pink-500/10 blur-xl transition-colors group-hover:bg-pink-500/20"
						></div>
					</div>

					<!-- Content -->
					<div class="relative z-10 flex items-center justify-between">
						<div>
							<div class="mb-3 flex items-center gap-3">
								<h2
									class="bg-gradient-to-r from-white to-white/80 bg-clip-text text-2xl font-bold text-transparent"
								>
									Resume
								</h2>
							</div>
							<p class="max-w-md text-white/60">Explore my journey through the universe.</p>
						</div>
						<div class="flex items-center gap-3">
							<span class="hidden font-medium text-white/80 sm:block">View Resume</span>
							<div
								class="rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 backdrop-blur-sm transition-all group-hover:from-purple-500/30 group-hover:to-blue-500/30"
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
									class="text-white transition-transform group-hover:translate-x-1"
								>
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							</div>
						</div>
					</div>

					<!-- Grid pattern overlay -->
					<div class="absolute inset-0 opacity-[0.03]">
						<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
									<path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" stroke-width="1" />
								</pattern>
							</defs>
							<rect width="100%" height="100%" fill="url(#grid)" />
						</svg>
					</div>
				</div>
			</a>
		</div>
	</div>
</main>

<style>
	/* Skills animation */
</style>
