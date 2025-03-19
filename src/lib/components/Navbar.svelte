<script lang="ts">
	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Logs', href: '/logs' },
		{ label: 'About', href: '/about' }
	];
</script>

<nav
	class="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-6 py-3 backdrop-blur-md"
>
	<ul class="flex gap-8">
		{#each navItems as item}
			<li>
				<a
					href={item.href}
					class="text-sm font-medium text-white/90 transition-colors hover:text-[var(--color-brand)]"
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
