<script lang="ts">
	import type { Post } from '$lib/types';
	import GridSection from '$lib/components/GridSection.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import { formatDate } from '$lib/utils';
	import { styling } from '$lib/config';

	// Fix destructuring to get posts from data
	let { data } = $props<{
		data: { posts: Post[] };
	}>();

	const { posts } = data;
</script>

<GridSection title="All Posts" viewAllLink="" extraClass="relative z-10">
	<div class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as post}
			<BlogCard {post} />
		{/each}
	</div>
</GridSection>
