# ServiceOnWheel Web

Production-style Next.js App Router frontend for the ServiceOnWheel backend, built from the provided Truelysell HTML templates instead of replacing them with a generic dashboard UI.

## Stack

- Next.js App Router
- TypeScript with `strict: true`
- TanStack Query
- Axios
- React Hook Form
- Zod
- Zustand
- date-fns
- Sonner
- clsx
- ESLint + Prettier + Husky + lint-staged

## Setup

1. Copy the env file:

```bash
cp .env.example .env.local
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend separately on `http://localhost:3001`.

4. Start the app:

```bash
npm run dev
```

5. Production check:

```bash
npm run build
```

## Environment

```env
API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=ServiceOnWheel
```

## Route Groups

- `(public)`:
  landing, city/category browse, booking, tracking, review, upload
- `(auth)`:
  login, register, forgot/reset password, role selection
- `(customer)`:
  dashboard, addresses, bookings, booking detail, settings
- `(vendor)`:
  profile, settings, jobs placeholder
- `(admin)`:
  dashboard, catalog CRUD, vendors, bookings, settlements, audit

## Auth Cookie Flow

- Browser login/register/refresh requests go to `src/app/api/auth/[action]/route.ts`.
- Backend `accessToken` and `refreshToken` are stored in secure HTTP-only cookies:
  `sow_access_token`, `sow_refresh_token`.
- Readable session metadata cookies are used for middleware decisions:
  `sow_roles`, `sow_active_role`, `sow_session`.
- `/api/auth/session` bootstraps the session by reading cookies and calling backend `/auth/me`.
- If the access token is stale and a refresh token exists, the route handler refreshes once, rewrites cookies, and retries.
- The Axios client retries a 401 once via `/api/auth/session`. If refresh still fails, it redirects to `/login`.

## Route Protection

- `middleware.ts` protects `/customer`, `/vendor`, and `/admin`.
- Multi-role users are redirected to `/select-role` after login if no active role is chosen.
- Middleware checks role membership from the session metadata cookies and avoids inventing backend authorization APIs.

## API Coverage

Typed service modules exist for every listed backend endpoint:

- `src/api/system.ts`
- `src/api/auth.ts`
- `src/api/public.ts`
- `src/api/customer.ts`
- `src/api/vendor.ts`
- `src/api/admin.ts`

Protected client traffic goes through `src/app/api/proxy/[...path]/route.ts`, which forwards requests to the backend with the cookie-backed bearer token.

## Template Assets

The original template assets were copied into:

- `public/template/public-assets`
- `public/template/admin-assets`

Route-group `head.tsx` files load the original template CSS directly from those copied folders so branding, class names, and relative asset paths stay intact.

If the HTML template pack is updated later, replace those copied asset folders with the new versions and keep the same paths.

## Backend Constraints Reflected Here

- Vendor UI only uses `GET /vendor/profile` and `PUT /vendor/profile`.
- Vendor jobs intentionally show a phase-2 placeholder with no fake API wiring.
- Booking time windows are local constants because no slot API exists.
- Public FAQ UI is not exposed because there is no public FAQ read endpoint.
- Booking photo upload uses:
  create booking -> presign -> direct upload -> finalize.

## Notes

- Public city selection currently uses `src/lib/constants.ts` because the backend contract provided here does not include a public city-list endpoint.
- `npm run build` was verified successfully without a running backend because all runtime backend calls are dynamic.
