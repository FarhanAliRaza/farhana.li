<script lang="ts">
	import { Mail, Check } from 'lucide-svelte';

	const email = 'farhanalirazaazeemi@gmail.com';

	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
		} catch {
			window.location.href = `mailto:${email}`;
			return;
		}
		copied = true;
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => (copied = false), 2000);
	}
</script>

<button type="button" class="button" class:copied onclick={copyEmail} aria-live="polite">
	{#if copied}
		<Check size={16} aria-hidden="true" /> Copied
	{:else}
		<Mail size={16} aria-hidden="true" /> Copy email
	{/if}
</button>

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
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
	.button.copied {
		border-color: rgba(61, 220, 132, 0.5);
		color: #9df0bd;
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
