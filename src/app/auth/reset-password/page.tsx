import { getTranslations } from "next-intl/server"
import Link from "next/link";
import { Button } from "@/ui/button";
import { ChevronLeft } from "lucide-react";
import { verifyResetPassword } from "./_api/verifyResetPassword";
import { StatusCode } from "@/constants/enums";
import { notFound } from "next/navigation";
import { ResetPasswordForm } from "./_components/resetPasswordForm";

interface ResetPasswordPageProps {
    searchParams: Promise<{
        token: string;
        email: string;
    }>
}

export default async function RegisterPage({ searchParams }: ResetPasswordPageProps) {
    const t = await getTranslations("pages");
    const resolvedSearchParams = await searchParams;

    const verifyData = await verifyResetPassword({
        token: resolvedSearchParams.token,
        email: resolvedSearchParams.email
    })

    if (verifyData.status === StatusCode.Failed) {
        notFound();
    }

    return (
        <>
            <h1 className="text-label text-2xl lg:text-3xl font-bold mb-2 lg:mb-4">
                {t("auth.newPassword")}
            </h1>
            <p className="text-lg text-label mb-4 lg:mb-10">
                {t("auth.newPasswordDescription")}
            </p>
            <ResetPasswordForm
                email={resolvedSearchParams.email}
                token={resolvedSearchParams.token}
            />
            <Link href={"/auth/login"} className="text-center block mx-auto mt-4 lg:mt-10">
                <Button variant={"link"} size={"small"}>
                    {t("auth.haveAccount")}
                    <ChevronLeft className="size-4" />
                </Button>
            </Link>
        </>
    )
}