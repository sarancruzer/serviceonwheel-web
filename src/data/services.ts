import type {
  ServiceCategory,
  ServiceCategoryFaq,
  ServiceCategoryOffering,
  ServiceCategoryReview,
  ServiceCategoryStat,
} from "@/types";

type ServiceCategorySeed = {
  commonServices: string[];
  description: string;
  heroImage: string;
  icon: string;
  id: string;
  relatedSlugs: string[];
  serviceCount: number;
  slug: string;
  startingPrice: number;
  summary: string;
  title: string;
};

const providerPool = [
  { avatar: "/assets/img/profiles/avatar-01.jpg", name: "Alex Jordan" },
  { avatar: "/assets/img/profiles/avatar-02.jpg", name: "Emma Blair" },
  { avatar: "/assets/img/profiles/avatar-03.jpg", name: "Liam Carter" },
  { avatar: "/assets/img/profiles/avatar-04.jpg", name: "Sophia Adams" },
  { avatar: "/assets/img/profiles/avatar-05.jpg", name: "Noah Brooks" },
] as const;

const serviceGallery = [
  "/assets/img/services/service-54.jpg",
  "/assets/img/services/service-55.jpg",
  "/assets/img/services/service-57.jpg",
  "/assets/img/services/service-58.jpg",
  "/assets/img/services/service-59.jpg",
  "/assets/img/services/service-60.jpg",
  "/assets/img/services/service-61.jpg",
  "/assets/img/services/service-62.jpg",
  "/assets/img/services/service-63.jpg",
] as const;

const reviewPool = [
  {
    avatar: "/assets/img/profiles/avatar-12.jpg",
    name: "Ava Mitchell",
    quote:
      "Booking was smooth, the technician arrived on time, and the work area was left clean after completion.",
    rating: 5,
    title: "Quick and professional",
  },
  {
    avatar: "/assets/img/profiles/avatar-13.jpg",
    name: "Mason Reed",
    quote:
      "The pricing felt fair, the communication was clear, and the service quality matched what was promised on the page.",
    rating: 4,
    title: "Reliable experience",
  },
  {
    avatar: "/assets/img/profiles/avatar-14.jpg",
    name: "Olivia Stone",
    quote:
      "I appreciated the updates before arrival and the practical suggestions shared after the job was completed.",
    rating: 5,
    title: "Helpful guidance",
  },
] as const;

function getSeedItem<T>(items: readonly T[], index: number): T {
  const item = items[index % items.length];

  if (!item) {
    throw new Error("Expected seeded catalog data to be available.");
  }

  return item;
}

