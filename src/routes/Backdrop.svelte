<script>
	// No script needed
</script>

<div class="backdrop visible">
	<div
		class="blobs"
		style="
        --color-light-1: var(--cl-1);
        --color-light-2: var(--cl-3);
        --color-light-3: var(--cl-4);
        --color-light-4: var(--cl-4);
        --color-dark-1: var(--cd-1);
        --color-dark-2: var(--cd-3);
        --color-dark-3: var(--cd-4);
        --color-dark-4: var(--cd-4);"
	></div>
</div>

<style>
	.backdrop {
		bottom: auto;
		height: 70vh;
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		transition: opacity 1.5s linear;
		z-index: -1;
		font-family: var(--font-sans);
		color: var(--color-text);
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;

		/* Gradient variables */
		--cl-1: rgba(255, 232, 145, 0.412);
		--cl-2: rgba(255, 134, 177, 0.278);
		--cl-3: rgba(135, 195, 255, 0.341);
		--cl-4: rgba(100, 178, 255, 0.369);
		--cd-1: rgba(169, 132, 0, 0.251);
		--cd-2: rgba(117, 0, 54, 0.671);
		--cd-3: rgba(0, 58, 96, 0.62);
		--cd-4: rgba(0, 64, 155, 0.439);
	}

	@supports (height: 1lvh) {
		.backdrop {
			height: 70lvh;
		}
	}

	.backdrop.visible {
		opacity: 1;
	}

	.blobs {
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
	}

	.blobs:before,
	.blobs:after {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(20% 80% ellipse at 0 0, var(--color-bg-1) 0, transparent 100%),
			radial-gradient(
				40% 50% ellipse at 16% -25%,
				var(--color-bg-2) 0,
				var(--color-bg-2) 50%,
				transparent 100%
			),
			radial-gradient(
				70% 50% ellipse at 70% -25%,
				var(--color-bg-3) 0,
				var(--color-bg-3) 50%,
				transparent 100%
			),
			radial-gradient(
				35% 100% ellipse at 110% -10%,
				var(--color-bg-4) 0,
				var(--color-bg-4) 50%,
				transparent 100%
			);
	}

	.blobs:before {
		display: block;
		--color-bg-1: var(--color-light-1);
		--color-bg-2: var(--color-light-2);
		--color-bg-3: var(--color-light-3);
		--color-bg-4: var(--color-light-4);
	}

	.blobs:after {
		display: none;
		--color-bg-1: var(--color-dark-1);
		--color-bg-2: var(--color-dark-2);
		--color-bg-3: var(--color-dark-3);
		--color-bg-4: var(--color-dark-4);
	}

	:global(html.dark) .blobs:before {
		display: none;
	}

	:global(html.dark) .blobs:after {
		display: block;
	}
</style>
