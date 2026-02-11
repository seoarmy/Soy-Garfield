export enum Category {
  SEO = 'SEO',
  IA = 'IA',
  SOCIAL = 'Social Media',
  ANALYTICS = 'Analítica',
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level: 2 | 3 }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'code'; code: string; language?: string }
  | { type: 'checklist'; items: string[] };

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  authorSlug?: string;
  authorRole?: string;
  authorImage?: string;
  authorBio?: string;
  authorLinkedIn?: string;
  authorTwitter?: string;
  seoTitle?: string;
  seoDescription?: string;
  date: string;
  category: Category;
  readTime: string;
  tags?: string[];
  imageUrl: string;
  isFeatured?: boolean;
  content: ContentBlock[];
}

export interface WriterForm {
  fullName: string;
  email: string;
  linkedinUrl: string;
  topicProposal: string;
  sampleContent: string;
}

export interface NavItem {
  label: string;
  path: string;
}