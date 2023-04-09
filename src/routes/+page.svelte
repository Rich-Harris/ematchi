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
	/>

	<Modal visible={state !== 'playing'} on:start={() => (state = 'playing')}>
		<h1>e<span>match</span>i</h1>
		<p>the emoji matching game</p>

		{#if state === 'paused'}
			<button
				on:click={() => {
					state = 'playing';
				}}
			>
				start
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
	</Modal>
</main>

<style>
	main {
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
	}

	h1 span {
		color: rgb(36, 182, 72);
	}

	p {
		margin: 0 0 1em 0;
	}
</style>
