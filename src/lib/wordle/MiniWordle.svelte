<script lang="ts">
	import { onMount } from 'svelte';
	import { getRandomWord } from './words';

	interface GameState {
		word: string;
		hint: string;
		guesses: string[];
		currentRow: number;
		currentGuess: string;
		gameStatus: 'playing' | 'won' | 'lost';
	}

	interface TileState {
		letter: string;
		state: 'correct' | 'present' | 'absent' | 'empty';
	}

	const { onWin, onLose }: { onWin: () => void; onLose: () => void } = $props();

	let gameState = $state<GameState>({
		word: '',
		hint: '',
		guesses: [],
		currentRow: 0,
		currentGuess: '',
		gameStatus: 'playing'
	});

	let keyboardState = $state<Record<string, 'correct' | 'present' | 'absent' | 'unused'>>({});

	const MAX_GUESSES = 3;

	onMount(() => {
		const { word, hint } = getRandomWord();
		gameState.word = word.toUpperCase();
		gameState.hint = hint;

		// Initialize keyboard state
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		for (const letter of letters) {
			keyboardState[letter] = 'unused';
		}

		// Add keyboard event listener
		const handleKeyDown = (e: KeyboardEvent) => {
			if (gameState.gameStatus !== 'playing') return;

			if (e.key === 'Enter') {
				submitGuess();
			} else if (e.key === 'Backspace') {
				gameState.currentGuess = gameState.currentGuess.slice(0, -1);
			} else if (/^[a-zA-Z]$/.test(e.key)) {
				if (gameState.currentGuess.length < gameState.word.length) {
					gameState.currentGuess = (gameState.currentGuess + e.key.toUpperCase()).slice(
						0,
						gameState.word.length
					);
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});

	function submitGuess() {
		if (gameState.currentGuess.length !== gameState.word.length) return;
		if (gameState.gameStatus !== 'playing') return;

		gameState.guesses.push(gameState.currentGuess);
		updateKeyboardState(gameState.currentGuess);

		if (gameState.currentGuess === gameState.word) {
			gameState.gameStatus = 'won';
			setTimeout(() => onWin(), 1000);
		} else if (gameState.guesses.length >= MAX_GUESSES) {
			gameState.gameStatus = 'lost';
			setTimeout(() => onLose(), 1500);
		} else {
			gameState.currentRow++;
		}

		gameState.currentGuess = '';
	}

	function updateKeyboardState(guess: string) {
		for (let i = 0; i < guess.length; i++) {
			const letter = guess[i];
			const currentState = keyboardState[letter];

			if (letter === gameState.word[i]) {
				keyboardState[letter] = 'correct';
			} else if (gameState.word.includes(letter)) {
				if (currentState !== 'correct') {
					keyboardState[letter] = 'present';
				}
			} else {
				if (currentState === 'unused') {
					keyboardState[letter] = 'absent';
				}
			}
		}
	}

	function getTileState(rowIndex: number, colIndex: number): TileState {
		if (rowIndex < gameState.guesses.length) {
			const guess = gameState.guesses[rowIndex];
			const letter = guess[colIndex];

			if (letter === gameState.word[colIndex]) {
				return { letter, state: 'correct' };
			} else if (gameState.word.includes(letter)) {
				return { letter, state: 'present' };
			} else {
				return { letter, state: 'absent' };
			}
		} else if (rowIndex === gameState.currentRow) {
			const letter = gameState.currentGuess[colIndex] || '';
			return { letter, state: 'empty' };
		}

		return { letter: '', state: 'empty' };
	}

	function handleKeyClick(key: string) {
		if (gameState.gameStatus !== 'playing') return;

		if (key === '←') {
			gameState.currentGuess = gameState.currentGuess.slice(0, -1);
		} else if (key === '↵') {
			submitGuess();
		} else if (gameState.currentGuess.length < gameState.word.length) {
			gameState.currentGuess = (gameState.currentGuess + key).slice(0, gameState.word.length);
		}
	}

	const keyboardRows = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['←', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '↵']
	];
</script>

<div class="mini-wordle">
	<div class="hint">
		<span class="hint-label">Hint:</span>
		<span class="hint-text">{gameState.hint}</span>
	</div>

	<div class="board">
		{#each Array(MAX_GUESSES) as _, rowIndex}
			<div class="row">
				{#each Array(gameState.word.length || 4) as _, colIndex}
					{@const tile = getTileState(rowIndex, colIndex)}
					<div class="tile tile-{tile.state}" data-state={tile.state}>
						{tile.letter}
					</div>
				{/each}
			</div>
		{/each}
	</div>

	{#if gameState.gameStatus === 'won'}
		<div class="message success">Correct! Unlocking resume...</div>
	{:else if gameState.gameStatus === 'lost'}
		<div class="message error">
			Out of guesses! The word was <strong>{gameState.word}</strong>. Showing easier puzzle...
		</div>
	{:else}
		<div class="attempts">
			Attempts: {gameState.guesses.length} / {MAX_GUESSES}
		</div>
	{/if}

	<div class="keyboard">
		{#each keyboardRows as row}
			<div class="keyboard-row">
				{#each row as key}
					<button
						class="key key-{keyboardState[key] || 'unused'}"
						class:key-wide={key === '↵' || key === '←'}
						onclick={() => handleKeyClick(key)}
						disabled={gameState.gameStatus !== 'playing'}
					>
						{key}
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.mini-wordle {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem;
		max-width: 500px;
		width: 100%;
	}

	.hint {
		text-align: center;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 0.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.hint-label {
		display: block;
		font-size: 0.875rem;
		font-weight: 600;
		color: #666;
		margin-bottom: 0.5rem;
	}

	.hint-text {
		display: block;
		font-size: 1.125rem;
		font-weight: 500;
		color: #333;
	}

	.board {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.row {
		display: flex;
		gap: 0.5rem;
	}

	.tile {
		width: 62px;
		height: 62px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: 700;
		border: 2px solid #d3d6da;
		border-radius: 0.25rem;
		background: white;
		color: black;
		text-transform: uppercase;
		transition: all 0.3s ease;
	}

	.tile-empty {
		border-color: #d3d6da;
	}

	.tile-absent {
		background: #787c7e;
		border-color: #787c7e;
		color: white;
	}

	.tile-present {
		background: #c9b458;
		border-color: #c9b458;
		color: white;
	}

	.tile-correct {
		background: #6aaa64;
		border-color: #6aaa64;
		color: white;
	}

	.message {
		padding: 1rem;
		border-radius: 0.5rem;
		text-align: center;
		font-weight: 600;
		animation: slideIn 0.3s ease;
	}

	.message.success {
		background: #6aaa64;
		color: white;
	}

	.message.error {
		background: #787c7e;
		color: white;
	}

	.attempts {
		font-size: 0.875rem;
		color: #666;
		font-weight: 500;
	}

	.keyboard {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		max-width: 500px;
	}

	.keyboard-row {
		display: flex;
		justify-content: center;
		gap: 0.375rem;
	}

	.key {
		min-width: 43px;
		height: 58px;
		padding: 0 0.5rem;
		font-size: 0.875rem;
		font-weight: 700;
		border: none;
		border-radius: 0.25rem;
		background: #d3d6da;
		color: black;
		cursor: pointer;
		text-transform: uppercase;
		transition: all 0.1s ease;
	}

	.key:hover:not(:disabled) {
		background: #b8bbbe;
	}

	.key:active:not(:disabled) {
		transform: scale(0.95);
	}

	.key:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.key-wide {
		min-width: 65px;
	}

	.key-correct {
		background: #6aaa64;
		color: white;
	}

	.key-present {
		background: #c9b458;
		color: white;
	}

	.key-absent {
		background: #787c7e;
		color: white;
	}

	.key-unused {
		background: #d3d6da;
		color: black;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 640px) {
		.tile {
			width: 52px;
			height: 52px;
			font-size: 1.5rem;
		}

		.key {
			min-width: 32px;
			height: 48px;
			font-size: 0.75rem;
			padding: 0 0.25rem;
		}

		.key-wide {
			min-width: 50px;
		}

		.hint-text {
			font-size: 1rem;
		}
	}
</style>
