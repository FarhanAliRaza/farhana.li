<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowLeft, Printer } from 'lucide-svelte';
	import '../../app.css';
	import '$lib/bento.css';
	import './resume-screen.css';
	let { children }: { children: Snippet } = $props();
</script>

<div class="resume-font">
	<nav class="resume-toolbar" aria-label="Resume navigation">
		<a class="bento-button" href="/"><ArrowLeft size={16} /> Back to portfolio</a><button
			class="bento-button"
			onclick={() => window.print()}><Printer size={16} /> Print resume</button
		>
	</nav>
	{@render children()}
</div>

<style>
	.resume-font {
		--resume-font-sans: var(--font-sans, sans-serif);
		--resume-font-mono: var(--font-mono, monospace);
		font-family: var(--resume-font-sans);
	}
	.resume-toolbar {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		max-width: 1200px;
		margin-inline: auto;
		padding: 28px var(--bento-gutter) 0;
	}
	@media screen {
		.resume-font {
			background: #08070c;
			color: #f5f1fa;
			min-height: 100vh;
		}
	}
	@media print {
		.resume-toolbar {
			display: none;
		}
		:global(body) {
			background: white;
			color: #111;
			font-size: 11pt;
			line-height: 1.4;
		}
		.resume-font :global(*) {
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
		}
	}
</style>
