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
		location: 'Bahawalnagar, Pakistan | GMT+5',
		locationLink: 'https://maps.google.com/?q=Bahawalnagar,Pakistan',
		tagline: 'Full Stack Engineer | DSF Member',
		about:
			'Full-stack engineer, 5+ years in. I contributed template partials to Django core via Google Summer of Code 2025 and built django-bolt—a Rust-powered Django server hitting 100K+ RPS with 1200+ stars and 30K+ downloads. My systems have processed 100M+ emails in production and I\'ve shipped 50+ freelance projects with a 5★ Fiverr rating. I mostly work in Python, Django, Svelte, and Rust, with a bias toward making things fast.',
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
				company: 'Qoves',
				title: 'Senior Software Engineer',
				badges: ['Remote', 'Django', 'Python', 'Kubernetes', 'Temporal', 'PostgreSQL', 'GDPR', 'msgspec'],
				start: '01/2026',
				end: 'Present',
				highlights: [
					'Took on a full Django codebase refactor—reworking models, views, serializers, and service layers to get things to a place where they\'re actually maintainable.',
					'Dropped API latency noticeably by swapping DRF serializers for msgspec, which cuts out a lot of serialization overhead on busy endpoints.',
					'Helping redesign the full data pipeline around Temporal on Kubernetes—moving away from fragile task chains toward proper workflow orchestration.',
					'Architected the GDPR compliance layer: users get routed to the right regional servers, data stays where it legally has to, and deletion requests work end-to-end.'
				]
			},
			{
				company: 'django-bolt',
				title: 'Creator & Open Source Maintainer',
				badges: ['Rust', 'PyO3', 'Actix', 'Tokio', 'Django', 'Open Source'],
				start: '09/2025',
				end: 'Present',
				highlights: [
					'Built a Django server in Rust that hits 100K+ RPS—700+ GitHub stars, 25K+ downloads. <a href="https://github.com/FarhanAliRaza/django-bolt" target="_blank" rel="noopener noreferrer">View Project</a>',
					'Got past the 40K RPS ceiling by solving the Python-Rust copy bottleneck—passing pointers instead of copying data across the boundary.',
					'2.8x faster than FastAPI and 12x faster than Django Ninja on JSON endpoints in public benchmarks. <a href="https://github.com/FarhanAliRaza/fastapi-vs-litestar-vs-django-bolt-vs-django-ninja-benchmarks" target="_blank" rel="noopener noreferrer">View Benchmarks</a>'
				]
			},
			{
				company: 'Django Software Foundation',
				title: 'Google Summer of Code 2025 Contributor',
				badges: ['Remote', 'Django', 'Python', 'Open Source'],
				start: '05/2025',
				end: '08/2025',
				highlights: [
					'Shipped template partials to Django core (<a href="https://github.com/django/django/pull/19643" target="_blank" rel="noopener noreferrer">PR #19643</a>)—a long-requested feature now available to 4M+ Django developers. <a href="https://summerofcode.withgoogle.com/programs/2025/projects/YqdTk30V" target="_blank" rel="noopener noreferrer">GSoC Project</a>',
					'Wrote 50+ tests covering edge cases and documented the feature in the official Django docs so people could actually use it.',
					'Went through 100+ review rounds with Django maintainers before merge—a good lesson in what production-ready really means at that scale.'
				]
			},
			{
				company: 'Medgebra',
				title: 'Full Stack AI Engineer',
				badges: [
					'Remote',
					'Django',
					'Next.js',
					'RAG',
					'PostgreSQL',
					'Redis',
					'DSPY',
					'Pinecone',
					'FHIR'
				],
				start: '06/2024',
				end: '07/2025',
				highlights: [
					'Cut clinical citation lookup from 3-5s to under 200ms using vector embeddings and semantic search on top of an LLM decision-support layer. <a href="https://medgebra.com" target="_blank" rel="noopener noreferrer">medgebra.com</a>',
					'Built a pipeline that processed 100K+ medical PDFs and tracked citations to specific pages—so doctors could actually verify what the AI was referencing.',
					'Set up real-time retrieval across 100K+ documents with Pinecone, fast enough to feel instant during a clinical session.',
					'Wired in FHIR-compliant EMR data so the AI had patient context, not just generic medical knowledge.'
				]
			},
			{
				company: 'Bulk Mail Verifier',
				title: 'Full Stack Engineer',
				badges: ['Django', 'Svelte', 'Celery', 'Redis', 'PostgreSQL', 'RabbitMQ', 'SMTP'],
				start: '03/2021',
				end: 'Present',
				highlights: [
					'Started this in my second semester as my first engineering role, building the entire email-validation platform from scratch—application logic, queueing, SMTP workflows, and operations. <a href="https://bulkmailverifier.org" target="_blank" rel="noopener noreferrer">bulkmailverifier.org</a>',
					'Built and operated the infrastructure on bare-metal servers, learning deployment, reliability, and production debugging end-to-end.',
					'Scaled throughput by splitting workloads across RabbitMQ Queues and workers, so verification jobs could run in parallel reliably.',
					'The platform has validated 100M+ emails over its lifetime.'
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
			'Mojo',
			'TypeScript',
			'Svelte',
			'Next.js',
			'React',
			'Kotlin',
			'PostgreSQL',
			'Redis',
			'Docker',
			'Kubernetes',
			'Temporal',
			'PyO3',
			'RAG',
			'LLM Fine-tuning',
			'Vector Search'
		],
		projects: [
			{
				title: 'django-repl',
				description:
					'Django running entirely in the browser via WebAssembly—full live preview, database, and admin panel. No server needed. 40+ stars.',
				techStack: ['TypeScript', 'Svelte', 'Pyodide', 'WebAssembly'],
				url: 'https://django.farhana.li'
			},
			{
				title: 'django-hawkeye',
				description:
					'BM25 full-text search for Django on PostgreSQL 17+—no Elasticsearch, same ranking quality. 28+ stars.',
				techStack: ['Python', 'Django', 'PostgreSQL', 'BM25'],
				url: 'https://github.com/FarhanAliRaza/django-hawkeye'
			},
			{
				title: 'Wakt',
				description:
					'Android app for focus and digital wellness. Blocks apps and sites, runs timers, schedules locks. Fully offline, no account needed.',
				techStack: ['Kotlin', 'Jetpack Compose', 'Room', 'Material Design 3'],
				url: 'https://github.com/FarhanAliRaza/Wakt'
			},
			{
				title: 'claude-context-local',
				description:
					'MCP server for Claude Code that does semantic code search 100% locally—no API calls, no data leaving your machine.',
				techStack: ['Python', 'FASTMCP', 'MCP', 'FAISS', 'Local Model'],
				url: 'https://github.com/FarhanAliRaza/claude-context-local'
			},
			{
				title: 'openflow',
				description:
					'Push-to-talk voice typing and transcription powered by Qwen3-ASR. Hold a key combo, speak, release—text is transcribed and typed at the cursor.',
				techStack: ['Python', 'ASR', 'Qwen3-ASR', 'CUDA', 'Cross-Platform'],
				url: 'https://github.com/FarhanAliRaza/openflow'
			},
			{
				title: 'k2',
				description:
					'Ultra-fast Alpine.js alternative powered by TC39 Signals. Tiny runtime (~3.6KB gzipped) with Alpine-style declarative directives.',
				techStack: ['JavaScript', 'TypeScript', 'TC39 Signals', 'Reactive UI'],
				url: 'https://github.com/FarhanAliRaza/k2'
			},
			{
				title: 'django-rapid',
				description:
					'Fast JSON serialization and validation for Django using msgspec, with FastAPI-style decorators for request validation and response schemas.',
				techStack: ['Python', 'Django', 'msgspec', 'JSON', 'Validation'],
				url: 'https://github.com/FarhanAliRaza/django-rapid'
			},
			{
				title: 'moonshine-mojo',
				description:
					'Moonshine speech recognition reimplemented in Mojo with GPU acceleration—5.3x faster than the Python baseline (135ms vs 715ms on RTX 3060). KV-cache cuts decoder time by 3.5x.',
				techStack: ['Mojo', 'GPU', 'ASR', 'KV-Cache'],
				url: 'https://github.com/FarhanAliRaza/moonshine-mojo'
			},
			{
				title: 'turbo-orm',
				description:
					'Async ORM for Django using psycopg3 async cursors and real connection pooling—genuinely faster under concurrent load.',
				techStack: ['Python', 'Django', 'PostgreSQL', 'psycopg3'],
				url: 'https://github.com/FarhanAliRaza/turbo-orm'
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
					<section class="section work-section">
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
					<section class="section skills-section">
						<h2 class="section-title">Skills</h2>
						<SkillsGrid skills={resumeData.skills} />
					</section>

					<section class="section projects-section">
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

					<section class="section education-section">
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
		--main-column-width: 62%;
		--sidebar-width: 38%;
	}

	.page {
		min-height: 100vh;
		background:
			radial-gradient(circle at 15% 15%, rgba(59, 130, 246, 0.06), transparent 40%),
			radial-gradient(circle at 85% 5%, rgba(15, 23, 42, 0.07), transparent 45%),
			#f8fafc;
		padding: 2.25rem 1.25rem 2.75rem;
	}

	.content {
		max-width: 72rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
		padding: 1.35rem;
		border-radius: 20px;
		background: linear-gradient(180deg, #ffffff, #f8fafc 100%);
		border: 1px solid rgba(15, 23, 42, 0.08);
		box-shadow:
			0 26px 60px -40px rgba(15, 23, 42, 0.5),
			0 8px 16px -12px rgba(15, 23, 42, 0.2);
	}

	.two-column {
		display: grid;
		grid-template-columns: var(--main-column-width) var(--sidebar-width);
		gap: 1.15rem;
		align-items: start;
	}

	.main-column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		min-width: 0;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
		border: 1px solid rgba(15, 23, 42, 0.09);
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.95);
	}

	.section-title {
		font-size: 0.8rem;
		font-weight: 700;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(15, 23, 42, 0.78);
		padding-bottom: 0.3rem;
		border-bottom: 1px solid rgba(15, 23, 42, 0.12);
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.projects-stack {
		display: flex;
		flex-direction: column;
		gap: 0.72rem;
	}

	.work-section {
		background:
			linear-gradient(180deg, rgba(15, 23, 42, 0.03), rgba(15, 23, 42, 0.01)),
			#ffffff;
	}

	.projects-section :global(.project),
	.work-section :global(.experience),
	.education-section :global(.education) {
		padding: 0.4rem 0.45rem;
		border-radius: 8px;
		background: rgba(15, 23, 42, 0.03);
		border: 1px solid rgba(15, 23, 42, 0.08);
	}

	@media (max-width: 768px) {
		.page {
			padding: 1rem 0.75rem 1.5rem;
			background: #f8fafc;
		}

		.content {
			padding: 0.85rem;
			border-radius: 12px;
			gap: 0.9rem;
			box-shadow: none;
		}

		.two-column {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.section {
			padding: 0.85rem;
		}
	}

	@media print {
		@page {
			size: A4;
			margin: 10mm;
		}

		.page {
			padding: 0;
			font-size: 8.1pt;
			min-height: 0;
			background: #ffffff;
		}

		.content {
			max-width: 100%;
			display: flex;
			gap: 0.55rem;
			padding: 0;
			border: 0;
			border-radius: 0;
			background: #ffffff;
			box-shadow: none;
		}

		.two-column {
			display: grid;
			grid-template-columns: 1.45fr 1fr;
			gap: 0.75rem;
			align-items: start;
		}

		.main-column,
		.sidebar {
			gap: 0.5rem;
		}

		.section {
			gap: 0.18rem;
			padding: 0;
			border: 0;
			border-radius: 0;
			background: transparent;
			margin: 0;
		}

		.work-section,
		.projects-section :global(.project),
		.work-section :global(.experience),
		.education-section :global(.education) {
			background: transparent;
			border: 0;
			padding: 0;
			border-radius: 0;
		}

		.projects-section :global(.project),
		.education-section {
			page-break-inside: avoid;
			break-inside: avoid;
		}

		.work-section :global(.experience) {
			page-break-inside: auto;
			break-inside: auto;
		}

		.skills-section {
			page-break-inside: avoid;
			break-inside: avoid;
		}

		.work-section {
			page-break-inside: auto;
			break-inside: auto;
		}

		.section-title {
			font-size: 9pt;
			font-weight: 700;
			margin: 0;
			padding-bottom: 0.1rem;
			margin-bottom: 0.12rem;
			border-bottom: 1px solid rgba(15, 23, 42, 0.22);
			letter-spacing: 0.05em;
		}

		.stack {
			gap: 0.28rem;
		}

		.projects-stack {
			gap: 0.24rem;
		}

		.projects-section {
			page-break-inside: auto;
			break-inside: auto;
		}

		.projects-section :global(.description) {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			overflow: hidden;
		}

		:global(.header-content) {
			gap: 0.12rem;
		}

		:global(.about) {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
			line-clamp: 4;
			overflow: hidden;
			margin-top: 0.1rem;
		}

		:global(.contact-bar) {
			margin-top: 0.18rem;
			padding: 0.22rem 0.42rem;
			gap: 0.28rem 0.32rem;
		}
	}
</style>
