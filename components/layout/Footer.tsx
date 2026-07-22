import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/optionify-logo.png"
                alt="Optionify Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg font-semibold text-gray-900">
                Optionify
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Add custom product options to your Shopify store with ease.
              17 option types, 4 assignment methods, unlimited possibilities.
            </p>
            {/* Official Built for Shopify badge — Optionify holds BFS status.
                Renders Shopify's unaltered light asset (footer is a light surface),
                one instance per page, links to the App Store listing. */}
            <a
              href="https://apps.shopify.com/optionify"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6"
              aria-label="Optionify is Built for Shopify — view on the Shopify App Store"
            >
              <img
                src="/badge-built-for-shopify-light.svg"
                alt="Built for Shopify"
                width={166}
                height={44}
                style={{ height: 36, width: 'auto' }}
              />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
                >
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
                >
                  Search
                </Link>
              </li>
              <li>
                <a
                  href="https://apps.shopify.com/optionify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-500 hover:text-primary-600 transition-colors font-medium"
                >
                  Install App →
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articles/category/getting-started"
                  className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/category/option-types"
                  className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
                >
                  Option Types
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/category/advanced"
                  className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
                >
                  Advanced Topics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} Optionify. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
