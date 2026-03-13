"use client";

import { useState } from "react";

import Link from "next/link";
import { motion } from "framer-motion";

import ServiceSortSelect, {
  type ServiceSortValue,
} from "@/components/ServiceSortSelect";
import { servicesSections } from "@/data/home";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  transition: { duration: 0.45, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
  whileInView: { opacity: 1, y: 0 },
} as const;

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(value);
}

export default function ServicesPage() {
  const [sortValue, setSortValue] = useState<ServiceSortValue>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const serviceCount = servicesSections.reduce(
    (count, section) => count + section.services.length,
    0,
  );

  const orderedSections = servicesSections.map((section) => {
    const services = [...section.services];

    if (sortValue === "price-asc") {
      services.sort((left, right) => left.price - right.price);
    } else if (sortValue === "price-desc") {
      services.sort((left, right) => right.price - left.price);
    }

    return {
      ...section,
      services,
    };
  });

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
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
              <div>
                <h4 className="mb-1">
                  Found{" "}
                  <span className="text-primary">{serviceCount} Services</span>
                </h4>
                <p className="text-muted mb-0">
                  Template-style service listing without filters. Each category
                  shows service name, price, and provider details.
                </p>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-2">
                <span className="text-dark me-2">Sort</span>
                <ServiceSortSelect value={sortValue} onChange={setSortValue} />
                <button
                  type="button"
                  className={`tags d-flex justify-content-center align-items-center rounded ${viewMode === "grid" ? "active bg-primary" : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <i className="ti ti-layout-grid" />
                </button>
                <button
                  type="button"
                  className={`tags d-flex justify-content-center align-items-center rounded ${viewMode === "list" ? "active bg-primary" : ""}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <i className="ti ti-list" />
                </button>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="row">
                <div className="col-lg-12">
                  {orderedSections.map((section) => (
                    <div key={section.id} className="service-category-block">
                      <div className="mb-3">
                        <h5 className="mb-1">{section.title}</h5>
                        <p className="text-muted mb-0">{section.description}</p>
                      </div>
                      {section.services.map((service) => (
                        <motion.div
                          {...fadeUp}
                          key={service.id}
                          className="service-list fadeInUp"
                        >
                          <div className="service-cont">
                            <div className="service-cont-img">
                              <Link href="/services?auth=login">
                                <img
                                  className="img-fluid serv-img"
                                  alt={service.title}
                                  src={service.image}
                                />
                              </Link>
                              <div className="fav-item">
                                <span className="fav-icon">
                                  <i className="ti ti-heart" />
                                </span>
                              </div>
                            </div>
                            <div className="service-cont-info">
                              <span className="badge bg-light fs-14 mb-2">
                                {service.category}
                              </span>
                              <h3 className="title">
                                <Link href="/services?auth=login">
                                  {service.title}
                                </Link>
                              </h3>
                              <p className="service-description">
                                {service.description}
                              </p>
                              <p>
                                <i className="ti ti-map-pin" />
                                {service.location}
                              </p>
                              <div className="service-pro-img">
                                <img
                                  src={service.providerAvatar}
                                  alt={service.providerName}
                                />
                                <span>
                                  <i className="fas fa-star filled" />
                                  {service.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="service-action">
                            <h6>
                              {formatPrice(service.price)}
                              {service.oldPrice ? (
                                <span className="old-price">
                                  {formatPrice(service.oldPrice)}
                                </span>
                              ) : null}
                            </h6>
                            <Link
                              href="/services?auth=login"
                              className="btn btn-light"
                            >
                              Book Now
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              orderedSections.map((section) => (
                <div key={section.id} className="service-category-block">
                  <div className="mb-3">
                    <h5 className="mb-1">{section.title}</h5>
                    <p className="text-muted mb-0">{section.description}</p>
                  </div>
                  <div className="row g-4">
                    {section.services.map((service) => (
                      <div key={service.id} className="col-lg-4 col-md-6">
                        <motion.div
                          {...fadeUp}
                          className="service-item service-grid-card fadeInUp"
                        >
                          <div className="service-img">
                            <Link href="/services?auth=login">
                              <img
                                src={service.image}
                                className="img-fluid"
                                alt={service.title}
                              />
                            </Link>
                            <div className="fav-item d-flex align-items-center justify-content-between w-100">
                              <span className="avatar avatar-md">
                                <img
                                  src={service.providerAvatar}
                                  className="rounded-circle"
                                  alt={service.providerName}
                                />
                              </span>
                              <span className="fav-icon">
                                <i className="ti ti-heart" />
                              </span>
                            </div>
                          </div>
                          <div className="service-content">
                            <span className="badge bg-light fs-14 mb-2">
                              {service.category}
                            </span>
                            <h6 className="mb-1 text-truncate">
                              <Link href="/services?auth=login">
                                {service.title}
                              </Link>
                            </h6>
                            <p className="service-description">
                              {service.description}
                            </p>
                            <div className="d-flex align-items-center justify-content-between">
                              <p className="fs-14 mb-0">
                                <i className="ti ti-star-filled text-warning me-1" />
                                {service.rating.toFixed(1)}
                              </p>
                              <small>{formatPrice(service.price)}</small>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            <nav aria-label="Page navigation">
              <ul className="paginations d-flex justify-content-center align-items-center">
                <li className="page-item me-3">
                  <span className="page-link">
                    <i className="ti ti-arrow-left me-2" />
                    Prev
                  </span>
                </li>
                <li className="page-item me-2">
                  <span className="page-link-1 active d-flex justify-content-center align-items-center">
                    1
                  </span>
                </li>
                <li className="page-item me-2">
                  <span className="page-link-1 d-flex justify-content-center align-items-center">
                    2
                  </span>
                </li>
                <li className="page-item me-3">
                  <span className="page-link-1 d-flex justify-content-center align-items-center">
                    3
                  </span>
                </li>
                <li className="page-item">
                  <span className="page-link">
                    Next
                    <i className="ti ti-arrow-right ms-2" />
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
