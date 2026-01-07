<script lang="ts">
	import Header from './components/Header.svelte';
	import ExperienceItem from './components/ExperienceItem.svelte';
	import EducationItem from './components/EducationItem.svelte';
	import SkillsGrid from './components/SkillsGrid.svelte';
	import ProjectCard from './components/ProjectCard.svelte';
	import WordleOverlay from '$lib/wordle/WordleOverlay.svelte';

	const resumeData = {
		name: 'Farhan Ali Raza',
		initials: 'FA',
		location: 'Bahwalnagar, Pakistan | GMT+5',
		locationLink: 'https://maps.google.com/?q=Bahwalnagar,Pakistan',
		tagline: 'Full Stack Engineer | DSF Member',
		about:
			'Full-stack engineer with 5+ years building production systems at scale. Django core contributor (DSF Member) who shipped template partials via GSoC 2025. Created django-bolt, achieving 100K+ RPS by bridging Python-Django with Rust—700+ stars, 23K+ downloads. Architected systems processing 100M+ emails at 99.9% uptime. Delivered 50+ freelance projects on Fiverr with 5★ rating. Expert in Python, Django, Svelte, and Rust with a track record of solving complex performance challenges end-to-end.',
		avatarUrl:
			'https://avatars.githubusercontent.com/u/62690310?s=400&u=cee700c06c6b86ca633e78e3d6f096b7a27b8437&v=4',
		contact: {
			personalWebsiteUrl: 'https://farhana.li',
			email: 'farhanalirazaazeemi@gmail.com',
			tel: '+923038279454',
			social: [
				{
					name: 'GitHub',
					url: 'https://github.com/FarhanAliRaza',
					icon: 'github' as const
				},
				{
					name: 'LinkedIn',
					url: 'https://www.linkedin.com/in/farhanaliraza',
					icon: 'linkedin' as const
				}
			]
		},
		work: [
			{
				company: 'django-bolt',
				title: 'Creator & Open Source Maintainer',
				badges: ['Rust', 'PyO3', 'Actix', 'Tokio', 'Django', 'Open Source'],
				start: '09/2025',
				end: 'Present',
				highlights: [
					'High-performance Django framework bridging Python with Rust, achieving 100K+ RPS—700+ GitHub stars and 23K+ downloads. <a href="https://github.com/FarhanAliRaza/django-bolt" target="_blank" rel="noopener noreferrer">View Project</a>',
					'Achieved 100K+ RPS for JSON APIs by eliminating Python-Rust copy overhead through pointer-based data transfer, up from 40K RPS bottleneck.',
					'Improved async streaming from 1,200 to 20,000+ RPS by batching chunk collection inside Python before crossing the Rust boundary.',
					'Benchmarked 2.8x faster than FastAPI and 12x faster than Django Ninja on JSON endpoints. <a href="https://github.com/FarhanAliRaza/fastapi-vs-litestar-vs-django-bolt-vs-django-ninja-benchmarks" target="_blank" rel="noopener noreferrer">View Benchmarks</a>'
				]
			},
			{
				company: 'Django Software Foundation',
				title: 'Google Summer of Code 2025 Contributor',
				badges: ['Remote', 'Django', 'Python', 'Open Source'],
				start: '05/2025',
				end: '08/2025',
				highlights: [
					'Shipped template partials to Django core (<a href="https://github.com/django/django/pull/19643" target="_blank" rel="noopener noreferrer">PR #19643</a>), enabling reusable template fragments for 4M+ Django developers. <a href="https://summerofcode.withgoogle.com/programs/2025/projects/YqdTk30V" target="_blank" rel="noopener noreferrer">GSoC Project</a>',
					'Ensured feature stability with 50+ tests covering edge cases, plus comprehensive documentation for Django\'s official docs.',
					'Achieved merge through 100+ public review iterations with Django maintainers, demonstrating code quality standards.',
					'Mentored new contributors through Djangonaut Space program, growing the Django contributor community.'
				]
			},
			{
				company: 'Medgebra',
				title: 'Full Stack Engineer',
				badges: ['Remote', 'Django', 'Next.js', 'RAG', 'PostgreSQL', 'Redis', 'DSPY', 'Pinecone'],
				start: '06/2024',
				end: '07/2025',
				highlights: [
					'Reduced clinical citation lookup from 3-5s to <200ms by building LLM-powered decision support with vector embeddings and semantic search. <a href="https://medgebra.com" target="_blank" rel="noopener noreferrer">medgebra.com</a>',
					'Processed 100,000+ medical PDFs with verifiable citations by building AI-powered page filtering and tracking pipeline.',
					'Enabled real-time document retrieval across 100K+ documents using Pinecone vector embeddings with semantic similarity matching.',
					'Integrated FHIR-compliant EMR data fetching for 3,300+ users, enabling context-aware clinical decision support.'
				]
			},
			{
				company: 'Bulk Mail Verifier',
				title: 'Full Stack Engineer',
				badges: ['Django', 'Svelte', 'Celery', 'Redis', 'PostgreSQL', 'Rabbitmq', 'SMTP'],
				start: '03/2021',
				end: 'Present',
				highlights: [
					'Scaled email verification service to comprehensive cold email platform, processing 100M+ emails at 99.9% uptime. <a href="https://bulkmailverifier.org" target="_blank" rel="noopener noreferrer">bulkmailverifier.org</a>',
					'Automated campaign management with AI agent using fine-tuned Qwen 2.5 0.5B for lead scoring and email classification.',
					'Built distributed architecture handling millions of emails daily using Celery, RabbitMQ, and Redis for real-time processing.'
				]
			}
		],
		education: [
			{
				school: 'Islamia University of Bahawalpur',
				degree: 'BS CS - 3.61/4.0',
				start: '08/2019',
				end: '05/2023'
			}
		],
		skills: [
			'Python',
			'Django',
			'Rust',
			'PyO3',
			'Actix',
			'Tokio',
			'PostgreSQL',
			'Redis',
			'Celery',
			'TypeScript',
			'React',
			'Svelte',
			'Next.js',
			'Kotlin',
			'RAG',
			'LLM Integration',
			'Vector Embeddings',
			'Docker',
			'Performance Optimization',
			'Open Source'
		],
		projects: [
			{
				title: 'django-repl',
				description:
					'Browser-based Django IDE using WebAssembly—run Django entirely client-side with live preview, database support, and admin interface. 40+ stars.',
				techStack: ['TypeScript', 'Svelte', 'Pyodide', 'WebAssembly'],
				url: 'https://django.farhana.li'
			},
			{
				title: 'django-hawkeye',
				description:
					'BM25 full-text search for Django using PostgreSQL 17+, eliminating Elasticsearch dependency with equivalent ranking quality. 28+ stars.',
				techStack: ['Python', 'Django', 'PostgreSQL', 'BM25'],
				url: 'https://github.com/FarhanAliRaza/django-hawkeye'
			},
			{
				title: 'Wakt',
				description:
					'Privacy-first Android app for digital wellness with app/website blocking, focus timers, and scheduled locks. Fully offline, no login required.',
				techStack: ['Kotlin', 'Jetpack Compose', 'Room', 'Material Design 3'],
				url: 'https://github.com/FarhanAliRaza/Wakt'
			},
			{
				title: 'claude-context-local',
				description:
					'Semantic code search MCP server for Claude Code that runs 100% locally using EmbeddingGemma, with zero API costs and complete privacy.',
				techStack: ['Python', 'FASTMCP', 'MCP', 'FAISS', 'Local Model'],
				url: 'https://github.com/FarhanAliRaza/claude-context-local'
			},
			{
				title: 'django-rapid',
				description:
					'FastAPI-like decorators for Django with 3-10x faster JSON serialization using msgspec, providing simple request validation and response serialization.',
				techStack: ['Python', 'Django', 'msgspec'],
				url: 'https://github.com/FarhanAliRaza/django-rapid'
			}
		]
	};
