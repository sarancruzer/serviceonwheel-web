import "server-only";

import {
  configuredPublicCities,
  getConfiguredDefaultCitySlug,
} from "@/lib/public-city-config";
import type {
  PublicCategory,
  PublicCity,
  PublicCityListResponse,
  PublicServiceSearchResponse,
  PublicServiceSearchResult,
  PublicSubService,
} from "@/types";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3001";
const DEFAULT_CITY_SLUG =
  process.env.DEFAULT_CITY_SLUG ?? getConfiguredDefaultCitySlug();
const ENABLE_PUBLIC_CITIES_ENDPOINT =
  process.env.ENABLE_PUBLIC_CITIES_ENDPOINT === "true";
const CATALOG_REVALIDATE_SECONDS = 300;

type FetchCatalogJsonOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

type SearchPublicServicesOptions = {
  city?: string | null;
  limit?: number;
  query?: string | null;
};

type CatalogIndex = {
  categories: Array<
    PublicCategory & {
      subServices: PublicSubService[];
    }
  >;
  citySlug: string;
};

function buildApiUrl(pathname: string) {
  return new URL(pathname, API_BASE_URL).toString();
}

function normalizeSearchQuery(value?: string | null) {
  return value?.trim() ?? "";
}

export function normalizeCitySlug(value?: string | null) {
  const normalized = value
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || DEFAULT_CITY_SLUG;
}

async function fetchCatalogJson<T>(
  pathname: string,
  options?: FetchCatalogJsonOptions,
): Promise<T> {
  const response = await fetch(buildApiUrl(pathname), {
    ...options,
    headers: {
      Accept: "application/json",
      ...options?.headers,
    },
    next: options?.next ?? {
      revalidate: CATALOG_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Catalog API request failed with ${response.status} for ${pathname}`,
    );
  }

  return (await response.json()) as T;
}

export async function listPublicCategories(citySlug: string) {
  return fetchCatalogJson<PublicCategory[]>(
    `/public/cities/${citySlug}/categories`,
  );
}

export async function listPublicCities(): Promise<PublicCityListResponse> {
  if (!ENABLE_PUBLIC_CITIES_ENDPOINT) {
    return {
      defaultCitySlug: DEFAULT_CITY_SLUG,
      items: configuredPublicCities,
    };
  }

  try {
    const items = await fetchCatalogJson<PublicCity[]>("/public/cities");

    return {
      defaultCitySlug: DEFAULT_CITY_SLUG,
      items,
    };
  } catch {
    return {
      defaultCitySlug: DEFAULT_CITY_SLUG,
      items: configuredPublicCities,
    };
  }
}

export async function listPublicSubServices(
  citySlug: string,
  categorySlug: string,
) {
  return fetchCatalogJson<PublicSubService[]>(
    `/public/cities/${citySlug}/categories/${categorySlug}/subservices`,
  );
}

async function getCatalogIndex(citySlug: string): Promise<CatalogIndex> {
  const categories = await listPublicCategories(citySlug);
  const subServiceEntries = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      subServices: await listPublicSubServices(citySlug, category.slug),
    })),
  );

  return {
    categories: subServiceEntries,
    citySlug,
  };
}

function buildFallbackSearchHref(query: string, citySlug: string) {
  const searchParams = new URLSearchParams();

  if (query) {
    searchParams.set("query", query);
  }

  if (citySlug) {
    searchParams.set("city", citySlug);
  }

  const queryString = searchParams.toString();

  return queryString ? `/services?${queryString}` : "/services";
}

function createCategoryResult(
  category: PublicCategory,
  citySlug: string,
): PublicServiceSearchResult {
  return {
    categoryName: category.name,
    categorySlug: category.slug,
    citySlug,
    href: `/services/${category.slug}?city=${citySlug}`,
    id: `category-${category.id}`,
    subtitle: `${category.name} category`,
    title: category.name,
    type: "category",
  };
}

function createSubServiceResult(
  category: PublicCategory,
  subService: PublicSubService,
  citySlug: string,
): PublicServiceSearchResult {
  return {
    categoryName: category.name,
    categorySlug: category.slug,
    citySlug,
    href: `/services/${category.slug}?city=${citySlug}&service=${subService.slug}`,
    id: `subservice-${subService.id}`,
    serviceSlug: subService.slug,
    subtitle:
      subService.seoDescription ??
      `${subService.name} in ${category.name.toLowerCase()}`,
    title: subService.name,
    type: "subservice",
  };
}

function getMatchScore(query: string, ...candidates: string[]) {
  const normalizedQuery = query.toLowerCase();

  return candidates.reduce((bestScore, candidate) => {
    const normalizedCandidate = candidate.toLowerCase();

    if (normalizedCandidate === normalizedQuery) {
      return Math.max(bestScore, 500);
    }

    if (normalizedCandidate.startsWith(normalizedQuery)) {
      return Math.max(bestScore, 350);
    }

    if (normalizedCandidate.includes(` ${normalizedQuery}`)) {
      return Math.max(bestScore, 250);
    }

    if (normalizedCandidate.includes(normalizedQuery)) {
      return Math.max(bestScore, 150);
    }

    return bestScore;
  }, 0);
}

export async function searchPublicServices({
  city,
  limit = 8,
  query,
}: SearchPublicServicesOptions): Promise<PublicServiceSearchResponse> {
  const normalizedCitySlug = normalizeCitySlug(city);
  const normalizedQuery = normalizeSearchQuery(query);
  const safeLimit = Math.min(Math.max(limit, 1), 20);

  try {
    const catalogIndex = await getCatalogIndex(normalizedCitySlug);

    if (!normalizedQuery) {
      const items = catalogIndex.categories
        .slice(0, safeLimit)
        .map((category) =>
          createCategoryResult(category, catalogIndex.citySlug),
        );

      return {
        citySlug: catalogIndex.citySlug,
        items,
        query: normalizedQuery,
        total: items.length,
      };
    }

    const categoryMatches = catalogIndex.categories
      .map((category) => ({
        item: createCategoryResult(category, catalogIndex.citySlug),
        score: getMatchScore(normalizedQuery, category.name, category.slug),
      }))
      .filter((match) => match.score > 0);

    const subServiceMatches = catalogIndex.categories.flatMap((category) =>
      category.subServices
        .map((subService) => ({
          item: createSubServiceResult(
            category,
            subService,
            catalogIndex.citySlug,
          ),
          score: getMatchScore(
            normalizedQuery,
            subService.name,
            subService.slug,
            category.name,
          ),
        }))
        .filter((match) => match.score > 0),
    );

    const items = [...categoryMatches, ...subServiceMatches]
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }

        if (left.item.type !== right.item.type) {
          return left.item.type === "subservice" ? -1 : 1;
        }

        return left.item.title.localeCompare(right.item.title);
      })
      .slice(0, safeLimit)
      .map((match) => match.item);

    return {
      citySlug: catalogIndex.citySlug,
      items,
      query: normalizedQuery,
      total: items.length,
    };
  } catch {
    return {
      citySlug: normalizedCitySlug,
      error: "Live service search is temporarily unavailable.",
      items: [],
      query: normalizedQuery,
      total: 0,
    };
  }
}

export function getSearchFallbackHref(query: string, city?: string | null) {
  return buildFallbackSearchHref(
    normalizeSearchQuery(query),
    normalizeCitySlug(city),
  );
}
