import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Log } from '$lib/types';

// Function to get all logs
async function getAllLogs() {
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
    );
}

// Function to find the next logs (chronologically)
function findNextLogs(currentSlug: string, allLogs: Log[]) {
    // Find the index of the current log
    const currentIndex = allLogs.findIndex(log => log.slug === currentSlug);
    
    if (currentIndex === -1) return [];
    
    // Get the next 2 logs (chronologically)
    return allLogs.slice(currentIndex + 1, currentIndex + 3);
}

// Function to find related logs based on tags
function findRelatedLogs(currentSlug: string, currentTags: string[], allLogs: Log[]) {
    // Filter out the current log and find logs with matching tags
    return allLogs
        .filter(log => log.slug !== currentSlug)
        .map(log => {
            // Count matching tags
            const matchingTags = log.tags.filter(tag => currentTags.includes(tag));
            return {
                ...log,
                relevance: matchingTags.length // Add relevance score based on matching tags
            };
        })
        .filter(log => log.relevance > 0) // Only include logs with at least one matching tag
        .sort((a, b) => b.relevance - a.relevance) // Sort by relevance
        .slice(0, 3); // Get top 3 related logs
}

export const load: PageLoad = async ({ params }) => {
    try {
        // Load the current log
        const log = await import(`../../../../content/logs/${params.slug}.md`);
        
        // Get all logs
        const allLogs = await getAllLogs();
        
        // Find next logs chronologically
        const nextLogs = findNextLogs(params.slug, allLogs);
        
        // Find related logs based on tags
        const relatedLogs = findRelatedLogs(
            params.slug, 
            log.metadata.tags, 
            allLogs
        );
        
        return {
            content: log.default,
            meta: log.metadata,
            nextLogs,
            relatedLogs
        };
    } catch (e) {
        throw error(404, `Could not find ${params.slug}`);
    }
}; 