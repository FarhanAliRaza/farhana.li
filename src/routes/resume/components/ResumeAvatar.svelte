<script lang="ts">
	let {
		src = null,
		alt,
		initials,
		class: className = ''
	}: {
		src?: string | null;
		alt: string;
		initials: string;
		class?: string;
	} = $props();

	let imageError = $state(false);

	const handleError = () => {
		imageError = true;
	};
</script>

<div class={`resume-avatar ${className}`}>
	{#if src && !imageError}
		<img {src} {alt} onerror={handleError} />
	{:else}
		<span aria-hidden="true">{initials}</span>
	{/if}
</div>

<style>
	.resume-avatar {
		width: 5rem;
		height: 5rem;
		border-radius: 9999px;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #93c5fd 0%, #6366f1 50%, #a855f7 100%);
		font-family: var(--resume-font-sans);
		font-weight: 700;
		color: white;
		text-transform: uppercase;
	}

	.resume-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 640px) {
		.resume-avatar {
			width: 4rem;
			height: 4rem;
		}
	}
</style>