const categorySeeds: ServiceCategorySeed[] = [
  {
    commonServices: [
      "Split AC installation",
      "Cooling issue repair",
      "Gas leakage inspection",
      "Annual maintenance",
      "AC relocation",
      "Deep cleaning",
    ],
    description:
      "Book trusted air-conditioner specialists for installation, cooling restoration, and routine care.",
    heroImage: "/assets/img/services/service-75.jpg",
    icon: "/assets/img/icons/category-06.svg",
    id: "air-conditioner",
    relatedSlugs: ["washing-machine", "refrigerator", "electrician"],
    serviceCount: 18,
    slug: "air-conditioner",
    startingPrice: 24,
    summary:
      "Installation, cooling repair, gas charging, and seasonal maintenance.",
    title: "Air Conditioner",
  },
  {
    commonServices: [
      "Hair styling",
      "Bridal makeup",
      "Facial cleanup",
      "Manicure & pedicure",
      "Waxing services",
      "Party makeup",
    ],
    description:
      "Salon professionals for grooming, styling, and on-demand beauty appointments at home.",
    heroImage: "/assets/img/services/service-76.jpg",
    icon: "/assets/img/icons/category-07.svg",
    id: "beauty-salon",
    relatedSlugs: ["cleaning", "home-painter", "carpenter"],
    serviceCount: 22,
    slug: "beauty-salon",
    startingPrice: 19,
    summary:
      "Home salon appointments for grooming, beauty, and occasion styling.",
    title: "Beauty Salon",
  },
  {
    commonServices: [
      "Cooling issue repair",
      "Compressor check",
      "Thermostat replacement",
      "Door seal repair",
      "Gas refill support",
      "Deep cleaning",
    ],
    description:
      "Refrigerator repair and maintenance services for common cooling, leakage, and power issues.",
    heroImage: "/assets/img/services/service-77.jpg",
    icon: "/assets/img/icons/category-08.svg",
    id: "refrigerator",
    relatedSlugs: ["air-conditioner", "washing-machine", "electrician"],
    serviceCount: 14,
    slug: "refrigerator",
    startingPrice: 21,
    summary:
      "Cooling repair, cleaning, thermostat fixes, and refrigerator installation help.",
    title: "Refrigerator",
  },
  {
    commonServices: [
      "Heating issue repair",
      "Installation service",
      "Leakage inspection",
      "Thermostat replacement",
      "Pilot ignition repair",
      "Maintenance visit",
    ],
    description:
      "Geyser installation and repair specialists for water heating, safety checks, and leak prevention.",
    heroImage: "/assets/img/services/service-78.jpg",
    icon: "/assets/img/icons/category-09.svg",
    id: "geyser",
    relatedSlugs: ["plumber", "electrician", "kitchen-chimney"],
    serviceCount: 12,
    slug: "geyser",
    startingPrice: 20,
    summary:
      "Heating repair, installation, thermostat fixes, and leak inspection.",
    title: "Geyser",
  },
  {
    commonServices: [
      "Home deep cleaning",
      "Bathroom cleaning",
      "Kitchen cleaning",
      "Sofa shampooing",
      "Move-in cleaning",
      "Office cleaning",
    ],
    description:
      "Flexible cleaning services for homes and offices, from deep cleans to recurring visits.",
    heroImage: "/assets/img/services/service-79.jpg",
    icon: "/assets/img/icons/category-13.svg",
    id: "cleaning",
    relatedSlugs: ["beauty-salon", "kitchen-chimney", "water-purifier"],
    serviceCount: 26,
    slug: "cleaning",
    startingPrice: 15,
    summary: "Routine, deep, kitchen, bathroom, and move-in cleaning packages.",
    title: "Cleaning",
  },
  {
    commonServices: [
      "Spin issue repair",
      "Drainage issue repair",
      "Installation service",
      "No power diagnosis",
      "Door lock repair",
      "Machine cleaning",
    ],
    description:
      "Washing machine specialists for installation, maintenance, and common repair needs.",
    heroImage: "/assets/img/services/service-88.jpg",
    icon: "/assets/img/icons/category-11.svg",
    id: "washing-machine",
    relatedSlugs: ["refrigerator", "air-conditioner", "electrician"],
    serviceCount: 16,
    slug: "washing-machine",
    startingPrice: 22,
    summary:
      "Drainage, spin, installation, power diagnostics, and machine cleaning.",
    title: "Washing Machine",
  },
  {
    commonServices: [
      "Filter cleaning",
      "Motor repair",
      "Duct replacement",
      "Installation service",
      "Noise issue diagnosis",
      "AMC support",
    ],
    description:
      "Kitchen chimney care for cleaning, suction issues, installation, and long-term maintenance.",
    heroImage: "/assets/img/services/service-81.jpg",
    icon: "/assets/img/icons/category-12.svg",
    id: "kitchen-chimney",
    relatedSlugs: ["cleaning", "electrician", "geyser"],
    serviceCount: 10,
    slug: "kitchen-chimney",
    startingPrice: 18,
    summary:
      "Cleaning, motor repair, installation, and suction performance support.",
    title: "Kitchen Chimney",
  },
  {
    commonServices: [
      "Door fitting",
      "Wardrobe repair",
      "Custom shelving",
      "Window adjustment",
      "Furniture assembly",
      "Polish touch-up",
    ],
    description:
      "Carpentry experts for repairs, fittings, furniture support, and custom woodwork.",
    heroImage: "/assets/img/services/service-82.jpg",
    icon: "/assets/img/icons/category-01.svg",
    id: "carpenter",
    relatedSlugs: ["home-painter", "electrician", "plumber"],
    serviceCount: 20,
    slug: "carpenter",
    startingPrice: 23,
    summary:
      "Furniture repair, fittings, door work, and custom carpentry help.",
    title: "Carpenter",
  },
  {
    commonServices: [
      "Switch & socket repair",
      "Ceiling fan installation",
      "House wiring",
      "Light fitting replacement",
      "Inverter setup",
      "MCB & DB maintenance",
    ],
    description:
      "Professional electricians for repair, installation, safety checks, and urgent breakdown support.",
    heroImage: "/assets/img/services/service-83.jpg",
    icon: "/assets/img/icons/category-05.svg",
    id: "electrician",
    relatedSlugs: ["plumber", "carpenter", "air-conditioner"],
    serviceCount: 28,
    slug: "electrician",
    startingPrice: 17,
    summary:
      "Wiring, fixtures, fans, lighting, switchboards, and inverter support.",
    title: "Electrician",
  },
  {
    commonServices: [
      "Tap repair",
      "Leakage detection",
      "Sink installation",
      "Pipe replacement",
      "Water pressure check",
      "Drain blockage clearing",
    ],
    description:
      "Plumbing support for leaks, fittings, drainage issues, and water flow problems.",
    heroImage: "/assets/img/services/service-84.jpg",
    icon: "/assets/img/icons/category-10.svg",
    id: "plumber",
    relatedSlugs: ["electrician", "geyser", "kitchen-chimney"],
    serviceCount: 19,
    slug: "plumber",
    startingPrice: 18,
    summary:
      "Leaks, fittings, drainage clearing, and routine plumbing maintenance.",
    title: "Plumber",
  },
  {
    commonServices: [
      "System setup",
      "Desktop repair",
      "OS installation",
      "Printer troubleshooting",
      "Data backup support",
      "Network configuration",
    ],
    description:
      "Computer repair and setup support for devices, software, and small office systems.",
    heroImage: "/assets/img/services/service-94.jpg",
    icon: "/assets/img/icons/category-04.svg",
    id: "computer-repair",
    relatedSlugs: ["electrician", "cctv-camera", "air-conditioner"],
    serviceCount: 13,
    slug: "computer-repair",
    startingPrice: 25,
    summary:
      "Repair, setup, backup, software installation, and workstation support.",
    title: "Computer Repair",
  },
  {
    commonServices: [
      "Interior wall painting",
      "Texture touch-up",
      "Exterior coating",
      "Waterproof primer",
      "Ceiling paint refresh",
      "Color consultation",
    ],
    description:
      "Painting professionals for interior refreshes, exteriors, and finish touch-ups.",
    heroImage: "/assets/img/services/service-95.jpg",
    icon: "/assets/img/icons/category-14.svg",
    id: "home-painter",
    relatedSlugs: ["carpenter", "cleaning", "electrician"],
    serviceCount: 11,
    slug: "home-painter",
    startingPrice: 28,
    summary:
      "Interior, exterior, texture, and primer work for homes and offices.",
    title: "Home Painter",
  },
  {
    commonServices: [
      "Camera installation",
      "DVR configuration",
      "Remote access setup",
      "Camera replacement",
      "Wiring cleanup",
      "Annual service visit",
    ],
    description:
      "CCTV installation and monitoring setup for homes, shops, and small offices.",
    heroImage: "/assets/img/services/service-96.jpg",
    icon: "/assets/img/icons/category-17.svg",
    id: "cctv-camera",
    relatedSlugs: ["electrician", "computer-repair", "carpenter"],
    serviceCount: 9,
    slug: "cctv-camera",
    startingPrice: 30,
    summary:
      "Installation, DVR setup, camera replacement, and remote viewing support.",
    title: "CCTV Camera",
  },
  {
    commonServices: [
      "RO installation",
      "Filter change",
      "Leakage repair",
      "Water taste issue",
      "AMC support",
      "Machine sanitization",
    ],
    description:
      "Water purifier installation and service for cleaner output and reliable maintenance.",
    heroImage: "/assets/img/services/service-97.jpg",
    icon: "/assets/img/icons/category-15.svg",
    id: "water-purifier",
    relatedSlugs: ["cleaning", "plumber", "electrician"],
    serviceCount: 15,
    slug: "water-purifier",
    startingPrice: 20,
    summary:
      "Installation, filter changes, leakage repair, and purifier maintenance.",
    title: "Water Purifier",
  },
];

