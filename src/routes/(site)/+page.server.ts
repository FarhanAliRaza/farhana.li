import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Post, Log, Project } from '$lib/types';

async function getProjects() {
    const paths = import.meta.glob('/src/content/projects/*/index.md', { eager: true });
    const projects: Project[] = [];

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').slice(-2)[0];

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

async function getPosts() {
    const paths = import.meta.glob('/src/content/posts/*/index.md', { eager: true });
    const posts: Post[] = [];

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').slice(-2)[0];

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Post, 'slug'>;
            const post = { ...metadata, slug } satisfies Post;
            if (post.published) {
                posts.push(post);
            }
        }
    }

    return posts.sort((first, second) => 
        new Date(second.date).getTime() - new Date(first.date).getTime()
    ).slice(0, 3); // Only get the latest 3 posts
}

async function getLogs() {
    const paths = import.meta.glob('/src/content/logs/*.md', { eager: true });
    const logs: Log[] = [];

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Log, 'slug'>;
            const log = { ...metadata, slug } satisfies Log;
            if (log.published) {
                logs.push(log);
            }
        }
    }

    return logs.sort((first, second) => 
        new Date(second.date).getTime() - new Date(first.date).getTime()
    ).slice(0, 5); // Only get the latest 5 logs
}

export const load = async ({ fetch }: ServerLoadEvent) => {
    console.log('Loading projects...');
    
    const [projects, posts, logs] = await Promise.all([
        getProjects(),
        getPosts(),
        getLogs()
    ]);

    return { projects, posts, logs };
}; 