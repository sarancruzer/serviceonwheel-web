import { redirect } from "next/navigation";

import DashboardShell from "@/components/layout/DashboardShell";
import { getServerSession } from "@/lib/auth/server";
import { getDefaultRouteForRole } from "@/lib/auth/shared";
import { customerNavigation } from "@/lib/navigation";

export default async function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/?auth=login");
  }

  if (session.role !== "customer") {
    redirect(getDefaultRouteForRole(session.role));
  }

  return (
    <DashboardShell
      navigation={customerNavigation}
      role="customer"
      session={session}
    >
      {children}
    </DashboardShell>
  );
}
