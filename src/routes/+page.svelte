<script lang="ts">
	import Game from './Game.svelte';
	import Modal from './Modal.svelte';
	import '../styles.css';

	let state: 'playing' | 'idle' = 'idle';
</script>

<main>
	<Game />

	<Modal visible={state !== 'playing'} on:start={() => (state = 'playing')}>
		<h1>ematchi</h1>
		<p>the emoji matching game</p>

		<button on:click={() => (state = 'playing')}>start</button>
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

	p {
		margin: 0 0 1em 0;
	}
</style>
