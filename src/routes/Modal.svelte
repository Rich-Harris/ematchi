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
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: none;
		opacity: 0;
		z-index: 999;
		pointer-events: none;
		transition: all 0.2s;
	}

	.visible {
		backdrop-filter: blur(10px);
		pointer-events: all;
		opacity: 1;
	}
</style>
