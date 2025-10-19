"use client"

import { StatusCode } from "@/constants/enums";
import { usePagesTranslation } from "@/hooks/useTranslation";
import { Loading } from "@/ui/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { googleAuthAction } from "../_api/googleAuthAction";

const CheckGoogleAuth = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const t = usePagesTranslation();

    const status = searchParams.get("status");
    const token = searchParams.get("token");

    useEffect(() => {
        const checkGoogleAuth = async () => {
            if (status && token && parseInt(status) === StatusCode.Success) {
                const formData = new FormData();
                formData.append("token", token || "");
                await googleAuthAction(null, formData);
                router.push("/auth/check-verification");
            } else {
                router.push("/auth/login");
                toast.error(t("auth.authError"))
            }
        };

        checkGoogleAuth();
    }, []);

    return (
        <div className="px-6 py-7 md:p-24 text-text flex items-center justify-center">
            <div>
                <Loading type="ring" size="large" variant="secondary" className="mx-auto !w-20 text-center block" />
                <h3 className="mt-7 text-title text-xl font-medium text-center">
                    {t("auth.loadingAuth")}
                </h3>
            </div>
        </div>
    )
}

export default CheckGoogleAuth