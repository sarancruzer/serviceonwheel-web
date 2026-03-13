export const AUTH_COOKIE_NAME = "sow_auth_session";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 8;

export const APP_ROLES = ["customer", "admin"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export type AuthSession = {
  email: string;
  name: string;
  role: AppRole;
  version: 1;
};

export const defaultRouteByRole: Record<AppRole, string> = {
  admin: "/admin",
  customer: "/customer",
};

export function isAppRole(value: string | null | undefined): value is AppRole {
  return APP_ROLES.includes(value as AppRole);
}

export function getDefaultRouteForRole(role: AppRole) {
  return defaultRouteByRole[role];
}

function toDisplayName(value: string) {
  return value
    .split(/[.@_\-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function buildDemoSession(params: {
  email?: string;
  name?: string;
  role: AppRole;
  username?: string;
}): AuthSession {
  const rawIdentity =
    params.email?.trim() || params.username?.trim() || "guest";
  const normalizedEmail = params.email?.trim()
    ? params.email.trim().toLowerCase()
    : `${rawIdentity.toLowerCase().replace(/\s+/g, ".")}@truelysell.demo`;

  return {
    email: normalizedEmail,
    name:
      params.name?.trim() || toDisplayName(rawIdentity) || "Truelysell User",
    role: params.role,
    version: 1,
  };
}

export function serializeSession(session: AuthSession) {
  return encodeURIComponent(JSON.stringify(session));
}

export function parseSession(
  cookieValue: string | null | undefined,
): AuthSession | null {
  if (!cookieValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      decodeURIComponent(cookieValue),
    ) as Partial<AuthSession>;

    if (
      typeof parsed?.email !== "string" ||
      typeof parsed?.name !== "string" ||
      !isAppRole(parsed?.role) ||
      parsed?.version !== 1
    ) {
      return null;
    }

    return {
      email: parsed.email,
      name: parsed.name,
      role: parsed.role,
      version: 1,
    };
  } catch {
    return null;
  }
}
