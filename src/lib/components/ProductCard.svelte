<script lang="ts">
	import type { Product } from '$lib/types';

	/** The product to display */
	let { product } = $props<{
		product: Product;
	}>();

	// Format price with currency
	const formatPrice = (price: number, currency = '$') => {
		return `${currency}${price.toFixed(2)}`;
	};

	// Calculate discount percentage if salePrice exists
	const discountPercentage = product.salePrice
		? Math.round(((product.price - product.salePrice) / product.price) * 100)
		: 0;

	// Default currency if not provided
	const currency = product.currency || '$';
</script>

<article
	class="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-md transition-all duration-300 hover:-translate-y-2"
>
	<!-- Image with overlay -->
	<div class="relative h-52 overflow-hidden">
		<enhanced:img
			src={product.image || '/images/placeholder.webp'}
			alt={product.title}
			class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
			loading="lazy"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
	</div>

	<div class="flex h-[calc(100%-13rem)] flex-col p-7">
		<h3 class="mb-2 text-2xl font-semibold text-white">
			<a href="/products/{product.slug}" class="transition-colors hover:text-[var(--color-brand)]">
				{product.title}
			</a>
		</h3>

		<!-- Price section -->

		<p class="mb-4 line-clamp-2 flex-grow text-gray-300">
			{product.description}
		</p>

		<div class="mt-auto">
			<div class="mb-5 flex flex-wrap gap-2">
				{#each product.tags as tag}
					<span
						class="bg-[var(--color-brand)]/10 rounded-full px-3 py-1 text-xs font-medium text-[var(--color-brand)]"
					>
						#{tag}
					</span>
				{/each}
			</div>

			<div class="flex gap-4">
				<a
					href={product.inStock ? product.buyLink : 'javascript:void(0)'}
					class="text-white/80 transition-colors hover:text-[var(--color-brand)] group flex items-center gap-1"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
						<polyline points="14 2 14 8 20 8"></polyline>
						<line x1="16" y1="13" x2="8" y2="13"></line>
						<line x1="16" y1="17" x2="8" y2="17"></line>
						<polyline points="10 9 9 9 8 9"></polyline>
					</svg>
					Goto to site
				</a>

				<a
					href="/products/{product.slug}"
					class="flex items-center gap-1 rounded-full {product.inStock
						? 'bg-[var(--color-brand)] hover:bg-[var(--color-brand)]/90'
						: 'bg-gray-700 cursor-not-allowed'} px-4 py-1 text-sm font-medium text-white transition-colors"
				>
					State of the project
				</a>
			</div>
		</div>
	</div>
</article>
