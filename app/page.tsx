import Link from 'next/link';
import { Metadata } from 'next';
import { Search, ArrowRight } from 'lucide-react';
import CategoryCard from '@/components/ui/CategoryCard';
import ArticleCard from '@/components/article/ArticleCard';
import { categories } from '@/lib/categories';
import { getAllArticles, getFeaturedArticles } from '@/lib/articles';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import WebSiteSchema from '@/components/seo/WebSiteSchema';
import { generateOgMetadata, generateTwitterMetadata } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Optionify Help Center - Complete Guide to Product Customization',
  description: 'Official Optionify app documentation and tutorials. Learn how to use Optionify to add unlimited custom product options, personalization fields, and custom inputs to your Shopify store.',
  openGraph: generateOgMetadata({
    title: 'Optionify Help Center - Complete Guide to Product Customization',
    description: 'Official Optionify app documentation and tutorials. Learn how to use Optionify to add unlimited custom product options, personalization fields, and custom inputs to your Shopify store.',
    path: '/',
    type: 'website',
  }),
  twitter: generateTwitterMetadata({
    title: 'Optionify Help Center - Complete Guide to Product Customization',
    description: 'Official Optionify app documentation. Learn how to use Optionify to add unlimited custom product options to your Shopify store.',
  }),
  alternates: {
    canonical: 'https://help.optionify.co',
  },
};

export default function HomePage() {
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles().length > 0
    ? getFeaturedArticles()
    : allArticles.slice(0, 3);

  return (
    <>
      {/* Schema.org Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Optionify Help Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete guide and documentation for Optionify - Add unlimited custom product options, personalization fields, and custom inputs to your Shopify store
          </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <Link
            href="/search"
            className="flex items-center gap-3 w-full px-6 py-4 bg-white border border-gray-300 rounded-lg hover:border-primary-500 transition-colors text-left group"
          >
            <Search className="w-5 h-5 text-gray-400 group-hover:text-primary-500" />
            <span className="text-gray-500">Search for articles, guides, and answers...</span>
          </Link>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Articles
            </h2>
            <Link
              href="/articles"
              className="text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const articleCount = allArticles.filter(
              (article) => article.frontmatter.category === category.slug
            ).length;

            return (
              <CategoryCard
                key={category.slug}
                category={category}
                articleCount={articleCount}
              />
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section className="mt-16 p-8 bg-primary-50 rounded-lg border border-primary-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Quick Start
        </h2>
        <p className="text-gray-700 mb-6">
          New to Optionify? Start here to learn the basics and create your first custom product option.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/articles/getting-started-with-optionify"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/articles/creating-your-first-product-option"
            className="px-6 py-3 bg-white text-primary-500 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-primary-200"
          >
            Create Your First Option
          </Link>
        </div>
      </section>

      {/* Install App CTA */}
      <section className="mt-16 p-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Add Custom Options to Your Store?
        </h2>
        <p className="text-primary-50 text-lg mb-6 max-w-2xl mx-auto">
          Install Optionify from the Shopify App Store and start customizing your products in minutes. 17 option types, unlimited possibilities.
        </p>
        <a
          href="https://apps.shopify.com/optionify"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg"
        >
          Install Optionify Now
        </a>
      </section>
      </div>
    </>
  );
}
