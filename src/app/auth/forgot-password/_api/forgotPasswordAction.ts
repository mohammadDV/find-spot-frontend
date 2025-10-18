"use server"

import { postFetch } from "@/core/publicService";
import { getTranslations } from "next-intl/server";

export interface ForgotPasswordService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const forgotPasswordAction = async (_state: any, formData: FormData): Promise<ForgotPasswordService> => {
    const t = await getTranslations("common");
    const email = formData.get("email");

    try {
        return await postFetch<ForgotPasswordService>("/forgot-password", { email });
    } catch (error) {
        throw new Error(t("messages.error"));
    }
}