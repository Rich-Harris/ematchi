import { crossfade } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

export const [send, receive] = crossfade({
	delay: 500,
	duration: (d) => d * 1,
	easing: cubicOut
});
