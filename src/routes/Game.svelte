<script lang="ts">
	import Found from './Found.svelte';
	import Square from './Square.svelte';
	import Countdown from './Countdown.svelte';
	import { shuffle } from './utils.js';
	import { createEventDispatcher } from 'svelte';
	import type { Level } from './levels';

	export let playing: boolean;

	const dispatch = createEventDispatcher();

	let size: number;
	let grid: string[] = [];
	let found: string[] = [];
	let a: number;
	let b: number;
	let duration: number;
	let remaining: number;
	let reset_timeout: number;

	export function reset(level: Level) {
		size = level.size;
		found = [];
		a = b = -1;
		remaining = duration = 60 * 1000;
		playing = true;

		const sliced = level.emojis.slice();
		const pairs: string[] = [];

		// pick a set of emojis at random
		for (let i = 0; i < (size * size) / 2; i += 1) {
			const index = Math.floor(Math.random() * sliced.length);
			const emoji = sliced[index];
			sliced.splice(index, 1);
			pairs.push(emoji);
		}

		// repeat the set
		grid = shuffle([...pairs, ...pairs]);
	}

	$: if (playing) {
		countdown();
	}

	function countdown() {
		const start = Date.now();
		const remaining_at_start = remaining;

		function loop() {
			if (!playing) return;

			requestAnimationFrame(loop);

			remaining = remaining_at_start - (Date.now() - start);

			if (remaining <= 0) {
				dispatch('lose');
			}
		}

		loop();
	}

	function get_square_color(i: number, size: number) {
		const row = Math.floor(i / size);
		const col = i % size;

		const r = (255 * (0.5 + col)) / size;
		const g = (255 * (0.5 + row)) / size;
		const b = 128;

		return `rgb(${r},${g},${b})`;
	}
</script>

<div class="game" style="--size: {size}">
	<div class="info">
		{#if playing}
			<Countdown
				{remaining}
				{duration}
				on:click={() => {
					dispatch('pause');
				}}
			/>
		{/if}
	</div>

	<div class="grid">
		{#each grid as square, i}
			<Square
				on:click={() => {
					if (a > -1 && b > -1) {
						clearTimeout(reset_timeout);
						a = i;
						b = -1;
					} else if (a > -1) {
						b = i;

						if (grid[a] === grid[b]) {
							// correct — remove from grid
							found = [...found, grid[a]];

							if (found.length === (size * size) / 2) {
								dispatch('win');
							}
						} else {
							// incorrect — reset after timeout
							reset_timeout = setTimeout(() => {
								a = b = -1;
							}, 1000);
						}
					} else {
						a = i;
					}
				}}
				value={square}
				selected={a === i || b === i}
				found={found.includes(square)}
				group={i === grid.indexOf(square) ? 'a' : 'b'}
				--bg={get_square_color(i, size)}
			/>
		{/each}
	</div>

	<div class="info">
		<Found {found} />
	</div>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: min(1vmin, 0.5em);
		gap: 2em;
		height: 100%;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		grid-gap: 1em;
		width: 80em;
		aspect-ratio: 1;
		perspective: 100vw;
		z-index: 2;
	}

	.info {
		display: flex;
		flex-direction: column;
		width: 80em;
		height: 10em;
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
