<script lang="ts">
	export let visible: boolean;
</script>

<div class="modal-background" class:visible>
	<div class="modal">
		<slot />
	</div>
</div>

<style>
	.modal-background {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		display: grid;
		place-items: center;
		background: rgba(255, 255, 255, 0);
		backdrop-filter: none;
		opacity: 0;
		z-index: 999;
		pointer-events: none;
		transition: all 0.2s;
	}

	.visible {
		backdrop-filter: blur(5px);
		pointer-events: all;
		opacity: 1;
	}

	.modal {
		background: white;
		filter: drop-shadow(0 0 0.5em rgba(0, 0, 0, 0.2));
		padding: 1em 2em;
		border-radius: 1em;
	}
</style>
