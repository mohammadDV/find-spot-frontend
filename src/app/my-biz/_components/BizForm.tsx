"use client"

import { OptionTypes, RHFCombobox } from "@/app/_components/hookForm/RHFCombobox";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { regex } from "@/constants/regex";
import { useFetchData } from "@/hooks/useFetchData";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Country } from "@/types/location.type";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { getAreas, getCities } from "../_api/getLocations";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";

const amountTypeOptions: OptionTypes[] = [
    {
        label: "₺",
        value: "1"
    },
    {
        label: "₺₺",
        value: "2"
    },
    {
        label: "₺₺₺",
        value: "3"
    },
    {
        label: "₺₺₺₺",
        value: "4"
    },
]

export const BizForm = () => {
    const router = useRouter();
    const tCommon = useCommonTranslation();
    const tPages = usePagesTranslation();
    const [isPending, startTransition] = useTransition();
    // const [formState, formAction] = useActionState<AccountService | null, FormData>(
    //     accountAction,
    //     null
    // );

    const [cities, setCities] = useState<any[]>([]);
    const [areas, setAreas] = useState<any[]>([]);
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingAreas, setLoadingAreas] = useState(false);

    const { response: countriesResponse } = useFetchData<Country[]>("/countries");

    const countryOptions = countriesResponse?.map(country => ({
        label: country.title,
        value: country.id.toString(),
    })) || [];

    const bizSchema = z.object({
        title: z.string().min(1, tCommon("validation.required.thisField")),
        // categories: z.array(z.number()).min(1, tCommon("validation.required.thisField")),
        description: z.string().min(1, tCommon("validation.required.thisField")),
        phone: z.string().min(1, tCommon("validation.required.mobile"))
            .regex(regex.phone, tCommon("validation.invalid.mobile")),
        email: z.string().min(1, tCommon("validation.required.email"))
            .email(tCommon("validation.invalid.email")),
        address: z.string().min(1, tCommon("validation.required.thisField")),
        amount_type: z.string().min(1, tCommon("validation.required.thisField")),
        start_amount: z.string().min(1, tCommon("validation.required.thisField")),
        country_id: z.string().min(1, tCommon("validation.required.thisField")),
        city_id: z.string().min(1, tCommon("validation.required.thisField")),
        area_id: z.string().min(1, tCommon("validation.required.thisField")),
        image: z.string().min(1, tCommon("validation.required.thisField")),
        menu_image: z.string().optional(),
        video: z.string().optional(),
        website: z.string().optional(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        youtube: z.string().optional(),
        tiktok: z.string().optional(),
        whatsapp: z.string().optional(),
    });

    type BizFormData = z.infer<typeof bizSchema>;

    const form = useZodForm(bizSchema, {
        defaultValues: {
            title: '',
            // categories: [],
            description: '',
            phone: '',
            email: '',
            address: '',
            amount_type: '',
            start_amount: '',
            country_id: '',
            city_id: '',
            area_id: '',
            image: '',
            menu_image: '',
            video: '',
            website: '',
            facebook: '',
            instagram: '',
            youtube: '',
            tiktok: '',
            whatsapp: '',
        }
    });

    const watchedCountryId = form.watch("country_id");
    const watchedCityId = form.watch("city_id");

    const cityOptions = cities?.map(city => ({
        label: city.title,
        value: city.id.toString(),
    })) || [];

    const areaOptions = areas?.map(area => ({
        label: area.title,
        value: area.id.toString(),
    })) || [];

    useEffect(() => {
        const fetchOriginCities = async () => {
            if (watchedCountryId) {
                setLoadingCities(true);
                setCities([]);
                form.setValue("city_id", "");

                try {
                    const response: any = await getCities(parseInt(watchedCountryId));
                    setCities(response || []);

                    // if (projectData?.o_city_id && response?.some((c: any) => c.id === projectData.o_city_id)) {
                    //     form.setValue("o_city_id", projectData.o_city_id.toString());
                    // }
                } catch (error) {
                    console.error("Error fetching origin cities:", error);
                    setCities([]);
                } finally {
                    setLoadingCities(false);
                }
            } else {
                setCities([]);
                form.setValue("city_id", "");
            }
        };

        fetchOriginCities();
    }, [watchedCountryId, form]);

    useEffect(() => {
        const fetchOriginAreas = async () => {
            if (watchedCityId) {
                setLoadingAreas(true);
                setAreas([]);
                form.setValue("area_id", "");

                try {
                    const response: any = await getAreas(parseInt(watchedCityId));
                    setAreas(response || []);

                    // if (projectData?.area_id && response?.some((c: any) => c.id === projectData.area_id)) {
                    //     form.setValue("area_id", projectData.area_id.toString());
                    // }
                } catch (error) {
                    console.error("Error fetching origin areas:", error);
                    setAreas([]);
                } finally {
                    setLoadingAreas(false);
                }
            } else {
                setAreas([]);
                form.setValue("area_id", "");
            }
        };

        fetchOriginAreas();
    }, [watchedCityId, form]);

    // useEffect(() => {
    //     if (!!formState && formState.status === StatusCode.Failed) {
    //         toast.error(!!formState?.errors
    //             ? t("messages.errorFields")
    //             : formState?.message || t("messages.error"));

    //         if (formState.errors) {
    //             Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
    //                 if (fieldErrors && fieldErrors.length > 0) {
    //                     form.setError(fieldName as keyof AccountFormData, {
    //                         type: "server",
    //                         message: fieldErrors[0]
    //                     });
    //                 }
    //             });
    //         }
    //     } else if (!!formState && formState.status === StatusCode.Success) {
    //         toast.success(formState?.message || t("messages.updated"));
    //         router.refresh();
    //     }
    // }, [formState, form]);

    const onSubmit = async (data: BizFormData) => {
        console.log(data)
        // const formData = new FormData();
        // formData.append("first_name", data.first_name);
        // formData.append("last_name", data.last_name);
        // formData.append("nickname", data.nickname);
        // formData.append("mobile", data.mobile);
        // formData.append("country_id", "1");
        // formData.append("city_id", "1");
        // formData.append("profile_photo_path", data.profile_photo_path || "");

        // startTransition(async () => {
        //     await formAction(formData);
        // });
    };

    return (
        <div className="lg:w-[509px] lg:shrink-0">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="px-4 py-3 border-b border-border rounded-lg flex flex-col gap-4">
                        <h2 className="text-2xl text-title font-bold">
                            {tPages("myBiz.bizInformation")}
                        </h2>
                        <RHFInput
                            name="title"
                            label={tPages("myBiz.mainTitle")}
                            type="text"
                        />
                        <RHFTextarea
                            name="description"
                            label={tPages("myBiz.description")}
                        />
                        <RHFInput
                            name="phone"
                            label={tPages("myBiz.phoneNumber")}
                            type="text"
                        />
                        <RHFInput
                            name="email"
                            label={tPages("myBiz.email")}
                            type="text"
                        />
                        <RHFCombobox
                            name="country_id"
                            label={tPages("myBiz.country")}
                            options={countryOptions}
                        />
                        <RHFCombobox
                            name="city_id"
                            label={tPages("myBiz.city")}
                            options={cityOptions}
                            loading={loadingCities}
                        />
                        <RHFCombobox
                            name="area_id"
                            label={tPages("myBiz.area")}
                            options={areaOptions}
                            loading={loadingAreas}
                        />
                        <RHFTextarea
                            name="address"
                            label={tPages("myBiz.address")}
                        />
                        <RHFCombobox
                            name="amount_type"
                            label={tPages("myBiz.amountType")}
                            options={amountTypeOptions}
                        />
                        <RHFInput
                            name="start_amount"
                            label={tPages("myBiz.startAmount")}
                            type="text"
                        />
                        <RHFInput
                            name="website"
                            label={tPages("myBiz.website")}
                            type="text"
                        />
                        <RHFInput
                            name="facebook"
                            label={tPages("myBiz.facebook")}
                            type="text"
                        />
                        <RHFInput
                            name="instagram"
                            label={tPages("myBiz.instagram")}
                            type="text"
                        />
                        <RHFInput
                            name="youtube"
                            label={tPages("myBiz.youtube")}
                            type="text"
                        />
                        <RHFInput
                            name="tiktok"
                            label={tPages("myBiz.tiktok")}
                            type="text"
                        />
                        <RHFInput
                            name="whatsapp"
                            label={tPages("myBiz.whatsapp")}
                            type="text"
                        />
                    </div>
                    <div className="px-4 py-3 border-b border-border rounded-lg flex flex-col gap-4">
                        <h2 className="text-2xl text-title font-bold">
                            {tPages("myBiz.imageAndVideo")}
                        </h2>
                        <RHFUpload
                            name="image"
                            label={tPages("myBiz.image")}
                            uploadType="image"
                        />
                        <RHFUpload
                            name="menu_image"
                            label={tPages("myBiz.menuImage")}
                            uploadType="image"
                        />
                        <RHFUpload
                            name="video"
                            label={tPages("myBiz.video")}
                            uploadType="video"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2.5">
                        <Button
                            size={"medium"}
                            variant={"secondary"}
                            isLoading={isPending}
                            type="submit"
                        >
                            {tPages("myBiz.submitBiz")}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}