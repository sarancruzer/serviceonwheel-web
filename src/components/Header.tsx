"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { publicHomeNavigation, publicInnerNavigation } from "@/lib/navigation";

export default function Header({
  variant = "home",
}: {
  variant?: "home" | "inner";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHomeHeader = variant === "home";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-opened", menuOpen);

    return () => {
      document.documentElement.classList.remove("menu-opened");
    };
  }, [menuOpen]);

  const openAuthModal = (type: "login" | "signup") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("auth", type);
    setMenuOpen(false);
    router.push(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
      {
        scroll: false,
      },
    );
  };

  const isActiveLink = (href: string, exact = false) => {
    if (exact || href === "/") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`header ${variant === "inner" ? "header-one" : "header-new"} sow-header ${isHomeHeader ? "sow-header-home" : "sow-header-inner"}`}
      >
        <div className={variant === "inner" ? "container" : "container-fluid"}>
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <button
                id="mobile_btn"
                type="button"
                aria-label="Open navigation"
                className="btn btn-link border-0 p-0"
                onClick={() => setMenuOpen(true)}
              >
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
              <Link href="/" className="navbar-brand logo">
                <img
                  src="/assets/img/logo.svg"
                  className="img-fluid"
                  alt="Truelysell"
                />
              </Link>
              <Link href="/" className="navbar-brand logo-small">
                <img
                  src="/assets/img/logo-small.svg"
                  className="img-fluid"
                  alt="Truelysell"
                />
              </Link>
            </div>

            <div
              className={`main-menu-wrapper ${isHomeHeader ? "sow-home-menu-wrapper" : ""}`}
            >
              <div className="menu-header">
                <Link href="/" className="menu-logo">
                  <img
                    src="/assets/img/logo.svg"
                    className="img-fluid"
                    alt="Truelysell"
                  />
                </Link>
                <button
                  id="menu_close"
                  type="button"
                  aria-label="Close navigation"
                  className="menu-close btn btn-link border-0 p-0"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
              {isHomeHeader ? (
                <div className="sow-home-menu-layout">
                  
                  <ul className="main-nav align-items-lg-center sow-home-main-nav">
                    <li className="d-lg-none">
                      <Link href="/services">Categories</Link>
                    </li>
                    {publicHomeNavigation.map((item) => (
                      <li
                        key={`${item.label}-${item.href}`}
                        className={
                          isActiveLink(item.href, item.exact)
                            ? "active"
                            : undefined
                        }
                      >
                        <Link href={item.href}>
                          <span>{item.label}</span>
                          {item.showCaret ? (
                            <i
                              className="ti ti-chevron-down sow-nav-caret"
                              aria-hidden="true"
                            />
                          ) : null}
                        </Link>
                      </li>
                    ))}
                    <li className="d-lg-none">
                      <button
                        type="button"
                        className="nav-auth-trigger"
                        onClick={() => openAuthModal("login")}
                      >
                        Sign In
                      </button>
                    </li>
                    <li className="d-lg-none">
                      <button
                        type="button"
                        className="nav-auth-trigger"
                        onClick={() => openAuthModal("signup")}
                      >
                        Join Us
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <ul className="main-nav">
                  {publicInnerNavigation.map((item) => (
                    <li
                      key={item.href}
                      className={
                        isActiveLink(item.href, item.exact)
                          ? "active"
                          : undefined
                      }
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                  <li className="d-lg-none">
                    <button
                      type="button"
                      className="nav-auth-trigger"
                      onClick={() => openAuthModal("login")}
                    >
                      Sign In
                    </button>
                  </li>
                  <li className="d-lg-none">
                    <button
                      type="button"
                      className="nav-auth-trigger"
                      onClick={() => openAuthModal("signup")}
                    >
                      Join Us
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <ul className="nav header-navbar-rht">
              <li className="nav-item pe-1">
                <button
                  type="button"
                  className={
                    variant === "inner"
                      ? "nav-link header-reg border-0 bg-transparent"
                      : "nav-link btn btn-light border-0"
                  }
                  onClick={() => openAuthModal("login")}
                >
                  <i
                    className={
                      variant === "inner"
                        ? "fa-regular fa-circle-user me-2"
                        : "ti ti-lock me-2"
                    }
                  />
                  Sign In
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={
                    variant === "inner"
                      ? "nav-link header-login border-0"
                      : "nav-link btn btn-linear-primary border-0"
                  }
                  onClick={() => openAuthModal("signup")}
                >
                  {variant === "inner" ? (
                    <i className="ti ti-user-filled me-2" />
                  ) : null}
                  Join Us
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div
        className="sidebar-overlay"
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
        style={{ display: menuOpen ? "block" : "none" }}
      />
    </>
  );
}
