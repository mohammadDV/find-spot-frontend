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
import { RHFUploadMulti } from "@/app/_components/hookForm/RHFUploadMulti";
import { RHFBadges } from "@/app/_components/hookForm/RHFBadges";
import { getCategoryServices, CategoryServiceItem } from "../_api/getCategoryServices";
import { Category } from "@/types/category.type";

interface SubmitReviewProps {
  bizId: string | number;
  userData?: UserData | null;
  categories?: Category[];
}

export const SubmitReview: React.FC<SubmitReviewProps> = ({ bizId, userData, categories }) => {
  const tCommon = useCommonTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [serviceOptions, setServiceOptions] = useState<CategoryServiceItem[]>([]);
  const [formState, formAction] = useActionState<SubmitReviewService | null, FormData>(
    submitReviewAction,
    null
  );

  const schema = z.object({
    rate: z.number().min(1, tCommon("validation.required.thisField")).max(5),
    comment: z.string().min(1, tCommon("validation.required.thisField")),
    services: z.array(z.number()).optional().default([]),
    files: z.any().optional(),
  });
  type ReviewFormData = z.infer<typeof schema>;

  const form = useZodForm(schema, {
    defaultValues: {
      rate: 0,
      comment: "",
      services: [],
      files: [],
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

  useEffect(() => {
    const fetchServices = async () => {
      if (!categories || categories.length === 0) return;
      try {
        const results = await Promise.all(categories.map((c) => getCategoryServices(c.id)));
        const merged = results.map((r) => r?.data || []).flat();
        const byId = new Map<number, CategoryServiceItem>();
        for (const item of merged) {
          if (!byId.has(item.id)) byId.set(item.id, item);
        }
        setServiceOptions(Array.from(byId.values()));
      } catch (error) {
        console.log(error)
      }
    };
    if (open && serviceOptions.length === 0) {
      fetchServices();
    }
  }, [open, categories, serviceOptions.length]);

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
    fd.append("services", JSON.stringify(data.services || []));
    fd.append("files", JSON.stringify(data.files || []));
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
            {serviceOptions.length > 0 && (
              <RHFBadges name="services" label={tCommon("inputs.services")} options={serviceOptions} />
            )}
            <RHFUploadMulti name="files" maxItems={10} label={tCommon("inputs.uploadFiles")} />
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