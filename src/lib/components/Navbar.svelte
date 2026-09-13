<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { ArrowUpRight, BookOpen, Code2, UserRound } from 'lucide-svelte';

	const navItems = [
		{ label: 'Projects', href: '/projects', description: 'Things I’ve built', icon: Code2 },
		{ label: 'Blog', href: '/blog', description: 'From the workbench', icon: BookOpen },
		{ label: 'About', href: '/about', description: 'A little about me', icon: UserRound }
	];

	let mobileMenuOpen = $state(false);
	let headerBg = $state(false);
	let menuButton: HTMLButtonElement;
	let navbar: HTMLElement;

	function closeMenu(restoreFocus = false) {
		mobileMenuOpen = false;
		if (restoreFocus) menuButton?.focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (mobileMenuOpen && event.key === 'Escape') {
			event.preventDefault();
			closeMenu(true);
		}
	}

	function handleFocusOut(event: FocusEvent) {
		if (mobileMenuOpen && !navbar?.contains(event.relatedTarget as Node | null)) closeMenu();
	}

	beforeNavigate(() => closeMenu());
	afterNavigate(() => closeMenu());

	$effect(() => {
		if (!mobileMenuOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});

	onMount(() => {
		const desktop = window.matchMedia('(min-width: 768px)');
		const handleResize = () => {
			if (desktop.matches) closeMenu();
		};
		const handleScroll = () => (headerBg = window.scrollY > 20);
		window.addEventListener('scroll', handleScroll, { passive: true });
		desktop.addEventListener('change', handleResize);
		handleScroll();
		return () => {
			window.removeEventListener('scroll', handleScroll);
			desktop.removeEventListener('change', handleResize);
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<button
	type="button"
	class="menu-backdrop"
	class:visible={mobileMenuOpen}
	tabindex="-1"
	aria-label="Close navigation"
	aria-hidden={!mobileMenuOpen}
	inert={!mobileMenuOpen}
	onclick={() => closeMenu(true)}
></button>

<nav
	bind:this={navbar}
	class="navbar"
	class:scrolled={headerBg}
	class:menu-open={mobileMenuOpen}
	aria-label="Main navigation"
	onfocusout={handleFocusOut}
>
	<div class="nav-bar">
		<a href="/" class="brand">Farhan</a>

		<ul class="desktop-links">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						aria-current={$page.url.pathname.startsWith(item.href) ? 'page' : undefined}
						>{item.label}</a
					>
				</li>
			{/each}
		</ul>

		<button
			bind:this={menuButton}
			type="button"
			class="menu-toggle"
			aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileMenuOpen}
			aria-controls="mobile-navigation"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
		>
			<span class="menu-icon" aria-hidden="true"><span></span><span></span></span>
		</button>
	</div>

	<div
		id="mobile-navigation"
		class="mobile-menu"
		inert={!mobileMenuOpen}
		aria-hidden={!mobileMenuOpen}
	>
		<div class="menu-scroll">
			<p class="menu-eyebrow">Explore the workbench</p>
			<ul class="menu-grid">
				{#each navItems as item, index}
					<li class="menu-item" style:--index={index}>
						<a
							class="menu-card"
							href={item.href}
							aria-current={$page.url.pathname.startsWith(item.href) ? 'page' : undefined}
						>
							<span class="card-top">
								<span class="card-icon"
									><item.icon size={20} strokeWidth={1.5} aria-hidden="true" /></span
								>
								<ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
							</span>
							<span class="card-copy"
								><span class="card-title">{item.label}</span><span class="card-description"
									>{item.description}</span
								></span
							>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 16px;
		left: 50%;
		z-index: 50;
		width: auto;
		transform: translateX(-50%);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		transition:
			background 250ms,
			border-color 250ms;
	}
	.navbar.scrolled {
		background: rgba(0, 0, 0, 0.5);
	}
	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 24px;
	}
	.brand {
		color: var(--bento-accent);
		font-size: 18px;
		font-weight: 500;
	}
	.desktop-links {
		display: flex;
		gap: 32px;
		margin-left: 32px;
	}
	.desktop-links a {
		color: rgba(255, 255, 255, 0.9);
		font-size: 14px;
		font-weight: 500;
		transition: color 180ms;
	}
	.desktop-links a:hover,
	.desktop-links a[aria-current] {
		color: var(--bento-accent);
	}
	a:focus-visible,
	button:focus-visible {
		outline: 2px solid var(--bento-accent);
		outline-offset: 4px;
	}
	.menu-toggle,
	.mobile-menu,
	.menu-backdrop {
		display: none;
	}

	@media (max-width: 767px) {
		.navbar {
			width: calc(100% - var(--bento-gutter) * 2);
		}
		.navbar.menu-open {
			background: #100d18;
			border-color: rgba(235, 168, 255, 0.25);
		}
		.nav-bar {
			min-height: 62px;
			padding: 8px 10px 8px 22px;
		}
		.desktop-links {
			display: none;
		}
		.menu-toggle {
			display: grid;
			place-items: center;
			width: 44px;
			height: 44px;
			border: 1px solid var(--bento-border);
			border-radius: 50%;
			background: #21182e;
			color: var(--bento-accent);
			cursor: pointer;
			transition:
				background 180ms,
				scale 500ms var(--bento-spring);
		}
		.menu-toggle:active {
			scale: 0.92;
		}
		.menu-icon {
			position: relative;
			width: 18px;
			height: 18px;
		}
		.menu-icon span {
			position: absolute;
			top: 8px;
			left: 0;
			width: 18px;
			height: 1.5px;
			border-radius: 2px;
			background: currentColor;
			transform: translateY(-3px);
			transition: transform 500ms var(--bento-spring);
		}
		.menu-icon span:last-child {
			transform: translateY(3px);
		}
		.menu-open .menu-icon span:first-child {
			transform: rotate(45deg);
		}
		.menu-open .menu-icon span:last-child {
			transform: rotate(-45deg);
		}
		.menu-backdrop {
			display: block;
			position: fixed;
			inset: 0;
			z-index: 40;
			background: rgba(5, 3, 10, 0.72);
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
			opacity: 0;
			visibility: hidden;
			transition:
				opacity 250ms,
				visibility 250ms;
		}
		.menu-backdrop.visible {
			opacity: 1;
			visibility: visible;
		}
		.mobile-menu {
			display: block;
			position: absolute;
			top: calc(100% + 12px);
			inset-inline: -1px;
			visibility: hidden;
			pointer-events: none;
			transition: visibility 260ms;
		}
		.menu-open .mobile-menu {
			visibility: visible;
			pointer-events: auto;
		}
		.menu-scroll {
			max-height: calc(100dvh - 108px - env(safe-area-inset-bottom));
			overflow-y: auto;
			overscroll-behavior: contain;
			padding: 4px;
			margin: -4px;
		}
		.menu-eyebrow {
			margin: 8px 12px 14px;
			color: var(--bento-muted);
			font-family: var(--font-mono);
			font-size: 10px;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			opacity: 0;
			transform: translateY(-6px);
			transition:
				opacity 180ms,
				transform 300ms;
		}
		.menu-open .menu-eyebrow {
			opacity: 1;
			transform: none;
			transition-delay: 70ms;
		}
		.menu-grid {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 12px;
		}
		.menu-item {
			min-width: 0;
			opacity: 0;
			transform: translateY(-18px) scale(0.94);
			transform-origin: top right;
			transition:
				opacity 160ms,
				transform 220ms ease-in;
		}
		.menu-item:first-child {
			grid-column: 1 / -1;
		}
		.menu-open .menu-item {
			opacity: 1;
			transform: none;
			transition:
				opacity 300ms ease,
				transform 680ms var(--bento-spring);
			transition-delay: calc(35ms + var(--index) * 65ms);
		}
		.menu-card {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 22px;
			min-height: 158px;
			padding: 20px;
			border: 1px solid var(--bento-border);
			border-radius: var(--bento-radius);
			background: var(--bento-surface);
			color: #f5f1fa;
			box-shadow: 0 16px 32px -20px #000;
			transition:
				scale 500ms var(--bento-spring),
				border-color 180ms,
				background 180ms;
		}
		.menu-item:first-child .menu-card {
			min-height: 148px;
			background: #0e1520;
		}
		.menu-item:last-child .menu-card {
			background: #180f23;
		}
		.card-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #cdb7df;
		}
		.card-icon {
			display: grid;
			place-items: center;
			width: 36px;
			height: 36px;
			border-radius: 50%;
			background: #2b1e39;
			color: var(--bento-accent);
		}
		.menu-item:first-child .card-icon {
			color: #a6e8ff;
			background: #1d293b;
		}
		.card-copy {
			display: flex;
			flex-direction: column;
			gap: 5px;
		}
		.card-title {
			font-family: var(--font-display);
			font-size: 26px;
			font-weight: 550;
			letter-spacing: -0.035em;
			line-height: 1.1;
		}
		.menu-item:first-child .card-title {
			font-size: 32px;
		}
		.card-description {
			color: var(--bento-muted);
			font-size: 11px;
			line-height: 1.5;
		}
		.menu-card[aria-current] {
			border-color: var(--bento-accent);
		}
		.menu-card[aria-current] .card-title {
			color: var(--bento-accent);
		}
		.menu-card:active {
			scale: 0.97;
			transition-duration: 120ms;
		}
	}
	@media (max-width: 767px) and (hover: hover) {
		.menu-card:hover {
			scale: 1.015;
			border-color: rgba(235, 168, 255, 0.4);
			background: #21182e;
		}
		.menu-toggle:hover {
			background: #352443;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.menu-backdrop,
		.mobile-menu,
		.menu-eyebrow,
		.menu-item,
		.menu-open .menu-item,
		.menu-icon span,
		.menu-card,
		.menu-toggle {
			transition: none;
		}
		.menu-item,
		.menu-eyebrow {
			transform: none;
		}
		.menu-card:hover,
		.menu-card:active,
		.menu-toggle:active {
			scale: none;
		}
	}
</style>
