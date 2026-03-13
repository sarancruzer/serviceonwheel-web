import { redirect } from "next/navigation";

import DashboardShell from "@/components/layout/DashboardShell";
import { getServerSession } from "@/lib/auth/server";
import { getDefaultRouteForRole } from "@/lib/auth/shared";
import { adminNavigation } from "@/lib/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/?auth=login");
  }

  if (session.role !== "admin") {
    redirect(getDefaultRouteForRole(session.role));
  }

  return (
    <DashboardShell navigation={adminNavigation} role="admin" session={session}>
      {children}
    </DashboardShell>
  );
}
