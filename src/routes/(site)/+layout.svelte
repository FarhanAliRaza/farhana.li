<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../../app.css';
	import '$lib/bento.css';
	let { children } = $props();
</script>

<Navbar />
{@render children()}
