"use client"

import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { TickCircle } from "iconsax-react";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { changePasswordAction, ChangePasswordService } from "../_api/changePasswordAction";

export const ChangePasswordForm = () => {
    const tCommon = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ChangePasswordService | null, FormData>(
        changePasswordAction,
        null
    );

    const changePasswordSchema = z.object({
        current_password: z.string().min(1, { message: tCommon("validation.required.thisField") }),
        password: z.string()
            .min(1, { message: tCommon("validation.required.password") })
            .regex(regex.password, { message: tCommon("validation.invalid.passwordRequirements") }),
        password_confirmation: z.string()
            .min(1, { message: tCommon("validation.required.passwordConfirmation") }),
    }).refine((data) => data.password === data.password_confirmation, {
        message: tCommon("validation.invalid.passwordMatch"),
        path: ["password_confirmation"],
    });

    type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

    const form = useZodForm(changePasswordSchema, {
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof ChangePasswordFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(tCommon("messages.success"));
            form.reset();
        }
    }, [formState, form, tCommon]);

    const onSubmit = async (data: ChangePasswordFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("current_password", data.current_password);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <RHFPasswordInput
                    name="current_password"
                    label={"رمز عبور فعلی"}
                />
                <RHFPasswordInput
                    name="password"
                    label={tCommon("inputs.password")}
                />
                <div>
                    <RHFPasswordInput
                        name="password_confirmation"
                        label={tCommon("inputs.passwordConfirmation")}
                    />
                    <div className="flex items-center gap-2 mt-2">
                        <TickCircle className="stroke-description size-5" />
                        <p className="text-description text-xs">
                            {tCommon("validation.invalid.passwordMin")}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <TickCircle className="stroke-description size-5" />
                        <p className="text-description text-xs">
                            {tCommon("validation.invalid.passwordChar")}
                        </p>
                    </div>
                </div>
                <Button
                    size={"medium"}
                    variant={"secondary"}
                    className="w-full"
                    isLoading={isPending}
                    type="submit"
                >
                    {tCommon("buttons.saveChanges")}
                </Button>
            </form>
        </FormProvider>
    );
}