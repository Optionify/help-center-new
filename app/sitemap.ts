import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { categories } from '@/lib/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://help.optfy.co';
  const articles = getAllArticles();

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Category pages
  categories.forEach((category) => {
    routes.push({
      url: `${baseUrl}/articles/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Article pages
  articles.forEach((article) => {
    // Calculate priority based on featured status and last update
    const isRecent = new Date(article.frontmatter.lastUpdated) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Updated within 30 days
    const isFeatured = article.frontmatter.featured === true;

    // Priority: Featured + Recent = 0.9, Featured = 0.85, Recent = 0.8, Default = 0.75
    let priority = 0.75;
    if (isFeatured && isRecent) {
      priority = 0.9;
    } else if (isFeatured) {
      priority = 0.85;
    } else if (isRecent) {
      priority = 0.8;
    }

    // Change frequency based on last update
    let changeFrequency: 'weekly' | 'monthly' = 'monthly';
    if (isRecent) {
      changeFrequency = 'weekly';
    }

    routes.push({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.frontmatter.lastUpdated),
      changeFrequency,
      priority,
    });
  });

  return routes;
}
