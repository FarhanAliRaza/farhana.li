<script lang="ts">
	import { onMount } from 'svelte';

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About', href: '/about' }
	];

	// State for mobile menu
	let mobileMenuOpen = $state(false);
	let headerBg = $state(false);

	// Toggle mobile menu
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	// Add scroll listener for header background
	onMount(() => {
		function handleScroll() {
			headerBg = window.scrollY > 20;
		}

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Check initial position

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav
	class="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 backdrop-blur-md {headerBg
		? 'bg-black/50'
		: ''} w-[90%] max-w-none transition-colors duration-300 md:w-auto"
>
	<div class="flex w-full items-center justify-between px-6 py-3">
		<!-- Logo and Title -->
		<div>
			<a
				href="/"
				class=" font-medium text-white/90 transition-colors hover:text-[var(--color-brand)]"
			>
				<h5 class=" text-lg text-[var(--color-brand)]">Farhan</h5>
			</a>
		</div>

		<!-- Main Navigation (Desktop) -->
		<ul class="ml-8 hidden gap-8 md:flex">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="text-sm font-medium text-white/90 transition-colors hover:text-[var(--color-brand)]"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Mobile Menu Button -->
		<div class="flex items-center md:hidden">
			<button
				class="block text-white focus:outline-none md:hidden"
				aria-label="Menu"
				onclick={toggleMobileMenu}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					{#if mobileMenuOpen}
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					{:else}
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					{/if}
				</svg>
			</button>
		</div>
	</div>
</nav>

<!-- Mobile menu -->
{#if mobileMenuOpen}
	<div
		class="fixed inset-x-0 top-0 z-40 flex justify-center"
	>
		<div
			class="mt-16 w-[90%] max-w-sm rounded-xl border border-white/10 bg-[rgba(13,18,30,0.8)] px-6 py-6 backdrop-blur-md md:hidden"
		>
			<!-- Header with title and close button -->
			<div class="mb-6 flex items-center justify-between">
				<span class="text-lg font-medium text-[var(--color-brand)]">Farhan</span>
				<button
					class="text-white/70 focus:outline-none"
					aria-label="Close menu"
					onclick={toggleMobileMenu}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
			</div>

			<!-- Navigation links -->
			<ul class="mb-8 flex flex-col space-y-4">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							onclick={toggleMobileMenu}
							class="block py-2 text-lg font-medium text-white/90 transition-colors hover:text-[var(--color-brand)]"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>

		</div>
	</div>
{/if}
