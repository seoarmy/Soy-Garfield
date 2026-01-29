export enum Category {
  SEO = 'SEO',
  IA = 'IA',
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
  excerpt: string;
  author: string;
  date: string;
  category: Category;
  readTime: string;
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