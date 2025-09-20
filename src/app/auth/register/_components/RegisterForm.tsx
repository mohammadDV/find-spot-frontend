"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { regex } from "@/constants/regex";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { TickCircle } from "iconsax-react";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { registerAction, RegisterService } from "../_api/registerAction";
import { StatusCode } from "@/constants/enums";

export const RegisterForm = () => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<RegisterService | null, FormData>(
        registerAction,
        null
    );

    const registerSchema = z.object({
        email: z.string()
            .min(1, { message: tCommon("validation.required.email") })
            .email({ message: tCommon("validation.invalid.email") }),
        password: z.string()
            .min(1, { message: tCommon("validation.required.password") })
            .regex(regex.password, { message: tCommon("validation.invalid.passwordRequirements") }),
        password_confirmation: z.string()
            .min(1, { message: tCommon("validation.required.passwordConfirmation") }),
    }).refine((data) => data.password === data.password_confirmation, {
        message: tCommon("validation.invalid.passwordMatch"),
        path: ["password_confirmation"],
    });

    type RegisterFormData = z.infer<typeof registerSchema>;

    const form = useZodForm(registerSchema, {
        defaultValues: {
            email: '',
            password: '',
            password_confirmation: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            alert(!!formState?.errors ? tPages("auth.registerError") : tPages("auth.registerFailed"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof RegisterFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            window.location.href = "/auth/check-verification";
        }
    }, [formState, form]);

    const onSubmit = async (data: RegisterFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <RHFInput
                    name="email"
                    label={tCommon("inputs.email")}
                    type="email"
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
                    type="submit">
                    {tPages("auth.register")}
                </Button>
            </form>
        </FormProvider>
    )
}