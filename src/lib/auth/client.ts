"use client";

import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  type AuthSession,
  serializeSession,
} from "@/lib/auth/shared";

export function setClientSession(session: AuthSession) {
  document.cookie = [
    `${AUTH_COOKIE_NAME}=${serializeSession(session)}`,
    "Path=/",
    `Max-Age=${AUTH_COOKIE_MAX_AGE}`,
    "SameSite=Lax",
  ].join("; ");
}

export function clearClientSession() {
  document.cookie = [
    `${AUTH_COOKIE_NAME}=`,
    "Path=/",
    "Max-Age=0",
    "SameSite=Lax",
  ].join("; ");
}
