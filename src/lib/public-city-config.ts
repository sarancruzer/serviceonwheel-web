import type { PublicCity } from "@/types";

const FALLBACK_CITY_SLUG = "thanjavur";
const FALLBACK_PHASE_ONE_CITIES = [
  { name: "Thanjavur", slug: "thanjavur" },
  { name: "Madurai", slug: "madurai" },
  { name: "Coimbatore", slug: "coimbatore" },
  { name: "Chennai", slug: "chennai" },
] as const;

function getFallbackPhaseOneCities(): PublicCity[] {
  return FALLBACK_PHASE_ONE_CITIES.map((city) => ({
    id: `configured-${city.slug}`,
    isActive: true,
    name: city.name,
    slug: city.slug,
  }));
}

function normalizeSlug(value?: string | null) {
  return value
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function parseConfiguredPublicCities(rawValue?: string | null): PublicCity[] {
  const normalizedEntries = rawValue
    ?.split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (!normalizedEntries?.length) {
    return getFallbackPhaseOneCities();
  }

  const cities = normalizedEntries.reduce<PublicCity[]>(
    (accumulator, entry) => {
      const [slugPart, namePart] = entry.split(":");
      const normalizedSlug = normalizeSlug(slugPart);

      if (!normalizedSlug) {
        return accumulator;
      }

      if (accumulator.some((city) => city.slug === normalizedSlug)) {
        return accumulator;
      }

      accumulator.push({
        id: `configured-${normalizedSlug}`,
        isActive: true,
        name: namePart?.trim() || humanizeSlug(normalizedSlug),
        slug: normalizedSlug,
      });

      return accumulator;
    },
    [],
  );

  return cities.length ? cities : getFallbackPhaseOneCities();
}

export const configuredPublicCities = parseConfiguredPublicCities(
  process.env.NEXT_PUBLIC_PHASE_ONE_CITIES,
);

export function getConfiguredDefaultCitySlug() {
  const configuredDefaultSlug = normalizeSlug(
    process.env.NEXT_PUBLIC_DEFAULT_CITY_SLUG,
  );

  if (
    configuredDefaultSlug &&
    configuredPublicCities.some((city) => city.slug === configuredDefaultSlug)
  ) {
    return configuredDefaultSlug;
  }

  return configuredPublicCities[0]?.slug ?? FALLBACK_CITY_SLUG;
}
