<script lang="ts">
	let { children } = $props();
</script>

<div class="inner-pages">{@render children()}</div>

<style>
	.inner-pages {
		min-height: 100vh;
		background: #08070c;
		color: #f5f1fa;
	}
</style>
