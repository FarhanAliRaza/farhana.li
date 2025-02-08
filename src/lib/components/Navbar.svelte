<script lang="ts">
	const navItems = [
		{ label: 'Home', href: '#' },
		{ label: 'About', href: '#' },
		{ label: 'Projects', href: '#' },
		{ label: 'Contact', href: '#' }
	];
</script>

<nav
	class="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md"
>
	<ul class="flex gap-8">
		{#each navItems as item}
			<li>
				<a
					href={item.href}
					class="text-sm font-medium text-white/90 transition-colors hover:text-white"
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
