<script lang="ts">
	import Header from './components/Header.svelte';
	import ExperienceItem from './components/ExperienceItem.svelte';
	import EducationItem from './components/EducationItem.svelte';
	import SkillsGrid from './components/SkillsGrid.svelte';
	import ProjectCard from './components/ProjectCard.svelte';

	const resumeData = {
		name: 'Farhan Ali',
		initials: 'FA',
		location: 'Gujrat, Pakistan',
		locationLink: 'https://www.google.com/maps/place/Gujrat,+Pakistan',
		tagline:
			'Full Stack Engineer with 5+ years building production systems and contributing to Django core.',
		about:
			'Full-stack engineer with 5+ years building production systems at scale and contributing to Django core (GSoC 2025). Architected MedGebra (FHIR-compliant medical platform) and built infrastructure processing 100M+ emails with 90.9% uptime. Experienced in technical architecture design and remote team leadership.',
		avatarUrl: null,
		contact: {
			personalWebsiteUrl: 'https://www.farhanali.tk',
			email: 'farhanaliazeemi@gmail.com',
			tel: '+923038279454',
			social: [
				{
					name: 'GitHub',
					url: 'https://github.com/FarhanAliRaza',
					icon: 'github'
				},
				{
					name: 'LinkedIn',
					url: 'https://www.linkedin.com/in/farhanaliraza',
					icon: 'linkedin'
				},
				{
					name: 'X',
					url: 'https://x.com/FarhanAliRaza4',
					icon: 'x'
				}
			]
		},
		work: [
			{
				company: 'Django Software Foundation',
				title: 'Google Summer of Code 2025 Contributor',
				badges: ['Remote', 'Django', 'Python', 'Open Source'],
				start: '2025',
				end: 'Present',
				highlights: [
					'Selected for the highly competitive Google Summer of Code program to contribute to Django core.',
					'Shipped template parallels to Django core (<a href="https://github.com/django/django/pull/19043" target="_blank" rel="noopener noreferrer">PR #19043</a>).',
					'Wrote comprehensive documentation and 50+ tests.',
					'Collaborated openly with maintainers through 100+ public review comments.'
				]
			},
			{
				company: 'Medgebra',
				title: 'Full Stack Engineer',
				badges: ['Remote', 'Django', 'Next.js', 'RAG', 'PostgreSQL'],
				start: '2023',
				end: '2025',
				highlights: [
					'Engineered LLM-powered semantic matching system with coordinate caching, reducing citation lookup time from 3.5s to &lt;1s.',
					'Designed production RAG system combining GPT-4 with 10+ clinical databases, achieving 2x response time improvement.',
					'Built scalable pipeline processing 10,000+ medical PDFs with AI-powered page labeling.'
				]
			},
			{
				company: 'Bulk Mail Verifier',
				title: 'Full Stack Engineer — Lead Developer',
				badges: ['Remote', 'Django', 'Celery', 'Redis', 'PostgreSQL'],
				start: '2021',
				end: '2023',
				highlights: [
					'Architected infrastructure handling millions of daily verification requests, maintaining 90.9% uptime.',
					'Built product from scratch, onboarded 3,000+ users with growing MRR.',
					'Shipped autonomous email campaign agent with custom DNS and DKIM verification.',
					'Owned end-to-end delivery, shipping features daily based on user feedback.'
				]
			}
		],
		education: [
			{
				school: 'University of Gujrat',
				degree: "Bachelor's Degree in Computer Science",
				start: '2019',
				end: '2023'
			}
		],
		skills: [
			'Python',
			'Django',
			'FastAPI',
			'React',
			'Svelte',
			'TypeScript',
			'JavaScript',
			'PostgreSQL',
			'Redis',
			'Docker',
			'Celery',
			'RAG',
			'LLM Integration',
			'REST APIs'
		],
		projects: [
			{
				title: 'Djangonaut Space',
				description:
					'14 PRs merged into djangopackages.org, 1 PR merged into Django core, and ongoing contributions to OSS.',
				techStack: ['Django', 'Python', 'Open Source']
			},
			{
				title: 'Local AI Server',
				description:
					'High-performance FastAPI server for Claude Code running 100% locally with zero costs and complete privacy.',
				techStack: ['FastAPI', 'AI', 'Python']
			},
			{
				title: 'FastAPI Decorators for Django',
				description:
					'3-10x faster JSON serialization for Django with simple request validation and response formatting.',
				techStack: ['Django', 'FastAPI', 'Pydantic']
			}
		]
	} as const;
</script>

<svelte:head>
	<title>{resumeData.name} - Resume</title>
	<meta name="description" content={resumeData.about} />
</svelte:head>

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
					/>
				{/each}
			</div>
		</section>
	</section>
</main>

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
			padding: 0;
		}
	}
</style>
