import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const projects = import.meta.glob('/src/content/projects/**/*.md');

export const load: PageLoad = async ({ params }) => {
    const projectPath = `/src/content/projects/${params.slug}/${params.slug}.md`;
    const projectLoader = projects[projectPath];

    if (!projectLoader) {
        throw error(404, `Could not find project ${params.slug}`);
    }

    try {
        const project = await projectLoader();
        return {
            content: project.default,
            meta: project.metadata
        };
    } catch (e) {
        throw error(404, `Could not find project ${params.slug}`);
    }
}; 