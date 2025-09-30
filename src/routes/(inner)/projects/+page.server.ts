import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Project } from '$lib/types';

async function getProjects() {
    const paths = import.meta.glob('/src/content/projects/**/*.md', { eager: true });
    const projects: Project[] = [];

    for (const path in paths) {
        const file = paths[path];
        const pathParts = path.split('/');
        const slug = pathParts[pathParts.length - 2];

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Project, 'slug'>;
            const project = { ...metadata, slug } satisfies Project;
            if (project.published) {
                projects.push(project);
            }
        }
    }

    return projects.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    );
}

export const load = async ({ fetch }: ServerLoadEvent) => {
    const projects = await getProjects();
    return { projects };
}; 