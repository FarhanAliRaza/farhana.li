<script lang="ts">
	import { ArrowUpRight, Github, Linkedin, FileText, MapPin } from 'lucide-svelte';
	import CopyEmailButton from './CopyEmailButton.svelte';
	import { siteConfig } from '$lib/config';
	import { profile, experience } from '$lib/profile';

	const skills = [
		'Python',
		'Django',
		'Rust',
		'Svelte',
		'TypeScript',
		'PostgreSQL',
		'Temporal',
		'PyO3',
		'LLMs & RAG'
	];

</script>

<article class="about" aria-labelledby="about-heading">
	<img
		src="/images/farhan-avatar.png"
		alt="Farhan Ali Raza"
		width="96"
		height="96"
		fetchpriority="high"
	/>

	<h1 id="about-heading">
		{profile.name} is an open-source and full-stack engineer<span aria-hidden="true">.</span>
	</h1>

	<div class="bio">
		{#each profile.bio as paragraph}<p>{paragraph}</p>{/each}
	</div>

	<ul class="chips" aria-label="Skills">
		{#each skills as skill}
			<li>{skill}</li>
		{/each}
	</ul>

	<div class="actions">
		<CopyEmailButton />
		<a class="button" href="/resume"><FileText size={16} aria-hidden="true" /> View resume</a>
	</div>

	<section class="block" aria-labelledby="exp-heading">
		<h2 id="exp-heading" class="eyebrow">Experience</h2>
		<ol class="experience">
			{#each experience as job}
				<li>
					<div class="job-head">
						{#if job.href}
							<a href={job.href} target="_blank" rel="noopener noreferrer"
								>{job.company} <ArrowUpRight size={13} aria-hidden="true" /></a
							>
						{:else}
							<span>{job.company}</span>
						{/if}
						<span class="job-period">{job.start} – {job.end}</span>
					</div>
					<p class="job-role">{job.role}</p>
					<p class="job-details">
						{job.employmentType}{#if job.location}
							· {job.location}{/if}
					</p>
					<p class="job-summary">{job.summary}</p>
					{#if job.highlights.length}
						<ul class="job-highlights">
							{#each job.highlights as highlight}<li>{highlight}</li>{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ol>
	</section>

	<section class="block" aria-labelledby="edu-heading">
		<h2 id="edu-heading" class="eyebrow">Education</h2>
		<div class="job-head">
			<span>Islamia University of Bahawalpur</span>
			<time>2019 - 2023</time>
		</div>
		<p class="job-role">BS Computer Science · 3.61 / 4.0</p>
	</section>

	<section class="block" aria-labelledby="connect-heading">
		<h2 id="connect-heading" class="eyebrow">
			<MapPin size={13} aria-hidden="true" /> Bahawalnagar, Pakistan
		</h2>
		<div class="social-links">
			<a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer"
				><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight
					size={13}
					aria-hidden="true"
				/></a
			>
			<a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer"
				><Linkedin size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight
					size={13}
					aria-hidden="true"
				/></a
			>
			<a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer"
				>X / Twitter <ArrowUpRight size={13} aria-hidden="true" /></a
			>
		</div>
	</section>
</article>

<style>
	.about {
		--ease-out-soft: cubic-bezier(0.25, 1, 0.5, 1);
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		color: #f5f1fa;
		display: flex;
		flex-direction: column;
	}
	.about img {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid rgba(235, 168, 255, 0.25);
		margin-bottom: 56px;
	}
	h1 {
		font-size: clamp(1.9rem, 2.4vw + 1rem, 2.5rem);
		font-weight: 550;
		line-height: 1.2;
		letter-spacing: -0.05em;
		margin-bottom: 32px;
	}
	h1 span {
		color: var(--color-brand);
	}
	.bio {
		display: flex;
		flex-direction: column;
		gap: 22px;
		font-size: 15px;
		line-height: 1.7;
		color: #b5aebf;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 40px;
		padding: 0;
		list-style: none;
	}
	.chips li {
		padding: 7px 13px;
		border: 1px solid #3b3147;
		border-radius: 999px;
		background: #1b1525;
		font-size: 12px;
		font-weight: 500;
		color: #e3dbea;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 32px;
	}
	.button {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		min-height: 44px;
		padding: 11px 18px;
		border: 1px solid #3b3147;
		border-radius: 999px;
		background: #1b1525;
		color: #e3dbea;
		font: inherit;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 150ms,
			border-color 150ms,
			color 150ms,
			transform 400ms var(--ease-out-soft);
	}
	.button:hover {
		background: #30203e;
		transform: translateY(-1px);
	}
	.button:active {
		transform: scale(0.97);
		transition-duration: 120ms;
	}
	.block {
		margin-top: 56px;
		padding-top: 32px;
		border-top: 1px solid #2a2333;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 20px;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: #d1c1df;
	}
	.experience {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 26px;
	}
	.job-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
		flex-wrap: wrap;
		font-size: 15px;
		font-weight: 600;
	}
	.job-head a {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		color: inherit;
	}
	.job-head time,
	.job-period {
		font-size: 12px;
		font-weight: 400;
		color: #9993a5;
		white-space: nowrap;
	}
	.job-role {
		margin-top: 3px;
		font-size: 13px;
		color: #d9b2f5;
	}
	.job-summary {
		margin-top: 6px;
		font-size: 13px;
		line-height: 1.7;
		color: #b5aebf;
	}
	.job-details {
		margin-top: 5px;
		font-size: 12px;
		color: #9993a5;
	}
	.job-highlights {
		margin: 8px 0 0;
		padding-left: 18px;
		list-style: disc;
		font-size: 13px;
		line-height: 1.7;
		color: #b5aebf;
	}
	.job-highlights li + li {
		margin-top: 5px;
	}
	.social-links {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 20px;
	}
	.social-links a {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		min-height: 32px;
		font-size: 13px;
		color: #d2c4df;
	}
	.social-links a:hover,
	.job-head a:hover {
		color: #f1d7ff;
	}
	a:focus-visible,
	button:focus-visible {
		outline: 2px solid #e9c2ff;
		outline-offset: 4px;
	}
	@media (prefers-reduced-motion: reduce) {
		.button {
			transition: none;
		}
		.button:hover,
		.button:active {
			transform: none;
		}
	}
</style>
