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
				<span>A results-oriented Full Stack Developer with over 5 years of experience architecting and building scalable web applications and complex AI systems. Proven expertise in solving real-world problems, demonstrated by single-handedly developing </span><b><span>MedGebra</span></b><span>, an AI-powered medical chatbot, and an email validation system that has processed over 100 million emails. Currently contributing to the core of a major open-source project as a Google Summer of Code 2025 participant with the Django Software Foundation.</span>
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
					<span>farhanalirazaazeemi@gmail.com</span>
				</a>
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
						<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
						></path>
					</svg>
					<span>+92 303 8279454</span>
				</div>
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
			</div>
		</div>
	</div>

	<!-- Skills Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-2xl font-semibold text-white">Skills & Expertise</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- Technical Skills -->
			<div>
				<h3 class="mb-4 text-xl font-medium text-white/90">Backend</h3>
				<div class="flex flex-wrap gap-3">
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Python</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Django</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Django Rest Framework</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">FastAPI</span>
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-xl font-medium text-white/90">Frontend</h3>
				<div class="flex flex-wrap gap-3">
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">JavaScript</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">TypeScript</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">React</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Svelte</span>
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-xl font-medium text-white/90">GenAI</h3>
				<div class="flex flex-wrap gap-3">
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Natural Language Processing</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">RAG</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Vector Databases</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Prompt Engineering</span>
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-xl font-medium text-white/90">DevOps & Tools</h3>
				<div class="flex flex-wrap gap-3">
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Docker</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">CI/CD</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Git</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">GitHub</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">API Design & Integration</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Unit Testing</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Flutter</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Experience Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-2xl font-semibold text-white">Work Experience</h2>

		<div class="space-y-8">
			<div class="relative border-l border-gray-800 pl-6">
				<div
					class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
				></div>
				<h4 class="text-lg font-medium text-white/90">Google Summer of Code 2025 Contributor</h4>
				<p class="text-[var(--color-brand)]/80">Django Software Foundation - 05/2025 - Present</p>
				<p class="mt-2 text-white/70">
					- Selected for the highly competitive Google Summer of Code program to contribute to the Django web framework. 
					<a href="https://summerofcode.withgoogle.com/programs/2025/projects/YqdTk30V" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline">View Project</a>
					<br />
					- Actively working on integrating the django-template-partials library into the Django core, a project aimed at enhancing developer experience for thousands of users globally.
					<br />
					- Collaborating with experienced mentors and the open-source community, adhering to rigorous coding standards and contributing to a widely-used framework.
				</p>
			</div>

			<div class="relative border-l border-gray-800 pl-6">
				<div
					class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
				></div>
				<h4 class="text-lg font-medium text-white/90">Lead Developer</h4>
				<p class="text-[var(--color-brand)]/80">Medgebra - 06/2024 - Present</p>
				<p class="mt-2 text-white/70">
					- <span>Architected and solely developed </span><b><span>MedGebra, </span></b><span>an AI-powered medical assistant that provides doctors with resource-cited answers to complex queries.</span>
					<br />
					- <span>Engineered a secure integration with Hospital Information Systems (HIS) to access patient data, enabling personalized and context-aware clinical decision support.</span>
					<br />
					- <span>Built and maintain an extensive embedding database from over 100,000 chunked medical PDFs, creating a proprietary knowledge base for providing accurate, verifiable information with citations.</span>
				</p>
			</div>

			<div class="relative border-l border-gray-800 pl-6">
				<div
					class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
				></div>
				<h4 class="text-lg font-medium text-white/90">Technical Cofounder</h4>
				<p class="text-[var(--color-brand)]/80">Bulk Mail Verifier - 08/2021 - Present</p>
				<p class="mt-2 text-white/70">
					- <span>Architected and developed a scalable web application for bulk email validation, successfully processing a volume of over 100 million emails to date.</span>
					<br />
					- <span>Designed and implemented robust RESTful APIs, enabling seamless integration for clients and enhancing the product's marketability.</span>
					<br />
					- <span>Established and maintained CI/CD pipelines, significantly reducing deployment time and ensuring high availability and consistent performance of the validation service.</span>
				</p>
			</div>

			<div class="relative border-l border-gray-800 pl-6">
				<div
					class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
				></div>
				<h4 class="text-lg font-medium text-white/90">Full Stack Developer</h4>
				<p class="text-[var(--color-brand)]/80">Fiverr (Freelance) - 2019 - Present</p>
				<p class="mt-2 text-white/70">
					- <span>Successfully delivered over 50 projects for clients worldwide with a consistent 5-star rating, specializing in API integrations and custom web development using Django, React, and Svelte.</span>
				</p>
			</div>
		</div>
	</section>

	<!-- Personal Projects Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-2xl font-semibold text-white">Personal Projects</h2>

		<div class="space-y-8">
			<div class="relative border-l border-gray-800 pl-6">
				<div
					class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
				></div>
				<h4 class="text-lg font-medium text-white/90">PAI - Terminal Coding Agent</h4>
				<p class="mt-2 text-white/70">
					Built a simple AI coding assistant that runs directly in the terminal, showcasing skills in creating practical AI-powered developer tools. 
					<a href="https://github.com/FarhanAliRaza/pai" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline">View on GitHub</a>
				</p>
			</div>

			<div class="relative border-l border-gray-800 pl-6">
				<div
					class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
				></div>
				<h4 class="text-lg font-medium text-white/90">Djinn - Django REST Framework Code Generator</h4>
				<p class="mt-2 text-white/70">
					Created a CLI tool to accelerate backend development by automatically generating starter templates and boilerplate code for Django REST Framework projects.
					<a href="https://github.com/FarhanAliRaza/Djinn" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline">View on GitHub</a>
				</p>
			</div>

			<div class="relative border-l border-gray-800 pl-6">
				<div
					class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
				></div>
				<h4 class="text-lg font-medium text-white/90">Toy Programming Language</h4>
				<p class="mt-2 text-white/70">
					Designed and built an interpreter for a custom programming language with syntax in the Urdu language. This project involved creating a lexer, parser, and evaluator from scratch, demonstrating a deep understanding of language design and computer science fundamentals.
					<a href="https://github.com/FarhanAliRaza/URDU-PROGRAMMING-LANGUAGE" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline">View on GitHub</a>
				</p>
			</div>
		</div>
	</section>

	<!-- Education & Languages Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-2xl font-semibold text-white">Education & Languages</h2>

		<div class="grid gap-12 md:grid-cols-2">
			<!-- Education -->
			<div>
				<h3 class="mb-4 text-xl font-medium text-white/90">Education</h3>
				<div class="space-y-8">
					<div class="relative border-l border-gray-800 pl-6">
						<div
							class="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[var(--color-brand)]"
						></div>
						<h4 class="text-lg font-medium text-white/90">BS in Computer Science</h4>
						<p class="text-[var(--color-brand)]/80">2019 - 2023</p>
						<p class="mt-2 text-white/70">
							<b>Courses:</b> Data Structures & Algorithms, Machine Learning, Web Services & API Development, Artificial Intelligence.
						</p>
					</div>
				</div>
			</div>

			<!-- Languages -->
			<div>
				<h3 class="mb-4 text-xl font-medium text-white/90">Languages</h3>
				<div class="space-y-4">
					<div class="flex justify-between">
						<span class="text-white/70">English</span>
						<span class="text-[var(--color-brand)]">80%</span>
					</div>
					<div class="flex justify-between">
						<span class="text-white/70">Urdu</span>
						<span class="text-[var(--color-brand)]">100%</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Interests Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-2xl font-semibold text-white">Interests</h2>
		<div class="flex flex-wrap gap-3">
			<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Cricket</span>
			<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Rockets & Space</span>
			<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Chess</span>
			<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Computer and Electronics</span>
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
