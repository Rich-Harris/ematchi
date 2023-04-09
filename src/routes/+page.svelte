<script lang="ts">
	import Game from './Game.svelte';
	import Welcome from './Welcome.svelte';
	import '../styles.css';

	let state: 'playing' | 'idle' = 'idle';
</script>

<main>
	{#if state === 'playing'}
		<Game />
	{:else}
		<Welcome on:start={() => (state = 'playing')} />
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
</style>
