import "server-only";

import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME, parseSession } from "@/lib/auth/shared";

export async function getServerSession() {
  const cookieStore = await cookies();

  return parseSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);
}
