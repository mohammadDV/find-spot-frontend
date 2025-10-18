"use server";

import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

export const logoutAction = async (): Promise<any> => {
    const t = await getTranslations("common");
    try {
        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: "",
            httpOnly: false,
            path: "/",
            maxAge: 0,
        });
        cookieStore.set({
            name: "userData",
            value: "",
            httpOnly: false,
            path: "/",
            maxAge: 0,
        });
    } catch (error) {
        throw new Error(t("messages.error"));
    }
};