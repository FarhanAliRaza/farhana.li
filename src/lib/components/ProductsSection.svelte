<script lang="ts">
	import ProductCard from './ProductCard.svelte';
	import type { Product } from '$lib/types';

	/** Products to display */
	let {
		products = [],
		title = 'My SaaS Products',
		viewAllLink = '/products'
	} = $props<{
		products: Product[];
		title?: string;
		viewAllLink?: string;
	}>();

	// Ensure products is an array and limit to first 3 products for the homepage
	const safeProducts = $derived(Array.isArray(products) ? products : []);
	const displayProducts = $derived(safeProducts.slice(0, 3));
</script>

<section class="relative z-10 mb-20">
	<!-- Section heading -->
	<div class="mb-16 flex items-center justify-between">
		<h2 class="text-[2.5rem] font-bold leading-tight text-[var(--color-brand)]">
			{title}
		</h2>
		{#if viewAllLink}
			<a
				href={viewAllLink}
				class="group flex items-center gap-2 text-white/80 transition-colors hover:text-[var(--color-brand)]"
			>
				<span>View all products</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="transition-transform duration-300 group-hover:translate-x-1"
				>
					<path d="M5 12h14"></path>
					<path d="m12 5 7 7-7 7"></path>
				</svg>
			</a>
		{/if}
	</div>

	<div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each displayProducts as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>
