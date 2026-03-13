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
