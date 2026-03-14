export interface NavItem {
  href: string;
  label: string;
}

export interface FooterSection {
  links: NavItem[];
  title: string;
}

export interface CategoryItem {
  badge?: string;
  icon: string;
  id: string;
  listings: string;
  name: string;
}

export interface ServiceItem {
  category: string;
  description: string;
  id: string;
  image: string;
  location: string;
  oldPrice?: number;
  price: number;
  providerAvatar: string;
  providerName: string;
  rating: number;
  title: string;
}

export interface ServiceTab {
  id: string;
  label: string;
  services: ServiceItem[];
}

export interface ServiceSection {
  description: string;
  id: string;
  services: ServiceItem[];
  title: string;
}

export interface TestimonialItem {
  author: string;
  avatar: string;
  id: string;
  quote: string;
  rating: number;
  title: string;
}

export interface AboutHighlight {
  description: string;
  icon: string;
  id: string;
  title: string;
}

export interface ContactDetail {
  description: string;
  icon: string;
  id: string;
  title: string;
}

export interface BlogAuthor {
  avatar: string;
  name: string;
  role?: string;
}

export interface BlogPost {
  author: BlogAuthor;
  body: string[];
  category: string;
  comments: number;
  detailImage?: string;
  excerpt: string;
  id: string;
  image: string;
  likes: number;
  publishedAt: string;
  readTime: string;
  slug: string;
  tags: string[];
  title: string;
  highlight?: string;
}

export interface ServiceCategoryStat {
  label: string;
  value: string;
}

export interface ServiceCategoryOffering {
  description: string;
  group: string;
  id: string;
  image: string;
  price: number;
  providerAvatar: string;
  providerName: string;
  rating: number;
  title: string;
  turnaround: string;
}

export interface ServiceCategoryFaq {
  answer: string;
  id: string;
  question: string;
}

export interface ServiceCategoryReview {
  avatar: string;
  id: string;
  name: string;
  quote: string;
  rating: number;
  title: string;
}

export interface ServiceCategory {
  commonServices: string[];
  description: string;
  faqs: ServiceCategoryFaq[];
  heroImage: string;
  icon: string;
  id: string;
  offerings: ServiceCategoryOffering[];
  relatedSlugs: string[];
  reviews: ServiceCategoryReview[];
  serviceCount: number;
  slug: string;
  stats: ServiceCategoryStat[];
  summary: string;
  title: string;
}

export interface PublicCity {
  id: string;
  isActive: boolean;
  name: string;
  slug: string;
}

export interface PublicCityListResponse {
  defaultCitySlug: string;
  items: PublicCity[];
}

export interface PublicCategory {
  iconKey: string | null;
  id: string;
  isActive: boolean;
  name: string;
  slug: string;
}

export interface PublicSubService {
  categoryId: string;
  id: string;
  isActive: boolean;
  name: string;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
}

export type PublicServiceSearchResultType = "category" | "subservice";
export type PublicServiceSearchType = "all" | PublicServiceSearchResultType;

export interface PublicServiceSearchResult {
  categoryName: string;
  categorySlug: string;
  citySlug: string;
  href: string;
  id: string;
  serviceSlug?: string;
  subtitle: string;
  title: string;
  type: PublicServiceSearchResultType;
}

export interface PublicServiceSearchResponse {
  citySlug: string;
  error?: string;
  items: PublicServiceSearchResult[];
  query: string;
  total: number;
}
