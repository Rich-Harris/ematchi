<script lang="ts">
	import Countdown from './Countdown.svelte';
	import Grid from './Grid.svelte';
	import Found from './Found.svelte';
	import { shuffle } from './utils.js';
	import { createEventDispatcher } from 'svelte';
	import type { Level } from './levels';

	export let playing: boolean;

	const dispatch = createEventDispatcher();

	let size: number;
	let grid: string[] = [];
	let found: string[] = [];
	let duration: number;
	let remaining: number;

	export function reset(level: Level) {
		size = level.size;
		remaining = duration = level.duration;

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

		found = [];
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
		<Grid
			{grid}
			{found}
			{size}
			on:found={(event) => {
				found = [...found, event.detail.emoji];

				if (found.length === (size * size) / 2) {
					dispatch('win');
				}
			}}
		/>
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
