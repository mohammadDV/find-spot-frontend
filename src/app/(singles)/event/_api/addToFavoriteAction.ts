"use server";

import { FavoriteStatus, StatusCode } from "@/constants/enums";
import { getFetchAuth } from "@/core/privateService";
import { getTranslations } from "next-intl/server";

interface AddToFavoriteResponse {
    status: StatusCode;
    message: string;
    favorite: FavoriteStatus;
}

export const addToFavoriteAction = async (id: number): Promise<AddToFavoriteResponse> => {
    const t = await getTranslations("common");
    try {
        return await getFetchAuth<AddToFavoriteResponse>(`/profile/events/${id}/favorite`);
    } catch (error) {
        throw new Error(t("messages.error"));
    }
};