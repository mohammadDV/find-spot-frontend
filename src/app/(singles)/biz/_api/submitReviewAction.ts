"use server"

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
  const servicesStr = (formData.get("services") || "[]").toString();
  const filesStr = (formData.get("files") || "[]").toString();

  const rate = Number(rateStr);

  let services: number[] = [];
  let files: Array<{ path: string; type: string }> = [];
  try {
    const parsedServices = JSON.parse(servicesStr);
    if (Array.isArray(parsedServices)) {
      services = parsedServices
        .map((v: any) => Number(v))
        .filter((v: number) => !isNaN(v));
    }
  } catch { }

  try {
    const parsedFiles = JSON.parse(filesStr);
    if (Array.isArray(parsedFiles)) {
      files = parsedFiles
        .filter((f: any) => f && typeof f.path === "string" && typeof f.type === "string")
        .map((f: any) => ({ path: String(f.path), type: String(f.type) }));
    }
  } catch { }

  try {
    const res = await postFetchAuth<SubmitReviewService>(`/profile/reviews/${bizId}`, {
      rate,
      comment,
      services,
      files,
    });
    return res;
  } catch (error) {
    return {
      status: StatusCode.Failed,
      message: t("messages.error"),
    };
  }
};