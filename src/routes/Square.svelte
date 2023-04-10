<script lang="ts">
	import { send } from './transitions';

	export let value: string;
	export let selected: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
</script>

<div class="square" class:flipped={selected || found}>
	<button on:click disabled={selected || found} />

	<div class="background" class:found />
	{#if !found}
		<span out:send={{ key: `${value}:${group}` }}>{value}</span>
	{/if}
</div>

<style>
	.square {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		transition: filter 0.2s;
		transform-style: preserve-3d;
		transform: rotateY(180deg);
		transition: transform 0.4s;
	}

	.square * {
		backface-visibility: hidden;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--bg-2);
		border-radius: 1em;
		transform: rotateY(180deg);
	}

	button:disabled {
		color: inherit;
	}

	.flipped {
		transform: rotateY(0);
		z-index: 2;
	}

	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		background: var(--bg-1);
		border: 2px solid var(--accent);
		border-radius: 1em;
		transition: border 0.2s;
	}

	.background.found {
		border: 2px solid var(--bg-2);
	}

	span {
		display: block;
		font-size: 6em;
		width: 1em;
		height: 1em;
		line-height: 1;
		z-index: 2;
		pointer-events: none;
	}
</style>
