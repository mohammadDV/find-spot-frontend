"use client"

import { RHFAvatar } from "@/app/_components/hookForm/RHFAvatar";
import { RHFCheckbox } from "@/app/_components/hookForm/RHFCheckbox";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { checkVerificationAction } from "../../check-verification/_api/verificationAction";
import { completeRegisterAction, CompleteRegisterResponse } from "../_api/completeRegisterAction";
import { Loading } from "@/ui/loading";

export const CompleteRegister = () => {
    const router = useRouter();
    const tCommon = useCommonTranslation();
    const tPages = usePagesTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<CompleteRegisterResponse | null, FormData>(
        completeRegisterAction,
        null
    );

    const completeRegisterSchema = z.object({
        profile_photo_path: z.string().optional(),
        first_name: z.string()
            .min(1, tCommon("validation.required.firstName")),
        last_name: z.string()
            .min(1, tCommon("validation.required.lastName")),
        nickname: z.string()
            .min(1, tCommon("validation.required.nickname"))
            .min(3, tCommon("validation.invalid.nickname")),
        mobile: z.string()
            .min(1, tCommon("validation.required.mobile"))
            .regex(regex.phone, tCommon("validation.invalid.mobile")),
        privacy_policy: z.boolean()
            .refine(val => val === true, tCommon("validation.required.privacyPolicy")),
    });

    type CompleteRegisterFormData = z.infer<typeof completeRegisterSchema>;

    const form = useZodForm(completeRegisterSchema,
        {
            defaultValues: {
                profile_photo_path: "",
                first_name: "",
                last_name: "",
                nickname: "",
                mobile: "",
                privacy_policy: false,
            },
        }
    );

    useEffect(() => {
        const checkAccessVerification = async () => {
            setIsLoading(true);
            try {
                const res = await checkVerificationAction();
                if (!res?.verify_email) {
                    router.replace("/auth/check-verification")
                } else if (res?.verify_access) {
                    router.replace("/profile")
                } else setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        checkAccessVerification();
    }, [router]);

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors ? tPages("auth.registerError") : tCommon("messages.dataProblem"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof CompleteRegisterFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            window.location.href = "/profile";
        }
    }, [formState, form]);

    const onSubmit = async (data: CompleteRegisterFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("profile_photo_path", data.profile_photo_path || "");
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("nickname", data.nickname);
        formData.append("mobile", data.mobile);
        formData.append("privacy_policy", data.privacy_policy.toString());

        startTransition(async () => {
            await formAction(formData);
        });
    };

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
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <RHFAvatar
                    name="profile_photo_path"
                    className="mx-auto"
                    defaultValue="/images/default-avatar.png"
                />

                <div className="grid grid-cols-2 gap-4">
                    <RHFInput
                        name="first_name"
                        label={tCommon("inputs.firstName")}
                        type="text"
                    />
                    <RHFInput
                        name="last_name"
                        label={tCommon("inputs.lastName")}
                        type="text"
                    />
                </div>

                <RHFInput
                    name="nickname"
                    label={tCommon("inputs.nickname")}
                    type="text"
                />

                <RHFInput
                    name="mobile"
                    label={tCommon("inputs.mobile")}
                    type="tel"
                    convertPersianNumbers
                />

                <RHFCheckbox
                    name="privacy_policy"
                    label={tCommon("inputs.privacyPolicy")}
                />

                <Button
                    size={"medium"}
                    variant={"secondary"}
                    className="w-full"
                    isLoading={isPending}
                    type="submit"
                >
                    {tPages("auth.makeProfile")}
                </Button>
            </form>
        </FormProvider>
    );
};