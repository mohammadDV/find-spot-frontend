"use server";

import { postFormDataAuth } from "@/core/privateService";
import { getTranslations } from "next-intl/server";

export interface UploadResponse {
    status: number;
    message?: string;
    url?: string;
}

export const uploadImageAction = async (
    formData: FormData
): Promise<UploadResponse> => {
    const t = await getTranslations("common");
    try {
        const res = await postFormDataAuth<UploadResponse>(
            "/upload-image",
            formData
        );
        return res;
    } catch (error) {
        throw new Error(t("messages.uploadError"));
    }
};

export const uploadVideoAction = async (
    formData: FormData
): Promise<UploadResponse> => {
    const t = await getTranslations("common");
    try {
        const res = await postFormDataAuth<UploadResponse>(
            "/upload-video",
            formData
        );
        return res;
    } catch (error) {
        throw new Error(t("messages.uploadError"));
    }
};

export const uploadFileAction = async (
    formData: FormData
): Promise<UploadResponse> => {
    const t = await getTranslations("common");
    try {
        const res = await postFormDataAuth<UploadResponse>(
            "/upload-file",
            formData
        );
        return res;
    } catch (error) {
        throw new Error(t("messages.uploadError"));
    }
};
