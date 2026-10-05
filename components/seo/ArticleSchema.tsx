/**
 * Article Schema Component
 * Adds Article structured data to help center articles
 */

import { siteConfig } from '@/lib/seo-config';

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime: string;
  category: string;
  tags?: string[];
  image?: string;
  readingTime?: string;
  wordCount?: number;
}

export default function ArticleSchema({
  title,
  description,
  slug,
  publishedTime,
  modifiedTime,
  category,
  tags = [],
  image = siteConfig.ogImage,
  readingTime,
  wordCount,
}: ArticleSchemaProps) {
  const url = `${siteConfig.url}/articles/${slug}`;

  // Determine schema type based on content - use TechArticle for technical documentation
  const schemaType = title.toLowerCase().includes('how to') ? 'TechArticle' : 'Article';

  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': url,
    headline: title,
    description,
    image: [image],
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      '@type': 'Organization',
      name: 'Optionify Team',
      url: 'https://optfy.co',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Optionify',
      logo: {
        '@type': 'ImageObject',
        url: 'https://help.optfy.co/images/optionify-logo.png',
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: category,
    keywords: tags.join(', '),
    ...(wordCount && { wordCount }),
    ...(readingTime && { timeRequired: readingTime }),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    // Additional properties for TechArticle
    ...(schemaType === 'TechArticle' && {
      dependencies: 'Shopify store',
      proficiencyLevel: 'Beginner',
    }),
    // Add about property for better context
    about: {
      '@type': 'SoftwareApplication',
      name: 'Optionify',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
