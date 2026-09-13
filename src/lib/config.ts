import { profile, experience } from './profile';

// Site configuration
export const siteConfig = {
	name: profile.name,
	title: profile.title,
	description: profile.description,
	url: 'https://farhana.li',
	ogImage: '/images/og.jpg',
	links: {
		twitter: 'https://x.com/FarhanAliRaza4',
		github: 'https://github.com/FarhanAliRaza',
		linkedin: 'https://linkedin.com/in/farhanaliraza'
	},
	// phone: 'zero three zero three eight two seven nine four five four'
};



// About me content
export const aboutMe = {
	intro: profile.heroBio,
	description: profile.bio.join(' '),

	skills: [
		{
			name: 'Frontend Development',
			percentage: 90
		},
		{
			name: 'SvelteKit',
			percentage: 85
		},
		{
			name: 'JavaScript & TypeScript',
			percentage: 88
		},
		{
			name: 'Backend Development',
			percentage: 80
		},
		{
			name: 'UI/UX Design',
			percentage: 75
		},
		{
			name: 'DevOps & Deployment',
			percentage: 70
		}
	],

	experiences: experience.map((job) => ({
		company: job.company,
		role: job.role,
		period: `${job.start} - ${job.end}`,
		description: job.summary
	})),

	education: [
		{
			institution: 'Islamia University of Bahawalpur',
			degree: 'BS Computer Science · 3.61 / 4.0',
			year: '2019 - 2023'
		}
	]
};

// Social links with icons
export const socialLinks = [
	{
		name: 'GitHub',
		url: siteConfig.links.github,
		icon: 'github'
	},
	{
		name: 'LinkedIn',
		url: siteConfig.links.linkedin,
		icon: 'linkedin'
	},
	{
		name: 'Twitter',
		url: siteConfig.links.twitter,
		icon: 'twitter'
	}
];

// Global styling
export const styling = {
	gradient: {
		class:
			'bg-gradient-radial pointer-events-none absolute inset-0 from-[rgba(33,158,255,0.4)] to-transparent z-0',
		style: 'background-position: center top; background-size: 100% 100%;'
	}
};
