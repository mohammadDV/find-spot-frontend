import { getFetch } from "@/core/publicService";
import { ReviewsResponse } from "@/types/review.type";

interface GetBusinessReviewsParams {
    id: string;
    page?: number;
    count?: number;
    sort?: string;
    column?: string;
}

export async function getBusinessReviews({
    id,
    page = 1,
    count = 10,
    sort,
    column
}: GetBusinessReviewsParams): Promise<ReviewsResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    if (sort) searchParams.set("sort", sort);
    if (column) searchParams.set("column", column);

    return getFetch<ReviewsResponse>(
        `/businesses/${id}/reviews?${searchParams.toString()}`
    );
}