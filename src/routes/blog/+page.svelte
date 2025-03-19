<script lang="ts">
	import type { Post } from '$lib/types';
	import GridSection from '$lib/components/GridSection.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import { formatDate } from '$lib/utils';

	// Fix destructuring to get posts from data
	let { data } = $props<{
		data: { posts: Post[] };
	}>();

	const { posts } = data;
</script>

<div class="min-h-screen bg-black relative overflow-hidden">
	<!-- Header section with gradient background -->
	<div
		class="bg-gradient-radial pointer-events-none absolute inset-0 from-[rgba(33,158,255,0.3)] to-transparent z-0"
		style="background-position: center top; background-size: 100% 100%;"
	></div>

	<GridSection title="All Posts" viewAllLink="" extraClass="relative z-10">
		<div class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post}
				<BlogCard {post} />
			{/each}
		</div>
	</GridSection>
</div>
