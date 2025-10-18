"use server"

import { StatusCode } from "@/constants/enums";
import { postFetch } from "@/core/publicService";
import { UserInfo } from "@/types/user.type";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

export interface RegisterService {
    status: StatusCode;
    message?: string;
    errors?: { [key: string]: string[] };
    token?: string;
    user?: UserInfo;
    customer_number?: string;
}

export const registerAction = async (_state: any, formData: FormData): Promise<any> => {
    const t = await getTranslations("common");

    const email = formData.get("email");
    const password = formData.get("password");
    const password_confirmation = formData.get("password_confirmation");
    try {
        const res = await postFetch<RegisterService>("/register", {
            email,
            password,
            password_confirmation,
        });
        if (res.status === StatusCode.Success) {
            const cookieStore = await cookies();
            cookieStore.set({
                name: 'token',
                value: res.token as string,
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
        }
        return res;
    } catch (error) {
        throw new Error(t("messages.dataProblem"));
    }
}