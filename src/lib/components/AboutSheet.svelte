<script lang="ts">
	import { X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import AboutSection from './AboutSection.svelte';

	let { open = $bindable(false) } = $props<{ open?: boolean }>();

	let closeButton = $state<HTMLButtonElement>();
	let opener: Element | null = null;

	function close() {
		open = false;
	}

	// Render at the document root so page-level stacking contexts can't trap the sheet
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return { destroy: () => node.remove() };
	}

	$effect(() => {
		if (!open) return;
		opener = document.activeElement;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
		window.addEventListener('keydown', onKey);
		requestAnimationFrame(() => closeButton?.focus());
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKey);
			if (opener instanceof HTMLElement) opener.focus();
		};
	});
</script>

{#if open}
	<div
		class="sheet"
		role="dialog"
		aria-modal="true"
		aria-labelledby="about-heading"
		use:portal
		transition:fly={{ y: '100%', duration: 700, easing: expoOut, opacity: 1 }}
	>
		<button type="button" class="close" bind:this={closeButton} onclick={close} aria-label="Close">
			<X size={18} aria-hidden="true" />
		</button>
		<div class="scroll">
			<div class="content" in:fly={{ y: 24, duration: 500, delay: 250, easing: expoOut }}>
				<AboutSection />
			</div>
		</div>
	</div>
{/if}

<style>
	.sheet {
		position: fixed;
		inset: 0;
		z-index: 300;
		background: #0a0810;
		will-change: transform;
	}
	.scroll {
		height: 100%;
		overflow-y: auto;
		padding: 80px 20px 96px;
		scrollbar-width: none;
	}
	.scroll::-webkit-scrollbar {
		display: none;
	}
	.close {
		position: fixed;
		top: 24px;
		right: 24px;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border: 1px solid rgba(235, 168, 255, 0.2);
		border-radius: 50%;
		background: rgba(27, 21, 37, 0.85);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		color: #f5f1fa;
		cursor: pointer;
		box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.8);
		transition:
			background 150ms,
			transform 400ms cubic-bezier(0.25, 1, 0.5, 1);
	}
	.close:hover {
		background: #30203e;
		transform: scale(1.06);
	}
	.close:active {
		transform: scale(0.95);
		transition-duration: 120ms;
	}
	.close:focus-visible {
		outline: 2px solid #e9c2ff;
		outline-offset: 3px;
	}
	@media (max-width: 700px) {
		.scroll {
			padding: 72px 16px 80px;
		}
		.close {
			top: 16px;
			right: 16px;
			width: 44px;
			height: 44px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.close {
			transition: none;
		}
	}
</style>
