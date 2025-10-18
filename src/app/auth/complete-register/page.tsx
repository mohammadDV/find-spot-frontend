import { getTranslations } from "next-intl/server";
import { CompleteRegister } from "./_components/CompleteRegister";
import { Suspense } from "react";

export default async function CompleteRegisterPage() {
    const t = await getTranslations("pages");

    return (
        <>
            <h1 className="text-label text-2xl lg:text-3xl font-bold mb-4 lg:mb-10">
                {t("auth.profile")}
            </h1>
            <CompleteRegister />
        </>
    )
}