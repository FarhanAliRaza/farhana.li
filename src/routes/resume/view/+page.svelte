<script lang="ts">
	import Header from '../components/Header.svelte';
	import ExperienceItem from '../components/ExperienceItem.svelte';
	import EducationItem from '../components/EducationItem.svelte';
	import SkillsGrid from '../components/SkillsGrid.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
	import ExampleView from './ExampleView.svelte';
	import WordleOverlay from '$lib/wordle/WordleOverlay.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();
	const { showExample, resumeData } = data;

	// Anti-scraping measures (only for actual resume, not example)
	onMount(() => {
		if (resumeData && !showExample) {
			// Disable right-click context menu
			document.addEventListener('contextmenu', (e) => e.preventDefault());

			// Disable text selection
			document.addEventListener('selectstart', (e) => e.preventDefault());

			// Disable copy
			document.addEventListener('copy', (e) => e.preventDefault());

			// Log warning for developers
			console.warn('This resume is protected. For legitimate use, please contact the owner.');

			return () => {
				document.removeEventListener('contextmenu', (e) => e.preventDefault());
				document.removeEventListener('selectstart', (e) => e.preventDefault());
				document.removeEventListener('copy', (e) => e.preventDefault());
			};
		}
	});
</script>

<svelte:head>
	{#if showExample}
		<title>Resume XML Generator - Example & Documentation</title>
		<meta name="description" content="Generate job-specific resumes using XML and LLMs" />
		<!-- Prevent search engines from indexing this page -->
		<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
		<meta name="googlebot" content="noindex, nofollow" />
	{:else if resumeData}
		<title>{resumeData.name} - Resume</title>
		<meta name="description" content={resumeData.about} />
		<!-- Prevent search engines from indexing dynamic resumes -->
		<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
		<meta name="googlebot" content="noindex, nofollow" />
	{/if}
</svelte:head>

{#if showExample}
	<ExampleView />
{:else if resumeData}
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
					contact={resumeData.contact as any}
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
								tags={experience.badges || []}
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
{/if}

<style>
	.page {
		min-height: 100vh;
		background: #ffffff;
		padding: 3rem 1.5rem;
		/* Prevent text selection for scraping protection */
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
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
