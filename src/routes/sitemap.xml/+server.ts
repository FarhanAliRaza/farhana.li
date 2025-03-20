import { getAllPosts } from '$lib/utils/blog';
import { getAllLogs } from '$lib/utils/logs';
import { getAllProjects } from '$lib/utils/projects';
import type { Post, Log, Project } from '$lib/types';

export const prerender = true;

export async function GET() {
  // Get all content
  const posts = await getAllPosts();
  const logs = await getAllLogs();
  const projects = await getAllProjects();
  
  // Extract unique categories and ensure they're strings
  const blogCategories = [...new Set(posts.flatMap(post => post.tags || []))].filter(Boolean) as string[];
  const logCategories = [...new Set(logs.flatMap(log => log.tags || []))].filter(Boolean) as string[];
  
  // Base URL
  const baseUrl = 'https://farhana.li';
  
  // XML Builder
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/logs</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Category Pages -->
  ${blogCategories.map((category: string) => `
  <url>
    <loc>${baseUrl}/blog/category/${category.toLowerCase()}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  <!-- Log Category Pages -->
  ${logCategories.map((category: string) => `
  <url>
    <loc>${baseUrl}/logs/category/${category.toLowerCase()}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  <!-- Blog Posts -->
  ${posts.map((post: Post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  
  <!-- Logs -->
  ${logs.map((log: Log) => `
  <url>
    <loc>${baseUrl}/logs/${log.slug}</loc>
    <lastmod>${new Date(log.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  
  <!-- Projects -->
  ${projects.map((project: Project) => `
  <url>
    <loc>${baseUrl}/projects/${project.slug}</loc>
    <lastmod>${new Date(project.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
} 