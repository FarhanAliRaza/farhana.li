<script>
	import Header from './Header.svelte';
</script>

<Header />

<section class="container mx-auto px-4 py-8">
	<h2 class="mb-8 text-3xl font-bold">Latest Posts</h2>
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		<!-- Example blog cards -->
		{#each Array(3) as _}
			<article class="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
				<h3 class="mb-4 text-xl font-semibold">Blog Post Title</h3>
				<p class="mb-4 text-gray-300">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore.
				</p>
				<a href="#" class="text-blue-400 hover:text-blue-300">Read more →</a>
			</article>
		{/each}
	</div>
</section>
