<script lang="ts">
	import { fade } from 'svelte/transition';

	export let remaining: number;
	export let duration: number;
</script>

<div class="countdown" transition:fade={{ duration: 200 }}>
	<button on:click>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<title>pause</title>
			<path
				style="fill: #777; stroke: transparent"
				d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
			/>
		</svg>
	</button>

	<div class="duration">
		<div class="remaining" style="--p: {remaining / duration}" />
	</div>
</div>

<style>
	.countdown {
		display: flex;
		gap: 1em;
		align-items: center;
		justify-content: end;
		width: 100%;
		height: 100%;
	}

	button {
		font-size: max(8em, 2.4rem);
		width: 1em;
		aspect-ratio: 1;
		background: transparent;
		border: none;
		padding: 0;
	}

	button svg {
		display: block;
	}

	.duration {
		inline-size: 100%;
		block-size: 1em;
		background: var(--bg-2);
		border-radius: 1em;
		overflow: hidden;
	}

	.remaining {
		position: absolute;
		inline-size: calc(100% * var(--p));
		block-size: 100%;
		background: var(--bg-3);
	}

	@media (min-aspect-ratio: 1) {
		.countdown {
			flex-direction: row-reverse;
			writing-mode: vertical-lr;
		}

		.remaining {
			inset-inline-end: 0;
		}
	}
</style>
