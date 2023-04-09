<script lang="ts">
	import Square from './Square.svelte';
	import { emojis } from './data.js';
	import { shuffle } from './utils.js';

	export let size = 4;

	function create_game() {
		const sliced = emojis.slice();
		const pairs = [];

		// pick a set of emojis at random
		for (let i = 0; i < (size * size) / 2; i += 1) {
			const index = Math.floor(Math.random() * sliced.length);
			const emoji = sliced[index];
			sliced.splice(index, 1);
			pairs.push(emoji);
		}

		// repeat the set
		const grid = shuffle([...pairs, ...pairs]);

		return {
			pairs,
			grid
		};
	}

	let game = create_game();

	let current_guess: number | null = null;
</script>

<div class="game">
	<div class="grid" style="--size: {size}">
		{#each game.grid as square}
			<Square value={square} />
		{/each}
	</div>

	<div class="info">
		<div class="pairs" />
		<div class="timer">
			<button aria-label="pause">...</button>
			00:00
		</div>
	</div>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: min(1vmin, 0.5em);
		gap: 1em;
		height: 100%;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-gap: 1em;
		width: 80em;
		aspect-ratio: 1;
	}

	.info {
		display: flex;
		flex-direction: column;
		background: #ddd;
		width: 80em;
		height: 10em;
	}

	span {
		display: flex;
		font-size: 4em;
		justify-content: center;
		align-items: center;
		background: #eee;
	}

	@media (min-aspect-ratio: 1/1) {
		.game {
			flex-direction: row-reverse;
		}

		.info {
			width: 10em;
			height: 80em;
		}
	}
</style>
