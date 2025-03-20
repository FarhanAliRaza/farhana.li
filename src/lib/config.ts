// Site configuration
export const siteConfig = {
	name: 'Your Name',
	title: 'Developer & Designer',
	description: 'Passionate full-stack developer with a focus on creating beautiful, functional, and accessible web experiences.',
	url: 'https://farhana.li',
	ogImage: '/images/og.jpg',
	links: {
		twitter: 'https://x.com/FarhanAliRaza4',
		github: 'https://github.com/FarhanAliRaza',
		linkedin: 'https://linkedin.com/in/farhanaliraza'
	},
	email: 'farhanalirazaazeemi - At - gmail dot com',
	// phone: 'zero three zero three eight two seven nine four five four'
};

// Navigation links
export const navLinks = [
	{
		title: 'Home',
		href: '/'
	},
	{
		title: 'About',
		href: '/about'
	},
	{
		title: 'Projects',
		href: '/projects'
	},
	{
		title: 'Blog',
		href: '/blog'
	},
	{
		title: 'Logs',
		href: '/logs'
	}
];

// Footer links
export const footerLinks = [
	{
		title: 'Privacy Policy',
		href: '/privacy'
	},
	{
		title: 'Terms of Service',
		href: '/terms'
	},
	{
		title: 'Contact',
		href: '/contact'
	}
];

// About me content
export const aboutMe = {
	intro: `I'm a full-stack developer with over 5 years of experience building web applications. I
	specialize in modern JavaScript frameworks, particularly SvelteKit and React, with a
	strong foundation in backend technologies.`,
	
	description: `My approach to development focuses on creating intuitive user experiences backed by clean,
	maintainable code. I'm passionate about web performance, accessibility, and building
	systems that scale.`,
	
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
	
	experiences: [
		{
			company: 'Tech Innovations Inc.',
			role: 'Senior Frontend Developer',
			period: '2020 - Present',
			description: 'Leading frontend development for enterprise web applications, implementing modern architecture and improving performance.'
		},
		{
			company: 'Digital Solutions LLC',
			role: 'Full Stack Developer',
			period: '2018 - 2020',
			description: 'Developed full-stack web applications using React, Node.js, and PostgreSQL, focusing on scalability and user experience.'
		},
		{
			company: 'StartUp Studio',
			role: 'Junior Developer',
			period: '2016 - 2018',
			description: 'Collaborated on various web projects, learning multiple frameworks and contributing to frontend and backend development.'
		}
	],
	
	education: [
		{
			institution: 'University of Technology',
			degree: 'Bachelor of Science in Computer Science',
			year: '2016'
		},
		{
			institution: 'Online Learning Platform',
			degree: 'Advanced Web Development Certification',
			year: '2017'
		}
	]
};

// Social links with icons
export const socialLinks = [
	{
		name: 'GitHub',
		url: 'https://github.com/yourusername',
		icon: 'github'
	},
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/in/yourusername',
		icon: 'linkedin'
	},
	{
		name: 'Twitter',
		url: '{siteConfig.links.twitter}',
		icon: 'twitter'
	}
];

// Global styling
export const styling = {
	gradient: {
		class: 'bg-gradient-radial pointer-events-none absolute inset-0 from-[rgba(33,158,255,0.4)] to-transparent z-0',
		style: 'background-position: center top; background-size: 100% 100%;'
	}
}; 