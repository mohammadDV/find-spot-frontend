import { getFetchAuth } from "@/core/privateService";
import { ReviewsResponse } from "@/types/review.type";

interface GetBusinessReviewsParams {
    page?: number;
    count?: number;
}

export async function getMyReviews({
    page = 1,
    count = 8,
}: GetBusinessReviewsParams): Promise<ReviewsResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    return getFetchAuth<ReviewsResponse>(
        `/profile/my-reviews?${searchParams.toString()}`
    );
}