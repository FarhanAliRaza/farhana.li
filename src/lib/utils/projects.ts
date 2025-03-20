import type { Project } from '$lib/types';

export async function getAllProjects() {
    const paths = import.meta.glob('/src/content/projects/*.md', { eager: true });
    const projects: Project[] = [];

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');

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