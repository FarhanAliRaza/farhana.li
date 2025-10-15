<script lang="ts">
	import Header from './components/Header.svelte';
	import ExperienceItem from './components/ExperienceItem.svelte';
	import EducationItem from './components/EducationItem.svelte';
	import SkillsGrid from './components/SkillsGrid.svelte';
	import ProjectCard from './components/ProjectCard.svelte';
	import WordleOverlay from '$lib/wordle/WordleOverlay.svelte';

	const resumeData = {
		name: 'Farhan Ali',
		initials: 'FA',
		location: 'Bahwalnagar, Pakistan | GMT+5',
		locationLink: 'https://maps.google.com/?q=Bahwalnagar,Pakistan',
		tagline: 'Full Stack Engineer | Django Core Contributor',
		about:
			'Full-stack engineer with 5+ years building production systems at scale. Django core contributor via Google Summer of Code 2025, shipped template partials feature to framework. Created django-bolt, a Rust/PyO3 framework achieving 64K+ RPS, exploring Python-Rust performance boundaries. Architected systems processing 100M+ emails with 99.9% uptime. Expert in Python, Django, Rust, and async processing with Tokio and Actix. Track record of delivering solutions rapidly while solving complex technical challenges end-to-end.',
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
					icon: 'github' as 'github'
				},
				{
					name: 'LinkedIn',
					url: 'https://www.linkedin.com/in/farhanaliraza',
					icon: 'linkedin' as 'linkedin'
				}
			]
		},
		work: [
			{
				company: 'Django Software Foundation',
				title: 'Google Summer of Code 2025 Contributor',
				badges: ['Remote', 'Django', 'Python', 'Open Source'],
				start: '05/2025',
				end: '08/2025',
				highlights: [
					'Selected for the highly competitive Google Summer of Code program to contribute to the Django web framework. <a href="https://summerofcode.withgoogle.com/programs/2025/projects/YqdTk30V" target="_blank" rel="noopener noreferrer">View Project</a>',
					'Shipped template partials to Django core (<a href="https://github.com/django/django/pull/19643" target="_blank" rel="noopener noreferrer">PR #19643</a>).',
					'Wrote comprehensive documentation and 50+ tests.',
					'Collaborated openly with maintainers through 100+ public review comments.'
				]
			},
			{
				company: 'Medgebra',
				title: 'Full Stack Engineer',
				badges: ['Remote', 'Django', 'Next.js', 'RAG', 'PostgreSQL', 'Redis', 'DSPY', 'Pinecone'],
				start: '06/2024',
				end: '07/2025',
				highlights: [
					'Engineered LLM-powered semantic matching system with coordinate caching, reducing citation lookup time from 3-5s to less than 200ms while handling OCR errors and paraphrasing.',
					'Built a scalable pipeline processing 100,000+ medical PDFs with AI-powered page filtering and citation tracking, ensuring verifiable sources for clinical decision support.',
					'Implemented real-time document search and retrieval system using vector embeddings and semantic similarity matching.'
				]
			},
			{
				company: 'Bulk Mail Verifier',
				title: 'Full Stack Engineer',
				badges: ['Django', 'Svelte', 'Celery', 'Redis', 'PostgreSQL', 'Rabbitmq', 'SMTP'],
				start: '03/2024',
				end: 'Present',
				highlights: [
					'Evolved product from email validation service processing 100M+ emails to comprehensive cold email platform based on user behavior analysis.',
					'Achieved 3,000+ active users and growing MRR through pure product-led growth strategy without marketing spend.',
					'Developing AI agent for autonomous cold email campaign management with fine-tuned Qwen 2.5 0.5B model for lead scoring.',
					'Led full product ownership cycle: user research, pivot decision, feature development based on analytics insights.',
					'Built scalable architecture handling millions of emails with RESTful APIs and real-time processing capabilities.'
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
			'JavaScript',
			'TypeScript',
			'React',
			'Svelte',
			'Next.js',
			'FastAPI',
			'Celery',
			'PyO3',
			'msgspec',
			'Tokio',
			'Actix',
			'PostgreSQL',
			'Redis',
			'Pinecone',
			'Docker',
			'Git',
			'REST APIs',
			'RAG',
			'LLM Integration',
			'Prompt Engineering',
			'DSPY',
			'Performance Optimization',
			'Open Source'
		],
		projects: [
			{
				title: 'django-bolt',
				description:
					'High-performance Django HTTP APIs powered by Rust (Actix+Tokio) with msgspec serialization, achieving 60k+ RPS for typed endpoints.',
				techStack: ['Django', 'Rust', 'PyO3', 'Actix', 'Tokio'],
				url: 'https://github.com/FarhanAliRaza/django-bolt'
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

<WordleOverlay>
	<main class="page">
		<section class="content">
			<Header
				name={resumeData.name}
				tagline={resumeData.tagline}
				location={resumeData.location}
				locationLink={resumeData.locationLink}
				initials={resumeData.initials}
				avatarUrl={resumeData.avatarUrl}
				contact={resumeData.contact}
			/>

			<section class="section">
				<h2 class="section-title">About</h2>
				<p class="section-text">{resumeData.about}</p>
			</section>

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

			<section class="section">
				<h2 class="section-title">Skills</h2>
				<SkillsGrid skills={resumeData.skills} />
			</section>

			<section class="section">
				<h2 class="section-title">Side Projects</h2>
				<div class="grid">
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
		</section>
	</main>
</WordleOverlay>

<style>
	.page {
		min-height: 100vh;
		background: #ffffff;
		padding: 3rem 1.5rem;
	}

	.content {
		max-width: 48rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.education-section {
		margin-top: 1.5rem;
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
	}

	.section-text {
		font-family: var(--resume-font-mono);
		font-size: 0.9rem;
		color: rgba(15, 23, 42, 0.78);
		margin: 0;
		line-height: 1.7;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.grid {
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media print {
		.page {
			padding: 0.5rem 0;
			font-size: 10pt;
			min-height: 0;
		}

		.content {
			gap: 1rem;
			max-width: 100%;
		}

		.section {
			gap: 0.5rem;
			page-break-inside: avoid;
			break-inside: avoid;
		}

		.section-title {
			font-size: 13pt;
			font-weight: 700;
			margin: 0;
			margin-bottom: 0.375rem;
		}

		.section-text {
			font-size: 9pt;
			line-height: 1.45;
		}

		.stack {
			gap: 0.625rem;
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 0.5rem;
		}
	}
</style>
