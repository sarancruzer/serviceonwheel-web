import Link from "next/link";

import type { Metadata } from "next";

import { featuredServiceCategories, serviceCategories } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Truelysell",
  description:
    "Browse service categories and move from a high-level directory into category-specific offerings.",
};

export default function ServicesPage() {
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
                      href={`/services/${category.slug}`}
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
                            href={`/services/${category.slug}`}
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
