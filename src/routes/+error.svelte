<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft } from 'lucide-svelte';
	import '../app.css';
	import '$lib/bento.css';
</script>

<svelte:head><title>{page.status} · Farhan Ali Raza</title></svelte:head>
<main class="error-page">
	<section class="bento-card error-card">
		<p class="bento-eyebrow">
			{page.status} / {page.status === 404 ? 'Page not found' : 'Something went wrong'}
		</p>
		<h1>{page.status === 404 ? 'A little off the map.' : 'Let’s try that again.'}</h1>
		<p class="description">
			{page.status === 404
				? 'This page may have moved, or the link might be incomplete.'
				: page.error?.message || 'This page couldn’t be loaded. Please try again shortly.'}
		</p>
		<a class="bento-button bento-button--primary" href="/"><ArrowLeft size={16} /> Back to home</a>
	</section>
</main>

<style>
	.error-page {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 100px var(--bento-gutter);
		background: #08070c;
	}
	.error-card {
		height: auto;
		width: 100%;
		max-width: 720px;
		align-items: flex-start;
		padding: clamp(24px, 5vw, 64px);
	}
	h1 {
		font-size: clamp(2.3rem, 5vw, 4rem);
		font-weight: 550;
		letter-spacing: -0.05em;
		line-height: 1.1;
	}
	.description {
		margin-block: 24px 32px;
		color: var(--bento-muted);
		line-height: 1.8;
	}
</style>
