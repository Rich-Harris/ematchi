<script lang="ts">
	export let remaining: number;
	export let duration: number;
	export let playing: boolean;
</script>

<div class="countdown">
	<button aria-label={playing ? 'pause' : 'play'} on:click />

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
		background: url(./pause.svg) no-repeat 50% 50%;
		background-size: cover;
		width: 4rem;
		height: 4rem;
		border: none;
	}

	button[aria-label='play'] {
		background-image: url(./play.svg);
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
		background: red;
	}
</style>
