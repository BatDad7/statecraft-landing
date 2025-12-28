import { MetadataRoute } from 'next';
import { Redis } from '@upstash/redis';

// Note: In a real production environment, you would use your actual domain
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://statecraft-landing.vercel.app';

/**
 * Mock function to simulate fetching dynamic slugs from your database
 * In Phase 4, we use Upstash Redis to store the intel_archive list.
 */
async function getArchivedIntelSlugs() {
  try {
    const redis = Redis.fromEnv();
    const archive = await redis.lrange('intel_archive', 0, -1);
    
    // Extract unique slugs from the archived data
    return (archive as any[]).map((item) => item.seo_slug);
  } catch (error) {
    console.error('Sitemap: Failed to fetch archived intel slugs', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Dynamic Routes (Intelligence Briefings)
  // Even if the route /briefings/[slug] is not yet fully implemented in the UI,
  // we prepare the sitemap for the Programmatic SEO archival strategy.
  const slugs = await getArchivedIntelSlugs();
  const dynamicRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/briefings/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}



