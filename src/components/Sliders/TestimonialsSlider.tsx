"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { TestimonialItem } from "@/types";

export default function TestimonialsSlider({
  testimonials,
}: {
  testimonials: TestimonialItem[];
}) {
  return (
    <div className="testimonial-slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="testimonial-item h-100">
              <div className="d-flex align-items-center mb-3">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <i
                    key={`${testimonial.id}-${index}`}
                    className="fa-solid fa-star text-warning me-1"
                  />
                ))}
              </div>
              <h5 className="mb-2">{testimonial.title}</h5>
              <p className="mb-4">“ {testimonial.quote} ”</p>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center overflow-hidden">
                  <span className="avatar avatar-lg flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      className="img-fluid rounded-circle"
                      alt={testimonial.author}
                    />
                  </span>
                  <h6 className="text-truncate ms-2">{testimonial.author}</h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
