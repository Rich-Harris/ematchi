import { crossfade } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

export const [send, receive] = crossfade({
	delay: 500,
	duration: 400,
	easing: cubicOut
});
