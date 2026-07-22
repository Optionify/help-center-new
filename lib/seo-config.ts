/**
 * SEO Configuration for Optionify Help Center
 * Centralized SEO settings and metadata generation
 */

export const siteConfig = {
  name: 'Optionify Help Center',
  url: 'https://help.optionify.co',
  appUrl: 'https://apps.shopify.com/optionify',
  description: 'Official Optionify app documentation and tutorials. Learn how to use Optionify to add unlimited custom product options, personalization fields, and custom inputs to your Shopify store.',
  ogImage: 'https://help.optionify.co/images/og-image.png',
  keywords: [
    // Optionify-specific
    'optionify',
    'optionify app',
    'optionify shopify',
    'optionify tutorial',
    'optionify help',
    'optionify guide',

    // Shopify product options
    'shopify product options',
    'shopify custom fields',
    'shopify text input',
    'shopify product customization',
    'shopify personalization',
    'add custom fields shopify',
    'shopify product variants',
    'shopify custom options',

    // Input types
    'shopify text field',
    'shopify text input field',
    'shopify date picker',
    'shopify date selection',
    'shopify calendar',
    'shopify radio buttons',
    'shopify radio options',
    'shopify checkbox',
    'shopify dropdown options',
    'shopify file upload',
    'shopify color picker',
    'shopify number input',
    'shopify email field',

    // Use cases
    'shopify engraving options',
    'shopify monogram',
    'shopify personalized products',
    'shopify custom text',
    'shopify delivery date',
    'shopify pickup date',
    'shopify size selector',
    'shopify variant selector',

    // General
    'unlimited shopify variants',
    'shopify product builder',
    'shopify custom product',
    'shopify product options app',
    'shopify customization app',
    'shopify validation',
    'shopify custom error messages',
  ],
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Optionify',
  url: 'https://optionify.co',
  logo: 'https://help.optionify.co/images/optionify-logo.png',
  sameAs: [
    'https://apps.shopify.com/optionify',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'help@optionify.co',
  },
};

/**
 * Generate optimized page title (50-60 characters for SEO)
 */
export function generateTitle(title: string, includeTemplate = true): string {
  if (!includeTemplate) {
    // Truncate to 60 characters if too long
    return title.length > 60 ? `${title.substring(0, 57)}...` : title;
  }

  const fullTitle = `${title} | Optionify`;
  return fullTitle.length > 60 ? title : fullTitle;
}

/**
 * Generate optimized meta description (150-160 characters for SEO)
 */
export function generateDescription(description: string): string {
  if (description.length <= 160) {
    return description;
  }

  // Truncate to 157 characters and add ellipsis
  return `${description.substring(0, 157)}...`;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  // Remove trailing slashes and ensure clean URLs
  const cleanPath = path.replace(/\/+$/, '');
  return `${siteConfig.url}${cleanPath}`;
}

/**
 * Generate Open Graph metadata
 */
export function generateOgMetadata(params: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}) {
  const {
    title,
    description,
    path,
    image = siteConfig.ogImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    section,
    tags,
  } = params;

  return {
    title: generateTitle(title, false),
    description: generateDescription(description),
    url: generateCanonicalUrl(path),
    siteName: siteConfig.name,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: 'en_US',
    type,
    ...(type === 'article' && {
      publishedTime,
      modifiedTime,
      section,
      tags,
      authors: ['Optionify Team'],
    }),
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterMetadata(params: {
  title: string;
  description: string;
  image?: string;
}) {
  const { title, description, image = siteConfig.ogImage } = params;

  return {
    card: 'summary_large_image' as const,
    title: generateTitle(title, false),
    description: generateDescription(description),
    images: [image],
  };
}

/**
 * Generate robots meta tag
 */
export function generateRobots(params?: {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  noimageindex?: boolean;
}) {
  const {
    index = true,
    follow = true,
    noarchive = false,
    noimageindex = false,
  } = params || {};

  return {
    index,
    follow,
    ...(noarchive && { noarchive: true }),
    ...(noimageindex && { noimageindex: true }),
    googleBot: {
      index,
      follow,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  };
}
