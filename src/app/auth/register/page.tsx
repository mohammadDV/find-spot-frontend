import { getTranslations } from "next-intl/server"
import { RegisterForm } from "./_components/RegisterForm";
import Link from "next/link";
import { Button } from "@/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function RegisterPage() {
    const t = await getTranslations("pages");

    return (
        <>
            <h1 className="text-label text-2xl lg:text-3xl font-bold mb-4 lg:mb-10">
                {t("auth.register")}
            </h1>
            <RegisterForm />
            <Link href={"/auth/login"} className="text-center block mx-auto mt-3">
                <Button variant={"link"} size={"small"}>
                    {t("auth.haveAccount")}
                    <ChevronLeft className="size-4" />
                </Button>
            </Link>
        </>
    )
}