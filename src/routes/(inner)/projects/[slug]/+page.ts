import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    try {
        const project = await import(`../../../../content/projects/${params.slug}.md`);
        return {
            content: project.default,
            meta: project.metadata
        };
    } catch (e) {
        throw error(404, `Could not find project ${params.slug}`);
    }
}; 