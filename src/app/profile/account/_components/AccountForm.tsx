"use client"

import { RHFAvatar } from "@/app/_components/hookForm/RHFAvatar";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { UserAccountResponse } from "@/types/user.type";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { accountAction, AccountService } from "../_api/accountAction";

interface AccountFormProps {
    accountData: UserAccountResponse;
}

export const AccountForm = ({ accountData }: AccountFormProps) => {
    const router = useRouter();
    const t = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<AccountService | null, FormData>(
        accountAction,
        null
    );

    const accountSchema = z.object({
        first_name: z.string().min(1, t("validation.required.firstName")),
        last_name: z.string().min(1, t("validation.required.lastName")),
        nickname: z.string().min(1, t("validation.required.nickname")),
        mobile: z.string().min(1, t("validation.required.mobile"))
            .regex(regex.phone, t("validation.invalid.mobile")),
        profile_photo_path: z.string().optional(),
    });

    type AccountFormData = z.infer<typeof accountSchema>;

    const form = useZodForm(accountSchema, {
        defaultValues: {
            first_name: accountData?.first_name || '',
            last_name: accountData?.last_name || '',
            nickname: accountData?.nickname || '',
            mobile: accountData?.mobile || '',
            profile_photo_path: accountData?.profile_photo_path || '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors
                ? t("messages.errorFields")
                : formState?.message || t("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof AccountFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || t("messages.updated"));
            router.refresh();
        }
    }, [formState, form]);

    const onSubmit = async (data: AccountFormData) => {

        const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("nickname", data.nickname);
        formData.append("mobile", data.mobile);
        formData.append("country_id", "1");
        formData.append("city_id", "1");
        formData.append("profile_photo_path", data.profile_photo_path || "");

        startTransition(async () => {
            await formAction(formData);
        });
    };

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
                        label={t("inputs.firstName")}
                        type="text"
                    />
                    <RHFInput
                        name="last_name"
                        label={t("inputs.lastName")}
                        type="text"
                    />
                </div>

                <RHFInput
                    name="nickname"
                    label={t("inputs.nickname")}
                    type="text"
                />

                <RHFInput
                    name="mobile"
                    label={t("inputs.mobile")}
                    type="tel"
                    convertPersianNumbers
                />

                <Button
                    size={"medium"}
                    variant={"secondary"}
                    className="w-full"
                    isLoading={isPending}
                    type="submit"
                >
                    {t("buttons.saveChanges")}
                </Button>
            </form>
        </FormProvider>
    )
}