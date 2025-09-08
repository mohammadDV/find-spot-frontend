import { getFetch } from "@/core/publicService";
import { BusinessesSearchResponse } from "@/types/business.type";

interface GetBusinessesParams {
    page?: number;
    count?: number;
    category?: string;
    filters?: string[];
    amount_type?: string;
    now?: string;
    lat?: string;
    long?: string;
    sort?: string;
    column?: string;
}

export async function getBusinesses({
    page = 1,
    count = 10,
    category,
    filters,
    amount_type,
    now,
    lat,
    long,
    sort,
    column
}: GetBusinessesParams): Promise<BusinessesSearchResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    if (category) searchParams.set("category", category);
    if (amount_type) searchParams.set("amount_type", amount_type);
    if (amount_type) searchParams.set("amount_type", amount_type);
    if (now) searchParams.set("now", now);
    if (lat) searchParams.set("lat", lat);
    if (long) searchParams.set("long", long);
    if (sort) searchParams.set("sort", sort);
    if (column) searchParams.set("column", column);

    if (filters && filters.length > 0) {
        filters.forEach(filter => {
            searchParams.append('filters[]', filter);
        });
    }

    return getFetch<BusinessesSearchResponse>(
        `/businesses/search?${searchParams.toString()}`
    );
}