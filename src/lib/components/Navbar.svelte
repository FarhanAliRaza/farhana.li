<script lang="ts">
	import { onMount } from 'svelte';

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Logs', href: '/logs' },
		{ label: 'About', href: '/about' }
	];

	const socialLinks = [
		{
			icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
			href: 'https://github.com/username',
			label: 'GitHub'
		},
		{
			icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',
			href: 'https://linkedin.com/in/username',
			label: 'LinkedIn'
		},
		{
			icon: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>',
			href: 'https://twitter.com/username',
			label: 'Twitter'
		}
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
		: ''} transition-colors duration-300 md:w-auto w-[90%] max-w-none"
>
	<div class="flex items-center justify-between px-6 py-3 w-full">
		<!-- Logo and Title -->
		<div>
			<a
				href="/"
				class="text-base font-medium text-white/90 transition-colors hover:text-[var(--color-brand)]"
			>
				<span class="text-[var(--color-brand)]">Farhan</span>
			</a>
		</div>

		<!-- Main Navigation (Desktop) -->
		<ul class="hidden md:flex gap-8 ml-8">
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

		<!-- Social Icons (Desktop) -->
		<div class="hidden md:flex items-center gap-4 ml-8">
			{#each socialLinks as link}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="text-white/70 transition-colors hover:text-[var(--color-brand)]"
					aria-label={link.label}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						{@html link.icon}
					</svg>
				</a>
			{/each}
		</div>

		<!-- Mobile Icons & Menu -->
		<div class="flex md:hidden items-center gap-4">
			{#each socialLinks as link, i}
				{#if i < 2}
					<!-- Only show first two icons on mobile navbar -->
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="text-white/70 transition-colors hover:text-[var(--color-brand)]"
						aria-label={link.label}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							{@html link.icon}
						</svg>
					</a>
				{/if}
			{/each}

			<!-- Mobile Menu Button -->
			<button
				class="block md:hidden text-white focus:outline-none"
				aria-label="Menu"
				on:click={toggleMobileMenu}
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
	<div class="fixed inset-x-0 top-0 z-40 flex justify-center">
		<div
			class="mt-16 w-[90%] max-w-sm rounded-xl border border-white/10 bg-[rgba(13,18,30,0.8)] px-6 py-6 backdrop-blur-md md:hidden"
		>
			<!-- Header with title and close button -->
			<div class="mb-6 flex items-center justify-between">
				<span class="text-lg font-medium text-[var(--color-brand)]">Farhan</span>
				<button
					class="text-white/70 focus:outline-none"
					aria-label="Close menu"
					on:click={toggleMobileMenu}
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
							on:click={toggleMobileMenu}
							class="block py-2 text-lg font-medium text-white/90 transition-colors hover:text-[var(--color-brand)]"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Social icons - more visible -->
			<div class="border-t border-white/10 pt-6">
				<div class="flex justify-center gap-6">
					{#each socialLinks as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-full bg-white/10 p-3 text-white/80 transition-all hover:bg-[var(--color-brand)]/20 hover:text-[var(--color-brand)]"
							aria-label={link.label}
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
								{@html link.icon}
							</svg>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
