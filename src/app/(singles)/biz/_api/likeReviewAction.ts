"use server";

import { LikeStatus, StatusCode } from "@/constants/enums";
import { getFetchAuth } from "@/core/privateService";
import { getTranslations } from "next-intl/server";

interface LikeReviewResponse {
    status: StatusCode;
    message: string;
    active: LikeStatus;
}

export const likeReviewAction = async (id: number): Promise<LikeReviewResponse> => {
    const t = await getTranslations("common");
    try {
        return await getFetchAuth<LikeReviewResponse>(`/profile/reviews/${id}/like`);
    } catch (error) {
        throw new Error(t("messages.error"));
    }
};