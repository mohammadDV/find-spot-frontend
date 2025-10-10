"use server";

import { StatusCode } from "@/constants/enums";
import { patchFetchAuth } from "@/core/privateService";
import { getTranslations } from "next-intl/server";

export interface EditBusinessResponse {
  status: number;
  message?: string;
  errors?: { [key: string]: string[] };
  data?: any;
}

export const editBusinessAction = async (
  id: string,
  _state: any,
  formData: FormData
): Promise<EditBusinessResponse> => {
  const t = await getTranslations("common");

  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const lat = formData.get("lat") as string;
    const long = formData.get("long") as string;
    const website = formData.get("website") as string;
    const facebook = formData.get("facebook") as string;
    const instagram = formData.get("instagram") as string;
    const youtube = formData.get("youtube") as string;
    const tiktok = formData.get("tiktok") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const start_amount = formData.get("start_amount") as string;
    const amount_type = formData.get("amount_type") as string;
    const image = formData.get("image") as string;
    const menu_image = formData.get("menu_image") as string;
    const video = formData.get("video") as string;

    // Working hours
    const from_monday = parseInt(formData.get("from_monday") as string) || 0;
    const from_tuesday = parseInt(formData.get("from_tuesday") as string) || 0;
    const from_wednesday =
      parseInt(formData.get("from_wednesday") as string) || 0;
    const from_thursday =
      parseInt(formData.get("from_thursday") as string) || 0;
    const from_friday = parseInt(formData.get("from_friday") as string) || 0;
    const from_saturday =
      parseInt(formData.get("from_saturday") as string) || 0;
    const from_sunday = parseInt(formData.get("from_sunday") as string) || 0;

    const to_monday = parseInt(formData.get("to_monday") as string) || 0;
    const to_tuesday = parseInt(formData.get("to_tuesday") as string) || 0;
    const to_wednesday = parseInt(formData.get("to_wednesday") as string) || 0;
    const to_thursday = parseInt(formData.get("to_thursday") as string) || 0;
    const to_friday = parseInt(formData.get("to_friday") as string) || 0;
    const to_saturday = parseInt(formData.get("to_saturday") as string) || 0;
    const to_sunday = parseInt(formData.get("to_sunday") as string) || 0;

    // Location
    const country_id = parseInt(formData.get("country_id") as string) || 1;
    const city_id = parseInt(formData.get("city_id") as string) || 1;
    const area_id = parseInt(formData.get("area_id") as string) || 1;

    // Arrays
    const categories = JSON.parse(
      (formData.get("categories") as string) || "[]"
    );
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const facilities = JSON.parse(
      (formData.get("facilities") as string) || "[]"
    );
    const filters = JSON.parse((formData.get("filters") as string) || "[]");
    const files = JSON.parse((formData.get("files") as string) || "[]");

    const res = await patchFetchAuth<EditBusinessResponse>(
      `/profile/businesses/${id}`,
      {
        title,
        description,
        lat,
        long,
        website: website || "",
        facebook: facebook || "",
        instagram: instagram || "",
        youtube: youtube || "",
        tiktok: tiktok || "",
        whatsapp: whatsapp || "",
        phone: phone || "",
        email: email || "",
        address: address || "",
        start_amount: start_amount || "",
        amount_type: amount_type || "1",
        image: image || "",
        menu_image: menu_image || "",
        video: video || "",
        from_monday,
        from_tuesday,
        from_wednesday,
        from_thursday,
        from_friday,
        from_saturday,
        from_sunday,
        to_monday,
        to_tuesday,
        to_wednesday,
        to_thursday,
        to_friday,
        to_saturday,
        to_sunday,
        country_id,
        city_id,
        area_id,
        categories,
        tags,
        facilities,
        filters,
        files,
      }
    );
    return res;
  } catch (error) {
    return {
      status: StatusCode.Failed,
      message: t("messages.error"),
    };
  }
};