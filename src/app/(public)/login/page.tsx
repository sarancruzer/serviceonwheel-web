import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/auth/server";
import { getDefaultRouteForRole } from "@/lib/auth/shared";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect(getDefaultRouteForRole(session.role));
  }

  redirect("/?auth=login");
}
