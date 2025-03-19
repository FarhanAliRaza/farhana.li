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

<div class="min-h-screen bg-black">
	<GridSection title="Blog" highlightedText="Posts" viewAllLink="">
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post}
				<BlogCard {post} />
			{/each}
		</div>
	</GridSection>
</div>
