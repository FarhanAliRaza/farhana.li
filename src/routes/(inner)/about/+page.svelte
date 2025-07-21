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
		<div class="max-w-4xl mx-auto">
			<h2 class="mb-4 text-2xl font-semibold text-white">About Me</h2>

			<p class="mb-4 text-white/70">
				A results-oriented Full Stack Developer with over 5 years of experience architecting and building scalable web applications and complex AI systems. Proven expertise in solving real-world problems, demonstrated by single-handedly developing <b>MedGebra</b>, an AI-powered medical chatbot, and an email validation system that has processed over 100 million emails. Currently contributing to the core of a major open-source project as a Google Summer of Code 2025 participant with the Django Software Foundation.
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
<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Go Lang</span>
<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Node JS</span>
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-xl font-medium text-white/90">Frontend</h3>
				<div class="flex flex-wrap gap-3">
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">JavaScript</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">TypeScript</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">React</span>
					<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Svelte</span>
<span class="rounded-full bg-gray-800 px-3 py-1 text-white/70">Flutter</span>
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
					
				</div>
			</div>
		</div>
	</section>

	<!-- Experience Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-2xl font-semibold text-white">Work Experience</h2>

		<div class="space-y-8">
			<div class="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
				<h4 class="text-xl font-bold text-white mb-2">Google Summer of Code 2025 Contributor</h4>
				<p class="text-[var(--color-brand)]/80 mb-4">Django Software Foundation</p>
				<div class="space-y-3">
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Selected for the highly competitive Google Summer of Code program to contribute to the Django web framework. 
							<a href="https://summerofcode.withgoogle.com/programs/2025/projects/YqdTk30V" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline hover:text-[var(--color-brand)]/80 transition-colors">View Project</a>
						</p>
					</div>
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Actively working on integrating the django-template-partials library into the Django core, a project aimed at enhancing developer experience for thousands of users globally.
						</p>
					</div>
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Collaborating with experienced mentors and the open-source community, adhering to rigorous coding standards and contributing to a widely-used framework.
						</p>
					</div>
				</div>
			</div>

			<div class="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
				<h4 class="text-xl font-bold text-white mb-2">Lead Developer</h4>
				<p class="text-[var(--color-brand)]/80 mb-4">
					<a href="https://medical-chatbot.medgebra.com" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline hover:text-[var(--color-brand)]/80 transition-colors">Medgebra</a>
				</p>
				<div class="space-y-3">
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Architected and solely developed <b>MedGebra</b>, an AI-powered medical assistant that provides doctors with resource-cited answers to complex queries.
						</p>
					</div>
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Engineered a secure integration with Hospital Information Systems (HIS) to access patient data, enabling personalized and context-aware clinical decision support.
						</p>
					</div>
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Built and maintain an extensive embedding database from over 100,000 chunked medical PDFs, creating a proprietary knowledge base for providing accurate, verifiable information with citations.
						</p>
					</div>
				</div>
			</div>

			<div class="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
				<h4 class="text-xl font-bold text-white mb-2">Technical Cofounder</h4>
				<p class="text-[var(--color-brand)]/80 mb-4">
					<a href="https://bulkmailverifier.org" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline hover:text-[var(--color-brand)]/80 transition-colors">Bulk Mail Verifier</a>
				</p>
				<div class="space-y-3">
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Architected and developed a scalable web application for bulk email validation, successfully processing a volume of over 100 million emails to date.
						</p>
					</div>
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Designed and implemented robust RESTful APIs, enabling seamless integration for clients and enhancing the product's marketability.
						</p>
					</div>
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Established and maintained CI/CD pipelines, significantly reducing deployment time and ensuring high availability and consistent performance of the validation service.
						</p>
					</div>
				</div>
			</div>

			<div class="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
				<h4 class="text-xl font-bold text-white mb-2">Full Stack Developer</h4>
				<p class="text-[var(--color-brand)]/80 mb-4">
					<a href="https://fiverr.com/users/backendev/" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline hover:text-[var(--color-brand)]/80 transition-colors">Fiverr (Freelance)</a>
				</p>
				<div class="space-y-3">
					<div class="flex items-start gap-3">
						<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
						<p class="text-white/70">
							Successfully delivered over 50 projects for clients worldwide with a consistent 5-star rating, specializing in API integrations and custom web development using Django, React, and Svelte.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Personal Projects Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-2xl font-semibold text-white">Personal Projects</h2>

		<div class="space-y-6">
			<div class="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
				<h4 class="text-xl font-bold text-white mb-3">PAI - Terminal Coding Agent</h4>
				<div class="flex items-start gap-3">
					<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
					<p class="text-white/70">
						Built a simple AI coding assistant that runs directly in the terminal, showcasing skills in creating practical AI-powered developer tools. 
						<a href="https://github.com/FarhanAliRaza/pai" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline hover:text-[var(--color-brand)]/80 transition-colors">View on GitHub</a>
					</p>
				</div>
			</div>

			<div class="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
				<h4 class="text-xl font-bold text-white mb-3">Djinn - Django REST Framework Code Generator</h4>
				<div class="flex items-start gap-3">
					<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
					<p class="text-white/70">
						Created a CLI tool to accelerate backend development by automatically generating starter templates and boilerplate code for Django REST Framework projects.
						<a href="https://github.com/FarhanAliRaza/Djinn" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline hover:text-[var(--color-brand)]/80 transition-colors">View on GitHub</a>
					</p>
				</div>
			</div>

			<div class="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
				<h4 class="text-xl font-bold text-white mb-3">Toy Programming Language</h4>
				<div class="flex items-start gap-3">
					<div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] flex-shrink-0"></div>
					<p class="text-white/70">
						Designed and built an interpreter for a custom programming language with syntax in the Urdu language. This project involved creating a lexer, parser, and evaluator from scratch, demonstrating a deep understanding of language design and computer science fundamentals.
						<a href="https://github.com/FarhanAliRaza/URDU-PROGRAMMING-LANGUAGE" target="_blank" rel="noopener noreferrer" class="text-[var(--color-brand)] underline hover:text-[var(--color-brand)]/80 transition-colors">View on GitHub</a>
					</p>
				</div>
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
