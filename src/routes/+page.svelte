<script lang="ts">
	import Game from './Game.svelte';
	import Modal from './Modal.svelte';
	import { levels } from './levels';
	import '../styles.css';

	let state: 'waiting' | 'playing' | 'paused' | 'won' | 'lost' = 'waiting';

	let game: Game;
</script>

<main>
	<Game
		bind:this={game}
		playing={state === 'playing'}
		on:pause={() => {
			state = 'paused';
		}}
		on:win={() => {
			state = 'won';
		}}
		on:lose={() => {
			state = 'lost';
		}}
	/>

	{#if state !== 'playing'}
		<Modal>
			<h1>e<span>match</span>i</h1>
			<p>the emoji matching game</p>

			{#if state === 'won' || state === 'lost'}
				<p>you {state}! play again?</p>
			{:else if state === 'paused'}
				<p>game paused</p>
			{:else if state === 'waiting'}
				<p>choose a level:</p>
			{/if}

			<div class="buttons">
				{#if state === 'paused'}
					<button
						on:click={() => {
							state = 'playing';
						}}
					>
						resume
					</button>

					<button
						on:click={() => {
							state = 'waiting';
						}}
					>
						quit
					</button>
				{:else}
					{#each levels as level}
						<button
							on:click={() => {
								game.reset(level);
								state = 'playing';
							}}
						>
							{level.label}
						</button>
					{/each}
				{/if}
			</div>
		</Modal>
	{/if}
</main>

<style>
	main {
		--accent: hsl(315, 66%, 37%);
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	h1 {
		font-family: Grandstander;
		font-size: 4rem;
		margin: 0;
		height: 1em;
	}

	h1 span {
		color: var(--accent);
	}

	p {
		margin: 0 0 1em 0;
	}

	.buttons {
		display: flex;
		justify-content: center;
		gap: 0.5em;
	}

	button {
		background: var(--accent);
		color: white;
		font-size: inherit;
		font-family: inherit;
		border: none;
		padding: 1em;
		border-radius: 0.5em;
	}
</style>
