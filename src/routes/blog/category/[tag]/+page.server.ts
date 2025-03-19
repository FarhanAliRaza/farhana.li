import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types';

async function getPostsByTag(tag: string) {
    const paths = import.meta.glob('/src/content/posts/*.md', { eager: true });
    const posts: Post[] = [];

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Post, 'slug'>;
            const post = { ...metadata, slug } satisfies Post;
            
            // Only include posts that have the specified tag and are published
            if (post.published && post.tags.includes(tag)) {
                posts.push(post);
            }
        }
    }

    return posts.sort((first, second) => 
        new Date(second.date).getTime() - new Date(first.date).getTime()
    );
}

export const load: PageServerLoad = async ({ params }) => {
    const { tag } = params;
    const posts = await getPostsByTag(tag);
    
    return {
        tag,
        posts
    };
}; 