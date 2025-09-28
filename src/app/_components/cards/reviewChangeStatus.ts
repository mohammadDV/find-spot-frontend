import { StatusCode } from "@/constants/enums";
import { getFetchAuth } from "@/core/privateService";
import { ReviewStatus } from "@/types/review.type";

interface ReviewChangeStatusService {
    status_review: ReviewStatus;
    status: StatusCode;
    message: string;
}

export const reviewChangeStatus = async (id: number): Promise<ReviewChangeStatusService> => {
    return await getFetchAuth<ReviewChangeStatusService>(
        `/profile/reviews/${id}/change-status`
    );
}