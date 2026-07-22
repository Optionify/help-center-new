'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Built for Shopify badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/optionify-logo.png"
                alt="Optionify Logo"
                width={40}
                height={40}
                className="rounded-lg"
                priority
              />
              <span className="text-xl font-semibold text-gray-900">
                Optionify Help
              </span>
            </Link>
            {/* Official Built for Shopify badge — next to the wordmark, light asset. */}
            <a
              href="https://apps.shopify.com/optionify"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center pl-3 border-l border-gray-200"
              aria-label="Optionify is Built for Shopify — view on the Shopify App Store"
            >
              <img
                src="/badge-built-for-shopify-light.svg"
                alt="Built for Shopify"
                width={166}
                height={44}
                style={{ height: 30, width: 'auto' }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              All Articles
            </Link>
            <Link
              href="/search"
              className="text-gray-700 hover:text-primary-500 transition-colors flex items-center space-x-1"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>
            <a
              href="https://apps.shopify.com/optionify"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Install App
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/articles"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                All Articles
              </Link>
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors flex items-center space-x-1"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Link>
              <a
                href="https://apps.shopify.com/optionify"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-center"
              >
                Install App
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
