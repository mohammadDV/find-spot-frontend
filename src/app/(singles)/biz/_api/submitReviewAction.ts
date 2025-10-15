"use server";

import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";
import { getTranslations } from "next-intl/server";

export interface SubmitReviewService {
  status: StatusCode;
  message: string;
  errors?: Record<string, string[]>;
  data?: any;
}

export const submitReviewAction = async (
  _state: SubmitReviewService | null,
  formData: FormData
): Promise<SubmitReviewService> => {
  const t = await getTranslations("common");

  const bizId = (formData.get("bizId") || "").toString();
  const rateStr = (formData.get("rate") || "0").toString();
  const comment = (formData.get("comment") || "").toString();

  const rate = Number(rateStr);

  try {
    const res = await postFetchAuth<SubmitReviewService>(`/profile/reviews/${bizId}`, {
      rate,
      comment,
    });
    return res;
  } catch (error) {
    return {
      status: StatusCode.Failed,
      message: t("messages.error"),
    };
  }
};