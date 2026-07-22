import { notFound } from 'next/navigation';
import { Clock, Calendar } from 'lucide-react';
import Breadcrumb from '@/components/article/Breadcrumb';
import TableOfContents from '@/components/article/TableOfContents';
import RelatedArticles from '@/components/article/RelatedArticles';
import ArticleNavigation from '@/components/article/ArticleNavigation';
import FeedbackWidget from '@/components/ui/FeedbackWidget';
import SocialShare from '@/components/ui/SocialShare';
import ArticleSchema from '@/components/seo/ArticleSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
  getAdjacentArticles,
  extractTableOfContents,
} from '@/lib/articles';
import { categories } from '@/lib/categories';
import { marked } from 'marked';

// Give rendered <h2>/<h3> the same id slugs the TOC generates, so in-page
// anchor links (and Google "jump to section" deep links) actually work.
const slugifyHeading = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

marked.use({
  renderer: {
    heading(token: { text?: string; depth: number; tokens: unknown[] }): string {
      const inner = (this as { parser: { parseInline: (t: unknown[]) => string } }).parser.parseInline(token.tokens);
      const id = slugifyHeading(token.text ?? '');
      return `<h${token.depth} id="${id}">${inner}</h${token.depth}>\n`;
    },
  },
});
import { generateOgMetadata, generateTwitterMetadata, generateCanonicalUrl } from '@/lib/seo-config';

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const category = categories.find((cat) => cat.slug === article.frontmatter.category);
  const articlePath = `/articles/${params.slug}`;

  // Create Shopify-focused title
  const shopifyTitle = `${article.frontmatter.title} - Shopify Tutorial`;

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    keywords: [
      ...(article.frontmatter.tags || []),
      'shopify',
      'shopify tutorial',
      'shopify guide',
      'shopify app',
      'shopify help',
      'product options',
      'custom fields',
      'optionify',
      'optionify shopify',
      'shopify product customization',
      'shopify product options',
      'shopify custom fields',
      'how to use shopify',
    ],
    authors: [{ name: 'Optionify Team', url: 'https://optionify.co' }],
    openGraph: generateOgMetadata({
      title: shopifyTitle,
      description: article.frontmatter.description,
      path: articlePath,
      type: 'article',
      publishedTime: new Date(article.frontmatter.lastUpdated).toISOString(),
      modifiedTime: new Date(article.frontmatter.lastUpdated).toISOString(),
      section: category?.name,
      tags: article.frontmatter.tags,
    }),
    twitter: generateTwitterMetadata({
      title: shopifyTitle,
      description: article.frontmatter.description,
    }),
    alternates: {
      canonical: generateCanonicalUrl(articlePath),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(params.slug);
  const { previous, next } = getAdjacentArticles(params.slug);
  const toc = extractTableOfContents(article.content);

  // Convert markdown to HTML
  const htmlContent = marked(article.content);

  const category = categories.find((cat) => cat.slug === article.frontmatter.category);

  // Breadcrumb items for both UI and schema
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: category?.name || 'Category', href: `/articles/category/${article.frontmatter.category}` },
    { label: article.frontmatter.title },
  ];

  // Calculate word count from content
  const wordCount = article.content.split(/\s+/).length;

  return (
    <>
      {/* Schema.org Structured Data */}
      <ArticleSchema
        title={article.frontmatter.title}
        description={article.frontmatter.description}
        slug={params.slug}
        publishedTime={new Date(article.frontmatter.lastUpdated).toISOString()}
        modifiedTime={new Date(article.frontmatter.lastUpdated).toISOString()}
        category={category?.name || article.frontmatter.category}
        tags={article.frontmatter.tags}
        readingTime={article.readingTime}
        wordCount={wordCount}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {article.frontmatter.faq && article.frontmatter.faq.length > 0 && (
        <FAQSchema items={article.frontmatter.faq} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9">
            <Breadcrumb items={breadcrumbItems.slice(1)} />

          {/* Article Header */}
          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {article.frontmatter.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {article.frontmatter.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readingTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Updated {article.frontmatter.lastUpdated}</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="article-content">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>

            {/* Social Sharing */}
            <SocialShare
              title={article.frontmatter.title}
              url={`https://help.optionify.co/articles/${params.slug}`}
              description={article.frontmatter.description}
            />

            {/* Feedback Widget */}
            <FeedbackWidget />

            {/* Navigation */}
            <ArticleNavigation previous={previous} next={next} />

            {/* Related Articles */}
            <RelatedArticles articles={relatedArticles} />
          </article>
        </div>

        {/* Sidebar - Table of Contents */}
        <aside className="hidden lg:block lg:col-span-3">
          <TableOfContents items={toc} />
        </aside>
        </div>
      </div>
    </>
  );
}
