<script lang="ts">
	import { profile } from '$lib/profile';
	import AboutSection from '$lib/components/AboutSection.svelte';
</script>

<svelte:head>
	<title>About Farhan Ali Raza - OSS Engineer at Reflex</title>
	<meta name="description" content={profile.description} />
	<meta property="og:title" content="About Farhan Ali Raza - OSS Engineer at Reflex" />
	<meta property="og:description" content={profile.description} />
	<meta property="og:url" content="https://farhana.li/about" />
	<meta name="twitter:title" content="About Farhan Ali Raza - OSS Engineer at Reflex" />
	<meta name="twitter:description" content={profile.description} />
	<link rel="canonical" href="https://farhana.li/about" />
</svelte:head>

<main class="about-page">
	<div class="about-card"><AboutSection /></div>
</main>

<style>
	.about-page {
		padding: 108px var(--bento-gutter) 80px;
		min-height: 100vh;
		background: #08070c;
	}
	.about-card {
		max-width: 880px;
		margin-inline: auto;
		padding: clamp(24px, 5vw, 64px);
		border: 1px solid var(--bento-border);
		border-radius: var(--bento-radius);
		background: var(--bento-surface);
	}
	@media (max-width: 639px) {
		.about-page {
			padding-top: 92px;
		}
	}
</style>
