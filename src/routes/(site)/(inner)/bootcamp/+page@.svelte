<script lang="ts">
	import {
		Target,
		GraduationCap,
		Briefcase,
		ArrowRight,
		CheckCircle,
		Users,
		Clock,
		Sparkles,
		MessageCircle,
		Brain
	} from 'lucide-svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { profile } from '$lib/profile';
	import '../../../../app.css';
	import '$lib/bento.css';
	import scratchIcon from './icons/scratch.svg';
	import pythonIcon from './icons/python.svg';
	import htmlIcon from './icons/html.svg';
	import cssIcon from './icons/css.svg';
	import javascriptIcon from './icons/javascript.svg';
	import djangoIcon from './icons/django.svg';
	const technologies = [
		{
			name: 'Computational Thinking',
			component: Brain
		},
		{
			name: 'Scratch',
			icon: scratchIcon
		},
		{ name: 'Python', icon: pythonIcon },
		{ name: 'HTML', icon: htmlIcon },
		{ name: 'CSS', icon: cssIcon },
		{
			name: 'JavaScript',
			icon: javascriptIcon
		},
		{
			name: 'Django',
			icon: djangoIcon
		},
		{
			name: 'Vibe Coding',
			component: Sparkles
		}
	];

	const features = [
		{
			title: 'Learn by Building',
			description:
				'Visual, hands-on learning through actual coding projects - see immediate results instead of just reading theory',
			icon: Target
		},
		{
			title: 'CS50-Inspired Foundation',
			description:
				'Learn how computers actually work - from binary to databases - so everything else makes sense',
			icon: GraduationCap
		},
		{
			title: 'Concepts Before Syntax',
			description:
				'Understand the "why" behind programming principles, making any language easier to learn later',
			icon: Briefcase
		},
		{
			title: 'AI Coding',
			description:
				'Learn computational thinking and prompt engineering to effectively collaborate with AI coding tools',
			icon: Sparkles
		}
	];

	const curriculum = [
		{
			week: 'Week 1-2',
			title: 'How Computers Think',
			topics: [
				'Binary & Data Representation',
				'Memory & Storage Concepts',
				'Visual Programming with Scratch',
				'Computational Thinking Patterns'
			]
		},
		{
			week: 'Week 3-4',
			title: 'Understanding Code Logic',
			topics: [
				'Variables as Memory Boxes',
				'Arrays as Organized Lists',
				'Functions as Reusable Recipes',
				'Problem Decomposition Skills'
			]
		},
		{
			week: 'Week 5-6',
			title: 'How the Web Works',
			topics: [
				'Client-Server Communication',
				'Document Structure & Semantics',
				'Visual Design Principles',
				'AI-Assisted HTML/CSS Development'
			]
		},
		{
			week: 'Week 7-8',
			title: 'Making Pages Interactive',
			topics: [
				'Event-Driven Programming',
				'DOM as Document Map',
				'Network Requests & APIs',
				'Prompt Engineering for JavaScript'
			]
		},
		{
			week: 'Week 9-10',
			title: 'Server-Side Thinking',
			topics: [
				'Backend Architecture Concepts',
				'Database Design Principles',
				'Request-Response Cycle',
				'AI Pair Programming Techniques'
			]
		},
		{
			week: 'Week 11-12',
			title: 'Connecting It All',
			topics: [
				'Full-Stack Mental Model',
				'System Design Basics',
				'AI-Enhanced Development Workflow',
				'Building Your Portfolio'
			]
		}
	];

	const highlights = [
		{ icon: Users, text: 'Small Cohort Size', detail: 'Maximum 30 students per batch' },
		{ icon: Clock, text: '100% Online', detail: 'Learn at your own pace' },
		{ icon: CheckCircle, text: 'Certificate Included', detail: 'Upon successful completion' },
		{ icon: Sparkles, text: 'Lifetime Access', detail: 'To course materials' }
	];
</script>

<svelte:head>
	<title>Free Full-Stack Bootcamp | Learn Web Development</title>
	<meta
		name="description"
		content="Join our free online bootcamp. Learn from Scratch to Django with CS50-inspired teaching and hands-on projects."
	/>
