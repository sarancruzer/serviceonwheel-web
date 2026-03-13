import Link from "next/link";

import { footerSections } from "@/data/home";

const socials = [
  { alt: "Facebook", src: "/assets/img/icons/fb.svg" },
  { alt: "Instagram", src: "/assets/img/icons/instagram.svg" },
  { alt: "Twitter", src: "/assets/img/icons/twitter.svg" },
  { alt: "WhatsApp", src: "/assets/img/icons/whatsapp.svg" },
  { alt: "YouTube", src: "/assets/img/icons/youtube.svg" },
  { alt: "LinkedIn", src: "/assets/img/icons/linkedin.svg" },
] as const;

export default function Footer() {
  return (
    <footer className="sow-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {footerSections.map((section) => (
              <div key={section.title} className="col-md-6 col-xl-2">
                <div className="footer-widget">
                  <h5 className="mb-4">{section.title}</h5>
                  <ul className="footer-menu">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="col-md-6 col-xl-6">
              <div className="footer-widget">
                <div className="card bg-light-200 border-0 mb-3">
                  <div className="card-body">
                    <h5 className="mb-3">SignUp For Subscription</h5>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Enter Email Address" />
                    </div>
                    <button type="button" className="btn btn-linear-primary btn-lg w-100">
                      Subscribe
                    </button>
                  </div>
                </div>
                <div>
                  <h6 className="fs-14 fw-normal mb-2">Download Our App</h6>
                  <div className="d-flex align-items-center flex-wrap">
                    <img src="/assets/img/icons/app-store.svg" className="me-2" alt="App Store" />
                    <img src="/assets/img/icons/goolge-play.svg" className="me-2" alt="Google Play" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between flex-wrap mt-3">
            <ul className="social-icon mb-3">
              {socials.map((item) => (
                <li key={item.alt}>
                  <span>
                    <img src={item.src} className="img" alt={item.alt} />
                  </span>
                </li>
              ))}
            </ul>
            <div className="d-flex align-items-center">
              <div className="dropdown me-3 mb-3">
                <span className="dropdown-toggle bg-light-300 fw-medium">
                  <img src="/assets/img/flags/us.png" className="flag me-2" alt="Flag" />
                  English
                </span>
              </div>
              <div className="dropdown mb-3">
                <span className="dropdown-toggle bg-light-300 fw-medium">USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <p className="mb-2">
                  Copyright &copy; {new Date().getFullYear()} - All Rights Reserved Truelysell
                </p>
                <ul className="menu-links mb-2">
                  <li>
                    <Link href="/about">Terms and Conditions</Link>
                  </li>
                  <li>
                    <Link href="/contact">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
