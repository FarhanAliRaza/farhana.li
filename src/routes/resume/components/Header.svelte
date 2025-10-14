<script lang="ts">
	import { Globe, Mail, Phone, Github, Linkedin, Twitter as X, PinIcon } from 'lucide-svelte';
	import Avatar from './ResumeAvatar.svelte';

	let {
		name,
		tagline,
		location,
		initials,
		avatarUrl,
		locationLink,
		contact
	}: {
		name: string;
		tagline: string;
		location: string;
		initials: string;
		avatarUrl: string;
		locationLink: string;
		contact: {
			email?: string;
			tel?: string;
			social: { name: string; url: string; icon: 'github' | 'linkedin' | 'x' }[];
			personalWebsiteUrl?: string;
		};
	} = $props();
</script>

<header class="header">
	<div class="header-text">
		<h1 class="name" id="resume-name">{name}</h1>
		<p class="summary">{tagline}</p>

		<a class="location" href={locationLink} target="_blank" rel="noopener noreferrer">
			<PinIcon size={12} />
			<span>{location}</span>
		</a>

		<div class="contact-buttons">
			{#if contact.personalWebsiteUrl}
				<a
					class="icon-button"
					href={contact.personalWebsiteUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Personal website"
				>
					<Globe size={14} />
				</a>
			{/if}
			{#if contact.email}
				<a class="icon-button" href={`mailto:${contact.email}`} aria-label="Email">
					<Mail size={14} />
				</a>
			{/if}
			{#if contact.tel}
				<a class="icon-button" href={`tel:${contact.tel}`} aria-label="Phone">
					<Phone size={14} />
				</a>
			{/if}
			{#each contact.social as social}
				<a
					class="icon-button"
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={social.name}
				>
					{#if social.icon === 'github'}
						<Github size={14} />
					{:else if social.icon === 'linkedin'}
						<Linkedin size={14} />
					{:else}
						<X size={14} />
					{/if}
				</a>
			{/each}
		</div>

		<div class="contact-print">
			{#if contact.personalWebsiteUrl}
				<a href={contact.personalWebsiteUrl}>{new URL(contact.personalWebsiteUrl).hostname}</a>
				<span aria-hidden="true">/</span>
			{/if}
			{#if contact.email}
				<a href={`mailto:${contact.email}`}>{contact.email}</a>
				<span aria-hidden="true">/</span>
			{/if}
			{#if contact.tel}
				<a href={`tel:${contact.tel}`}>{contact.tel}</a>
				<span aria-hidden="true">/</span>
			{/if}
			{#each contact.social as social}
				<a href={social.url} target="_blank" rel="noopener noreferrer">
					{social.name}
				</a>
				{#if social !== contact.social[contact.social.length - 1]}
					<span aria-hidden="true">/</span>
				{/if}
			{/each}
		</div>
	</div>

	<Avatar class="avatar" src={avatarUrl} alt={`${name}'s profile picture`} {initials} />
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.header-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.name {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0;
	}

	.summary {
		font-family: var(--resume-font-mono);
		font-size: 0.9rem;
		color: rgba(15, 23, 42, 0.75);
		margin: 0;
	}

	.location {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-family: var(--resume-font-mono);
		font-size: 0.75rem;
		color: rgba(15, 23, 42, 0.75);
		text-decoration: none;
	}

	.location:hover {
		text-decoration: underline;
	}

	.contact-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 9999px;
		border: 1px solid rgba(15, 23, 42, 0.12);
		color: rgba(15, 23, 42, 0.75);
		transition: all 0.2s ease;
	}

	.icon-button:hover {
		background-color: rgba(15, 23, 42, 0.06);
		border-color: rgba(15, 23, 42, 0.2);
		color: rgba(15, 23, 42, 0.95);
	}

	.contact-print {
		display: none;
		font-family: var(--resume-font-mono);
		font-size: 0.75rem;
		gap: 0.5rem;
	}

	.contact-print a {
		color: rgba(15, 23, 42, 0.75);
		text-decoration: underline;
	}

	.avatar {
		flex-shrink: 0;
	}

	@media (max-width: 640px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media print {
		.contact-buttons {
			display: none;
		}

		.contact-print {
			display: inline-flex;
		}

		.name {
			font-size: 18pt;
		}

		.summary {
			font-size: 9pt;
		}

		.location {
			font-size: 7.5pt;
		}

		.contact-print {
			font-size: 7.5pt;
		}

		.header {
			gap: 1rem;
		}
	}
</style>
