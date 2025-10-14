<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lato:wght@400;700&display=swap"
	/>
</svelte:head>

<div class="resume-font">
	<slot />
</div>

<style>
	.resume-font {
		--resume-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		--resume-font-mono:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		font-family: var(--resume-font-sans);
		font-feature-settings:
			'liga' 1,
			'kern' 1;
	}

	:global(body) {
		font-family: var(--resume-font-sans);
	}

	:global(.font-sans) {
		font-family: var(--resume-font-sans);
	}

	:global(.font-mono) {
		font-family: var(--resume-font-mono);
	}

	:global(.font-display) {
		font-family: var(--resume-font-sans);
	}

	/* Print-specific styles */
	@media print {
		:global(body) {
			font-size: 11pt;
			line-height: 1.4;
		}

		:global(*) {
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
		}
	}
</style>
