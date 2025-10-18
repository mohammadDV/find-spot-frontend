"use server"

import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";
import { getTranslations } from "next-intl/server";

export interface ResendVerifyService {
    status: StatusCode;
    message?: string;
}

export const resendVerifyAction = async (): Promise<ResendVerifyService> => {
    const t = await getTranslations("common");
    try {
        return await postFetchAuth<ResendVerifyService>("/email/verification-notification", {});
    } catch (error) {
        throw new Error(t("messages.dataProblem"));
    }
};
