<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import MiniWordle from './MiniWordle.svelte';
	import { initWordBank } from './words';

	interface WordleOverlayProps {
		children: Snippet;
		skip?: boolean;
	}

	let { children, skip = false }: WordleOverlayProps = $props();

	let revealed = $state(false);
	let currentAttempt = $state(0);
	let key = $state(0); // Force remount of MiniWordle

	const UNLOCK_KEY = '_resume_unlocked';
	const SKIP_KEY = '_wordle_skip';
	const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

	onMount(() => {
		initWordBank();

		// Check if skip flag is set (either from prop or localStorage)
		const skipFromStorage = localStorage.getItem(SKIP_KEY) === 'true';
		if (skip || skipFromStorage) {
			revealed = true;
			return;
		}

		// Check if already unlocked in this session
		const unlockData = sessionStorage.getItem(UNLOCK_KEY);
		if (unlockData) {
			try {
				const { timestamp } = JSON.parse(unlockData);
				const elapsed = Date.now() - timestamp;
				if (elapsed < SESSION_DURATION) {
					revealed = true;
					return;
				}
			} catch {
				// Invalid data, continue to show challenge
			}
		}
	});

	function handleWin() {
		revealed = true;
		// Store unlock status in sessionStorage
		sessionStorage.setItem(
			UNLOCK_KEY,
			JSON.stringify({
				timestamp: Date.now()
			})
		);
	}

	function handleLose() {
		currentAttempt++;
		// Reset with new word after a delay
		setTimeout(() => {
			key++;
		}, 1500);
	}
</script>

{#if revealed}
	{@render children()}
{:else}
	<div class="overlay">
		<div class="blur-bg"></div>
		<div class="content">
			<div class="header">
				<h1 class="title">Solve the Puzzle to View Resume</h1>
				<p class="subtitle">A quick word game to verify you're human</p>
			</div>

			{#key key}
				<MiniWordle onWin={handleWin} onLose={handleLose} />
			{/key}

			<div class="footer">
				<p class="help-text">Type your guess using your keyboard or the on-screen buttons</p>
				<p class="attempts-text">Puzzle #{currentAttempt + 1}</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);
		animation: fadeIn 0.3s ease;
	}

	.blur-bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(106, 170, 100, 0.1), rgba(201, 180, 88, 0.1));
	}

	.content {
		position: relative;
		background: white;
		border-radius: 1rem;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
		padding: 2rem;
		max-width: 600px;
		width: 90%;
		max-height: 90vh;
		overflow-y: auto;
		animation: slideUp 0.4s ease;
	}

	.header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.title {
		font-size: 1.75rem;
		font-weight: 700;
		color: #1a1a1a;
		margin: 0 0 0.5rem 0;
	}

	.subtitle {
		font-size: 1rem;
		color: #666;
		margin: 0;
	}

	.footer {
		margin-top: 2rem;
		text-align: center;
	}

	.help-text {
		font-size: 0.875rem;
		color: #666;
		margin: 0 0 0.5rem 0;
	}

	.attempts-text {
		font-size: 0.875rem;
		color: #999;
		font-weight: 600;
		margin: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 640px) {
		.content {
			padding: 1.5rem;
			width: 95%;
			border-radius: 0.75rem;
		}

		.title {
			font-size: 1.5rem;
		}

		.subtitle {
			font-size: 0.875rem;
		}
	}

	/* Custom scrollbar for content */
	.content::-webkit-scrollbar {
		width: 8px;
	}

	.content::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 4px;
	}

	.content::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 4px;
	}

	.content::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
