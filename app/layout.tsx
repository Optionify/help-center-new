import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig, generateOgMetadata, generateTwitterMetadata, generateRobots } from '@/lib/seo-config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Shopify Product Options & Custom Fields Tutorial',
    template: '%s | Optionify',
  },
  description: 'Learn how to add custom product options, text inputs, file uploads, and unlimited fields to your Shopify store. Complete tutorials for product customization.',
  keywords: siteConfig.keywords,
  authors: [{ name: 'Optionify Team', url: 'https://optionify.co' }],
  creator: 'Optionify',
  publisher: 'Optionify',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: generateOgMetadata({
    title: 'Shopify Product Options & Custom Fields Guide',
    description: 'Learn how to add custom product options, text inputs, file uploads, and unlimited fields to your Shopify store. Complete tutorials for product customization.',
    path: '/',
    type: 'website',
  }),
  twitter: generateTwitterMetadata({
    title: 'Shopify Product Options & Custom Fields Guide',
    description: 'Learn how to add custom product options, text inputs, file uploads, and unlimited fields to your Shopify store. Complete tutorials.',
  }),
  robots: generateRobots(),
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: 'b21d48e1f68b836a',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
