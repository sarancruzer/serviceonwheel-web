import "server-only";

import {
  configuredPublicCities,
  getConfiguredDefaultCitySlug,
} from "@/lib/public-city-config";
import { buildServicesHref } from "@/lib/services-href";
import type {
  PublicCategory,
  PublicCity,
  PublicCityListResponse,
  PublicServiceSearchResponse,
  PublicServiceSearchResult,
  PublicServiceSearchType,
  PublicSubService,
} from "@/types";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3001";
const DEFAULT_CITY_SLUG =
  process.env.DEFAULT_CITY_SLUG ?? getConfiguredDefaultCitySlug();
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
  type?: PublicServiceSearchType | null;
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

function buildCityListResponse(items: PublicCity[]): PublicCityListResponse {
  if (!items.length) {
    return {
      defaultCitySlug: DEFAULT_CITY_SLUG,
      items: configuredPublicCities,
    };
  }

  return {
    defaultCitySlug:
      items.find((city) => city.slug === DEFAULT_CITY_SLUG)?.slug ??
      items[0]?.slug ??
      DEFAULT_CITY_SLUG,
    items,
  };
}

export async function listPublicCities(): Promise<PublicCityListResponse> {
  try {
    const items = await fetchCatalogJson<PublicCity[]>("/public/cities");

    return buildCityListResponse(items);
  } catch {
    return buildCityListResponse(configuredPublicCities);
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
  return buildServicesHref({
    city: citySlug,
    query,
  });
}

function buildPublicServiceSearchPath({
  citySlug,
  limit,
  query,
  type,
}: {
  citySlug: string;
  limit: number;
  query: string;
  type: PublicServiceSearchType;
}) {
  const searchParams = new URLSearchParams({
    citySlug,
    limit: String(limit),
    type,
  });

  if (query) {
    searchParams.set("q", query);
  }

  return `/public/service-search?${searchParams.toString()}`;
}

function createCategoryResult(
  category: PublicCategory,
  citySlug: string,
): PublicServiceSearchResult {
  return {
    categoryName: category.name,
    categorySlug: category.slug,
    citySlug,
    href: buildServicesHref({
      city: citySlug,
      slug: category.slug,
    }),
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
    href: buildServicesHref({
      city: citySlug,
      service: subService.slug,
      slug: category.slug,
    }),
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

async function searchPublicServicesLocally({
  city,
  limit,
  query,
  type,
}: SearchPublicServicesOptions): Promise<PublicServiceSearchResponse> {
  const normalizedCitySlug = normalizeCitySlug(city);
  const normalizedQuery = normalizeSearchQuery(query);
  const safeLimit = Math.min(Math.max(limit ?? 8, 1), 20);
  const searchType = type ?? "all";
  const catalogIndex = await getCatalogIndex(normalizedCitySlug);
  const categoryResults = catalogIndex.categories.map((category) =>
    createCategoryResult(category, catalogIndex.citySlug),
  );
  const subServiceResults = catalogIndex.categories.flatMap((category) =>
    category.subServices.map((subService) =>
      createSubServiceResult(category, subService, catalogIndex.citySlug),
    ),
  );

  if (!normalizedQuery) {
    const items =
      searchType === "category"
        ? categoryResults.slice(0, safeLimit)
        : searchType === "subservice"
          ? subServiceResults.slice(0, safeLimit)
          : [...subServiceResults, ...categoryResults].slice(0, safeLimit);

    return {
      citySlug: catalogIndex.citySlug,
      items,
      query: normalizedQuery,
      total: items.length,
    };
  }

  const categoryMatches =
    searchType === "subservice"
      ? []
      : categoryResults
          .map((item) => ({
            item,
            score: getMatchScore(normalizedQuery, item.title, item.categorySlug),
          }))
          .filter((match) => match.score > 0);

  const subServiceMatches =
    searchType === "category"
      ? []
      : subServiceResults
          .map((item) => ({
            item,
            score: getMatchScore(
              normalizedQuery,
              item.title,
              item.serviceSlug ?? "",
              item.categoryName,
            ),
          }))
          .filter((match) => match.score > 0);

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
}

export async function searchPublicServices({
  city,
  limit = 8,
  query,
  type,
}: SearchPublicServicesOptions): Promise<PublicServiceSearchResponse> {
  const normalizedCitySlug = normalizeCitySlug(city);
  const normalizedQuery = normalizeSearchQuery(query);
  const safeLimit = Math.min(Math.max(limit, 1), 20);
  const searchType = type ?? "all";

  try {
    return await fetchCatalogJson<PublicServiceSearchResponse>(
      buildPublicServiceSearchPath({
        citySlug: normalizedCitySlug,
        limit: safeLimit,
        query: normalizedQuery,
        type: searchType,
      }),
      {
        next: {
          revalidate: 60,
        },
      },
    );
  } catch {
    try {
      return await searchPublicServicesLocally({
        city: normalizedCitySlug,
        limit: safeLimit,
        query: normalizedQuery,
        type: searchType,
      });
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
}

export function getSearchFallbackHref(query: string, city?: string | null) {
  return buildFallbackSearchHref(
    normalizeSearchQuery(query),
    normalizeCitySlug(city),
  );
}
