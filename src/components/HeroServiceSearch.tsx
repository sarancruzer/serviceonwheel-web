"use client";

import {
  startTransition,
  type FormEvent,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import HeroCitySelect, {
  type CitySelectOption,
} from "@/components/HeroCitySelect";
import { serviceCategories } from "@/data/services";
import {
  configuredPublicCities,
  getConfiguredDefaultCitySlug,
} from "@/lib/public-city-config";
import type {
  PublicCityListResponse,
  PublicServiceSearchResponse,
  PublicServiceSearchResult,
} from "@/types";

type HeroServiceSearchProps = {
  popularSearches: string[];
};

const SELECTED_CITY_STORAGE_KEY = "sow:selected-city";

function buildFallbackHref(query: string, citySlug: string) {
  const searchParams = new URLSearchParams();
  const trimmedQuery = query.trim();

  if (trimmedQuery) {
    searchParams.set("query", trimmedQuery);
  }

  if (citySlug) {
    searchParams.set("city", citySlug);
  }

  const queryString = searchParams.toString();

  return queryString ? `/services?${queryString}` : "/services";
}

function toCityOption(citySlug: string, cityName: string): CitySelectOption {
  return {
    label: cityName,
    value: citySlug,
  };
}

function getInitialCityOptions() {
  return configuredPublicCities.map((city) =>
    toCityOption(city.slug, city.name),
  );
}

function getInitialSelectedCity(options: CitySelectOption[]) {
  const defaultCitySlug = getConfiguredDefaultCitySlug();

  return (
    options.find((option) => option.value === defaultCitySlug) ??
    options[0] ??
    null
  );
}

export default function HeroServiceSearch({
  popularSearches,
}: HeroServiceSearchProps) {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const [cityOptions, setCityOptions] = useState<CitySelectOption[]>(
    getInitialCityOptions,
  );
  const [selectedCity, setSelectedCity] = useState<CitySelectOption | null>(
    () => getInitialSelectedCity(getInitialCityOptions()),
  );
  const [serviceQuery, setServiceQuery] = useState("");
  const [results, setResults] = useState<PublicServiceSearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(serviceQuery.trim());
  const activeCitySlug = selectedCity?.value ?? getConfiguredDefaultCitySlug();
  const defaultSuggestions: PublicServiceSearchResult[] = serviceCategories
    .slice(0, 10)
    .map((category) => ({
      categoryName: category.title,
      categorySlug: category.slug,
      citySlug: activeCitySlug,
      href: `/services/${category.slug}?city=${activeCitySlug}`,
      id: `default-category-${category.id}`,
      subtitle: category.summary,
      title: category.title,
      type: "category",
    }));
  const isShowingDefaultSuggestions = deferredQuery.length < 2;
  const displayResults = isShowingDefaultSuggestions
    ? defaultSuggestions
    : results;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const storedCitySlug = window.localStorage.getItem(
      SELECTED_CITY_STORAGE_KEY,
    );

    if (!storedCitySlug) {
      return;
    }

    const storedCityOption = cityOptions.find(
      (option) => option.value === storedCitySlug,
    );

    if (storedCityOption) {
      setSelectedCity(storedCityOption);
    }
  }, [cityOptions]);

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    window.localStorage.setItem(SELECTED_CITY_STORAGE_KEY, selectedCity.value);
  }, [selectedCity]);

  useEffect(() => {
    let isActive = true;

    fetch("/api/public/cities")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch available cities.");
        }

        return (await response.json()) as PublicCityListResponse;
      })
      .then((payload) => {
        if (!isActive) {
          return;
        }

        const nextOptions = payload.items.map((city) =>
          toCityOption(city.slug, city.name),
        );

        if (!nextOptions.length) {
          return;
        }

        setCityOptions(nextOptions);
        setSelectedCity((currentCity) => {
          if (currentCity) {
            const currentMatch = nextOptions.find(
              (option) => option.value === currentCity.value,
            );

            if (currentMatch) {
              return currentMatch;
            }
          }

          return (
            nextOptions.find(
              (option) => option.value === payload.defaultCitySlug,
            ) ??
            nextOptions[0] ??
            null
          );
        });
      })
      .catch(() => {
        // Keep the configured phase-1 cities when the route or API is unavailable.
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (deferredQuery.length < 2) {
      setResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();
    const searchParams = new URLSearchParams({
      limit: "6",
      q: deferredQuery,
    });

    if (selectedCity?.value) {
      searchParams.set("city", selectedCity.value);
    }

    setIsLoading(true);

    fetch(`/api/public/service-search?${searchParams.toString()}`, {
      signal: abortController.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch live service suggestions.");
        }

        return (await response.json()) as PublicServiceSearchResponse;
      })
      .then((payload) => {
        setResults(payload.items);
        setError(payload.error ?? null);
        setIsDropdownOpen(true);
      })
      .catch((fetchError: Error) => {
        if (fetchError.name === "AbortError") {
          return;
        }

        setResults([]);
        setError("Live service search is temporarily unavailable.");
        setIsDropdownOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [deferredQuery, selectedCity?.value]);

  const navigateTo = (href: string) => {
    setIsDropdownOpen(false);

    startTransition(() => {
      router.push(href);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (results[0]?.href) {
      navigateTo(results[0].href);
      return;
    }

    navigateTo(buildFallbackHref(serviceQuery, selectedCity?.value ?? ""));
  };

  const handlePopularSearch = (value: string) => {
    setServiceQuery(value);
    navigateTo(buildFallbackHref(value, selectedCity?.value ?? ""));
  };

  const shouldShowDropdown =
    !isCityMenuOpen &&
    isDropdownOpen &&
    (isShowingDefaultSuggestions
      ? displayResults.length > 0
      : isLoading || Boolean(error) || displayResults.length > 0);

  return (
    <div ref={searchRef} className="sow-hero-search">
      <form onSubmit={handleSubmit} className="sow-hero-search__form">
        <div className="sow-hero-search__shell">
          <HeroCitySelect
            onChange={(option) => {
              setSelectedCity(option);
            }}
            onMenuClose={() => setIsCityMenuOpen(false)}
            onMenuOpen={() => {
              setIsDropdownOpen(false);
              setIsCityMenuOpen(true);
            }}
            options={cityOptions}
            value={selectedCity}
          />

          <div className="sow-hero-search__service-pane">
            <label className="sow-hero-search__field sow-hero-search__field--service">
              <span className="sow-hero-search__icon" aria-hidden="true">
                <i className="ti ti-search" />
              </span>
              <input
                type="search"
                value={serviceQuery}
                onChange={(event) => setServiceQuery(event.target.value)}
                onFocus={() => {
                  setIsCityMenuOpen(false);
                  setIsDropdownOpen(true);
                }}
                className="sow-hero-search__input"
                placeholder="Search for a service e.g. Air Conditioner, Cleaning, Carpenter"
                autoComplete="off"
              />
            </label>

            {shouldShowDropdown ? (
              <div className="sow-hero-search__results" role="listbox">
                <div className="sow-hero-search__results-head">
                  <span>
                    {isShowingDefaultSuggestions
                      ? "Select a service"
                      : "Live service suggestions"}
                  </span>
                  <small>
                    {selectedCity
                      ? `in ${selectedCity.label}`
                      : "using your default city"}
                  </small>
                </div>

                {!isShowingDefaultSuggestions && isLoading ? (
                  <p className="sow-hero-search__status mb-0">
                    Searching services...
                  </p>
                ) : null}

                {!isShowingDefaultSuggestions && error ? (
                  <p className="sow-hero-search__status mb-0">{error}</p>
                ) : null}

                {!isShowingDefaultSuggestions &&
                !error &&
                !isLoading &&
                displayResults.length === 0 ? (
                  <p className="sow-hero-search__status mb-0">
                    No services matched that search. Try a broader term like
                    electrician, plumbing, or cleaning.
                  </p>
                ) : null}

                {displayResults.length > 0 ? (
                  <div className="sow-hero-search__result-list">
                    {displayResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        className="sow-hero-search__result"
                        onClick={() => navigateTo(result.href)}
                      >
                        <span className="sow-hero-search__result-copy">
                          <strong>{result.title}</strong>
                          <small>
                            {isShowingDefaultSuggestions
                              ? "Browse category"
                              : result.subtitle}
                          </small>
                        </span>
                        <span className="sow-hero-search__result-type">
                          {result.type === "subservice"
                            ? result.categoryName
                            : "Category"}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn btn-linear-primary sow-hero-search__submit"
          >
            <i className="ti ti-search" />
            <span>Search</span>
          </button>
        </div>
      </form>

      <div className="d-flex align-items-center flex-wrap sow-hero-badges">
        <h6 className="mb-2 me-2 fw-medium">Popular Searches</h6>
        {popularSearches.map((popularSearch) => (
          <button
            key={popularSearch}
            type="button"
            className="badge badge-dark-transparent fs-14 fw-normal mb-2 me-2 border-0"
            onClick={() => handlePopularSearch(popularSearch)}
          >
            {popularSearch}
          </button>
        ))}
      </div>
    </div>
  );
}
