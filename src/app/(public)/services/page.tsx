import Link from "next/link";

import type { Metadata } from "next";

import { featuredServiceCategories, serviceCategories } from "@/data/services";
import { searchPublicServices } from "@/lib/public-catalog";
import { buildServicesHref } from "@/lib/services-href";

export const metadata: Metadata = {
  title: "Services | Truelysell",
  description:
    "Browse service categories and move from a high-level directory into category-specific offerings.",
};

type ServicesPageProps = {
  searchParams?: Promise<{
    city?: string | string[];
    query?: string | string[];
  }>;
};

function getSearchParamValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const query = getSearchParamValue(resolvedSearchParams?.query) ?? "";
  const city = getSearchParamValue(resolvedSearchParams?.city);
  const liveSearchResults = query
    ? await searchPublicServices({
        city,
        limit: 12,
        query,
      })
    : null;

  return (
    <div className="sow-services-page">
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Services</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <i className="ti ti-home-2" />
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Services
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
            {query ? (
              <section className="sow-service-live-results">
                <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
                  <div>
                    <p className="sow-section-eyebrow mb-2">Live Search</p>
                    <h3 className="mb-2">Search results for "{query}"</h3>
                    <p className="text-muted mb-0">
                      {liveSearchResults?.error
                        ? liveSearchResults.error
                        : `Showing live catalog matches for ${liveSearchResults?.citySlug ?? "your selected city"}.`}
                    </p>
                  </div>
                  <span className="sow-service-offer-section__count">
                    {liveSearchResults?.total ?? 0} matches
                  </span>
                </div>

                {liveSearchResults?.items.length ? (
                  <div className="row g-3">
                    {liveSearchResults.items.map((item) => (
                      <div key={item.id} className="col-lg-4 col-md-6">
                        <Link
                          href={item.href}
                          className="sow-service-live-card"
                        >
                          <span className="sow-service-live-card__badge">
                            {item.type === "subservice"
                              ? item.categoryName
                              : "Category"}
                          </span>
                          <h5>{item.title}</h5>
                          <p>{item.subtitle}</p>
                          <span className="sow-service-live-card__meta">
                            {item.type === "subservice"
                              ? "Open service details"
                              : "Browse category"}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="sow-service-live-results__empty">
                    <p className="mb-0">
                      No live matches were found for that query yet. You can
                      still browse the service categories below.
                    </p>
                  </div>
                )}
              </section>
            ) : null}

            <section className="sow-service-directory">
              <div className="text-center mb-4">
                <p className="sow-section-eyebrow mb-2">Category Directory</p>
                <h3 className="mb-2">Choose a service category first</h3>
                <p className="text-muted mb-0 mx-auto sow-service-directory-copy">
                  Start with a category like electrician, plumbing, cleaning, or
                  appliance repair. Once you open a category, you will see the
                  service offerings available inside it.
                </p>
              </div>

              <div className="row g-4">
                {featuredServiceCategories.map((category) => (
                  <div key={category.id} className="col-xl-3 col-lg-4 col-md-6">
                    <Link
                      href={buildServicesHref({
                        city,
                        slug: category.slug,
                      })}
                      className="sow-service-category-card"
                    >
                      <span className="sow-service-category-card__icon">
                        <img src={category.icon} alt={category.title} />
                      </span>
                      <h5>{category.title}</h5>
                      <p>{category.summary}</p>
                      <span className="sow-service-category-card__meta">
                        {category.serviceCount}+ services
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <section className="sow-service-task-directory">
              <div className="row g-4">
                {serviceCategories.slice(0, 8).map((category) => (
                  <div key={category.id} className="col-lg-6">
                    <div className="sow-service-task-directory__row">
                      <h6>{category.title}</h6>
                      <div className="sow-service-task-directory__links">
                        {category.commonServices.map((serviceName) => (
                          <Link
                            key={`${category.slug}-${serviceName}`}
                            href={buildServicesHref({
                              city,
                              slug: category.slug,
                            })}
                          >
                            {serviceName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
