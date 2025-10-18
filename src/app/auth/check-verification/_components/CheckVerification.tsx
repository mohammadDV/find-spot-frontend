"use client"

import { StatusCode } from "@/constants/enums";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Loading } from "@/ui/loading";
import { ArrowRotateRight, SmsSearch } from "iconsax-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { resendVerifyAction, ResendVerifyService } from "../_api/resendVerifyAction";
import { checkVerificationAction } from "../_api/verificationAction";

export const CheckVerification = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [seconds, setSeconds] = useState<number>(0);
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ResendVerifyService | null>(
        resendVerifyAction,
        null
    );

    const backUrl = searchParams.get("backUrl")

    useEffect(() => {
        const checkVerification = async () => {
            setIsLoading(true);
            try {
                const res = await checkVerificationAction();
                if (res?.verify_email) {
                    router.replace(backUrl || "/auth/complete-register")
                } else setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        checkVerification();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0)
                clearInterval(interval);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(tPages("auth.resendLinkSuccess"));
            setSeconds(60);
        }
    }, [formState]);

    const onSubmit = async () => {
        startTransition(async () => {
            await formAction();
        });
    }

    if (isLoading) {
        return (
            <div className="px-6 py-7 md:p-24 text-text flex items-center justify-center">
                <div>
                    <Loading type="ring" size="large" variant="secondary" className="mx-auto !w-20 text-center block" />
                    <h3 className="mt-7 text-title text-xl font-medium text-center">
                        {tCommon("messages.loading")}
                    </h3>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-7">
            <SmsSearch className="stroke-secondary mx-auto size-24" />
            <h3 className="mt-7 text-title text-xl font-semibold text-center mb-3">
                {tPages("auth.checkEmail")}
            </h3>
            <p className="text-description text-sm leading-6 font-normal text-center mb-4">
                {tPages("auth.checkEmailDescription")}
            </p>
            {seconds > 0
                ? <div className="flex items-center justify-center gap-1">
                    <p className="text-label">{tPages("auth.resendLink")}: </p>
                    <p className="text-label" dir="ltr">
                        {`${Math.floor(seconds / 60) > 0
                            ? Math.floor(seconds / 60) : '00'}
                                :${(seconds - (Math.floor(seconds / 60)) * 60) > 0
                                ? (seconds - (Math.floor(seconds / 60)) * 60)
                                : '00'}`}
                    </p>
                </div>
                : <form action={onSubmit}>
                    <Button
                        type="submit"
                        variant="link"
                        className={cn("mx-auto text-center flex",
                            isPending ? "pointer-events-none opacity-40" : "")}>
                        {tPages("auth.resendLink")}
                        <ArrowRotateRight className="stroke-primary" />
                    </Button>
                </form>}
        </div>
    );
}