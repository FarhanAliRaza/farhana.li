import type { ServerLoadEvent } from '@sveltejs/kit';
import type { Log } from '$lib/types';

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
    );
}

export async function load({ fetch }: ServerLoadEvent) {
    const logs = await getLogs();
    return { logs };
} 