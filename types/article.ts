export interface ArticleFrontmatter {
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
  /** Optional Q&A pairs — emitted as FAQPage structured data for rich results. */
  faq?: { question: string; answer: string }[];
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: string;
}

export interface ArticleCategory {
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
}

export interface SearchResult {
  article: Article;
  score: number;
  matches: string[];
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}
