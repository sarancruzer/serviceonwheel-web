import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

import {
  getRelatedServiceCategories,
  getServiceCategoryBySlug,
  serviceCategories,
} from "@/data/services";
import { getImportedCatalogCategoryDetail } from "@/lib/public-catalog";
import { buildServicesHref } from "@/lib/services-href";
import type { PublicCatalogService, ServiceCategoryOffering } from "@/types";

type ServiceCategoryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    auth?: string | string[];
    city?: string | string[];
    service?: string | string[];
  }>;
};

const DEFAULT_CATEGORY_HERO_IMAGE = "/assets/img/services/service-54.jpg";

type ImportedServiceSection = {
  description: string | null;
  hasSelectedService: boolean;
  id: string;
  name: string;
  services: PublicCatalogService[];
};

export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    slug: category.slug,
  }));
}

function titleCase(value: string) {
  return value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeSlugValue(value?: string | string[] | null) {
  const resolvedValue = Array.isArray(value) ? value[0] : value;

  return resolvedValue
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSearchParamValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function humanizeCity(value?: string | null) {
  const normalized = normalizeSlugValue(value);

  return normalized ? titleCase(normalized) : "your selected city";
}

function formatCatalogPrice(service: PublicCatalogService) {
  const rawPrice = service.priceText?.trim() || service.priceValue?.trim();

  if (!rawPrice) {
    return "Pricing on request";
  }

  return /^[0-9]/.test(rawPrice) ? `Rs ${rawPrice}` : rawPrice;
}

function formatCatalogPriceType(value?: string | null) {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return "Request quote";
  }

  if (normalized === "fixed") {
    return "Fixed price";
  }

  if (normalized === "on_visit" || normalized === "inspection_quote") {
    return "On visit quote";
  }

  return titleCase(normalized.replace(/_/g, " "));
}

function groupOfferingsBySection(offerings: ServiceCategoryOffering[]) {
  const groups = new Map<string, ServiceCategoryOffering[]>();

  offerings.forEach((offering) => {
    const currentGroup = groups.get(offering.group) ?? [];
    currentGroup.push(offering);
    groups.set(offering.group, currentGroup);
  });

  return Array.from(groups.entries());
}

async function getImportedDetail(slug: string) {
  try {
    return await getImportedCatalogCategoryDetail(slug);
  } catch {
    return null;
  }
}

function buildImportedSections(
  importedDetail: Awaited<ReturnType<typeof getImportedDetail>>,
  selectedServiceSlug?: string,
) {
  const selectedSlug = normalizeSlugValue(selectedServiceSlug);

  return (
    importedDetail?.subCategories
      .map((subCategory) => {
        const services = [...subCategory.services].sort((left, right) => {
          const leftPriority = left.slug === selectedSlug ? 1 : 0;
          const rightPriority = right.slug === selectedSlug ? 1 : 0;

          if (rightPriority !== leftPriority) {
            return rightPriority - leftPriority;
          }

          if (left.sortOrder !== right.sortOrder) {
            return left.sortOrder - right.sortOrder;
          }

          return left.name.localeCompare(right.name);
        });

        return {
          description: subCategory.description,
          hasSelectedService: services.some(
            (service) => service.slug === selectedSlug,
          ),
          id: subCategory.id,
          name: subCategory.name,
          services,
        };
      })
      .sort((left, right) => {
        if (left.hasSelectedService !== right.hasSelectedService) {
          return left.hasSelectedService ? -1 : 1;
        }

        return left.name.localeCompare(right.name);
      }) ?? []
  );
}

export async function generateMetadata({
  params,
}: ServiceCategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const staticCategory = getServiceCategoryBySlug(slug);
  const importedDetail = await getImportedDetail(slug);
  const importedCategory = importedDetail?.category;
  const title = importedCategory?.name ?? staticCategory?.title;
  const description = staticCategory?.description;

  if (!title) {
    return {
      title: "Service Category | Truelysell",
    };
  }

  return {
    title: `${title} Services | Truelysell`,
    description:
      description ??
      `Browse ${title.toLowerCase()} services grouped by subcategory.`,
  };
}

export default async function ServiceCategoryDetailPage({
  params,
  searchParams,
}: ServiceCategoryDetailPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const city = getSearchParamValue(resolvedSearchParams?.city);
  const selectedServiceSlug = normalizeSlugValue(resolvedSearchParams?.service);
  const staticCategory = getServiceCategoryBySlug(slug);
  const importedDetail = await getImportedDetail(slug);
  const importedCategory = importedDetail?.category;

  if (!staticCategory && !importedCategory) {
    notFound();
  }

  const groupedOfferings = staticCategory
    ? groupOfferingsBySection(staticCategory.offerings)
    : [];
  const importedSections = buildImportedSections(
    importedDetail,
    selectedServiceSlug,
  );
  const hasImportedSections = importedSections.length > 0;
  const displayTitle =
    importedCategory?.name ?? staticCategory?.title ?? titleCase(slug);
  const displayDescription =
    staticCategory?.description ??
    `Browse ${displayTitle.toLowerCase()} services grouped by subcategory and choose the option that matches your requirement.`;
  const displayHeroImage =
    staticCategory?.heroImage ?? DEFAULT_CATEGORY_HERO_IMAGE;
  const displayCommonServices = hasImportedSections
    ? importedSections
        .flatMap((section) => section.services.map((service) => service.name))
        .slice(0, 8)
    : staticCategory?.commonServices ?? [];
  const displayStats =
    staticCategory?.stats ??
    [
      {
        label: "Subcategories",
        value: String(importedSections.length),
      },
      {
        label: "Services listed",
        value: String(
          importedSections.reduce(
            (total, section) => total + section.services.length,
            0,
          ),
        ),
      },
      {
        label: "Coverage",
        value: humanizeCity(city),
      },
    ];
  const relatedCategories = staticCategory
    ? getRelatedServiceCategories(
        staticCategory.slug,
        staticCategory.relatedSlugs,
      )
    : [];

  return (
    <div className="sow-services-page">
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">{displayTitle}</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <i className="ti ti-home-2" />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href={buildServicesHref({ city })}>Services</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {displayTitle}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="breadcrumb-bg">
            <img
              src="/assets/img/bg/breadcrumb-bg-01.png"
              className="breadcrumb-bg-1"
              alt="Img"
            />
            <img
              src="/assets/img/bg/breadcrumb-bg-02.png"
              className="breadcrumb-bg-2"
              alt="Img"
            />
          </div>
        </div>
      </div>

      <div className="page-wrapper">
        <div className="content">
          <div className="container">
            <section className="sow-service-detail-hero">
              <div className="row g-4 align-items-center">
                <div className="col-lg-6">
                  <p className="sow-section-eyebrow mb-2">
                    {displayTitle} Services
                  </p>
                  <h3 className="mb-3">
                    Book verified {displayTitle.toLowerCase()} experts
                  </h3>
                  <p className="text-muted mb-4">{displayDescription}</p>

                  <div className="sow-service-chip-list mb-4">
                    {displayCommonServices.map((serviceName) => (
                      <span key={`${slug}-${serviceName}`}>{serviceName}</span>
                    ))}
                  </div>

                  <div className="row g-3">
                    {displayStats.map((stat) => (
                      <div key={`${slug}-${stat.label}`} className="col-sm-4">
                        <div className="sow-service-stat-card">
                          <h5>{stat.value}</h5>
                          <p>{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="sow-service-detail-hero__media">
                    <img
                      src={displayHeroImage}
                      alt={displayTitle}
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="sow-service-category-strip">
              <div className="sow-service-category-strip__scroller">
                {serviceCategories.map((serviceCategory) => (
                  <Link
                    key={serviceCategory.id}
                    href={buildServicesHref({
                      city,
                      slug: serviceCategory.slug,
                    })}
                    className={
                      serviceCategory.slug === slug ? "is-active" : undefined
                    }
                  >
                    <img
                      src={serviceCategory.icon}
                      alt={serviceCategory.title}
                    />
                    <span>{serviceCategory.title}</span>
                  </Link>
                ))}
              </div>
            </section>

            <div className="row g-4">
              <div className="col-lg-8">
                {hasImportedSections
                  ? importedSections.map((section) => (
                      <section
                        key={`${slug}-${section.id}`}
                        className="sow-service-offer-section"
                      >
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                          <div>
                            <h4 className="mb-1">{section.name}</h4>
                            <p className="text-muted mb-0">
                              {section.description ??
                                `Explore the currently available ${displayTitle.toLowerCase()} services in this subcategory.`}
                            </p>
                          </div>
                          <span className="sow-service-offer-section__count">
                            {section.services.length} services
                          </span>
                        </div>

                        <div className="sow-service-offer-list">
                          {section.services.map((service) => {
                            const isSelected =
                              service.slug === selectedServiceSlug;

                            return (
                              <article
                                key={service.id}
                                className={`sow-service-offer-card${isSelected ? " is-active" : ""}`}
                              >
                                <div className="sow-service-offer-card__image">
                                  <img
                                    src={displayHeroImage}
                                    alt={service.name}
                                  />
                                </div>

                                <div className="sow-service-offer-card__content">
                                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                                    <span className="badge bg-light text-dark">
                                      {section.name}
                                    </span>
                                    <span className="sow-service-turnaround">
                                      {isSelected
                                        ? "Selected service"
                                        : formatCatalogPriceType(
                                            service.priceType,
                                          )}
                                    </span>
                                  </div>
                                  <h5 className="mb-2">{service.name}</h5>
                                  <p className="text-muted mb-3">
                                    {service.description ??
                                      `${service.name} is available under the ${section.name.toLowerCase()} section for ${displayTitle.toLowerCase()}.`}
                                  </p>

                                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <div>
                                      <p className="mb-1 fw-semibold text-dark">
                                        {formatCatalogPrice(service)}
                                      </p>
                                      <small className="text-muted">
                                        Available in {humanizeCity(city)}
                                      </small>
                                    </div>

                                    <div className="text-end">
                                      <Link
                                        href={buildServicesHref({
                                          auth: "login",
                                          city,
                                          service: service.slug,
                                          slug,
                                        })}
                                        className="btn btn-dark btn-sm"
                                      >
                                        Book Now
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      </section>
                    ))
                  : groupedOfferings.map(([groupName, offerings]) => (
                      <section
                        key={`${slug}-${groupName}`}
                        className="sow-service-offer-section"
                      >
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                          <div>
                            <h4 className="mb-1">{groupName}</h4>
                            <p className="text-muted mb-0">
                              Explore the most relevant{" "}
                              {displayTitle.toLowerCase()} services inside this
                              category.
                            </p>
                          </div>
                          <span className="sow-service-offer-section__count">
                            {offerings.length} services
                          </span>
                        </div>

                        <div className="sow-service-offer-list">
                          {offerings.map((offering) => (
                            <article
                              key={offering.id}
                              className="sow-service-offer-card"
                            >
                              <div className="sow-service-offer-card__image">
                                <img src={offering.image} alt={offering.title} />
                              </div>

                              <div className="sow-service-offer-card__content">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                                  <span className="badge bg-light text-dark">
                                    {groupName}
                                  </span>
                                  <span className="sow-service-turnaround">
                                    {offering.turnaround}
                                  </span>
                                </div>
                                <h5 className="mb-2">{offering.title}</h5>
                                <p className="text-muted mb-3">
                                  {offering.description}
                                </p>

                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={offering.providerAvatar}
                                      alt={offering.providerName}
                                      className="avatar avatar-sm rounded-circle me-2"
                                    />
                                    <div>
                                      <p className="mb-0 fw-medium text-dark">
                                        {offering.providerName}
                                      </p>
                                      <small className="text-muted">
                                        <i className="ti ti-star-filled text-warning me-1" />
                                        {offering.rating.toFixed(1)} rating
                                      </small>
                                    </div>
                                  </div>

                                  <div className="text-end">
                                    <h6 className="mb-2">
                                      ${offering.price.toFixed(2)}
                                    </h6>
                                    <Link
                                      href={buildServicesHref({
                                        auth: "login",
                                        city,
                                        slug,
                                      })}
                                      className="btn btn-dark btn-sm"
                                    >
                                      Book Now
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>
                    ))}

                {staticCategory ? (
                  <>
                    <section className="sow-service-info-section">
                      <h4 className="mb-3">Frequently asked questions</h4>
                      <div className="sow-service-faq-list">
                        {staticCategory.faqs.map((faq) => (
                          <details
                            key={faq.id}
                            className="sow-service-faq-item"
                          >
                            <summary>{faq.question}</summary>
                            <p>{faq.answer}</p>
                          </details>
                        ))}
                      </div>
                    </section>

                    <section className="sow-service-info-section">
                      <h4 className="mb-3">What customers are saying</h4>
                      <div className="row g-3">
                        {staticCategory.reviews.map((review) => (
                          <div key={review.id} className="col-md-6">
                            <article className="sow-service-review-card">
                              <div className="d-flex align-items-center mb-3">
                                <img
                                  src={review.avatar}
                                  alt={review.name}
                                  className="avatar avatar-md rounded-circle me-3"
                                />
                                <div>
                                  <h6 className="mb-1">{review.name}</h6>
                                  <small className="text-muted">
                                    {review.title}
                                  </small>
                                </div>
                              </div>
                              <p className="mb-2">{review.quote}</p>
                              <div className="text-warning">
                                {Array.from({ length: review.rating }).map(
                                  (_, index) => (
                                    <i
                                      key={`${review.id}-star-${index}`}
                                      className="ti ti-star-filled"
                                    />
                                  ),
                                )}
                              </div>
                            </article>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                ) : null}
              </div>

              <div className="col-lg-4">
                <aside className="sow-service-sidebar">
                  <div className="sow-service-sidebar-card">
                    <h5 className="mb-3">
                      Need help choosing the right service?
                    </h5>
                    <p className="text-muted mb-3">
                      Start with the most relevant tasks or sign in to continue
                      with a booking request for{" "}
                      {displayTitle.toLowerCase()} support.
                    </p>
                    <Link
                      href={buildServicesHref({
                        auth: "login",
                        city,
                        slug,
                      })}
                      className="btn btn-linear-primary w-100"
                    >
                      Continue to Booking
                    </Link>
                  </div>

                  <div className="sow-service-sidebar-card">
                    <h5 className="mb-3">Popular tasks in {displayTitle}</h5>
                    <ul className="sow-service-sidebar-list">
                      {displayCommonServices.map((serviceName) => (
                        <li key={`${slug}-task-${serviceName}`}>
                          <i className="ti ti-check me-2" />
                          {serviceName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>
            </div>

            {relatedCategories.length > 0 ? (
              <section className="sow-related-service-categories">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                  <div>
                    <h4 className="mb-1">Related categories</h4>
                    <p className="text-muted mb-0">
                      Explore nearby categories that customers often book
                      together.
                    </p>
                  </div>
                  <Link
                    href={buildServicesHref({ city })}
                    className="link-primary"
                  >
                    View All Categories
                  </Link>
                </div>

                <div className="row g-4">
                  {relatedCategories.map((relatedCategory) => (
                    <div key={relatedCategory.id} className="col-md-4">
                      <Link
                        href={buildServicesHref({
                          city,
                          slug: relatedCategory.slug,
                        })}
                        className="sow-service-category-card"
                      >
                        <span className="sow-service-category-card__icon">
                          <img
                            src={relatedCategory.icon}
                            alt={relatedCategory.title}
                          />
                        </span>
                        <h5>{relatedCategory.title}</h5>
                        <p>{relatedCategory.summary}</p>
                        <span className="sow-service-category-card__meta">
                          {relatedCategory.serviceCount}+ services
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