</script>

<svelte:head>
	<title>{resumeData.name} - Resume</title>
	<meta name="description" content={resumeData.about} />
</svelte:head>

<WordleOverlay skip={false}>
	<main class="page">
		<section class="content">
			<Header
				name={resumeData.name}
				tagline={resumeData.tagline}
				about={resumeData.about}
				location={resumeData.location}
				locationLink={resumeData.locationLink}
				contact={resumeData.contact}
			/>

			<div class="two-column">
				<div class="main-column">
					<section class="section">
						<h2 class="section-title">Work Experience</h2>
						<div class="stack">
							{#each resumeData.work as experience}
								<ExperienceItem
									company={experience.company}
									tags={experience.badges}
									dateRange={`${experience.start} - ${experience.end}`}
									jobTitle={experience.title}
									responsibilities={experience.highlights}
								/>
							{/each}
						</div>
					</section>
				</div>

				<div class="sidebar">
					<section class="section">
						<h2 class="section-title">Skills</h2>
						<SkillsGrid skills={resumeData.skills} />
					</section>

					<section class="section">
						<h2 class="section-title">Side Projects</h2>
						<div class="projects-stack">
							{#each resumeData.projects as project}
								<ProjectCard
									name={project.title}
									description={project.description}
									tags={project.techStack}
									url={project.url}
								/>
							{/each}
						</div>
					</section>

					<section class="section">
						<h2 class="section-title">Education</h2>
						<div class="stack">
							{#each resumeData.education as education}
								<EducationItem
									institution={education.school}
									degree={education.degree}
									dateRange={`${education.start} - ${education.end}`}
								/>
							{/each}
						</div>
					</section>
				</div>
			</div>
		</section>
	</main>
</WordleOverlay>

<style>
	/* Column width configuration - adjust these values to change layout */
	.two-column {
		--main-column-width: 65%;
		--sidebar-width: 35%;
	}

	.page {
		min-height: 100vh;
		background: #ffffff;
		padding: 3rem 1.5rem;
	}

	.content {
		max-width: 64rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.two-column {
		display: grid;
		grid-template-columns: var(--main-column-width) var(--sidebar-width);
		gap: 2rem;
	}

	.main-column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.projects-stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.two-column {
			grid-template-columns: 1fr;
		}
	}

	@media print {
		.page {
			padding: 0;
			font-size: 8pt;
			min-height: 0;
		}

		.content {
			gap: 0.35rem;
			max-width: 100%;
		}

		.two-column {
			display: grid;
			grid-template-columns: var(--main-column-width) var(--sidebar-width);
			gap: 1rem;
		}

		.main-column,
		.sidebar {
			gap: 0.5rem;
		}

		.section {
			gap: 0.25rem;
		}

		.section-title {
			font-size: 10pt;
			font-weight: 700;
			margin: 0;
			margin-bottom: 0.15rem;
		}

		.stack {
			gap: 0.35rem;
		}

		.projects-stack {
			gap: 0.3rem;
		}
	}
</style>
