<script>
	import { fade, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import {
		Target,
		GraduationCap,
		Briefcase,
		Wrench,
		ArrowRight,
		CheckCircle,
		Users,
		Clock,
		Sparkles,
		MessageCircle,
		Brain
	} from 'lucide-svelte';

	import scratchIcon from './icons/scratch.svg';
	import pythonIcon from './icons/python.svg';
	import htmlIcon from './icons/html.svg';
	import cssIcon from './icons/css.svg';
	import javascriptIcon from './icons/javascript.svg';
	import djangoIcon from './icons/django.svg';

	let mounted = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);

	$effect(() => {
		mounted = true;

		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth) * 100;
			mouseY = (e.clientY / window.innerHeight) * 100;
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	const technologies = [
		{
			name: 'Computational Thinking',
			icon: Brain,
			color: 'from-indigo-500 to-purple-500',
			isComponent: true
		},
		{
			name: 'Scratch',
			icon: scratchIcon,
			color: 'from-yellow-500 to-orange-500',
			isComponent: false
		},
		{ name: 'Python', icon: pythonIcon, color: 'from-blue-500 to-cyan-500', isComponent: false },
		{ name: 'HTML', icon: htmlIcon, color: 'from-pink-500 to-purple-500', isComponent: false },
		{ name: 'CSS', icon: cssIcon, color: 'from-blue-400 to-blue-600', isComponent: false },
		{
			name: 'JavaScript',
			icon: javascriptIcon,
			color: 'from-yellow-400 to-amber-500',
			isComponent: false
		},
		{
			name: 'Django',
			icon: djangoIcon,
			color: 'from-green-500 to-emerald-500',
			isComponent: false
		},
		{
			name: 'Vibe Coding',
			icon: Sparkles,
			color: 'from-violet-500 to-fuchsia-500',
			isComponent: true
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
		content="Join our 100% free online bootcamp. Learn from Scratch to Django with CS50-inspired teaching. Limited seats available!"
	/>
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-black">
	<!-- Main gradient background -->
	<div class="absolute inset-0">
		<!-- Purple-blue gradient overlay -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-purple-900/40"
		></div>
		<!-- Animated gradient spots -->
		<div
			class="absolute -left-40 top-0 h-96 w-96 animate-pulse rounded-full bg-purple-600/30 blur-[120px]"
		></div>
		<div
			class="absolute -right-40 top-1/2 h-96 w-96 animate-pulse rounded-full bg-blue-600/30 blur-[120px] delay-1000"
		></div>
		<div
			class="absolute bottom-0 left-1/3 h-96 w-96 animate-pulse rounded-full bg-indigo-600/20 blur-[120px] delay-500"
		></div>
	</div>

	<!-- Dynamic mouse gradient -->
	<div
		class="absolute inset-0 opacity-20"
		style="background: radial-gradient(circle at {mouseX}% {mouseY}%, rgba(139, 92, 246, 0.3) 0%, transparent 40%)"
	/>

	<!-- Hero Section -->
	<section class="relative px-4 py-20">
		<div class="mx-auto max-w-6xl">
			{#if mounted}
				<div class="space-y-8 text-center" in:fade={{ duration: 800, delay: 200 }}>
					<!-- Floating badge -->
					<div
						class="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-6 py-3 backdrop-blur-sm"
					>
						<span class="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
						<span class="font-medium text-green-400">100% FREE • LIMITED SEATS</span>
					</div>

					<!-- Main heading with gradient -->
					<h1 class="font-display text-5xl font-bold leading-tight md:text-7xl">
						<span
							class="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
						>
							Understand How Computers Think
						</span>
						<br />
						<span
							class="animate-gradient bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
						>
							Build Anything with Confidence
						</span>
					</h1>

					<p class="mx-auto max-w-3xl text-xl leading-relaxed text-white/80 md:text-2xl">
						Learn how to think like a computer and build websites from scratch. No previous coding
						experience needed - we'll start with the basics and teach you how to work with AI tools
						too.
					</p>

					<!-- CTA Button -->
					<div class="pt-8">
						<a
							href="https://discord.gg/3qWkg8zFr9"
							target="_blank"
							rel="noopener noreferrer"
							class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-5 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
						>
							<div
								class="animate-gradient absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
							></div>
							<MessageCircle class="relative h-5 w-5 text-white" />
							<span class="relative font-semibold text-white">Join Discord Community</span>
							<ArrowRight
								class="relative h-5 w-5 text-white transition-transform group-hover:translate-x-1"
							/>
						</a>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Animated Tech Stack -->
	<section class="px-4 py-16">
		<div class="mx-auto max-w-6xl">
			{#if mounted}
				<div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
					{#each technologies as tech, i}
						<div
							in:scale={{ duration: 500, delay: 100 * i, easing: quintOut }}
							class="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10"
						>
							<div
								class="absolute inset-0 bg-gradient-to-br {tech.color} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-20"
							></div>
							<div class="relative space-y-3 text-center">
								<div class="flex justify-center">
									{#if tech.isComponent}
										<svelte:component this={tech.icon} class="h-10 w-10 text-white/90" />
									{:else}
										<img src={tech.icon} alt={tech.name} class="h-10 w-10" />
									{/if}
								</div>
								<div class="font-medium text-white/90">{tech.name}</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Features Grid -->
	<section class="px-4 py-20">
		<div class="mx-auto max-w-6xl">
			{#if mounted}
				<h2 class="font-display mb-16 text-center text-4xl font-bold" in:fade={{ duration: 600 }}>
					Why Concepts First?
				</h2>
				<div class="grid gap-8 md:grid-cols-2">
					{#each features as feature, i}
						<div
							in:fly={{ y: 50, duration: 600, delay: 100 * i }}
							class="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
						>
							<div class="mb-6">
								<svelte:component this={feature.icon} class="h-12 w-12 text-purple-400" />
							</div>
							<h3
								class="mb-3 text-2xl font-semibold text-white/90 transition-colors group-hover:text-purple-400"
							>
								{feature.title}
							</h3>
							<p class="text-lg leading-relaxed text-white/70">
								{feature.description}
							</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Highlights Bar -->
	<section class="px-4 py-12">
		<div class="mx-auto max-w-6xl">
			{#if mounted}
				<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
					{#each highlights as highlight, i}
						<div in:scale={{ duration: 500, delay: 100 * i }} class="space-y-2 text-center">
							<div class="mb-3 flex justify-center">
								<svelte:component this={highlight.icon} class="h-8 w-8 text-purple-400" />
							</div>
							<div class="font-semibold text-white/90">{highlight.text}</div>
							<div class="text-sm text-white/60">{highlight.detail}</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- How It Works Section -->
	<section class="px-4 py-20">
		<div class="mx-auto max-w-6xl">
			{#if mounted}
				<h2 class="font-display mb-16 text-center text-4xl font-bold" in:fade={{ duration: 600 }}>
					How It Works
				</h2>
				<div class="grid gap-8 md:grid-cols-3">
					<div
						in:fly={{ y: 50, duration: 600, delay: 0 }}
						class="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-md text-center transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
					>
						<div class="mb-6 flex justify-center">
							<div class="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
								<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
								</svg>
							</div>
						</div>
						<h3 class="mb-3 text-xl font-semibold text-white/90">100% Online</h3>
						<p class="text-white/70">
							Learn from anywhere with live interactive sessions via Google Meet or Zoom
						</p>
					</div>
					
					<div
						in:fly={{ y: 50, duration: 600, delay: 100 }}
						class="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-md text-center transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
					>
						<div class="mb-6 flex justify-center">
							<div class="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-4">
								<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 8h6m-6 4h6m4-8V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2z"></path>
								</svg>
							</div>
						</div>
						<h3 class="mb-3 text-xl font-semibold text-white/90">3 Days a Week</h3>
						<p class="text-white/70">
							Live coding sessions every Monday, Wednesday, and Friday for hands-on learning
						</p>
					</div>
					
					<div
						in:fly={{ y: 50, duration: 600, delay: 200 }}
						class="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-md text-center transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
					>
						<div class="mb-6 flex justify-center">
							<div class="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
								<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
								</svg>
							</div>
						</div>
						<h3 class="mb-3 text-xl font-semibold text-white/90">Interactive Learning</h3>
						<p class="text-white/70">
							Small group sessions with direct instructor feedback and peer collaboration
						</p>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Who's Teaching Section -->
	<section class="px-4 py-20">
		<div class="mx-auto max-w-6xl">
			{#if mounted}
				<h2 class="font-display mb-16 text-center text-4xl font-bold" in:fade={{ duration: 600 }}>
					Who's Teaching
				</h2>
				<div class="mx-auto max-w-4xl">
					<div
						in:fly={{ y: 50, duration: 600 }}
						class="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-md"
					>
						<div class="flex flex-col items-center gap-8 md:flex-row md:items-start">
							<!-- Profile Image Placeholder -->
							<div class="flex-shrink-0">
								<div class="h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">
									<div class="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
										<span class="text-4xl font-bold text-white">FA</span>
									</div>
								</div>
							</div>
							
							<!-- Bio Content -->
							<div class="flex-1 text-center md:text-left">
								<h3 class="mb-3 text-3xl font-bold text-white">Farhan Ali</h3>
								<p class="mb-4 text-xl text-purple-400">Full Stack Developer & Google Summer of Code Contributor</p>
								<p class="mb-6 text-white/80 leading-relaxed">
									A results-oriented Full Stack Developer with over 5 years of experience building scalable web applications and AI systems. Currently contributing to Django core as a Google Summer of Code 2025 participant. Created MedGebra (AI medical chatbot) and Bulk Mail Verifier (processed 100+ million emails).
								</p>
								
								<!-- Key Achievements -->
								<div class="grid gap-4 md:grid-cols-2">
									<div class="flex items-center gap-3">
										<div class="h-2 w-2 rounded-full bg-purple-400"></div>
										<span class="text-white/70">Google Summer of Code 2025</span>
									</div>
									<div class="flex items-center gap-3">
										<div class="h-2 w-2 rounded-full bg-purple-400"></div>
										<span class="text-white/70">Django Core Contributor</span>
									</div>
									<div class="flex items-center gap-3">
										<div class="h-2 w-2 rounded-full bg-purple-400"></div>
										<span class="text-white/70">50+ Successful Projects</span>
									</div>
									<div class="flex items-center gap-3">
										<div class="h-2 w-2 rounded-full bg-purple-400"></div>
										<span class="text-white/70">5-Star Fiverr Rating</span>
									</div>
								</div>
								
								<!-- Contact Links -->
								<div class="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
									<a
										href="https://github.com/FarhanAliRaza"
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/80 transition-colors hover:border-purple-400 hover:text-purple-400"
									>
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
										</svg>
										GitHub
									</a>
									<a
										href="https://linkedin.com/in/farhanaliraza"
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/80 transition-colors hover:border-purple-400 hover:text-purple-400"
									>
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
										</svg>
										LinkedIn
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Curriculum Timeline -->
	<section class="px-4 py-20">
		<div class="mx-auto max-w-6xl">
			{#if mounted}
				<h2 class="font-display mb-16 text-center text-4xl font-bold" in:fade={{ duration: 600 }}>
					12-Week Journey
				</h2>
				<div class="space-y-6">
					{#each curriculum as module, i}
						<div
							in:fly={{ x: i % 2 === 0 ? -50 : 50, duration: 600, delay: 100 * i }}
							class="group relative"
						>
							<div class="flex items-start gap-6">
								<!-- Timeline indicator -->
								<div class="hidden flex-col items-center md:flex">
									<div
										class="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50 transition-transform duration-300 group-hover:scale-150"
									></div>
									<div
										class="h-32 w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent"
									></div>
								</div>

								<!-- Content card -->
								<div
									class="flex-1 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 group-hover:translate-x-2"
								>
									<div class="mb-4 flex flex-col justify-between md:flex-row md:items-center">
										<h3 class="text-2xl font-semibold text-white/90">{module.title}</h3>
										<span class="font-medium text-purple-400">{module.week}</span>
									</div>
									<div class="flex flex-wrap gap-3">
										{#each module.topics as topic}
											<span
												class="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-white/80"
											>
												{topic}
											</span>
										{/each}
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Final CTA -->
	<section class="px-4 py-20">
		<div class="mx-auto max-w-4xl text-center">
			{#if mounted}
				<div
					in:fade={{ duration: 800 }}
					class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.1] to-white/[0.03] p-12 shadow-2xl shadow-purple-500/20 backdrop-blur-xl"
				>
					<!-- Animated background pattern -->
					<div class="absolute inset-0 opacity-20">
						<div
							class="absolute -left-10 top-0 h-60 w-60 animate-pulse rounded-full bg-purple-600/40 blur-3xl"
						></div>
						<div
							class="absolute -right-10 bottom-0 h-60 w-60 animate-pulse rounded-full bg-blue-600/40 blur-3xl delay-1000"
						></div>
					</div>

					<div class="relative space-y-6">
						<h2 class="font-display text-4xl font-bold">Ready to Think Like a Developer?</h2>
						<p class="mx-auto max-w-2xl text-xl text-white/80">
							Limited seats available for this free bootcamp. Learn the foundational concepts that
							will make every programming language and framework easier to understand.
						</p>
						<div class="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
							<a
								href="https://discord.gg/3qWkg8zFr9"
								target="_blank"
								rel="noopener noreferrer"
								class="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30"
							>
								<MessageCircle class="h-5 w-5" />
								Join Discord Community
							</a>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</section>
</div>

<style>
	@keyframes gradient {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	.animate-gradient {
		background-size: 200% 200%;
		animation: gradient 3s ease infinite;
	}

	.delay-1000 {
		animation-delay: 1s;
	}

	.delay-500 {
		animation-delay: 0.5s;
	}
</style>
