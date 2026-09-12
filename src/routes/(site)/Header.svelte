<script lang="ts">
	import {
		ArrowUpRight,
		ArrowRight,
		Github,
		Linkedin,
		FileText,
		MapPin,
		Code2,
		BookOpen
	} from 'lucide-svelte';
	import Canvas from './Canvas.svelte';
	import AboutSheet from '$lib/components/AboutSheet.svelte';
	import CopyEmailButton from '$lib/components/CopyEmailButton.svelte';
	import { siteConfig } from '$lib/config';
	import { profile } from '$lib/profile';

	let canvasContainer = $state<HTMLDivElement>();

	let aboutOpen = $state(false);
</script>

<header class="hero" aria-labelledby="hero-heading">
	<div class="bento-grid">
		<div class="tile intro-tile">
			<div class="identity">
				<img
					src="/images/farhan-avatar.png"
					alt="Farhan Ali Raza"
					width="64"
					height="64"
					fetchpriority="high"
				/>
				<div>
					<p class="eyebrow">{profile.title}</p>
					<p class="location"><MapPin size={13} aria-hidden="true" /> Pakistan · UTC+5</p>
				</div>
			</div>

			<div class="introduction">
				<p class="hello">Hi there, I'm</p>
				<h1 id="hero-heading">Farhan Ali Raza<span aria-hidden="true">.</span></h1>
				<p class="headline">I build things for the web.<br /><span>And make them fast.</span></p>
				<p class="bio">
					I'm an OSS engineer at <a class="scribble" href="https://reflex.dev" target="_blank" rel="noopener noreferrer">Reflex</a>,
					founder of <a class="scribble" href="https://mailjinn.com/" target="_blank" rel="noopener noreferrer">Mailjinn</a>,
					and creator of <a class="scribble" href="https://github.com/FarhanAliRaza/django-bolt" target="_blank" rel="noopener noreferrer">django-bolt</a>.
					I build web applications and open-source tools with Python, Django, Rust, and Svelte.
				</p>
			</div>

			<div class="actions">
				<a class="button primary" href="/projects"
					>Explore my work <ArrowUpRight size={17} aria-hidden="true" /></a
				>
				<CopyEmailButton />
			</div>
			<div class="intro-footer">
				<button type="button" class="text-link" onclick={() => (aboutOpen = true)}
					>More about me <ArrowRight size={14} aria-hidden="true" /></button
				>
				<a href="/resume"><FileText size={14} aria-hidden="true" /> View resume</a>
			</div>
		</div>

		<div class="tile cosmos-tile">
			<div class="cosmos-canvas" bind:this={canvasContainer} aria-hidden="true">
				{#if canvasContainer}<Canvas container={canvasContainer} />{/if}
			</div>
		</div>

		<div class="tile connect-tile">
			<div>
				<p class="eyebrow">Elsewhere on the internet</p>
				<h2>Let's connect.</h2>
			</div>
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
		</div>

		<a
			class="tile link-tile work-tile"
			href="https://github.com/FarhanAliRaza/django-bolt"
			target="_blank"
			rel="noopener noreferrer"
		>
			<div class="tile-top">
				<span class="eyebrow"><Code2 size={15} aria-hidden="true" /> Open source</span><ArrowUpRight
					size={21}
					aria-hidden="true"
				/>
			</div>
			<div>
				<h2>Python simplicity. Rust speed.</h2>
				<p>Building django-bolt, a Rust-powered server for Django.</p>
			</div>
			<span class="tile-link">Explore django-bolt <ArrowRight size={15} aria-hidden="true" /></span>
		</a>

		<a class="tile link-tile writing-tile" href="/blog">
			<div class="tile-top">
				<span class="eyebrow"
					><BookOpen size={15} aria-hidden="true" /> Notes from the workbench</span
				><ArrowUpRight size={21} aria-hidden="true" />
			</div>
			<div>
				<h2>Building. Learning. Sharing.</h2>
				<p>Experiments, engineering deep dives, and things I've learned along the way.</p>
			</div>
			<span class="tile-link">Read the blog <ArrowRight size={15} aria-hidden="true" /></span>
		</a>
	</div>
</header>

<AboutSheet bind:open={aboutOpen} />

<style>
	.hero {
		position: relative;
		width: 100%;
		margin: 0 auto;
		padding: 112px var(--bento-gutter) 40px;
		color: #f5f1fa;
	}
	.bento-grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--bento-gap);
	}
	.hero {
		--ease-out-soft: cubic-bezier(0.25, 1, 0.5, 1);
	}
	.tile {
		min-width: 0;
		border: 1px solid rgba(235, 168, 255, 0.14);
		border-radius: var(--bento-radius);
		background: rgba(15, 12, 22, 0.94);
		padding: 28px;
		overflow: hidden;
	}
	.link-tile {
		transform: translateZ(0);
		transition:
			transform 400ms var(--ease-out-soft),
			box-shadow 400ms var(--ease-out-soft),
			background 150ms,
			border-color 150ms;
	}
	@media (pointer: fine) {
		.link-tile:hover {
			transform: translateY(-3px) scale(1.01);
			box-shadow: 0 18px 40px -18px rgba(235, 168, 255, 0.35);
		}
	}
	.link-tile:active {
		transform: scale(0.99);
		transition-duration: 120ms;
	}
	.intro-tile {
		grid-column: span 7;
		grid-row: span 2;
		padding: 36px;
		display: flex;
		flex-direction: column;
	}
	.identity {
		display: flex;
		align-items: center;
		gap: 15px;
	}
	.identity img {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid rgba(235, 168, 255, 0.25);
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: #d1c1df;
	}
	.location {
		display: flex;
		align-items: center;
		gap: 5px;
		margin-top: 6px;
		font-size: 12px;
		color: #9993a5;
	}
	.introduction {
		margin: 34px 0 26px;
	}
	.hello {
		font-size: 16px;
		color: #c0b8ca;
		margin-bottom: 5px;
	}
	h1 {
		font-size: clamp(2.5rem, 4.2vw, 3.6rem);
		font-weight: 650;
		line-height: 1.06;
		letter-spacing: -0.055em;
	}
	h1 span {
		color: #eba8ff;
	}
	.headline {
		margin-top: 18px;
		font-family: var(--font-display);
		font-size: clamp(1.35rem, 2.2vw, 1.9rem);
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: -0.025em;
	}
	.headline span {
		color: #d9b2f5;
	}
	.bio {
		max-width: 460px;
		margin-top: 18px;
		font-size: 14px;
		line-height: 1.8;
		color: #b5aebf;
	}
	.scribble {
		color: #e3dbea;
		font-weight: 600;
		text-decoration: none;
		padding-bottom: 7px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 10' preserveAspectRatio='none'%3E%3Cpath d='M2 7 C 14 2, 26 9, 40 5 S 64 1.5, 78 7 S 92 5, 98 3' fill='none' stroke='%23e9c2ff' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-size: 100% 7px;
		background-position: 0 100%;
		transition:
			color 150ms,
			background-size 250ms var(--ease-out-soft);
	}
	.scribble:hover {
		color: #f2ddff;
		background-size: 100% 9px;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: auto;
	}
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 9px;
		min-height: 44px;
		padding: 11px 18px;
		border: 1px solid transparent;
		border-radius: 999px;
		font-size: 13px;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition:
			background 150ms,
			border-color 150ms,
			color 150ms,
			transform 400ms var(--ease-out-soft);
	}
	.button:hover {
		transform: translateY(-1px);
	}
	.button:active {
		transform: scale(0.97);
		transition-duration: 120ms;
	}
	.primary {
		background: #e9c2ff;
		color: #251431;
	}
	.primary:hover {
		background: #f2ddff;
	}
	.secondary {
		border-color: #3b3147;
		color: #e3dbea;
		background: #1b1525;
	}
	.secondary:hover {
		background: #30203e;
	}
	.intro-footer {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		border-top: 1px solid #2a2333;
		margin-top: 26px;
		padding-top: 18px;
	}
	.text-link {
		border: 0;
		background: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
	}
	.intro-footer a,
	.text-link {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 12px;
		color: #bdb2ca;
	}
	.cosmos-tile {
		grid-column: span 5;
		position: relative;
		min-height: 330px;
		background: rgba(8, 9, 18, 0.92);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.tile-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 14px;
	}
	.cosmos-canvas {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.connect-tile {
		grid-column: span 5;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 20px;
		background: rgba(24, 15, 35, 0.95);
	}
	h2 {
		margin-top: 6px;
		font-size: 22px;
		font-weight: 550;
		letter-spacing: -0.035em;
		line-height: 1.25;
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
		font-size: 12px;
		color: #d2c4df;
	}
	.link-tile {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}
	.work-tile {
		grid-column: span 7;
		background: rgba(16, 21, 32, 0.95);
	}
	.writing-tile {
		grid-column: span 5;
	}
	.link-tile p {
		margin-top: 8px;
		font-size: 13px;
		line-height: 1.7;
		color: #b5aebf;
	}
	.tile-link {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: #c3eafa;
		margin-top: auto;
	}
	.writing-tile .tile-link {
		color: #e9c2ff;
	}
	.link-tile:hover {
		border-color: rgba(235, 168, 255, 0.4);
		background: #21182e;
	}
	.intro-footer a:hover,
	.text-link:hover,
	.social-links a:hover {
		color: #f1d7ff;
	}
	a:focus-visible,
	button:focus-visible {
		outline: 2px solid #e9c2ff;
		outline-offset: 5px;
	}
	@media (max-width: 1023px) {
		.bento-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.intro-tile {
			grid-column: 1 / -1;
			grid-row: auto;
		}
		.cosmos-tile,
		.connect-tile,
		.work-tile,
		.writing-tile {
			grid-column: span 1;
		}
		.cosmos-tile {
			min-height: 300px;
		}
	}
	@media (max-width: 900px) {
		.hero {
			padding-inline: var(--bento-gutter);
		}
		.intro-tile {
			padding: 28px;
		}
		.tile {
			border-radius: var(--bento-radius);
		}
		.social-links {
			gap: 8px 12px;
		}
	}
	@media (max-width: 639px) {
		.hero {
			padding: 96px var(--bento-gutter) 28px;
		}
		.bento-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 12px;
		}
		.intro-tile,
		.cosmos-tile,
		.connect-tile,
		.work-tile,
		.writing-tile {
			grid-column: 1 / -1;
			grid-row: auto;
		}
		.tile {
			padding: 24px;
		}
		.introduction {
			margin-top: 28px;
		}
		h1 {
			font-size: clamp(2.2rem, 8vw, 3.2rem);
		}
		.headline {
			font-size: 1.6rem;
		}
		.bio {
			max-width: none;
		}
		.cosmos-tile {
			min-height: 280px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.button,
		.link-tile {
			transition: none;
		}
		.link-tile:hover,
		.link-tile:active,
		.button:hover,
		.button:active {
			transform: none;
		}
	}
</style>
