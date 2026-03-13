"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { aboutHighlights } from "@/data/home";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  transition: { duration: 0.45, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
  whileInView: { opacity: 1, y: 0 },
} as const;

export default function AboutPage() {
  return (
    <div className="sow-about-page">
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">About Us</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <i className="ti ti-home-2" />
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    About
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

      <section className="section">
        <div className="container">
          <div className="row align-items-center g-4">
            <motion.div {...fadeUp} className="col-lg-6 fadeInUp">
              <div className="section-header about-panel p-4 p-lg-5">
                <p className="sub-title fw-medium text-linear-primary mb-2">
                  About Us
                </p>
                <h1 className="mb-3">About Truelysell</h1>
                <p className="text-muted mb-4">
                  Truelysell is a modern service marketplace front-end rebuilt
                  on Next.js App Router while staying close to the original
                  template structure and CSS language.
                </p>
                <p className="text-muted mb-4">
                  Customers discover categories, compare providers, and move
                  from browsing to booking through a consistent and responsive
                  experience.
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <Link href="/services" className="btn btn-dark">
                    Explore Services
                  </Link>
                  <Link href="/contact" className="btn btn-light">
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="col-lg-6 text-center fadeInUp">
              <div className="about-card p-4 p-lg-5">
                <img
                  src="/assets/img/about-us-eight.png"
                  alt="About Truelysell"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="row g-4">
            {aboutHighlights.map((item) => (
              <div key={item.id} className="col-md-4">
                <motion.div {...fadeUp} className="sow-highlight-card p-4">
                  <span className="icon-box mb-4">
                    <i className={item.icon} />
                  </span>
                  <h5 className="mb-2">{item.title}</h5>
                  <p className="text-muted mb-0">{item.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
