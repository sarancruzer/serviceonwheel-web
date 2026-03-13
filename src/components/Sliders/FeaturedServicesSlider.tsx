"use client";

import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { ServiceItem } from "@/types";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function FeaturedServicesSlider({
  services,
}: {
  services: ServiceItem[];
}) {
  return (
    <div className="service-slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <div className="service-item">
              <div className="service-img">
                <Link href="/services">
                  <img src={service.image} className="img-fluid" alt={service.title} />
                </Link>
                <div className="trend-icon">
                  <span className="bg-success">
                    <i className="ti ti-trending-up" />
                  </span>
                </div>
                <div className="fav-item">
                  <span className="fav-icon">
                    <i className="ti ti-heart" />
                  </span>
                </div>
              </div>
              <div className="service-content">
                <h6 className="text-truncate mb-1">
                  <Link href="/services">{service.title}</Link>
                </h6>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="fw-medium fs-14 mb-0">
                    Service starts at {formatPrice(service.price)}
                  </p>
                  <span className="d-inline-flex align-items-center fs-14">
                    <i className="ti ti-star-filled text-warning me-1" />
                    {service.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
