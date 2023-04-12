<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import Game from './Game.svelte';
	import Modal from './Modal.svelte';
	import { levels } from './levels';
	import '../styles.css';

	let state: 'waiting' | 'playing' | 'paused' | 'won' | 'lost' = 'waiting';

	let game: Game;
</script>

<svelte:head>
	<title>ematchi</title>
	<meta name="description" content="the emoji matching game" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="ematchi.vercel.app" />
	<meta property="twitter:url" content="https://ematchi.vercel.app" />
	<meta name="twitter:title" content="ematchi" />
	<meta name="twitter:description" content="the emoji matching game" />
	<meta name="twitter:image" content="https://ematchi.vercel.app/og.png" />
</svelte:head>

<main>
	<Game
		bind:this={game}
		on:play={() => {
			state = 'playing';
		}}
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
			<header>
				<h1>e<span>match</span>i</h1>
				<p>the emoji matching game</p>
			</header>

			{#if state === 'won' || state === 'lost'}
				<p>you {state}! play again?</p>
			{:else if state === 'paused'}
				<p>game paused</p>
			{:else if state === 'waiting'}
				<p>choose a level:</p>
			{/if}

			<div class="buttons">
				{#if state === 'paused'}
					<button on:click={() => game.resume()}>resume</button>
					<button on:click={() => (state = 'waiting')}> quit </button>
				{:else}
					{#each levels as level}
						<button
							on:click={() => {
								game.start(level);
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

	{#if state === 'won'}
		<div class="confetti" use:confetti={{ stageWidth: innerWidth, stageHeight: innerHeight }} />
	{/if}
</main>

<style>
	main {
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	header {
		font-size: min(5vw, 2rem);
		font-family: Grandstander;
	}

	h1 {
		font-size: 4em;
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

	.confetti {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}
</style>
