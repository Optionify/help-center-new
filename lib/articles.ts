import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Article, ArticleFrontmatter, TableOfContentsItem } from '@/types/article';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

// Get all article slugs
export function getAllArticleSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    return [];
  }
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      frontmatter: data as ArticleFrontmatter,
      content,
      readingTime: stats.text,
    };
  } catch (error) {
    return null;
  }
}

// Get all articles
export function getAllArticles(): Article[] {
  const slugs = getAllArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      // Sort by order if available, otherwise by date
      if (a.frontmatter.order && b.frontmatter.order) {
        return a.frontmatter.order - b.frontmatter.order;
      }
      return new Date(b.frontmatter.lastUpdated).getTime() - new Date(a.frontmatter.lastUpdated).getTime();
    });

  return articles;
}

// Get articles by category
export function getArticlesByCategory(category: string): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.frontmatter.category === category);
}

// Get related articles, ranked by shared-tag overlap (cross-category), then
// same-category, so related links are genuinely relevant instead of just the
// next few articles in the same category.
export function getRelatedArticles(slug: string, limit: number = 3): Article[] {
  const currentArticle = getArticleBySlug(slug);
  if (!currentArticle) return [];

  const currentTags = new Set(
    (currentArticle.frontmatter.tags || []).map((t) => t.toLowerCase())
  );
  const currentCategory = currentArticle.frontmatter.category;

  return getAllArticles()
    .filter((article) => article.slug !== slug)
    .map((article) => {
      const tags = (article.frontmatter.tags || []).map((t) => t.toLowerCase());
      const overlap = tags.filter((t) => currentTags.has(t)).length;
      const sameCategory = article.frontmatter.category === currentCategory ? 1 : 0;
      return { article, score: overlap * 2 + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}

// Get previous and next articles
export function getAdjacentArticles(slug: string): { previous?: Article; next?: Article } {
  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex((article) => article.slug === slug);

  if (currentIndex === -1) return {};

  return {
    previous: currentIndex > 0 ? allArticles[currentIndex - 1] : undefined,
    next: currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : undefined,
  };
}

// Extract table of contents from MDX content
export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    toc.push({ id, text, level });
  }

  return toc;
}

// Get featured articles
export function getFeaturedArticles(limit: number = 3): Article[] {
  const allArticles = getAllArticles();
  return allArticles
    .filter((article) => article.frontmatter.featured)
    .slice(0, limit);
}
