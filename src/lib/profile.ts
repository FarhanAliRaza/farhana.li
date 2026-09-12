export interface Experience {
	company: string;
	role: string;
	employmentType: string;
	start: string;
	end: string;
	location?: string;
	href?: string;
	summary: string;
	skills: string[];
	highlights: string[];
}

export const profile = {
	name: 'Farhan Ali Raza',
	title: 'OSS Engineer at Reflex',
	tagline: 'OSS Engineer at Reflex',
	description:
		'Farhan Ali Raza is an OSS engineer at Reflex, founder of Mailjinn, and creator of django-bolt. Building with Python, Django, Rust, and Svelte.',
	heroBio:
		"I'm an OSS engineer at Reflex, founder of Mailjinn, and creator of django-bolt. I build web applications and open-source tools with Python, Django, Rust, and Svelte.",
	bio: [
		"Based in Bahawalnagar, Pakistan, I work remotely as an OSS engineer at Reflex, with 140+ merged pull requests across the framework, its enterprise auth plugin, and the xy charting library. I'm also the founder of Mailjinn, a cold email platform that has processed millions of emails.",
		"I created django-bolt, a Rust-powered Django framework with 1,600+ GitHub stars and 100K+ downloads, optimized to 300K+ requests per second while keeping Django's ORM, authentication, and migrations. Through Google Summer of Code 2025, I shipped template partials to Django core.",
		"Mostly Python, Django, Rust, and Svelte, with a bias toward making things fast. I enjoy owning products end to end, solving performance problems, and sharing what I learn."
	],
	resumeSummary:
		'OSS engineer at Reflex with 140+ merged pull requests across the framework, its enterprise auth plugin, and the xy charting library. Creator of django-bolt, a Rust-powered Django framework with 1,600+ GitHub stars and 100K+ downloads. Shipped template partials to Django core through Google Summer of Code 2025 and founded Mailjinn, a cold email platform that has processed millions of emails. Mostly Python, Django, Rust, and Svelte, with a bias toward making things fast.'
};

