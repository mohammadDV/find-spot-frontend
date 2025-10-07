import { getFetchAuth } from "@/core/privateService";
import { BusinessesSearchResponse } from "@/types/business.type";

interface GetMyBusinessesParams {
    page?: number;
    count?: number;
}

export async function getMyBusinesses({
    page = 1,
    count = 8,
}: GetMyBusinessesParams): Promise<BusinessesSearchResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    return getFetchAuth<BusinessesSearchResponse>(
        `/profile/my-businesses?${searchParams.toString()}`
    );
}