</svelte:head>
<Navbar />
<main class="bento-page bootcamp">
	<div class="bento-shell">
		<div class="bootcamp-hero">
			<section class="bento-card intro">
				<p class="bento-eyebrow">Free full-stack bootcamp</p>
				<h1>Understand how computers think.<br /><span>Build with confidence.</span></h1>
				<p class="bento-page__intro">
					Learn how to think like a computer and build websites from scratch. No previous coding
					experience needed. Start with the basics, then learn to work with AI tools too.
				</p>
				<div class="hero-actions">
					<a
						class="bento-button bento-button--primary"
						href="https://discord.gg/3qWkg8zFr9"
						target="_blank"
						rel="noopener noreferrer"
						><MessageCircle size={18} /> Join Discord community <ArrowRight size={16} /></a
					><a class="bento-button" href="#curriculum">Explore the curriculum</a>
				</div>
			</section>
			<aside class="bento-card course-info">
				<div>
					<p class="bento-eyebrow">From curiosity to your first app</p>
					<p class="big-number">12 <span>weeks</span></p>
					<p>A foundation you can build on.</p>
				</div>
				<div class="course-facts">
					<span>100% free</span><span>Online, from anywhere</span><span
						>Up to 30 students per batch</span
					>
				</div>
			</aside>
		</div>
		<section class="bootcamp-section" aria-labelledby="tools-heading">
			<p class="bento-eyebrow">Your toolkit</p>
			<h2 id="tools-heading" class="bento-subheading">From first principles to full stack.</h2>
			<div class="tech-grid">
				{#each technologies as tech}<div class="bento-card tech">
						{#if tech.component}<tech.component size={32} aria-hidden="true" />{:else}<img
								src={tech.icon}
								alt=""
								width="32"
								height="32"
							/>{/if}<span>{tech.name}</span>
					</div>{/each}
			</div>
		</section>
		<section class="bootcamp-section" aria-labelledby="concepts-heading">
			<p class="bento-eyebrow">The approach</p>
			<h2 id="concepts-heading" class="bento-subheading">
				Concepts first. Real projects throughout.
			</h2>
			<div class="four-grid">
				{#each features as feature}<article class="bento-card feature">
						<feature.icon size={26} aria-hidden="true" />
						<h3>{feature.title}</h3>
						<p>{feature.description}</p>
					</article>{/each}
			</div>
		</section>
		<section class="bootcamp-section" aria-labelledby="format-heading">
			<h2 id="format-heading" class="bento-subheading">How we learn together.</h2>
			<div class="bento-list">
				<article class="bento-card feature">
					<p class="bento-eyebrow">01 / Online</p>
					<h3>Join from anywhere</h3>
					<p>
						Live interactive sessions via Google Meet or Zoom, with course materials to revisit at
						your own pace.
					</p>
				</article>
				<article class="bento-card feature">
					<p class="bento-eyebrow">02 / Three days a week</p>
					<h3>Make it a habit</h3>
					<p>Hands-on live coding sessions every Monday, Wednesday, and Friday.</p>
				</article>
				<article class="bento-card feature">
					<p class="bento-eyebrow">03 / Small groups</p>
					<h3>Learn with people</h3>
					<p>
						Direct instructor feedback, peer collaboration, and a community to work through problems
						together.
					</p>
				</article>
			</div>
		</section>
		<section id="curriculum" class="bootcamp-section" aria-labelledby="curriculum-heading">
			<p class="bento-eyebrow">The roadmap</p>
			<h2 id="curriculum-heading" class="bento-subheading">Twelve weeks. One solid foundation.</h2>
			<div class="bento-list">
				{#each curriculum as module}<article class="bento-card feature">
						<span class="bento-tag">{module.week}</span>
						<h3>{module.title}</h3>
						<ul>
							{#each module.topics as topic}<li>{topic}</li>{/each}
						</ul>
					</article>{/each}
			</div>
		</section>
		<section class="bento-card instructor" aria-labelledby="instructor-heading">
			<img
				src="/images/farhan-avatar.png"
				alt={profile.name}
				width="112"
				height="112"
				loading="lazy"
			/>
			<div>
				<p class="bento-eyebrow">Your instructor</p>
				<h2 id="instructor-heading" class="bento-subheading">{profile.name}</h2>
				<p>{profile.resumeSummary}</p>
				<div class="hero-actions">
					<a class="bento-button" href="/about">More about me <ArrowRight size={16} /></a><a
						class="bento-button"
						href="https://github.com/FarhanAliRaza"
						target="_blank"
						rel="noopener noreferrer">GitHub</a
					>
				</div>
			</div>
		</section>
		<div class="four-grid highlights">
			{#each highlights as highlight}<div>
					<highlight.icon size={22} aria-hidden="true" />
					<h3>{highlight.text}</h3>
					<p>{highlight.detail}</p>
				</div>{/each}
		</div>
		<section class="bento-card closing">
			<p class="bento-eyebrow">Start here</p>
			<h2 class="bento-subheading">Bring your curiosity.</h2>
			<p>Join the community, meet your peers, and take the first step.</p>
			<a
				class="bento-button bento-button--primary"
				href="https://discord.gg/3qWkg8zFr9"
				target="_blank"
				rel="noopener noreferrer">Join Discord community <ArrowRight size={16} /></a
			>
		</section>
	</div>
</main>

<style>
	.bootcamp {
		padding-top: 108px;
	}
	.bootcamp-hero {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		gap: var(--bento-gap);
	}
	.intro,
	.course-info,
	.closing {
		padding: clamp(24px, 4vw, 56px);
	}
	.intro h1 {
		font-size: clamp(2.3rem, 4.2vw, 4.8rem);
		max-width: 950px;
	}
	.intro h1 span {
		color: var(--bento-accent);
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 28px;
	}
	.course-info {
		justify-content: space-between;
		gap: 36px;
		background: #171024;
	}
	.big-number {
		font-family: var(--font-display);
		font-size: clamp(5rem, 8vw, 9rem);
		line-height: 1.1;
		letter-spacing: -0.06em;
		color: #e9c2ff;
	}
	.big-number span {
		font-family: var(--font-sans);
		font-size: 1.1rem;
		letter-spacing: 0;
		color: #b8afc4;
	}
	.course-info p:not(.big-number):not(.bento-eyebrow),
	.feature p,
	.instructor p:not(.bento-eyebrow),
	.closing > p:not(.bento-eyebrow) {
		color: var(--bento-muted);
		line-height: 1.8;
		font-size: 15px;
	}
	.course-facts {
		display: grid;
		gap: 14px;
		font-size: 13px;
		color: #d9c5e9;
	}
	.course-facts span {
		padding-top: 14px;
		border-top: 1px solid var(--bento-border);
	}
	.bootcamp-section {
		margin-block: clamp(40px, 5vw, 72px);
		scroll-margin-top: 100px;
	}
	.tech-grid {
		display: grid;
		grid-template-columns: repeat(8, minmax(0, 1fr));
		gap: 12px;
	}
	.tech {
		padding: 24px 12px;
		gap: 18px;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 12px;
		color: #e9c2ff;
	}
	.four-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--bento-gap);
	}
	.feature {
		padding: var(--bento-padding);
		gap: 18px;
		align-items: flex-start;
	}
	.feature :global(svg) {
		color: var(--bento-accent);
	}
	.feature h3 {
		font-family: var(--font-display);
		font-size: 1.4rem;
		letter-spacing: -0.03em;
		line-height: 1.25;
	}
	.feature ul {
		list-style: disc;
		padding-left: 18px;
		color: var(--bento-muted);
		font-size: 14px;
		line-height: 1.9;
	}
	.instructor {
		flex-direction: row;
		align-items: flex-start;
		gap: 32px;
		padding: clamp(24px, 4vw, 48px);
	}
	.instructor img {
		border-radius: 50%;
		flex: 0 0 112px;
	}
	.instructor p {
		max-width: 850px;
	}
	.instructor h2 {
		margin-bottom: 16px;
	}
	.highlights {
		padding-block: 48px;
	}
	.highlights > div {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.highlights :global(svg) {
		color: #b4eaff;
	}
	.highlights h3 {
		font-size: 14px;
	}
	.highlights p {
		color: var(--bento-muted);
		font-size: 13px;
		line-height: 1.6;
	}
	.closing {
		align-items: flex-start;
	}
	.closing .bento-button {
		margin-top: 24px;
	}
	@media (max-width: 1023px) {
		.tech-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
		.four-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.bootcamp-hero {
			grid-template-columns: minmax(0, 1fr);
		}
		.course-info {
			flex-direction: row;
			align-items: center;
		}
	}
	@media (max-width: 639px) {
		.bootcamp {
			padding-top: 88px;
		}
		.four-grid {
			grid-template-columns: minmax(0, 1fr);
		}
		.tech-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.course-info,
		.instructor {
			flex-direction: column;
		}
		.highlights {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