// Shared by the About section and resume. Keep dates explicit; durations go stale.
export const experience: Experience[] = [
	{
		company: 'Reflex',
		role: 'OSS Engineer',
		employmentType: 'Full-time',
		start: 'Mar 2026',
		end: 'Present',
		location: 'San Francisco Bay Area · Remote',
		href: 'https://github.com/reflex-dev/reflex',
		summary:
			'Core contributor to Reflex, the open-source framework for building web apps in pure Python. 140+ merged pull requests across the framework, the enterprise package, the xy charting library, and the AI app builder.',
		skills: ['Python', 'React', 'OIDC', 'OpenTelemetry', 'Rust', 'WebGL'],
		highlights: [
			'Designed the compiler plugin system and moved the compilation pipeline out of the App class, adding route registration and plugin lookup hooks.',
			'Built rx.memo, a decorator for JavaScript-level component and function memoization, and promoted it from experimental to a public API.',
			'Added built-in OpenTelemetry tracing and metrics, including a browser tracing plugin with per-event trace propagation, web vitals, and render timing.',
			'Shipped a streaming chunked file upload API and fixed uploads being eagerly copied into memory or left running after client disconnect.',
			'Migrated the CLI, runtime, and component packages to a stdlib logging pipeline and deprecated the legacy console helpers.',
			'Cut page load time with build-time asset pre-compression and added a Lighthouse benchmark suite to CI.',
			'Built AuthPlugin for reflex-enterprise: declarative app-wide OIDC authentication with page guards, protected state vars, cross-tab session sync, audit hooks, and bring-your-own-provider support in the AI app builder.',
			'Contributed 50+ pull requests to the xy charting library, including the data-bound chart component API, legend interactions, and WebGL context recovery on top of its Rust core.'
		]
	},
	{
		company: 'Django-Bolt',
		role: 'Creator and Open Source Maintainer',
		employmentType: 'Part-time',
		start: 'Sep 2025',
		end: 'Present',
		href: 'https://github.com/FarhanAliRaza/django-bolt',
		summary:
			'Created a high-performance Django framework with Rust handling HTTP and Python handling business logic. 1,600+ GitHub stars and 100K+ downloads.',
		skills: ['Python', 'Django', 'Rust', 'PyO3', 'Actix', 'Tokio'],
		highlights: [
			'Built a drop-in replacement for Django views that keeps the Django ORM and ecosystem.',
			'Optimized the framework to 300K+ requests per second on a single machine.',
			'Preserved compatibility with existing Django models, authentication, and migrations.',
			'Used Actix and Tokio for HTTP handling in Rust, with PyO3 bridging Rust and Python.'
		]
	},
	{
		company: 'QOVES',
		role: 'Senior Software Engineer',
		employmentType: 'Contract',
		start: 'Feb 2026',
		end: 'Apr 2026',
		location: 'Remote',
		summary:
			'Re-architected the QOVES backend, refactoring legacy Django systems and optimizing the platform for scale.',
		skills: ['Django', 'Python', 'Temporal'],
		highlights: ['Integrated Temporal for durable workflows.']
	},
	{
		company: 'Freelance | Self-Employed',
		role: 'Full Stack Engineer',
		employmentType: 'Contract',
		start: 'Feb 2020',
		end: 'Dec 2025',
		location: 'Remote',
		summary:
			'Delivered 54 projects with a perfect 5.0 rating across 30 reviews, specializing in Django REST APIs and full-stack applications.',
		skills: [
			'Django REST Framework',
			'React',
			'Next.js',
			'SvelteKit',
			'Stripe',
			'PayPal',
			'AWS',
			'Heroku'
		],
		highlights: [
			'Built complete web applications with Stripe and PayPal payments, Twilio and SendGrid integrations, and AWS and Heroku deployments.',
			'All reviewed projects received five-star ratings, with repeat clients returning for complex features and scalable applications.'
		]
	},
	{
		company: 'Google Summer of Code',
		role: 'GSoC Contributor @ Django Software Foundation',
		employmentType: 'Apprenticeship',
		start: 'May 2025',
		end: 'Sep 2025',
		location: 'Remote',
		href: 'https://github.com/django/django/pull/19643',
		summary: 'Selected for Google Summer of Code to contribute to the Django web framework.',
		skills: ['Django', 'Python'],
		highlights: [
			'Shipped template partials to Django core (PR #19643).',
			'Wrote comprehensive documentation and more than 50 tests.'
		]
	},
	{
		company: 'MedGebra',
		role: 'Lead Developer',
		employmentType: 'Contract',
		start: 'Jun 2024',
		end: 'Jul 2025',
		location: 'Remote',
		href: 'https://medgebra.com',
		summary:
			'Built the entire product from concept to 3,300+ users and 132 paying customers as the sole developer.',
		skills: ['Django', 'Django REST Framework', 'RAG'],
		highlights: [
			'Implemented custom retrieval-augmented generation for medical accuracy and integrated hospital information systems for real-time patient data.',
			'Engineered an embedding pipeline for 100,000+ medical PDFs with citation tracking to address doctors’ trust requirements.'
		]
	},
	{
		company: 'Zain Group Of Companies',
		role: 'Software Engineer',
		employmentType: 'Full-time',
		start: 'Jul 2020',
		end: 'Sep 2023',
		summary:
			'API development and integration with Django REST Framework and FastAPI, alongside frontend work in Svelte and React.',
		skills: ['Django REST Framework', 'FastAPI', 'Svelte', 'React'],
		highlights: []
	},
	{
		company: 'Mailjinn',
		role: 'Founder',
		employmentType: 'Full-time',
		start: 'Mar 2024',
		end: 'Present',
		href: 'https://mailjinn.com/',
		summary:
			'Solo-built a SaaS from scratch, evolving an email verification tool into a full cold email platform.',
		skills: ['Django', 'Svelte', 'Celery', 'Redis', 'PostgreSQL', 'RabbitMQ'],
		highlights: [
			'Built bulk email verification, cold email campaigns, and AI response classification for interested leads, uninterested leads, and bounces.',
			'Distributed workers process millions of emails, with real-time progress for uploads of 100K+ addresses.',
			'Fine-tuned a local AI model for lead scoring without external inference API costs.',
			'Operated the platform with 99.9% uptime.'
		]
	}
];
