"use client";

import { useEffect, useState, useTransition } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { clearClientSession } from "@/lib/auth/client";
import {
  getDefaultRouteForRole,
  type AppRole,
  type AuthSession,
} from "@/lib/auth/shared";
import type { NavigationItem } from "@/lib/navigation";

type DashboardShellProps = {
  children: React.ReactNode;
  navigation: NavigationItem[];
  role: AppRole;
  session: AuthSession;
};

const shellCopy: Record<AppRole, { eyebrow: string; subtitle: string }> = {
  admin: {
    eyebrow: "Admin Workspace",
    subtitle:
      "Control the marketplace, monitor performance, and keep teams aligned.",
  },
  customer: {
    eyebrow: "Customer Workspace",
    subtitle:
      "Track bookings, manage preferences, and stay close to every service request.",
  },
};

function isActiveItem(pathname: string, item: NavigationItem) {
  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export default function DashboardShell({
  children,
  navigation,
  role,
  session,
}: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, startLogoutTransition] = useTransition();
  const copy = shellCopy[role];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const logout = () => {
    startLogoutTransition(() => {
      clearClientSession();
      router.replace("/");
      router.refresh();
    });
  };

  return (
    <div className={`sow-dashboard sow-dashboard--${role}`}>
      <aside className={`sow-dashboard-sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="sow-dashboard-sidebar__head">
          <Link
            href={getDefaultRouteForRole(role)}
            className="sow-dashboard-brand"
          >
            <img src="/assets/img/logo.svg" alt="Truelysell" />
          </Link>
          <button
            type="button"
            className="btn btn-link p-0 d-lg-none"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <i className="ti ti-x fs-24" />
          </button>
        </div>

        <div className="sow-dashboard-sidebar__profile">
          <span className="sow-dashboard-sidebar__avatar" aria-hidden="true">
            {session.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="mb-1 sow-dashboard-sidebar__eyebrow">
              {copy.eyebrow}
            </p>
            <h6 className="mb-1">{session.name}</h6>
            <p className="mb-0 text-muted">{session.email}</p>
          </div>
        </div>

        <nav
          className="sow-dashboard-sidebar__nav"
          aria-label={`${copy.eyebrow} navigation`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActiveItem(pathname, item) ? "is-active" : undefined}
            >
              {item.icon ? (
                <i className={item.icon} aria-hidden="true" />
              ) : null}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sow-dashboard-sidebar__footer">
          <Link href="/" className="btn btn-light w-100">
            Public Site
          </Link>
          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={logout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Signing Out..." : "Sign Out"}
          </button>
        </div>
      </aside>

      <div
        className={`sow-dashboard-backdrop ${menuOpen ? "is-visible" : ""}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <div className="sow-dashboard-main">
        <header className="sow-dashboard-topbar">
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-light d-lg-none"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <i className="ti ti-menu-2 fs-22" />
            </button>
            <div>
              <p className="mb-1 sow-dashboard-topbar__eyebrow">
                {copy.eyebrow}
              </p>
              <h4 className="mb-1">Welcome back, {session.name}</h4>
              <p className="mb-0 text-muted">{copy.subtitle}</p>
            </div>
          </div>

          <div className="sow-dashboard-topbar__actions">
            <span className="sow-dashboard-role-pill">{role}</span>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={logout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Signing Out..." : "Logout"}
            </button>
          </div>
        </header>

        <main className="sow-dashboard-content">{children}</main>
      </div>
    </div>
  );
}
