"use client";

import { useState } from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { contactDetails } from "@/data/home";

type ContactFormValues = {
  email: string;
  message: string;
  name: string;
  phone?: string;
  subject: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  transition: { duration: 0.45, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
  whileInView: { opacity: 1, y: 0 },
} as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: {
      email: "",
      message: "",
      name: "",
      phone: undefined,
      subject: "",
    },
  });

  return (
    <div className="sow-contact-page">
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Contact Us</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <i className="ti ti-home-2" />
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact
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
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <motion.div
                {...fadeUp}
                className="section-header text-center fadeInUp"
              >
                <p className="sub-title fw-medium text-linear-primary mb-2">
                  Contact Us
                </p>
                <h1 className="mb-2">We’d like to hear from you</h1>
                <p className="sub-title">
                  Reach out for support, service questions, or help choosing the
                  right professional for your next booking.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="row g-4 mt-1">
            <div className="col-lg-5">
              <div className="row g-4">
                {contactDetails.map((item) => (
                  <div key={item.id} className="col-md-6 col-lg-12">
                    <motion.div {...fadeUp} className="contact-panel p-4 h-100">
                      <div className="d-flex align-items-start">
                        <span className="icon-box me-3">
                          <i className={item.icon} />
                        </span>
                        <div>
                          <h5 className="mb-2">{item.title}</h5>
                          <p className="mb-0 text-muted">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-7">
              <motion.div {...fadeUp} className="contact-card p-4 p-lg-5">
                <div className="card-body p-0">
                  <h4 className="mb-3">Send a message</h4>
                  {submitted ? (
                    <div className="alert alert-success" role="alert">
                      Your message was captured successfully. We&apos;ll get
                      back to you soon.
                    </div>
                  ) : null}
                  <form
                    onSubmit={handleSubmit(async () => {
                      setSubmitted(true);
                      reset();
                    })}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="name">
                            Your Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="form-control"
                            {...register("name", {
                              required: "Name is required",
                            })}
                          />
                          {errors.name ? (
                            <div className="text-danger small mt-1">
                              {errors.name.message}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="email">
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="form-control"
                            {...register("email", {
                              pattern: {
                                message: "Enter a valid email",
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              },
                              required: "Email is required",
                            })}
                          />
                          {errors.email ? (
                            <div className="text-danger small mt-1">
                              {errors.email.message}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="phone">
                            Phone Number
                          </label>
                          <Controller
                            control={control}
                            name="phone"
                            rules={{ required: "Phone number is required" }}
                            render={({ field }) => (
                              <PhoneInput
                                id="phone"
                                defaultCountry="US"
                                international={false}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          {errors.phone ? (
                            <div className="text-danger small mt-1">
                              {errors.phone.message}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="subject">
                            Subject
                          </label>
                          <input
                            id="subject"
                            type="text"
                            className="form-control"
                            {...register("subject", {
                              required: "Subject is required",
                            })}
                          />
                          {errors.subject ? (
                            <div className="text-danger small mt-1">
                              {errors.subject.message}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="message">
                            Message
                          </label>
                          <textarea
                            id="message"
                            className="form-control"
                            rows={5}
                            {...register("message", {
                              required: "Message is required",
                            })}
                          />
                          {errors.message ? (
                            <div className="text-danger small mt-1">
                              {errors.message.message}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-linear-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </div>
                  </form>
                  <hr className="my-4" />
                  <div className="d-flex gap-2 flex-wrap">
                    <Link href="/services" className="btn btn-dark">
                      Browse Services
                    </Link>
                    <Link href="/contact?auth=login" className="btn btn-light">
                      Customer Login
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
