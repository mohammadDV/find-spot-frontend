import { getTranslations } from "next-intl/server";
import { getBusinesses } from "../search/_api/getBusinesses";
import { SearchFilters } from "../search/_components/filters/SearchFilters";
import { SearchMap } from "../search/_components/map";

interface MapPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    filters?: string | string[];
    amount_type?: string;
    now?: string;
    lat?: string;
    long?: string;
    sort?: string;
    column?: string;
    query?: string;
  }>;
}

export default async function MapPage({ searchParams }: MapPageProps) {
  const t = await getTranslations("common");
  const resolvedSearchParams = await searchParams;

  const page = parseInt(resolvedSearchParams?.page || "1");
  const category = resolvedSearchParams?.category;
  const amount_type = resolvedSearchParams?.amount_type;
  const now = resolvedSearchParams?.now;
  const lat = resolvedSearchParams?.lat;
  const long = resolvedSearchParams?.long;
  const sort = resolvedSearchParams?.sort;
  const column = resolvedSearchParams?.column;
  const query = resolvedSearchParams?.query;

  const filtersParam = resolvedSearchParams?.filters;
  const filters = Array.isArray(filtersParam)
    ? filtersParam
    : filtersParam
      ? [filtersParam]
      : undefined;

  const searchData = await getBusinesses({
    page,
    category,
    amount_type,
    filters,
    now,
    lat,
    long,
    sort,
    column,
    query,
  });

  return (
    <div className="my-4 lg:my-10 container mx-auto px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
          <h2 className="text-title lg:text-3xl font-bold">{t("navigation.searchMap")}</h2>
          <div className="flex flex-wrap items-center gap-2 lg:gap-4">
            <SearchFilters />
          </div>
        </div>
        <SearchMap items={searchData.data || []} className="h-[400px]" />
      </div>
    </div>
  );
}