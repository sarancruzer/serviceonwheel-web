import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

import {
  getRelatedServiceCategories,
  getServiceCategoryBySlug,
  serviceCategories,
} from "@/data/services";
import { buildServicesHref } from "@/lib/services-href";
import type { ServiceCategoryOffering } from "@/types";

type ServiceCategoryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    auth?: string | string[];
    city?: string | string[];
  }>;
};

export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceCategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Service Category | Truelysell",
    };
  }

  return {
    title: `${category.title} Services | Truelysell`,
    description: category.description,
  };
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

function getSearchParamValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function ServiceCategoryDetailPage({
  params,
  searchParams,
}: ServiceCategoryDetailPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const city = getSearchParamValue(resolvedSearchParams?.city);
  const category = getServiceCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const groupedOfferings = groupOfferingsBySection(category.offerings);
  const relatedCategories = getRelatedServiceCategories(
    category.slug,
    category.relatedSlugs,
  );

  return (
    <div className="sow-services-page">
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">{category.title}</h2>
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
                    {category.title}
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
                    {category.title} Services
                  </p>
                  <h3 className="mb-3">
                    Book verified {category.title.toLowerCase()} experts
                  </h3>
                  <p className="text-muted mb-4">{category.description}</p>

                  <div className="sow-service-chip-list mb-4">
                    {category.commonServices.map((serviceName) => (
                      <span key={`${category.slug}-${serviceName}`}>
                        {serviceName}
                      </span>
                    ))}
                  </div>

                  <div className="row g-3">
                    {category.stats.map((stat) => (
                      <div
                        key={`${category.slug}-${stat.label}`}
                        className="col-sm-4"
                      >
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
                      src={category.heroImage}
                      alt={category.title}
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
                      serviceCategory.slug === category.slug
                        ? "is-active"
                        : undefined
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
                {groupedOfferings.map(([groupName, offerings]) => (
                  <section
                    key={`${category.slug}-${groupName}`}
                    className="sow-service-offer-section"
                  >
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                      <div>
                        <h4 className="mb-1">{groupName}</h4>
                        <p className="text-muted mb-0">
                          Explore the most relevant{" "}
                          {category.title.toLowerCase()} services inside this
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
                                    slug: category.slug,
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

                <section className="sow-service-info-section">
                  <h4 className="mb-3">Frequently asked questions</h4>
                  <div className="sow-service-faq-list">
                    {category.faqs.map((faq) => (
                      <details key={faq.id} className="sow-service-faq-item">
                        <summary>{faq.question}</summary>
                        <p>{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>

                <section className="sow-service-info-section">
                  <h4 className="mb-3">What customers are saying</h4>
                  <div className="row g-3">
                    {category.reviews.map((review) => (
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
              </div>

              <div className="col-lg-4">
                <aside className="sow-service-sidebar">
                  <div className="sow-service-sidebar-card">
                    <h5 className="mb-3">
                      Need help choosing the right service?
                    </h5>
                    <p className="text-muted mb-3">
                      Start with the most-booked tasks or sign in to continue
                      with a booking request for {category.title.toLowerCase()}{" "}
                      support.
                    </p>
                    <Link
                      href={buildServicesHref({
                        auth: "login",
                        city,
                        slug: category.slug,
                      })}
                      className="btn btn-linear-primary w-100"
                    >
                      Continue to Booking
                    </Link>
                  </div>

                  <div className="sow-service-sidebar-card">
                    <h5 className="mb-3">Popular tasks in {category.title}</h5>
                    <ul className="sow-service-sidebar-list">
                      {category.commonServices.map((serviceName) => (
                        <li key={`${category.slug}-task-${serviceName}`}>
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
