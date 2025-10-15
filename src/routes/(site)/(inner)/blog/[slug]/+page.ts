import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Post } from '$lib/types';

// Function to get all blog posts
async function getAllPosts() {
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

// Function to find related posts based on tags
function findRelatedPosts(currentSlug: string, currentTags: string[], allPosts: Post[]) {
    // Filter out the current post and find posts with matching tags
    return allPosts
        .filter(post => post.slug !== currentSlug)
        .map(post => {
            // Count matching tags
            const matchingTags = post.tags.filter(tag => currentTags.includes(tag));
            return {
                ...post,
                relevance: matchingTags.length // Add relevance score based on matching tags
            };
        })
        .filter(post => post.relevance > 0) // Only include posts with at least one matching tag
        .sort((a, b) => b.relevance - a.relevance) // Sort by relevance
        .slice(0, 3); // Get top 3 related posts
}

export const load: PageLoad = async ({ params }) => {
    try {
        // Load the current post
        const post = await import(`/src/content/posts/${params.slug}/index.md`);
        
        // Get all posts to find related posts
        const allPosts = await getAllPosts();
        
        // Find related posts based on tags
        const relatedPosts = findRelatedPosts(
            params.slug, 
            post.metadata.tags, 
            allPosts
        );
        
        return {
            content: post.default,
            meta: post.metadata,
            relatedPosts
        };
    } catch (e) {
        throw error(404, `Could not find ${params.slug}`);
    }
}; 