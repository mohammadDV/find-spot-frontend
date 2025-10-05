"use client"

import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useActionState, useEffect, useTransition } from "react";
import { createTicketAction, CreateTicketResponse } from "../../_api/createTicketAction";
import { useFetchData } from "@/hooks/useFetchData";
import { TicketSubject } from "@/types/support.type";
import z from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { OptionTypes, RHFCombobox } from "@/app/_components/hookForm/RHFCombobox";
import { FormProvider } from "react-hook-form";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { Button } from "@/ui/button";

const NewTicketForm = () => {
    const router = useRouter();
    const tCommon = useCommonTranslation();
    const tPages = usePagesTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<CreateTicketResponse | null, FormData>(createTicketAction, null);

    const { response: ticketSubjects, loading: subjectsLoading } = useFetchData<TicketSubject[]>("/active-subjects");

    const ticketSchema = z.object({
        message: z.string().min(1, tCommon("validation.required.thisField")),
        subject_id: z.string().min(1, tCommon("validation.required.thisField")),
        file: z.string().optional(),
    });

    type TicketFormData = z.infer<typeof ticketSchema>;

    const form = useZodForm(ticketSchema, {
        defaultValues: {
            message: "",
            subject_id: "",
            file: "",
        },
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof TicketFormData, {
                            type: "server",
                            message: fieldErrors[0],
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(tCommon("messages.success"));
            router.push("/profile/support")
        }
    }, [formState]);

    const onSubmit = async (data: TicketFormData) => {
        const formData = new FormData();

        formData.append("message", data.message);
        formData.append("subject_id", data.subject_id);
        if (data.file) {
            formData.append("file", data.file);
        }

        startTransition(async () => {
            await formAction(formData);
        });
    };

    const subjectOptions: OptionTypes[] =
        ticketSubjects?.map((subject) => ({
            label: subject.title,
            value: subject.id.toString(),
        })) || [];

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:gap-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                    <RHFCombobox
                        name="subject_id"
                        label={tPages("profile.support.ticketSubject")}
                        options={subjectOptions}
                        loading={subjectsLoading}
                    />
                    <RHFUpload
                        name="file"
                        label={tPages("profile.support.ticketFile")}
                        uploadType="file"
                    />
                </div>
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

export default NewTicketForm;