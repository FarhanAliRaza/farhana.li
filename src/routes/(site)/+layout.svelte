<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Navbar from '$lib/components/Navbar.svelte';
	import CursorChip from '$lib/components/CursorChip.svelte';
	import { initBentoMotion, enterBentoLists } from '$lib/bento-motion';
	import '../../app.css';
	import '$lib/bento.css';
	let { children } = $props();

	onMount(initBentoMotion);
	afterNavigate(enterBentoLists);
</script>

<Navbar />
{@render children()}
<CursorChip />