function toServiceStats(seed: ServiceCategorySeed): ServiceCategoryStat[] {
  return [
    { label: "Active Services", value: `${seed.serviceCount}+` },
    { label: "Response Window", value: "Within 24 hrs" },
    { label: "Verified Partners", value: "Top Rated" },
  ];
}

function buildGenericOfferings(
  seed: ServiceCategorySeed,
): ServiceCategoryOffering[] {
  const groups = ["Most Booked", "Repair & Care", "Install & Setup"] as const;

  return seed.commonServices.map((serviceName, index) => {
    const provider = getSeedItem(providerPool, index);
    const image = getSeedItem(serviceGallery, index + seed.startingPrice);

    return {
      description: `${serviceName} delivered by verified ${seed.title.toLowerCase()} professionals with clear scope and upfront pricing.`,
      group: groups[index < 2 ? 0 : index < 4 ? 1 : 2],
      id: `${seed.slug}-${index + 1}`,
      image,
      price: seed.startingPrice + index * 4,
      providerAvatar: provider.avatar,
      providerName: provider.name,
      rating: Number((4.5 + (index % 4) * 0.1).toFixed(1)),
      title: serviceName,
      turnaround: index % 2 === 0 ? "Same day" : "Scheduled visit",
    };
  });
}

function buildGenericFaqs(seed: ServiceCategorySeed): ServiceCategoryFaq[] {
  return [
    {
      answer: `Most ${seed.title.toLowerCase()} bookings are confirmed the same day, while larger jobs are scheduled based on scope and technician availability.`,
      id: `${seed.slug}-faq-1`,
      question: `How quickly can I book a ${seed.title.toLowerCase()} service?`,
    },
    {
      answer: `Yes. Providers carry the tools required for standard ${seed.title.toLowerCase()} work, and they will confirm any special material needs before the visit.`,
      id: `${seed.slug}-faq-2`,
      question: `Do technicians bring the tools needed for the visit?`,
    },
    {
      answer: `Pricing is shown as a starting estimate for inspection or standard jobs. Final pricing depends on complexity, materials, and any additional fixes requested on site.`,
      id: `${seed.slug}-faq-3`,
      question: `Are the listed prices final for every ${seed.title.toLowerCase()} task?`,
    },
  ];
}

