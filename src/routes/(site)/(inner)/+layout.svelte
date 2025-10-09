<script>
	let { children } = $props();
	import { styling } from '$lib/config';
</script>

<div class="relative min-h-screen bg-black">
	<!-- Header section with gradient background -->
	<div
		class="pointer-events-none absolute inset-0 z-0 bg-gradient-radial from-[rgba(33,158,255,0.4)] to-transparent"
		style="background-position: center top; background-size: 100% 100%;"
	></div>
	<div class="">
		<div class="pt-8">
			{@render children()}
		</div>
	</div>
</div>
