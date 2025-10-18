"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { StatusCode } from "@/constants/enums";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { TickCircle } from "iconsax-react";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { forgotPasswordAction, ForgotPasswordService } from "../_api/forgotPasswordAction";

export const ForgotPasswordForm = () => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [isSuccess, setIsSuccess] = useState(false);
    const [formState, formAction] = useActionState<ForgotPasswordService | null, FormData>(
        forgotPasswordAction,
        null
    );

    const forgotPasswordSchema = z.object({
        email: z.string()
            .min(1, { message: tCommon("validation.required.email") })
            .email({ message: tCommon("validation.invalid.email") }),
    });

    type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

    const form = useZodForm(forgotPasswordSchema, {
        defaultValues: {
            email: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof ForgotPasswordFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            setIsSuccess(true);
        }
    }, [formState, form]);

    const onSubmit = async (data: ForgotPasswordFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("email", data.email);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    if (isSuccess) {
        return (
            <div className="lg:px-9">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <TickCircle className="size-9 stroke-success" />
                    </div>
                    <h1 className="text-title text-xl font-semibold text-center">
                        {tPages("auth.resetLinkSent")}
                    </h1>
                    <p className="text-description text-sm leading-6 font-normal max-w-md text-center">
                        {tPages("auth.resetLinkSentDescription")}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <RHFInput
                    name="email"
                    label={tCommon("inputs.email")}
                    type="email"
                />
                <Button
                    size={"medium"}
                    variant={"secondary"}
                    className="w-full"
                    isLoading={isPending}
                    type="submit">
                    {tPages("auth.sendResetLink")}
                </Button>
            </form>
        </FormProvider>
    )
}