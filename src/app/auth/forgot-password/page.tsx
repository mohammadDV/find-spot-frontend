import { getTranslations } from "next-intl/server"
import Link from "next/link";
import { Button } from "@/ui/button";
import { ChevronLeft } from "lucide-react";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

export default async function RegisterPage() {
    const t = await getTranslations("pages");

    return (
        <>
            <h1 className="text-label text-2xl lg:text-3xl font-bold mb-2 lg:mb-4">
                {t("auth.forgotPassword")}
            </h1>
            <p className="text-lg text-label mb-4 lg:mb-10">
                {t("auth.forgotPasswordDescription")}
            </p>
            <ForgotPasswordForm />
            <Link href={"/auth/login"} className="text-center block mx-auto mt-4 lg:mt-10">
                <Button variant={"link"} size={"small"}>
                    {t("auth.haveAccount")}
                    <ChevronLeft className="size-4" />
                </Button>
            </Link>
        </>
    )
}