type BuildServicesHrefOptions = {
  auth?: string | null;
  city?: string | null;
  query?: string | null;
  service?: string | null;
  slug?: string | null;
};

function setSearchParam(
  searchParams: URLSearchParams,
  key: string,
  value?: string | null,
) {
  const normalizedValue = value?.trim();

  if (normalizedValue) {
    searchParams.set(key, normalizedValue);
  }
}

export function buildServicesHref({
  auth,
  city,
  query,
  service,
  slug,
}: BuildServicesHrefOptions) {
  const pathname = slug ? `/services/${slug}` : "/services";
  const searchParams = new URLSearchParams();

  setSearchParam(searchParams, "query", query);
  setSearchParam(searchParams, "city", city);
  setSearchParam(searchParams, "service", service);
  setSearchParam(searchParams, "auth", auth);

  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}
