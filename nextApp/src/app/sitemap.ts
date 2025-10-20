import type { MetadataRoute } from 'next';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://neuroscale-company.ru').replace(
    /\/$/,
    '',
);

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const lastModified = now.toISOString().split('T')[0];

    const routes = ['/', '/privacy', '/consent'];

    return routes.map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified,
        changeFrequency: path === '/' ? 'daily' : 'monthly',
        priority: path === '/' ? 1 : 0.6,
    }));
}
