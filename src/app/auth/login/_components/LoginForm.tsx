"use client"

import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useActionState, useEffect, useTransition } from "react";
import { loginAction, LoginService } from "../_api/loginAction";
import z from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { FormProvider } from "react-hook-form";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import Link from "next/link";
import { Label } from "@/ui/label";

const LoginForm = () => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<LoginService | null, FormData>(
        loginAction,
        null
    );

    const loginSchema = z.object({
        email: z.string()
            .min(1, { message: tCommon("validation.required.email") })
            .email({ message: tCommon("validation.invalid.email") }),
        password: z.string()
            .min(1, { message: tCommon("validation.required.password") }),
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const form = useZodForm(loginSchema, {
        defaultValues: {
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tPages("auth.loginFailed"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof LoginFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            if (!formState?.verify_email) {
                window.location.href = "/auth/check-verification";
            } else if (!formState?.verify_access) {
                window.location.href = "/auth/complete-register";
            } else window.location.href = "/";
        }
    }, [formState, form]);

    const onSubmit = async (data: LoginFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

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
                <div>
                    <RHFPasswordInput
                        name="password"
                        label={tCommon("inputs.password")}
                    />
                    <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember" className="text-xs text-description">
                                {tPages("auth.rememberMe")}
                            </Label>
                        </div>
                        <Link href={"/auth/forgot-password"} className="text-xs text-description">
                            {tPages("auth.forgotPassword")}
                        </Link>
                    </div>
                </div>
                <Button
                    size={"medium"}
                    variant={"secondary"}
                    className="w-full"
                    isLoading={isPending}
                    type="submit">
                    {tPages("auth.loginToAccount")}
                </Button>
            </form>
        </FormProvider>
    )
}

export default LoginForm