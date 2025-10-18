"use client"

import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { sendMessageAction, SendMessageResponse } from "../_api/sendMessageAction";
import z from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { FormProvider } from "react-hook-form";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { Button } from "@/ui/button";

export interface SendMessageFormProps {
    ticketId: number;
}

export const SendMessageForm = ({ ticketId }: SendMessageFormProps) => {
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<SendMessageResponse | null, FormData>(
        sendMessageAction,
        null
    );

    const messageSchema = z.object({
        message: z.string().min(1, tCommon("validation.required.thisField")),
        file: z.string().optional()
    });

    type MessageFormData = z.infer<typeof messageSchema>;

    const form = useZodForm(messageSchema, {
        defaultValues: {
            message: '',
            file: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || tCommon("messages.success"));
            form.reset();
            router.refresh();
        }
    }, [formState]);

    const onSubmit = async (data: MessageFormData) => {
        const formData = new FormData();
        formData.append("ticketId", ticketId.toString());
        formData.append("message", data.message);
        if (data.file) {
            formData.append("file", data.file);
        }

        startTransition(async () => {
            await formAction(formData);
        });
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:gap-6">
                <RHFTextarea
                    name="message"
                    label={tPages("profile.support.ticketContent")}
                    rows={4}
                />
                <Button
                    size={"medium"}
                    variant={"primary"}
                    className="mr-auto"
                    isLoading={isPending}
                    type="submit"
                >
                    {tPages("profile.support.sendRequest")}
                </Button>
            </form>
        </FormProvider>
    )
}