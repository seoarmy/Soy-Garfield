export enum Category {
  SEO = 'SEO',
  PPC = 'PPC',
  AI = 'AI & Automation',
  CONTENT = 'Content Marketing',
  ANALYTICS = 'Data & Analytics',
}

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