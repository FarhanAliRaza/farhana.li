<script lang="ts">
	import Header from './components/Header.svelte';
	import { profile, experience } from '$lib/profile';
	import ExperienceItem from './components/ExperienceItem.svelte';
	import EducationItem from './components/EducationItem.svelte';
	import SkillsGrid from './components/SkillsGrid.svelte';
	import ProjectCard from './components/ProjectCard.svelte';
	import WordleOverlay from '$lib/wordle/WordleOverlay.svelte';

	const resumeData = {
		name: profile.name,
		initials: 'FA',
		location: 'Bahawalnagar, Pakistan | GMT+5',
		locationLink: 'https://maps.google.com/?q=Bahawalnagar,Pakistan',
		tagline: profile.tagline,
		about: profile.resumeSummary,
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
		work: experience.map((job) => ({
			company: job.company,
			title: job.role,
			badges: [job.employmentType, ...job.skills],
			start: job.start,
			end: job.end,
			location: job.location,
			href: job.href,
			highlights: [job.summary, ...job.highlights]
		})),
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
			'Temporal',
			'PyO3',
			'RAG',
			'LLM Fine-tuning',
			'Vector Search'
		],
		projects: [
			{
				title: 'Lahza',
				description:
					'Native Linux screenshot and screen recording studio built with Rust and GPUI. Capture, annotate, edit on a multitrack timeline, and export up to 4K at 60 fps as MP4, WebM, or GIF.',
				techStack: ['Rust', 'GPUI', 'Linux', 'Video'],
				url: 'https://github.com/FarhanAliRaza/Lahza'
			},
			{
				title: 'taipan',
				description:
					'Single self-contained binary with CPython 3.14 embedded, written in Zig. Runs Python and PEP 723 scripts on machines with no Python installed, with ~10ms warm starts, and compiles scripts into standalone executables.',
				techStack: ['Zig', 'Python', 'CPython', 'CLI'],
				url: 'https://github.com/FarhanAliRaza/taipan'
			},
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
									companyUrl={experience.href}
									location={experience.location}
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
			radial-gradient(circle at 85% 5%, rgba(15, 23, 42, 0.07), transparent 45%), #f8fafc;
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
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.03), rgba(15, 23, 42, 0.01)), #ffffff;
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
