import { z } from 'zod';

// Helper schema to handle XML text content or direct strings
const stringOrTextNode = z.union([z.string(), z.object({ _text: z.string() })]).transform((val) =>
	typeof val === 'string' ? val : val._text
);

// Schema for social contact links
const SocialSchema = z.object({
	name: stringOrTextNode,
	url: z.string().url(),
	icon: z.enum(['github', 'linkedin', 'twitter', 'email', 'website'])
});

// Schema for contact information
const ContactSchema = z.object({
	personalWebsiteUrl: z.string().url().optional(),
	email: z.string().email(),
	tel: stringOrTextNode.optional(),
	social: z.array(SocialSchema).optional()
}).passthrough();

// Schema for work experience
const WorkExperienceSchema = z.object({
	company: stringOrTextNode,
	title: stringOrTextNode,
	badges: z.array(stringOrTextNode).optional(),
	start: stringOrTextNode,
	end: stringOrTextNode,
	highlights: z.array(stringOrTextNode)
});

// Schema for education
const EducationSchema = z.object({
	school: stringOrTextNode,
	degree: stringOrTextNode,
	start: stringOrTextNode,
	end: stringOrTextNode
});

// Schema for projects
const ProjectSchema = z.object({
	title: stringOrTextNode,
	description: stringOrTextNode,
	techStack: z.array(stringOrTextNode),
	url: z.string().url().optional()
});

// Main resume data schema
export const ResumeDataSchema = z.object({
	name: stringOrTextNode,
	initials: stringOrTextNode.transform((val) => {
		if (val.length > 3) {
			throw new Error('Initials must be 3 characters or less');
		}
		return val;
	}),
	location: stringOrTextNode,
	locationLink: z.string().url(),
	tagline: stringOrTextNode,
	about: stringOrTextNode,
	avatarUrl: z.string().url(),
	contact: ContactSchema,
	work: z.array(WorkExperienceSchema),
	education: z.array(EducationSchema),
	skills: z.array(stringOrTextNode),
	projects: z.array(ProjectSchema)
});

// Export the TypeScript type inferred from the schema
export type ResumeData = z.infer<typeof ResumeDataSchema>;
