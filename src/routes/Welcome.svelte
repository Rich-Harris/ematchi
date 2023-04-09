<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<header>
	<h1>ematchi</h1>
	<p>the emoji matching game</p>

	<button on:click={() => dispatch('start')}>start</button>
</header>
