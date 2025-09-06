import { Pagination } from "@/app/_components/pagination";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getBusinesses } from "./_api/getBusinesses";
import { SearchFilters } from "./_components/filters/SearchFilters";
import { SearchCard } from "./_components/searchCard/SearchCard";

interface SearchPageProps {
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
    }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();

    const resolvedSearchParams = await searchParams;

    const page = parseInt(resolvedSearchParams?.page || "1");
    const category = resolvedSearchParams?.category;
    const amount_type = resolvedSearchParams?.amount_type;
    const now = resolvedSearchParams?.now;
    const lat = resolvedSearchParams?.lat;
    const long = resolvedSearchParams?.long;
    const sort = resolvedSearchParams?.sort;
    const column = resolvedSearchParams?.column;

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
        column
    })

    return (
        <div className="my-8 lg:my-10 container mx-auto px-4">
            <div className="lg:flex justify-between gap-10">
                <div className="lg:w-3/4">
                    <div className="flex items-center gap-1 lg:gap-2">
                        <Image
                            src={"/images/finybo-icon.svg"}
                            alt="finybo icon"
                            width={24}
                            height={24}
                            className="size-4 lg:size-6"
                        />
                        <h2 className="text-title lg:text-3xl font-bold">بهترین رستوران‌های استانبول</h2>
                    </div>
                    <div className="mt-5 lg:mt-8 flex flex-wrap items-center gap-2 lg:gap-4">
                        <SearchFilters />
                    </div>
                    <div className="grid grid-cols-2 lg:flex flex-col gap-4 lg:gap-6 mt-8">
                        {Array.from({ length: 3 }, (_, i) => (
                            <SearchCard key={i} />
                        ))}
                    </div>
                    {searchData.data && searchData.total > 10 && (
                        <Pagination
                            currentPage={searchData.current_page}
                            lastPage={searchData.last_page}
                            links={searchData.links}
                            total={searchData.total}
                            routeUrl="/search"
                        />
                    )}
                </div>
                <div className="bg-border lg:w-1/3 rounded-2xl">
                </div>
            </div>
        </div>
    )
}