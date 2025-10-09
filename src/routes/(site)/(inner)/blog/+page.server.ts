import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Post } from '$lib/types';

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
    );
}

export async function load({ fetch }: ServerLoadEvent) {
    const posts = await getPosts();
    return { posts };
} 