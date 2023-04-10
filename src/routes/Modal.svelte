<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
</script>

<div class="modal-background" transition:fade={{ duration: 200 }}>
	<div class="modal" transition:scale={{ start: 0.9, duration: 400, easing: cubicOut }}>
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
		backdrop-filter: blur(10px);
		z-index: 999;
		transition: all 0.2s;
	}
</style>
