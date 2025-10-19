"use client"

import { Map } from "@/app/_components/map";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { cn, createFileUrl, isEmpty } from "@/lib/utils";
import { BusinessEditResponse } from "@/types/business.type";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Star from "@/ui/star";
import { ArchiveAdd, BookSaved, Call, Gallery, Global, Location, Share, ShieldTick, Star1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { BizFormData } from "./BizForm";
import type { OptionTypes } from "@/app/_components/hookForm/RHFCombobox";

interface BizPreviewProps {
    bizData?: BusinessEditResponse;
    formValues: BizFormData | null
    areaOptions?: OptionTypes[];
    facilitiesOptions?: OptionTypes[];
}

export const BizPreview = ({ bizData, formValues, areaOptions = [], facilitiesOptions = [] }: BizPreviewProps) => {
    const tCommon = useCommonTranslation();
    const tPages = usePagesTranslation();

    const areaLabel = areaOptions.find((o) => o.value === (formValues?.area_id || ""))?.label || formValues?.area_id || "";
    const facilityLabels = (formValues?.facilities || []).map((id) => facilitiesOptions.find((o) => o.value === id)?.label || id);

    return (
        <div className="flex-1">
            <section className="relative lg:h-[380px] w-full rounded-lg overflow-hidden">
                <div className="absolute inset-0">
                    {formValues?.image
                        ? (<Image
                            src={createFileUrl(formValues?.slider_image!)}
                            alt=""
                            priority
                            width={1420}
                            height={600}
                            quality={100}
                            className="w-full h-full object-cover"
                        />)
                        : (<div className="w-full h-full bg-neutral-50"></div>)}
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative px-16 py-10 mx-auto z-10 h-full">
                    <div className="flex flex-col justify-center pb-2 items-start h-full">
                        <h1 className="text-2xl lg:text-[32px] font-bold text-white">
                            {formValues?.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-6">
                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <Star
                                        key={index}
                                        className={cn("size-4 lg:size-8", index < (bizData?.rate || 0) ? "fill-warning" : "fill-border")} />
                                ))}
                            </div>
                            <p className="text-sm lg:text-xl text-white">
                                ({bizData?.rate} از مجموع ** امتیاز)
                            </p>
                        </div>
                        <div className="flex items-center gap-2 my-2 lg:my-4">
                            <Location className="stroke-white size-4 lg:size-6" />
                            <p className="text-xs lg:text-lg text-white">{areaLabel}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldTick className="stroke-success size-4 lg:size-6" />
                            <p className="text-xs lg:text-xl font-bold text-white">
                                {"₺".repeat(Number(formValues?.amount_type) || 0)}
                            </p>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 my-2 lg:my-4">
                            {formValues?.tags?.map(item => (
                                <Badge key={item} variant={"secondary"}>{item}</Badge>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center lg:justify-end w-full gap-4">
                            <Link
                                href={`https://www.google.com/maps?q=${formValues?.location?.[0]},${formValues?.location?.[1]}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button
                                    variant={"outline"}
                                    size={"small"}
                                    className="border-white text-white px-4 py-2"
                                >
                                    <Location className="stroke-white size-3 lg:size-6" />
                                    {tCommon("buttons.map")}
                                </Button>
                            </Link>
                            {!isEmpty(formValues?.files) && <Button
                                variant={"outline"}
                                size={"small"}
                                className="border-white text-white px-4 py-2">
                                <Gallery className="stroke-white size-3 lg:size-6" />
                                {tCommon("buttons.seeOtherImages")}
                            </Button>}
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-6">
                <div className="flex justify-between gap-7">
                    <div className="w-full lg:w-2/3">
                        <div className="flex items-center gap-2">
                            <Button
                                variant={"primary"}
                                size={"medium"}
                                className="px-4 text-2xs lg:text-base rounded-lg py-2">
                                <Star1 className="stroke-white size-4" />
                                {tCommon("buttons.submitComment")}
                            </Button>
                            {formValues?.menu_image && <Button
                                variant={"outline"}
                                size={"medium"}
                                className="px-4 py-2">
                                {tCommon("buttons.menu")}
                                <BookSaved className="stroke-primary size-4" />
                            </Button>}
                            <Button
                                variant={"outline"}
                                size={"medium"}
                                className="text-2xs lg:text-base rounded-lg px-4 py-2">
                                {tCommon("buttons.share")}
                                <Share className="stroke-primary size-4" />
                            </Button>
                            <Button
                                variant={"outline"}
                                size={"medium"}
                                className="text-2xs lg:text-base rounded-lg px-4 py-2">
                                {tCommon("buttons.save")}
                                <ArchiveAdd className="size-4 stroke-primary" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-4 lg:mt-8">
                            <Image
                                src={"/images/finybo-icon.svg"}
                                alt="finybo icon"
                                width={24}
                                height={24}
                                className="size-4 lg:size-6"
                            />
                            <h2 className="text-title lg:text-lg font-bold">
                                {formValues?.title}
                            </h2>
                        </div>
                        <p className="mt-2 text-xs lg:text-sm text-title">
                            {formValues?.description}
                        </p>
                        {formValues?.video && (
                            <div className="mt-2 lg:mt-4">
                                <video
                                    controls
                                    className="w-full rounded-xl"
                                    src={createFileUrl(formValues.video)}
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-1 lg:gap-2 mt-4 lg:mt-8">
                            <Image
                                src={"/images/finybo-icon.svg"}
                                alt="finybo icon"
                                width={24}
                                height={24}
                                className="size-4 lg:size-6"
                            />
                            <h2 className="text-title lg:text-lg font-bold">{tPages("biz.addressAndHour")}</h2>
                        </div>
                        <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-3 mt-2 lg:mt-4">
                            <Map
                                lat={parseFloat(String(formValues?.location?.[0] || "0"))}
                                long={parseFloat(String(formValues?.location?.[1] || "0"))}
                                className="rounded-xl lg:w-[240px] h-[280px]"
                            />
                            <div className="flex-1 h-full bg-card rounded-xl p-4 flex flex-col gap-2 lg:gap-1.5">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs lg:text-base text-title">شنبه</p>
                                    <p className="text-sm text-title">
                                        {(formValues?.saturday.from === 0 && formValues?.saturday.to === 0)
                                            ? "تعطیل"
                                            : `${formValues?.saturday.from} صبح تا ${formValues?.saturday.to} شب`}
                                    </p>
                                </div>
                                <hr className="border-t border-border" />
                                <div className="flex items-center justify-between">
                                    <p className="text-xs lg:text-base text-title">یکشنبه</p>
                                    <p className="text-sm text-title">
                                        {(formValues?.sunday.from === 0 && formValues?.sunday.to === 0)
                                            ? "تعطیل"
                                            : `${formValues?.sunday.from} صبح تا ${formValues?.sunday.to} شب`}
                                    </p>
                                </div>
                                <hr className="border-t border-border" />
                                <div className="flex items-center justify-between">
                                    <p className="text-xs lg:text-base text-title">دوشنبه</p>
                                    <p className="text-sm text-title">
                                        {(formValues?.monday.from === 0 && formValues?.monday.to === 0)
                                            ? "تعطیل"
                                            : `${formValues?.monday.from} صبح تا ${formValues?.monday.to} شب`}
                                    </p>
                                </div>
                                <hr className="border-t border-border" />
                                <div className="flex items-center justify-between">
                                    <p className="text-xs lg:text-base text-title">سه‌شنبه</p>
                                    <p className="text-sm text-title">
                                        {(formValues?.tuesday.from === 0 && formValues?.tuesday.to === 0)
                                            ? "تعطیل"
                                            : `${formValues?.tuesday.from} صبح تا ${formValues?.tuesday.to} شب`}
                                    </p>
                                </div>
                                <hr className="border-t border-border" />
                                <div className="flex items-center justify-between">
                                    <p className="text-xs lg:text-base text-title">چهارشنبه</p>
                                    <p className="text-sm text-title">
                                        {(formValues?.wednesday.from === 0 && formValues?.wednesday.to === 0)
                                            ? "تعطیل"
                                            : `${formValues?.wednesday.from} صبح تا ${formValues?.wednesday.to} شب`}
                                    </p>
                                </div>
                                <hr className="border-t border-border" />
                                <div className="flex items-center justify-between">
                                    <p className="text-xs lg:text-base text-title">پنجشنبه</p>
                                    <p className="text-sm text-title">
                                        {(formValues?.thursday.from === 0 && formValues?.thursday.to === 0)
                                            ? "تعطیل"
                                            : `${formValues?.thursday.from} صبح تا ${formValues?.thursday.to} شب`}
                                    </p>
                                </div>
                                <hr className="border-t border-border" />
                                <div className="flex items-center justify-between">
                                    <p className="text-xs lg:text-base text-title">جمعه</p>
                                    <p className="text-sm text-title">
                                        {(formValues?.friday.from === 0 && formValues?.friday.to === 0)
                                            ? "تعطیل"
                                            : `${formValues?.friday.from} صبح تا ${formValues?.friday.to} شب`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 lg:gap-2 mt-4 lg:mt-8">
                            <Image
                                src={"/images/finybo-icon.svg"}
                                alt="finybo icon"
                                width={24}
                                height={24}
                                className="size-4 lg:size-6"
                            />
                            <h2 className="text-title lg:text-lg font-bold">{tPages("biz.features")}</h2>
                        </div>
                        <div className="flex mt-2 lg:mt-4">
                            <div className="flex items-center flex-wrap gap-2">
                                {facilityLabels?.map(item => (
                                    <Badge key={item} variant={"grey"} className="text-sm">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:w-1/3">
                        <div className="w-full shadow-card rounded-lg p-5 flex flex-col gap-5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Global className="stroke-title size-5" />
                                    <p className="text-xs text-title">{tPages("biz.website")}</p>
                                </div>
                                <p className="text-xs text-title text-left">{formValues?.website}</p>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Call className="stroke-title size-5" />
                                    <p className="text-xs text-title">
                                        {tPages("biz.phoneNumber")}
                                    </p>
                                </div>
                                <p className="text-xs text-title text-left">{formValues?.phone}</p>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Location className="stroke-title size-5" />
                                    <p className="text-xs text-title">{tPages("biz.address")}</p>
                                </div>
                                <p className="text-xs text-title text-left">
                                    {formValues?.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}