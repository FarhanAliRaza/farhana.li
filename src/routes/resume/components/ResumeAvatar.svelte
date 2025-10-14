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
		width: 6rem;
		height: 6rem;
		border-radius: 12px;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f3f4f6;
		font-family: var(--resume-font-sans);
		font-weight: 600;
		color: #374151;
		text-transform: uppercase;
		box-sizing: border-box;
		aspect-ratio: 1/1;
		border: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		position: relative;
	}

	.resume-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		border-radius: inherit;
	}

	.resume-avatar span {
		font-size: 1.5rem;
		line-height: 1;
	}

	@media (max-width: 640px) {
		.resume-avatar {
			width: 4rem;
			height: 4rem;
			border-radius: 10px;
		}

		.resume-avatar span {
			font-size: 1.25rem;
		}
	}

	@media print {
		.resume-avatar {
			border: 1px solid rgba(0, 0, 0, 0.1);
			box-shadow: none;
		}
	}
</style>
