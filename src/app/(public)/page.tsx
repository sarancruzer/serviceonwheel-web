"use client";

import { useState } from "react";

import Link from "next/link";
import { motion } from "framer-motion";

import HeroServiceSearch from "@/components/HeroServiceSearch";
import HeroTyped from "@/components/HeroTyped";
import FeaturedServicesSlider from "@/components/Sliders/FeaturedServicesSlider";
import TestimonialsSlider from "@/components/Sliders/TestimonialsSlider";
import {
  featuredServices,
  heroPopularSearches,
  heroTypedWords,
  homeCategories,
  popularServiceTabs,
  testimonials,
} from "@/data/home";

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

export default function HomePage() {
  const tabs = popularServiceTabs.slice(0, 2);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const activeServices =
    tabs.find((tab) => tab.id === activeTab)?.services ?? [];

  return (
    <>
      <section className="hero-section sow-hero-section" id="home">
        <div className="hero-content position-relative">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <motion.div {...fadeUp} className="fadeInUp">
                  <h1 className="mb-2">
                    Connect with Nearby Top-rated Professional{" "}
                    <span className="typed" data-type-text="Carpenters">
                      <HeroTyped words={heroTypedWords} />
                    </span>
                  </h1>
                  <p className="mb-3 sub-title">
                    We can connect you to the right service, first time and
                    every time.
                  </p>
                  <HeroServiceSearch popularSearches={heroPopularSearches} />
                  <div className="d-flex align-items-center flex-wrap banner-info">
                    <div className="d-flex align-items-center me-4 mt-4">
                      <img src="/assets/img/icons/success-01.svg" alt="icon" />
                      <div className="ms-2">
                        <h6>215,292 +</h6>
                        <p>Verified Providers</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center me-4 mt-4">
                      <img src="/assets/img/icons/success-02.svg" alt="icon" />
                      <div className="ms-2">
                        <h6>90,000+</h6>
                        <p>Services Completed</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center me-4 mt-4">
                      <img src="/assets/img/icons/success-03.svg" alt="icon" />
                      <div className="ms-2">
                        <h6>2,390,968</h6>
                        <p>Reviews Globally</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.div {...fadeUp} className="banner-img fadeInUp">
                <img
                  src="/assets/img/banner.png"
                  alt="img"
                  className="img-fluid animation-float"
                />
              </motion.div>
            </div>
          </div>
          <div className="hero-image">
            <div className="d-inline-flex bg-white p-2 rounded align-items-center shape-01 floating-x">
              <span className="avatar avatar-md bg-warning rounded-circle me-2">
                <i className="ti ti-star-filled" />
              </span>
              <span>
                4.9 / 5<small className="d-block">(255 reviews)</small>
              </span>
              <i className="border-edge" />
            </div>
            <div className="d-inline-flex bg-white p-2 rounded align-items-center shape-02 floating-x">
              <span className="me-2">
                <img src="/assets/img/icons/tick-banner.svg" alt="tick" />
              </span>
              <p className="fs-12 text-dark mb-0">300 Booking Completed</p>
              <i className="border-edge" />
            </div>
            <img
              src="/assets/img/bg/bg-03.svg"
              alt="img"
              className="shape-03"
            />
            <img
              src="/assets/img/bg/bg-04.svg"
              alt="img"
              className="shape-04"
            />
            <img
              src="/assets/img/bg/bg-05.svg"
              alt="img"
              className="shape-05"
            />
          </div>
        </div>
      </section>

      <section className="section category-section">
        <div className="container">
          <div className="row justify-content-center">
            <motion.div {...fadeUp} className="col-lg-6 text-center fadeInUp">
              <div className="section-header text-center">
                <h2 className="mb-1">
                  Explore our{" "}
                  <span className="text-linear-primary">Categories</span>
                </h2>
                <p className="sub-title">
                  Service categories help organize and structure the offerings
                  on a marketplace, making it easier for users to find what they
                  need.
                </p>
              </div>
            </motion.div>
          </div>
          <div className="row g-4 row-cols-xxl-6 row-cols-xl-6 row-cols-md-3 row-cols-sm-2 row-cols-1 justify-content-center">
            {homeCategories.map((category) => (
              <div key={category.id} className="col d-flex">
                <motion.div
                  {...fadeUp}
                  className="category-item text-center flex-fill fadeInUp"
                >
                  <div className="mx-auto mb-3">
                    <img
                      src={category.icon}
                      className="img-fluid"
                      alt={category.name}
                    />
                  </div>
                  <h6 className="fs-14 mb-1">{category.name}</h6>
                  <p className="fs-14 mb-0">{category.listings}</p>
                  <Link
                    href="/services"
                    className="link-primary text-decoration-underline fs-14"
                  >
                    View All
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-md-12">
              <motion.div {...fadeUp} className="text-center view-all fadeInUp">
                <Link href="/services" className="btn btn-dark">
                  View All
                  <i className="ti ti-arrow-right ms-2" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-section">
        <div className="container">
          <div className="row justify-content-center">
            <motion.div {...fadeUp} className="col-lg-6 text-center fadeInUp">
              <div className="section-header text-center">
                <h2 className="mb-1">
                  Our Featured{" "}
                  <span className="text-linear-primary">Services</span>
                </h2>
                <p className="sub-title">
                  Each listing is designed to be clear and concise, providing
                  customers with all the details they need before booking.
                </p>
              </div>
            </motion.div>
          </div>
          <FeaturedServicesSlider services={featuredServices} />
        </div>
      </section>

      <section className="section popular-section pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <motion.div {...fadeUp} className="col-lg-6 text-center fadeInUp">
              <div className="section-header text-center mb-4">
                <h2 className="mb-1">
                  Our Popular{" "}
                  <span className="text-linear-primary">Services</span>
                </h2>
                <p className="sub-title">
                  A simplified tabbed version of the original template, rebuilt
                  with React state and typed data.
                </p>
              </div>
            </motion.div>
          </div>
          <ul className="nav nav-tabs nav-tabs-solid justify-content-center mb-4 sow-tabs">
            {tabs.map((tab) => (
              <li key={tab.id} className="nav-item mb-3">
                <button
                  type="button"
                  className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="row g-4">
            {activeServices.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6">
                <motion.div
                  {...fadeUp}
                  className="service-item sow-popular-card fadeInUp"
                >
                  <div className="service-img">
                    <Link href="/services">
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
                      <Link href="/services">{service.title}</Link>
                    </h6>
                    <p className="fs-14 text-muted mb-2">
                      {service.description}
                    </p>
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="fs-14 mb-0">
                        <i className="ti ti-star-filled text-warning me-1" />
                        {service.rating.toFixed(1)}
                      </p>
                      <small>From {formatPrice(service.price)}</small>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container">
          <div className="row justify-content-center">
            <motion.div {...fadeUp} className="col-lg-6 text-center fadeInUp">
              <div className="section-header text-center">
                <h2 className="mb-1">
                  Genuine reviews from{" "}
                  <span className="text-linear-primary">Customers</span>
                </h2>
                <p className="sub-title">
                  Each listing is designed to be clear and concise, giving
                  people a reliable way to choose the right provider.
                </p>
              </div>
            </motion.div>
          </div>
          <TestimonialsSlider testimonials={testimonials} />
          <motion.div {...fadeUp} className="text-center fadeInUp">
            <h6 className="mb-2">
              Each listing is designed to be clear and concise, providing
              customers with better confidence before they book.
            </h6>
            <p>
              <span className="text-dark fw-medium">Excellent</span>
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                  key={`home-star-${index}`}
                  src="/assets/img/icons/star-01.svg"
                  className="img-fluid"
                  alt="star"
                />
              ))}
              <span className="fs-14">Based on 456 reviews</span>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
