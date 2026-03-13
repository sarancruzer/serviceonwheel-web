import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    author: {
      avatar: "/assets/img/user/user-02.jpg",
      name: "Robert Koch",
      role: "Technology Writer",
    },
    body: [
      "Choosing a computer service provider starts with clarity around your actual support needs. Teams usually move too quickly to pricing before checking whether the provider can handle hardware diagnostics, software maintenance, and security hardening in one workflow.",
      "A strong provider should explain its response process, escalation path, and maintenance coverage in language your team can understand. That operational clarity matters just as much as technical skill because it shapes how quickly issues are resolved under pressure.",
      "It is also worth checking how the provider documents work, communicates recommendations, and prevents repeat failures. The best partnerships are proactive, not just reactive, which means they help reduce downtime instead of only fixing it after the fact.",
    ],
    category: "Computer",
    comments: 20,
    detailImage: "/assets/img/blog-details.jpg",
    excerpt:
      "Explore practical tips to help you pick the best computer service provider, ensuring smooth and efficient operations for your company.",
    highlight:
      "Reliable service partners reduce downtime by combining technical expertise, consistent communication, and repeatable support processes.",
    id: "blog-computer-service-provider",
    image: "/assets/img/services/service-77.jpg",
    likes: 25,
    publishedAt: "09 Aug 2024",
    readTime: "6 min read",
    slug: "tips-for-selecting-a-computer-service-provider",
    tags: ["Computer", "Support", "Operations"],
    title: "Tips for Selecting a Computer Service Provider",
  },
  {
    author: {
      avatar: "/assets/img/user/user-03.jpg",
      name: "Martha Jennings",
      role: "Construction Analyst",
    },
    body: [
      "Safety is not a checklist that sits beside the work. In construction, it is part of planning, staffing, supervision, equipment handling, and communication across every phase of delivery.",
      "When evaluating a construction services company, look for visible safety routines, clear incident reporting, and a record of investing in site discipline. These signals often tell you more about long-term reliability than a polished sales presentation.",
      "Clients also benefit from asking how teams handle subcontractor alignment, protective equipment, and daily risk reviews. Providers that can answer those questions confidently are more likely to protect both project timelines and site teams.",
    ],
    category: "Construction",
    comments: 15,
    excerpt:
      "Understand why safety protocols and practices are crucial in construction projects and how to evaluate providers through that lens.",
    highlight:
      "Safety culture is one of the clearest indicators of whether a construction provider can deliver high-quality work consistently.",
    id: "blog-construction-safety",
    image: "/assets/img/services/service-78.jpg",
    likes: 20,
    publishedAt: "16 Aug 2024",
    readTime: "5 min read",
    slug: "importance-of-safety-in-construction-services",
    tags: ["Construction", "Safety", "Field Operations"],
    title: "The Importance of Safety in Construction Services",
  },
  {
    author: {
      avatar: "/assets/img/user/user-16.jpg",
      name: "Daniel Brooks",
      role: "Automotive Editor",
    },
    body: [
      "Regular professional car washes do more than improve appearance. They remove contaminants that can slowly damage paint, trim, glass, and exposed metal over time.",
      "Professional teams also tend to clean the harder-to-reach areas that typical quick washes miss, including wheel arches, lower panels, and residue-prone edges around the body. That more complete cleaning can help preserve value over the long term.",
      "For owners who care about vehicle longevity, the real advantage is consistency. A regular cleaning schedule protects the finish, makes inspection easier, and keeps minor issues from being hidden under layers of dirt and grime.",
    ],
    category: "Car Wash",
    comments: 20,
    excerpt:
      "Discover why regular professional car washes can extend the life of your vehicle, improve appearance, and protect resale value.",
    highlight:
      "Consistent professional washes protect exterior surfaces and make preventative vehicle care much easier to sustain.",
    id: "blog-car-washes",
    image: "/assets/img/services/service-79.jpg",
    likes: 25,
    publishedAt: "25 Aug 2024",
    readTime: "4 min read",
    slug: "benefits-of-regular-professional-car-washes",
    tags: ["Car Wash", "Vehicle Care", "Maintenance"],
    title: "The Benefits of Regular Professional Car Washes",
  },
  {
    author: {
      avatar: "/assets/img/user/user-03.jpg",
      name: "Emily Carter",
      role: "Home Services Contributor",
    },
    body: [
      "Home service marketplaces work best when categories are specific enough to guide discovery but broad enough to stay usable at scale. That balance helps customers search with confidence instead of guessing where a service belongs.",
      "Teams building multi-service platforms should review category performance regularly, watching where customers hesitate, where providers overlap, and where naming conventions create confusion.",
      "Clear category systems also improve content strategy. Better taxonomy means more relevant landing pages, cleaner service navigation, and stronger conversion paths from discovery to booking.",
    ],
    category: "Marketplace",
    comments: 12,
    excerpt:
      "A strong category structure makes service discovery faster, improves SEO, and reduces friction in customer booking flows.",
    id: "blog-category-strategy",
    image: "/assets/img/blog/blog-10.jpg",
    likes: 18,
    publishedAt: "02 Sep 2024",
    readTime: "7 min read",
    slug: "building-better-service-categories-for-marketplaces",
    tags: ["Marketplace", "UX", "Discovery"],
    title: "Building Better Service Categories for Marketplaces",
  },
];

export const blogCategoryCounts = blogPosts.reduce<Record<string, number>>(
  (counts, post) => {
    counts[post.category] = (counts[post.category] ?? 0) + 1;

    return counts;
  },
  {},
);

export const recentBlogPosts = blogPosts.slice(0, 3);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getRelatedBlogPosts(slug: string, category: string) {
  return blogPosts
    .filter((post) => post.slug !== slug && post.category === category)
    .slice(0, 2);
}
