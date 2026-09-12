import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Post, Project } from '$lib/types';

async function getProjects() {
    const paths = import.meta.glob('/src/content/projects/*/*.md', { eager: true });
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
        (first.order ?? Infinity) - (second.order ?? Infinity) ||
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

export const load = async ({ fetch }: ServerLoadEvent) => {
    console.log('Loading projects...');
    
    const [projects, posts] = await Promise.all([
        getProjects(),
        getPosts()
    ]);

    return { projects, posts };
}; 