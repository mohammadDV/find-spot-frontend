"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { Button } from "@/ui/button";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFStarRating } from "@/app/_components/hookForm/RHFStarRating";
import { Modal } from "@/app/_components/modal";
import { Star1 } from "iconsax-react";
import { useRouter } from "next/navigation";
import { UserData } from "@/types/user.type";
import { submitReviewAction, SubmitReviewService } from "../_api/submitReviewAction";
import { isEmpty } from "@/lib/utils";

interface SubmitReviewProps {
  bizId: string | number;
  userData?: UserData | null;
}

export const SubmitReview: React.FC<SubmitReviewProps> = ({ bizId, userData }) => {
  const tCommon = useCommonTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formState, formAction] = useActionState<SubmitReviewService | null, FormData>(
    submitReviewAction,
    null
  );

  const schema = z.object({
    rate: z.number().min(1, tCommon("validation.required.thisField")).max(5),
    comment: z.string().min(1, tCommon("validation.required.thisField")),
  });
  type ReviewFormData = z.infer<typeof schema>;

  const form = useZodForm(schema, {
    defaultValues: {
      rate: 0,
      comment: "",
    },
  });

  useEffect(() => {
    if (!!formState && formState.status === StatusCode.Failed) {
      toast.error(formState?.message || tCommon("messages.error"));
      if (formState.errors) {
        Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
          if (fieldErrors && fieldErrors.length > 0) {
            form.setError(fieldName as keyof ReviewFormData, {
              type: "server",
              message: fieldErrors[0],
            });
          }
        });
      }
    } else if (!!formState && formState.status === StatusCode.Success) {
      toast.success(formState?.message || tCommon("messages.success"));
      setOpen(false);
    }
  }, [formState, form]);

  const handleClick = () => {
    if (!isEmpty(userData)) {
      setOpen(true);
    } else {
      router.push("/auth/login");
    }
  };

  const onSubmit = async (data: ReviewFormData) => {
    form.clearErrors();
    const fd = new FormData();
    fd.append("bizId", String(bizId));
    fd.append("rate", String(data.rate));
    fd.append("comment", data.comment);
    startTransition(async () => {
      await formAction(fd);
    });
  };

  return (
    <>
      <Button
        variant={"primary"}
        size={"medium"}
        className="px-4 lg:px-10 text-2xs lg:text-base rounded-lg lg:rounded-xl py-2 lg:py-2.5"
        onClick={handleClick}
      >
        <Star1 className="stroke-white size-4 lg:size-6" />
        {tCommon("buttons.submitComment")}
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title={tCommon("buttons.submitComment")}
        showConfirm={false}
        showCancel={false}
        size="small"
      >
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <RHFStarRating name="rate" label={tCommon("inputs.rating")} />
            <RHFTextarea name="comment" label={tCommon("inputs.comment")} />
            <Button
              size={"medium"}
              variant={"secondary"}
              className="w-full"
              isLoading={isPending}
              type="submit"
            >
              {tCommon("buttons.submitComment")}
            </Button>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};