<script lang="ts">
	export let remaining: number;
	export let duration: number;
</script>

<div class="countdown">
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
		height: 100%;
	}

	button {
		width: 4rem;
		height: 4rem;
		background: transparent;
		border: none;
		padding: 0;
	}

	button svg {
		display: block;
	}

	.duration {
		width: 100%;
		height: 1em;
		background: #eee;
		border-radius: 1em;
		overflow: hidden;
	}

	.remaining {
		width: calc(100% * var(--p));
		height: 100%;
		background: #777;
	}
</style>