function buildGenericReviews(
  seed: ServiceCategorySeed,
): ServiceCategoryReview[] {
  return reviewPool.map((review, index) => ({
    avatar: review.avatar,
    id: `${seed.slug}-review-${index + 1}`,
    name: review.name,
    quote: review.quote,
    rating: review.rating,
    title: `${review.title} for ${seed.title}`,
  }));
}

const electricianOfferings: ServiceCategoryOffering[] = [
  {
    description:
      "Diagnosis and replacement for damaged switches, loose sockets, and sparking points in homes and offices.",
    group: "Most Booked",
    id: "electrician-switch-socket-repair",
    image: "/assets/img/services/service-54.jpg",
    price: 17,
    providerAvatar: "/assets/img/profiles/avatar-01.jpg",
    providerName: "Alex Jordan",
    rating: 4.8,
    title: "Switch & Socket Repair",
    turnaround: "Same day",
  },
  {
    description:
      "Ceiling fan fitting, balancing, and regulator connection for new installations or replacement jobs.",
    group: "Most Booked",
    id: "electrician-ceiling-fan-installation",
    image: "/assets/img/services/service-55.jpg",
    price: 22,
    providerAvatar: "/assets/img/profiles/avatar-04.jpg",
    providerName: "Sophia Adams",
    rating: 4.7,
    title: "Ceiling Fan Installation",
    turnaround: "Within 24 hrs",
  },
  {
    description:
      "Fault tracing and rewiring for single-room, kitchen, or partial circuit problems with safety-first testing.",
    group: "Repair & Maintenance",
    id: "electrician-house-wiring",
    image: "/assets/img/services/service-57.jpg",
    price: 29,
    providerAvatar: "/assets/img/profiles/avatar-05.jpg",
    providerName: "Noah Brooks",
    rating: 4.9,
    title: "House Wiring Repair",
    turnaround: "Scheduled visit",
  },
  {
    description:
      "Lighting upgrades for homes, shops, and apartments including fixtures, holders, and decorative fittings.",
    group: "Repair & Maintenance",
    id: "electrician-light-fitting",
    image: "/assets/img/services/service-58.jpg",
    price: 19,
    providerAvatar: "/assets/img/profiles/avatar-02.jpg",
    providerName: "Emma Blair",
    rating: 4.6,
    title: "Light Fitting & Replacement",
    turnaround: "Same day",
  },
  {
    description:
      "MCB, DB box, and load balancing support for safer electrical distribution and reduced tripping issues.",
    group: "Install & Setup",
    id: "electrician-mcb-maintenance",
    image: "/assets/img/services/service-59.jpg",
    price: 31,
    providerAvatar: "/assets/img/profiles/avatar-03.jpg",
    providerName: "Liam Carter",
    rating: 4.8,
    title: "MCB & Distribution Board Service",
    turnaround: "Scheduled visit",
  },
  {
    description:
      "Inverter connection, battery wiring, and backup power setup for apartments and small offices.",
    group: "Install & Setup",
    id: "electrician-inverter-setup",
    image: "/assets/img/services/service-60.jpg",
    price: 34,
    providerAvatar: "/assets/img/profiles/avatar-04.jpg",
    providerName: "Sophia Adams",
    rating: 4.7,
    title: "Inverter Setup & Connection",
    turnaround: "Within 24 hrs",
  },
];

