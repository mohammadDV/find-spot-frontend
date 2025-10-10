"use client"

import { OptionTypes, RHFCombobox } from "@/app/_components/hookForm/RHFCombobox";
import { RHFComboboxMulti } from "@/app/_components/hookForm/RHFComboboxMulti";
import { RHFCreateList } from "@/app/_components/hookForm/RHFCreateList";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFMap } from "@/app/_components/hookForm/RHFMap";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { RHFUploadMulti } from "@/app/_components/hookForm/RHFUploadMulti";
import { RHFWorkingHours } from "@/app/_components/hookForm/RHFWorkingHours";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useFetchData } from "@/hooks/useFetchData";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { BusinessEditResponse } from "@/types/business.type";
import { Category } from "@/types/category.type";
import { Country } from "@/types/location.type";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { createBusinessAction, CreateBusinessResponse } from "../_api/createBusinessAction";
import { editBusinessAction, EditBusinessResponse } from "../_api/editBusinessAction";
import { getChildCategories } from "../_api/getChildCategories";
import { getFacilities, getFilters } from "../_api/getFilters";
import { getAreas, getCities } from "../_api/getLocations";

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

interface BizFormProps {
    defaultData?: BusinessEditResponse;
    id: string;
}

export const BizForm = ({ defaultData, id }: BizFormProps) => {
    const router = useRouter();
    const tCommon = useCommonTranslation();
    const tPages = usePagesTranslation();
    const isEditMode = id !== "create";
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<CreateBusinessResponse | EditBusinessResponse | null, FormData>(
        isEditMode ? editBusinessAction.bind(null, id) : createBusinessAction,
        null
    );

    const [cities, setCities] = useState<any[]>([]);
    const [areas, setAreas] = useState<any[]>([]);
    const [loadingCities, setLoadingCities] = useState<boolean>(false);
    const [loadingAreas, setLoadingAreas] = useState<boolean>(false);
    const [filtersOptions, setFiltersOptions] = useState<OptionTypes[]>([]);
    const [facilitiesOptions, setFacilitiesOptions] = useState<OptionTypes[]>([]);
    const [loadingFilters, setLoadingFilters] = useState<boolean>(false);
    const [loadingFacilities, setLoadingFacilities] = useState<boolean>(false);
    const [childCategories, setChildCategories] = useState<Category[]>([]);
    const [loadingChildCategories, setLoadingChildCategories] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const { response: countriesResponse, loading: loadingCountries } = useFetchData<Country[]>("/countries");
    const { response: categoriesResponse, loading: loadingCategories } = useFetchData<Category[]>("/active-categories");

    const processDefaultCategories = (apiCategories: any[]) => {
        if (!apiCategories || !categoriesResponse) return { parent: [], child: [] };

        const parentCategoryIds = categoriesResponse.map(cat => cat.id);
        const parent: string[] = [];
        const child: string[] = [];

        apiCategories.forEach(category => {
            const categoryId = category.id.toString();
            if (parentCategoryIds.includes(category.id)) {
                parent.push(categoryId);
            } else {
                child.push(categoryId);
            }
        });

        return { parent, child };
    };

    const countryOptions = countriesResponse?.map(country => ({
        label: country.title,
        value: country.id.toString(),
    })) || [];

    const categoryOptions = categoriesResponse?.map(category => ({
        label: category.title,
        value: category.id.toString(),
    })) || [];

    const childCategoryOptions = childCategories?.map(category => ({
        label: category.title,
        value: category.id.toString(),
    })) || [];

    const bizSchema = z.object({
        title: z.string().min(1, tCommon("validation.required.thisField")),
        parent_categories: z.array(z.string()).optional(),
        child_categories: z.array(z.string()).optional(),
        filters: z.array(z.string()).optional(),
        facilities: z.array(z.string()).optional(),
        tags: z.array(z.string()).max(4, tCommon("validation.invalid.maxItems")),
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
        website: z.string().optional(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        youtube: z.string().optional(),
        tiktok: z.string().optional(),
        whatsapp: z.string().optional(),
        location: z.array(z.number()).length(2, tCommon("validation.required.thisField")),
        saturday: z.object({ from: z.number(), to: z.number() }),
        sunday: z.object({ from: z.number(), to: z.number() }),
        monday: z.object({ from: z.number(), to: z.number() }),
        tuesday: z.object({ from: z.number(), to: z.number() }),
        wednesday: z.object({ from: z.number(), to: z.number() }),
        thursday: z.object({ from: z.number(), to: z.number() }),
        friday: z.object({ from: z.number(), to: z.number() }),
        image: z.string().min(1, tCommon("validation.required.thisField")),
        menu_image: z.string().optional(),
        video: z.string().optional(),
        files: z.any().optional()
    });

    type BizFormData = z.infer<typeof bizSchema>;

    const processedCategories = defaultData?.categories ? processDefaultCategories(defaultData.categories) : { parent: [], child: [] };

    const form = useZodForm(bizSchema, {
        defaultValues: {
            title: defaultData?.title || '',
            parent_categories: [],
            child_categories: [],
            filters: [],
            facilities: [],
            tags: defaultData?.tags?.map(tag => tag.title) || [],
            description: defaultData?.description || '',
            phone: defaultData?.phone || '',
            email: defaultData?.email || '',
            address: defaultData?.address || '',
            amount_type: defaultData?.amount_type?.toString() || '',
            start_amount: defaultData?.start_amount?.toString() || '',
            country_id: defaultData?.area?.city?.country?.id?.toString() || '',
            city_id: defaultData?.area?.city?.id?.toString() || '',
            area_id: defaultData?.area?.id?.toString() || '',
            website: defaultData?.website || '',
            facebook: defaultData?.facebook || '',
            instagram: defaultData?.instagram || '',
            youtube: defaultData?.youtube || '',
            tiktok: defaultData?.tiktok || '',
            whatsapp: defaultData?.whatsapp || '',
            location: defaultData ? [parseFloat(defaultData.lat), parseFloat(defaultData.long)] : [41.0082, 28.9784],
            saturday: defaultData ? { from: defaultData.from_saturday, to: defaultData.to_saturday } : { from: 0, to: 0 },
            sunday: defaultData ? { from: defaultData.from_sunday, to: defaultData.to_sunday } : { from: 0, to: 0 },
            monday: defaultData ? { from: defaultData.from_monday, to: defaultData.to_monday } : { from: 0, to: 0 },
            tuesday: defaultData ? { from: defaultData.from_tuesday, to: defaultData.to_tuesday } : { from: 0, to: 0 },
            wednesday: defaultData ? { from: defaultData.from_wednesday, to: defaultData.to_wednesday } : { from: 0, to: 0 },
            thursday: defaultData ? { from: defaultData.from_thursday, to: defaultData.to_thursday } : { from: 0, to: 0 },
            friday: defaultData ? { from: defaultData.from_friday, to: defaultData.to_friday } : { from: 0, to: 0 },
            image: defaultData?.image || '',
            menu_image: defaultData?.menu_image || '',
            video: defaultData?.video || '',
            files: defaultData?.files || [],
        }
    });

    const watchedCountryId = form.watch("country_id");
    const watchedCityId = form.watch("city_id");
    const watchedParentCategories = form.watch("parent_categories");
    const watchedChildCategories = form.watch("child_categories");

    const cityOptions = cities?.map(city => ({
        label: city.title,
        value: city.id.toString(),
    })) || [];

    const areaOptions = areas?.map(area => ({
        label: area.title,
        value: area.id.toString(),
    })) || [];

    useEffect(() => {
        if (defaultData?.categories && categoriesResponse && !isInitialized) {
            const processedCategories = processDefaultCategories(defaultData.categories);

            form.setValue("parent_categories", processedCategories.parent);
            form.setValue("child_categories", processedCategories.child);
            
            setIsInitialized(true);
        }
    }, [defaultData, categoriesResponse, form, isInitialized]);

    useEffect(() => {
        if (isInitialized && defaultData) {
            if (defaultData.filters) {
                form.setValue("filters", defaultData.filters.map(filter => filter.id.toString()));
            }
            if (defaultData.facilities) {
                form.setValue("facilities", defaultData.facilities.map(facility => facility.id.toString()));
            }
        }
    }, [isInitialized, defaultData, form]);

    useEffect(() => {
        const fetchChildCategories = async () => {
            if (!watchedParentCategories || watchedParentCategories.length === 0) {
                setChildCategories([]);
                form.setValue("child_categories", []);
                return;
            }

            setLoadingChildCategories(true);
            try {
                const childCategoriesLists = await Promise.all(
                    watchedParentCategories.map((parentId: string) =>
                        getChildCategories(parseInt(parentId))
                    )
                );

                const allChildCategories = childCategoriesLists.flat();
                const uniqueChildCategories = allChildCategories.filter(
                    (category, index, self) =>
                        index === self.findIndex(c => c.id === category.id)
                );

                setChildCategories(uniqueChildCategories);

                const currentChildCategories = form.getValues("child_categories") || [];
                const validChildCategories = currentChildCategories.filter((childId: string) =>
                    uniqueChildCategories.some(c => c.id.toString() === childId)
                );
                form.setValue("child_categories", validChildCategories);
            } catch (error) {
                console.error("Error fetching child categories:", error);
                setChildCategories([]);
            } finally {
                setLoadingChildCategories(false);
            }
        };

        fetchChildCategories();
    }, [JSON.stringify(watchedParentCategories), form]);

    const handleRemoveCategory = (categoryId: number) => {
        const parentCategories = form.getValues("parent_categories") || [];
        const childCategories = form.getValues("child_categories") || [];

        const updatedParentCategories = parentCategories.filter((id: string) => parseInt(id) !== categoryId);
        const updatedChildCategories = childCategories.filter((id: string) => parseInt(id) !== categoryId);

        form.setValue("parent_categories", updatedParentCategories);
        form.setValue("child_categories", updatedChildCategories);
    };

    useEffect(() => {
        const fetchFiltersAndFacilities = async () => {
            const parentIds = watchedParentCategories || [];
            const childIds = watchedChildCategories || [];
            const categoryIds = [...parentIds, ...childIds].map(id => parseInt(id));

            if (categoryIds.length === 0) {
                if (!defaultData || (defaultData && categoriesResponse)) {
                    setFiltersOptions([]);
                    setFacilitiesOptions([]);
                    form.setValue("filters", []);
                    form.setValue("facilities", []);
                }
                return;
            }

            setLoadingFilters(true);
            setLoadingFacilities(true);

            try {
                const [filtersResponse, facilitiesResponse] = await Promise.all([
                    getFilters(categoryIds),
                    getFacilities(categoryIds),
                ]);

                const filtersOptions = filtersResponse.data.map(filter => ({
                    label: filter.title,
                    value: filter.id.toString()
                }));

                const facilitiesOptions = facilitiesResponse.data.map(facility => ({
                    label: facility.title,
                    value: facility.id.toString()
                }));

                setFiltersOptions(filtersOptions);
                setFacilitiesOptions(facilitiesOptions);

                const currentFilters = form.getValues("filters") || [];
                const currentFacilities = form.getValues("facilities") || [];

                const prunedFilters = currentFilters.filter((v: string) => filtersOptions.some((o) => o.value === v));
                const prunedFacilities = currentFacilities.filter((v: string) => facilitiesOptions.some((o) => o.value === v));

                form.setValue("filters", prunedFilters, { shouldValidate: false });
                form.setValue("facilities", prunedFacilities, { shouldValidate: false });
            } catch (error) {
                console.error("Error fetching filters/facilities:", error);
                setFiltersOptions([]);
                setFacilitiesOptions([]);
            } finally {
                setLoadingFilters(false);
                setLoadingFacilities(false);
            }
        };

        fetchFiltersAndFacilities();
    }, [JSON.stringify(watchedParentCategories), JSON.stringify(watchedChildCategories), form, defaultData, categoriesResponse]);

    useEffect(() => {
        const fetchOriginCities = async () => {
            if (watchedCountryId) {
                setLoadingCities(true);
                setCities([]);
                form.setValue("city_id", "");

                try {
                    const response: any = await getCities(parseInt(watchedCountryId));
                    setCities(response || []);
                    if (defaultData?.city_id && response?.some((c: any) => c.id === defaultData.city_id)) {
                        form.setValue("city_id", defaultData.city_id.toString());
                    }
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

                    if (defaultData?.area_id && response?.some((c: any) => c.id === defaultData.area_id)) {
                        form.setValue("area_id", defaultData.area_id.toString());
                    }
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

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors
                ? tCommon("messages.errorFields")
                : formState?.message || tCommon("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof BizFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || tCommon("messages.updated"));
            router.refresh();
        }
    }, [formState, form]);

    const onSubmit = async (data: BizFormData) => {
        const formData = new FormData();

        // Basic fields
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("phone", data.phone);
        formData.append("email", data.email);
        formData.append("address", data.address);
        formData.append("amount_type", data.amount_type);
        formData.append("start_amount", data.start_amount);
        formData.append("country_id", data.country_id);
        formData.append("city_id", data.city_id);
        formData.append("area_id", data.area_id);

        // Optional social media fields
        formData.append("website", data.website || "");
        formData.append("facebook", data.facebook || "");
        formData.append("instagram", data.instagram || "");
        formData.append("youtube", data.youtube || "");
        formData.append("tiktok", data.tiktok || "");
        formData.append("whatsapp", data.whatsapp || "");

        // Location coordinates
        formData.append("lat", data.location[0].toString());
        formData.append("long", data.location[1].toString());

        // Working hours - transform from object format to individual fields
        formData.append("from_monday", data.monday.from.toString());
        formData.append("to_monday", data.monday.to.toString());
        formData.append("from_tuesday", data.tuesday.from.toString());
        formData.append("to_tuesday", data.tuesday.to.toString());
        formData.append("from_wednesday", data.wednesday.from.toString());
        formData.append("to_wednesday", data.wednesday.to.toString());
        formData.append("from_thursday", data.thursday.from.toString());
        formData.append("to_thursday", data.thursday.to.toString());
        formData.append("from_friday", data.friday.from.toString());
        formData.append("to_friday", data.friday.to.toString());
        formData.append("from_saturday", data.saturday.from.toString());
        formData.append("to_saturday", data.saturday.to.toString());
        formData.append("from_sunday", data.sunday.from.toString());
        formData.append("to_sunday", data.sunday.to.toString());

        // Media files
        formData.append("image", data.image);
        formData.append("menu_image", data.menu_image || "");
        formData.append("video", data.video || "");

        // Combine parent_categories and child_categories for categories array
        const parentIds = data.parent_categories?.map(id => parseInt(id)) || [];
        const childIds = data.child_categories?.map(id => parseInt(id)) || [];
        const categoriesArray = [...parentIds, ...childIds];
        formData.append("categories", JSON.stringify(categoriesArray));

        // Arrays
        formData.append("tags", JSON.stringify(data.tags || []));
        formData.append("facilities", JSON.stringify(data.facilities?.map(f => parseInt(f)) || []));
        formData.append("filters", JSON.stringify(data.filters?.map(f => parseInt(f)) || []));
        formData.append("files", JSON.stringify(data.files || []));

        startTransition(async () => {
            await formAction(formData);
        });
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
                            loading={loadingCountries}
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
                        <RHFMap
                            name="location"
                            label={tPages("myBiz.location")}
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
                            {tPages("myBiz.categoriesAndFacilities")}
                        </h2>
                        <RHFComboboxMulti
                            name="parent_categories"
                            label={tPages("myBiz.parentCategory")}
                            options={categoryOptions}
                            loading={loadingCategories}
                        />
                        <RHFComboboxMulti
                            name="child_categories"
                            label={tPages("myBiz.childCategory")}
                            options={childCategoryOptions}
                            loading={loadingChildCategories}
                            disabled={!watchedParentCategories || watchedParentCategories.length === 0}
                        />
                        <RHFComboboxMulti
                            name="filters"
                            label={tPages("myBiz.filters")}
                            options={filtersOptions}
                            loading={loadingFilters}
                        />
                        <RHFComboboxMulti
                            name="facilities"
                            label={tPages("myBiz.facilities")}
                            options={facilitiesOptions}
                            loading={loadingFacilities}
                        />
                        <RHFCreateList
                            name="tags"
                            label={tPages("myBiz.tags")}
                            maxCount={4}
                        />
                    </div>
                    <div className="px-4 py-3 border-b border-border rounded-lg flex flex-col gap-4">
                        <h2 className="text-2xl text-title font-bold">
                            {tPages("myBiz.time")}
                        </h2>
                        <div className="flex flex-col gap-2">
                            <RHFWorkingHours
                                name="saturday"
                                label={tPages("myBiz.saturday")}
                            />
                            <RHFWorkingHours
                                name="sunday"
                                label={tPages("myBiz.sunday")}
                            />
                            <RHFWorkingHours
                                name="monday"
                                label={tPages("myBiz.monday")}
                            />
                            <RHFWorkingHours
                                name="tuesday"
                                label={tPages("myBiz.tuesday")}
                            />
                            <RHFWorkingHours
                                name="wednesday"
                                label={tPages("myBiz.wednesday")}
                            />
                            <RHFWorkingHours
                                name="thursday"
                                label={tPages("myBiz.thursday")}
                            />
                            <RHFWorkingHours
                                name="friday"
                                label={tPages("myBiz.friday")}
                            />
                        </div>
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
                        <RHFUploadMulti
                            name="files"
                            label={tPages("myBiz.files")}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2.5">
                        <Button
                            size={"medium"}
                            variant={"secondary"}
                            isLoading={isPending}
                            type="submit"
                        >
                            {isEditMode ? tPages("myBiz.updateBiz") : tPages("myBiz.submitBiz")}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}