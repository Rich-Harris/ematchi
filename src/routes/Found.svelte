<script lang="ts">
	import { flip } from 'svelte/animate';
	import { receive } from './transitions';
	import { fade, scale } from 'svelte/transition';

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<div in:fade={{ delay: 500 }} animate:flip={{ duration: 200, delay: 500 }} class="pair">
			<span in:receive={{ key: `${emoji}:a` }}>{emoji}</span>
			<span in:receive={{ key: `${emoji}:b` }}>{emoji}</span>
		</div>
	{/each}
</div>

<style>
	.found {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		z-index: 3;
		filter: drop-shadow(0.2em 0.4em 0.6em rgba(0, 0, 0, 0.1));
	}

	.pair {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: max(2.5em, calc(80em / (var(--size) * var(--size))));
		width: 1.5em;
		aspect-ratio: 1;
		background: var(--bg-1);
		border-radius: 50%;
	}

	span {
		display: block;
		position: absolute;
		width: 1em;
		height: 1em;
		line-height: 1;
	}

	@media (min-aspect-ratio: 1) {
		.found {
			/* flex-direction: column; */
		}
	}
</style>
