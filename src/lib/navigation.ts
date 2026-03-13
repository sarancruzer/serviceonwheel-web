import type { AppRole } from "@/lib/auth/shared";

export type NavigationItem = {
  exact?: boolean;
  href: string;
  icon?: string;
  label: string;
  showCaret?: boolean;
};

export const publicInnerNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blogs", label: "Blogs" },
  { href: "/login", label: "Admin" },
];

export const publicHomeNavigation: NavigationItem[] = [
  { exact: true, href: "/", label: "Home", showCaret: true },
  { href: "/services", label: "Services", showCaret: true },
  { href: "/about", label: "About", showCaret: true },
  { href: "/contact", label: "Contact", showCaret: true },
  { href: "/blogs", label: "Blogs", showCaret: true },
  { href: "/login", label: "Admin" },
];

export const customerNavigation: NavigationItem[] = [
  { exact: true, href: "/customer", icon: "ti ti-home-2", label: "Dashboard" },
  {
    href: "/customer/bookings",
    icon: "ti ti-calendar-event",
    label: "Bookings",
  },
  { href: "/customer/profile", icon: "ti ti-user-circle", label: "Profile" },
];

export const adminNavigation: NavigationItem[] = [
  {
    exact: true,
    href: "/admin",
    icon: "ti ti-layout-dashboard",
    label: "Dashboard",
  },
  { href: "/admin/users", icon: "ti ti-users-group", label: "Users" },
  { href: "/admin/reports", icon: "ti ti-chart-bar", label: "Reports" },
];

export const dashboardNavigationByRole: Record<AppRole, NavigationItem[]> = {
  admin: adminNavigation,
  customer: customerNavigation,
};
