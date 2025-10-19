"use server";

import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

export const googleAuthAction = async (
    _state: any,
    formData: FormData
): Promise<any> => {
    const t = await getTranslations("common");

    const token = formData.get("token");
    try {
        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: token as string,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
    } catch (error) {
        throw new Error(t("messages.dataProblem"));
    }
};