const electricianFaqs: ServiceCategoryFaq[] = [
  {
    answer:
      "Yes. You can book inspection, repair, replacement, and installation support through the same category. The technician will confirm the exact scope after diagnosis.",
    id: "electrician-faq-1",
    question:
      "Can I book both electrical repair and installation in one visit?",
  },
  {
    answer:
      "For standard jobs such as switch repairs or fan installations, technicians usually arrive with the required tools. If additional branded materials are needed, they will discuss the options before proceeding.",
    id: "electrician-faq-2",
    question: "Do electricians carry parts and materials for common jobs?",
  },
  {
    answer:
      "Emergency electrical faults are usually scheduled the fastest, but exact arrival depends on your location, the time of booking, and technician capacity for the day.",
    id: "electrician-faq-3",
    question: "How fast can an electrician reach me for an urgent issue?",
  },
];

const electricianReviews: ServiceCategoryReview[] = [
  {
    avatar: "/assets/img/profiles/avatar-12.jpg",
    id: "electrician-review-1",
    name: "Robert Anderson",
    quote:
      "The electrician arrived on time, traced the wiring fault quickly, and explained the repair in a way that was easy to understand.",
    rating: 5,
    title: "Very clear and professional",
  },
  {
    avatar: "/assets/img/profiles/avatar-13.jpg",
    id: "electrician-review-2",
    name: "Meera Thomas",
    quote:
      "Fan installation was neat, the technician tested every connection before leaving, and the pricing matched the estimate shown earlier.",
    rating: 5,
    title: "Neat installation work",
  },
  {
    avatar: "/assets/img/profiles/avatar-14.jpg",
    id: "electrician-review-3",
    name: "Daniel Davis",
    quote:
      "Booked for a switchboard issue and ended up resolving two smaller lighting problems in the same visit. Very efficient experience.",
    rating: 4,
    title: "Efficient same-day support",
  },
];

export const serviceCategories: ServiceCategory[] = categorySeeds.map(
  (seed) => {
    const isElectrician = seed.slug === "electrician";

    return {
      commonServices: seed.commonServices,
      description: seed.description,
      faqs: isElectrician ? electricianFaqs : buildGenericFaqs(seed),
      heroImage: seed.heroImage,
      icon: seed.icon,
      id: seed.id,
      offerings: isElectrician
        ? electricianOfferings
        : buildGenericOfferings(seed),
      relatedSlugs: seed.relatedSlugs,
      reviews: isElectrician ? electricianReviews : buildGenericReviews(seed),
      serviceCount: seed.serviceCount,
      slug: seed.slug,
      stats: toServiceStats(seed),
      summary: seed.summary,
      title: seed.title,
    };
  },
);

export const featuredServiceCategories = serviceCategories.slice(0, 12);

export function getServiceCategoryBySlug(slug: string) {
  return serviceCategories.find((category) => category.slug === slug) ?? null;
}

export function getRelatedServiceCategories(
  slug: string,
  relatedSlugs: string[],
) {
  return relatedSlugs
    .map((relatedSlug) => getServiceCategoryBySlug(relatedSlug))
    .filter((category): category is ServiceCategory =>
      Boolean(category && category.slug !== slug),
    );
}
