# Optionify Help Center

A modern, fast, and SEO-optimized help center built with Next.js 14, MDX, and Tailwind CSS for the Optionify Shopify app.

## 🚀 Features

- ✅ **17 Comprehensive Articles** covering all Optionify features
- ✅ **Modern UI** with responsive design and dark mode support
- ✅ **Fast Performance** - Optimized for Core Web Vitals
- ✅ **SEO Optimized** - Meta tags, sitemap, structured data
- ✅ **Search Functionality** - Client-side fuzzy search
- ✅ **Table of Contents** - Auto-generated for each article
- ✅ **MDX Support** - Rich content with custom components
- ✅ **Category Organization** - 3 main categories
- ✅ **Mobile Responsive** - Perfect on all devices
- ✅ **Zero Cost Hosting** - Deploy free on Vercel

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Adding New Articles](#adding-new-articles)
- [Customization](#customization)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

```bash
# Clone or navigate to project directory
cd helpoptionify

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Visit http://localhost:3000
```

The site will be running at `http://localhost:3000`

## 📁 Project Structure

```
helpoptionify/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── articles/
│   │   ├── page.tsx            # All articles page
│   │   ├── [slug]/page.tsx     # Dynamic article pages
│   │   └── category/
│   │       └── [category]/page.tsx  # Category pages
│   ├── search/page.tsx          # Search page
│   ├── api/articles/route.ts    # Articles API
│   ├── sitemap.ts              # Dynamic sitemap
│   └── not-found.tsx           # 404 page
│
├── components/                   # React components
│   ├── layout/
│   │   ├── Header.tsx          # Site header with navigation
│   │   ├── Footer.tsx          # Site footer
│   │   └── Sidebar.tsx         # Category sidebar
│   ├── article/
│   │   ├── ArticleCard.tsx     # Article preview cards
│   │   ├── TableOfContents.tsx # Auto-generated TOC
│   │   ├── Breadcrumb.tsx      # Breadcrumb navigation
│   │   ├── RelatedArticles.tsx # Related content
│   │   └── ArticleNavigation.tsx # Previous/Next links
│   ├── ui/
│   │   ├── SearchBar.tsx       # Search input
│   │   ├── CategoryCard.tsx    # Category cards
│   │   ├── Callout.tsx         # Tip/Warning/Info/Success boxes
│   │   └── FeedbackWidget.tsx  # "Was this helpful?" widget
│   └── MDXComponents.tsx        # Custom MDX components
│
├── content/articles/             # MDX article files
│   ├── getting-started-with-optionify.mdx
│   ├── creating-your-first-product-option.mdx
│   ├── understanding-assign-types.mdx
│   ├── text-options.mdx
│   ├── textarea-options.mdx
│   └── ... (17 total articles)
│
├── lib/                          # Utility functions
│   ├── articles.ts              # Article CRUD operations
│   ├── search.ts                # Search functionality
│   └── categories.ts            # Category definitions
│
├── types/
│   └── article.ts               # TypeScript types
│
├── public/
│   ├── robots.txt               # SEO robots file
│   └── images/                  # Article images (placeholders)
│
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

## 💻 Local Development

### Running the Development Server

```bash
npm run dev
```

- Opens at `http://localhost:3000`
- Hot reload enabled
- TypeScript type checking
- Fast Refresh for React components

### Build for Production

```bash
npm run build
```

- Creates optimized production build
- Generates static pages
- Optimizes images
- Creates sitemap

### Start Production Server

```bash
npm run build
npm start
```

Test the production build locally.

## ✍️ Adding New Articles

### Step 1: Create MDX File

Create a new file in `content/articles/`:

```mdx
---
title: "Your Article Title"
description: "A brief description for SEO"
category: "getting-started" # or "option-types" or "advanced"
lastUpdated: "2024-01-15"
tags: ["tag1", "tag2"]
featured: false
order: 19
---

## Your First Heading

Your content here with **markdown** formatting.

<Tip>
Use custom callout components for emphasis!
</Tip>

## Second Section

More content...
```

### Step 2: Add to Categories (if needed)

Edit `lib/categories.ts` to add your article to the sidebar:

```typescript
{
  name: 'Your Category',
  slug: 'your-category',
  articles: [
    { slug: 'your-article-slug', title: 'Your Article Title' },
  ],
}
```

### Step 3: Test

```bash
npm run dev
# Visit http://localhost:3000/articles/your-article-slug
```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    600: '#your-color',  // Main brand color
    // ... other shades
  },
}
```

### Modify Header/Footer

- **Header**: Edit `components/layout/Header.tsx`
- **Footer**: Edit `components/layout/Footer.tsx`
- **Logo**: Replace logo in Header component

### Add New Components

Create in `components/ui/` and import in MDX files:

```tsx
// components/ui/MyComponent.tsx
export function MyComponent() {
  return <div>Custom component</div>
}

