<script lang="ts">
	import { Globe, Mail, MapPin, Github, Linkedin } from 'lucide-svelte';

	let {
		name,
		tagline,
		about,
		location,
		locationLink,
		contact
	}: {
		name: string;
		tagline: string;
		about: string;
		location: string;
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
	<div class="header-content">
		<h1 class="name">{name}</h1>
		<p class="tagline">{tagline}</p>
		<p class="about">{about}</p>

		<div class="contact-bar">
			{#if contact.email}
				<a class="contact-item" href={`mailto:${contact.email}`}>
					<span class="icon"><Mail size={14} /></span>
					<span>{contact.email}</span>
				</a>
			{/if}
			{#each contact.social as social}
				<span class="separator">•</span>
				<a class="contact-item" href={social.url} target="_blank" rel="noopener noreferrer">
					{#if social.icon === 'github'}
						<span class="icon"><Github size={14} /></span>
					{:else if social.icon === 'linkedin'}
						<span class="icon"><Linkedin size={14} /></span>
					{:else}
						<span class="icon"><Globe size={14} /></span>
					{/if}
					<span>{social.name === 'LinkedIn' ? 'linkedin.com' + new URL(social.url).pathname : new URL(social.url).pathname.slice(1)}</span>
				</a>
			{/each}
			{#if contact.personalWebsiteUrl}
				<span class="separator">•</span>
				<a class="contact-item" href={contact.personalWebsiteUrl} target="_blank" rel="noopener noreferrer">
					<span class="icon"><Globe size={14} /></span>
					<span>{new URL(contact.personalWebsiteUrl).hostname}</span>
				</a>
			{/if}
			<span class="separator">•</span>
			<a class="contact-item" href={locationLink} target="_blank" rel="noopener noreferrer">
				<span class="icon"><MapPin size={14} /></span>
				<span>{location.split('|')[0].trim()}</span>
			</a>
		</div>
	</div>
</header>

<style>
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.header-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.name {
		font-size: 2.25rem;
		font-weight: 700;
		margin: 0;
		letter-spacing: -0.02em;
	}

	.tagline {
		font-family: var(--resume-font-mono);
		font-size: 1rem;
		color: rgba(15, 23, 42, 0.65);
		margin: 0;
	}

	.about {
		font-family: var(--resume-font-mono);
		font-size: 0.875rem;
		color: rgba(15, 23, 42, 0.75);
		margin: 0.5rem 0 0 0;
		max-width: 100%;
		line-height: 1.6;
		text-align: left;
	}

	.contact-bar {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		background: rgba(15, 23, 42, 0.04);
		border-radius: 8px;
		width: 100%;
	}

	.contact-item {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--resume-font-mono);
		font-size: 0.8rem;
		color: rgba(15, 23, 42, 0.75);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.contact-item:hover {
		color: rgba(15, 23, 42, 1);
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: rgba(15, 23, 42, 0.6);
	}

	.contact-item:hover .icon {
		color: rgba(15, 23, 42, 0.85);
	}

	.separator {
		color: rgba(15, 23, 42, 0.25);
		font-size: 0.6rem;
	}

	@media (max-width: 640px) {
		.contact-bar {
			gap: 0.5rem 0.75rem;
		}

		.separator {
			display: none;
		}
	}

	@media print {
		.header-content {
			gap: 0.2rem;
		}

		.name {
			font-size: 16pt;
		}

		.tagline {
			font-size: 9pt;
		}

		.about {
			font-size: 8pt;
			line-height: 1.35;
			margin-top: 0.2rem;
		}

		.contact-bar {
			margin-top: 0.25rem;
			padding: 0.3rem 0.5rem;
			gap: 0.4rem;
			background: rgba(15, 23, 42, 0.04);
		}

		.contact-item {
			font-size: 7pt;
			gap: 0.15rem;
		}

		.contact-item .icon {
			width: 10px;
			height: 10px;
		}

		.contact-item .icon :global(svg) {
			width: 10px;
			height: 10px;
		}

		.separator {
			font-size: 5pt;
		}

		.icon {
			color: rgba(15, 23, 42, 0.5);
		}
	}
</style>
