import type { PageServerLoad } from './$types';
import type { Log } from '$lib/types';

async function getLogsByTag(tag: string) {
    const paths = import.meta.glob('/src/content/logs/*.md', { eager: true });
    const logs: Log[] = [];

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Log, 'slug'>;
            const log = { ...metadata, slug } satisfies Log;
            
            // Only include logs that have the specified tag and are published
            if (log.published && log.tags.includes(tag)) {
                logs.push(log);
            }
        }
    }

    return logs.sort((first, second) => 
        new Date(second.date).getTime() - new Date(first.date).getTime()
    );
}

export const load: PageServerLoad = async ({ params }) => {
    const { tag } = params;
    const logs = await getLogsByTag(tag);
    
    return {
        tag,
        logs
    };
}; 