// Add to MDXComponents.tsx
import { MyComponent } from './ui/MyComponent';

const components = {
  // ...
  MyComponent,
};
```

### Custom Callout Styles

Edit `components/ui/Callout.tsx` to modify:
- Colors
- Icons
- Border styles
- Spacing

## 🚀 Deployment

### Deploy to Vercel (Recommended - FREE)

#### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Method 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel auto-detects Next.js
5. Click "Deploy"

### Custom Domain Setup

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add `help.optfy.co`

2. **In Your DNS Provider:**

   Add these DNS records:

   ```
   Type: CNAME
   Name: help
   Value: cname.vercel-dns.com
   ```

   Or for A record:
   ```
   Type: A
   Name: help
   Value: 76.76.21.21
   ```

3. **Wait for Propagation**
   - Usually takes 5-30 minutes
   - Vercel auto-provisions SSL certificate
   - Site will be live at `https://help.optfy.co`

### Environment Variables

If you add any environment variables:

```bash
# .env.local (don't commit this)
NEXT_PUBLIC_SITE_URL=https://help.optfy.co
```

Add in Vercel dashboard under Settings → Environment Variables

## 🔧 Troubleshooting

### Build Errors

**Error: Module not found**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Check types
npm run build
```

### Articles Not Showing

1. Check file is in `content/articles/`
2. Verify frontmatter is correct
3. Check category slug matches
4. Restart dev server

### Images Not Loading

- Images should be in `/public/images/`
- Reference as `./images/folder/image.png` in MDX
- Or use `/images/folder/image.png` for public path

### Search Not Working

- Check `app/api/articles/route.ts` exists
- Verify articles are being fetched
- Clear browser cache

### Styling Issues

```bash
# Rebuild Tailwind
npm run dev
# Clear .next folder
rm -rf .next
npm run dev
```

## 📝 Content Guidelines

### Writing Articles

- **Length**: 1000-2000 words for detailed guides
- **Headings**: Use H2 (##) and H3 (###) for structure
- **Examples**: Include code examples and use cases
- **Images**: Add placeholder references for screenshots
- **Callouts**: Use Tip, Warning, Info, Success boxes

### MDX Components Available

```mdx
<Tip>
Helpful tips for users
</Tip>

<Warning>
Important warnings and cautions
</Warning>

<Info>
General information and notes
</Info>

<Success>
Success messages and best practices
</Success>
```

### Code Blocks

```mdx
\`\`\`javascript
const example = "Code with syntax highlighting";
\`\`\`
```

Supports: javascript, typescript, bash, json, html, css, etc.

## 🔍 SEO Optimization

The site includes:

- ✅ Dynamic meta tags for each article
- ✅ Open Graph tags for social sharing
- ✅ Auto-generated sitemap.xml
- ✅ robots.txt file
- ✅ Semantic HTML structure
- ✅ Fast loading times
- ✅ Mobile-responsive design
- ✅ Structured data (JSON-LD)

### Checking SEO

Test your deployment:

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse (built into Chrome DevTools)]

## 📊 Analytics (Optional)

To add analytics, create `app/analytics.tsx`:

```tsx
'use client';

export function Analytics() {
  // Add Google Analytics, Plausible, etc.
  return null;
}
```

Import in `app/layout.tsx`.

## 🤝 Contributing

### Adding More Articles

1. Create MDX file
2. Follow existing format
3. Test locally
4. Deploy

### Improving Existing Content

- Fix typos
- Add examples
- Update screenshots
- Enhance SEO

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown + React)
- **Icons**: Lucide React
- **Search**: Fuse.js
- **Syntax Highlighting**: react-syntax-highlighter
- **Hosting**: Vercel
- **TypeScript**: Full type safety

## 🆘 Support

- **Documentation**: This README
- **Issues**: Create an issue in your repository
- **Questions**: Check existing articles

## 📄 License

This project is for the Optionify help center.

---

## 🎉 You're All Set!

Your help center is ready to deploy. Run `npm run dev` to start developing, and `vercel` to deploy to production.

**Happy documenting! 📚**
