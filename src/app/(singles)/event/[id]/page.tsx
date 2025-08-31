import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { TitleSection } from "@/app/_components/titleSection";
import bannerSample from "@/assets/images/banner-sample.jpg";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { ArchiveAdd, Call, Global, Location, Share, Star1 } from "iconsax-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function EventPage() {
    const tCommon = await getTranslations("common");
    const tPages = await getTranslations("pages");
    return (
        <>
            <section className="container px-4 mx-auto mt-4 lg:mt-10">
                <div className="relative w-full h-[262px] lg:h-[555px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={bannerSample}
                            alt=""
                            quality={100}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="relative lg:max-w-3xl px-4 mx-auto z-10 h-full flex items-center">
                        <div className="flex flex-col justify-center items-start h-full">
                            <div className="flex items-center gap-2.5">
                                <Badge
                                    variant={"primary"}
                                    className="text-lg py-0 font-normal"
                                >
                                    رویدادهای ویژه
                                </Badge>
                                <Badge
                                    variant={"primary"}
                                    className="text-lg py-0 font-normal"
                                >
                                    22 - 27 مهر
                                </Badge>
                            </div>
                            <h1 className="text-white text-2xl lg:text-4xl font-bold mt-6 mb-2">
                                فستیوال رقص ۲۰۲۵ – استانبول
                            </h1>
                            <p className="font-normal text-white text-xl lg:text-2xl">
                                با ما برقص، بخند و از لحظه‌هات لذت ببر. تجربه‌ای فراموش‌نشدنی در انتظار توست!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-4 lg:mt-10 container px-4 mx-auto">
                <div className="flex justify-between gap-10">
                    <div className="w-full lg:w-2/3">
                        <div className="flex items-center gap-2 lg:gap-4">
                            <Button
                                variant={"primary"}
                                size={"medium"}
                                className="px-4 lg:px-10 text-2xs lg:text-base rounded-lg lg:rounded-xl py-2 lg:py-2.5">
                                <Star1 className="stroke-white size-4 lg:size-6" />
                                {tCommon("buttons.ticketing")}
                            </Button>
                            <Button
                                variant={"outline"}
                                size={"medium"}
                                className="text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5">
                                {tCommon("buttons.share")}
                                <Share className="stroke-primary size-4 lg:size-6" />
                            </Button>
                            <Button
                                variant={"outline"}
                                size={"medium"}
                                className="text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5">
                                {tCommon("buttons.save")}
                                <ArchiveAdd className="stroke-primary size-4 lg:size-6" />
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
                            <h2 className="text-title lg:text-3xl font-bold">
                                فستیوال رقص ۲۰۲۵ – استانبول
                            </h2>
                        </div>
                        <p className="mt-2 lg:mt-4 text-xs lg:text-lg text-title">
                            در اینجا، هر غذا داستانی دارد؛ داستانی از طعم‌های سنتی ترکی، از دست‌پخت‌هایی که از دل فرهنگ و تاریخ آمده‌اند، و از مهربانی‌ای که در هر بشقاب جاری‌ست. از کباب‌های آبدار گرفته تا پیش‌غذاهای رنگارنگ و دسرهای وسوسه‌انگیز ترک، همه چیز با عشق آماده می‌شود .  با همان وسواسی که مادربزرگ‌ها برای عزیزترین‌هایشان غذا می‌پزند.
                        </p>
                        <div className="flex items-center gap-1 lg:gap-2 mt-4 lg:mt-8">
                            <Image
                                src={"/images/finybo-icon.svg"}
                                alt="finybo icon"
                                width={24}
                                height={24}
                                className="size-4 lg:size-6"
                            />
                            <h2 className="text-title lg:text-2xl font-bold">{tPages("event.information")}</h2>
                        </div>
                        <div className="mt-2 lg:mt-4 lg:w-1/2">
                            <p className="text-xs lg:text-lg text-title">
                                کادیکوی، جمال سوریا سوکاک، پلاک 8
                                استانبول، آسیایی
                            </p>
                            <p className="text-xs lg:text-lg text-title my-2 lg:my-3">
                                +905478963
                            </p>
                            <p className="text-xs lg:text-lg text-title">
                                25 مهر - 30 آبان
                            </p>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385399.3519135348!2d28.682539048623084!3d41.00485196902631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zSXN0YW5idWwsIMSwc3RhbmJ1bCwgVMO8cmtpeWU!5e0!3m2!1sen!2s!4v1756486573705!5m2!1sen!2s"
                                allowFullScreen={true}
                                className="rounded-xl w-full h-[145px] mt-4 lg:mt-6"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div className="hidden lg:block lg:w-1/3">
                        <div className="w-full shadow-card rounded-2xl p-6 flex flex-col gap-6 sticky top-28">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Global className="stroke-title size-6" />
                                    <p className="text-xs text-title">{tPages("biz.website")}</p>
                                </div>
                                <p className="text-sm text-title text-left">mehmet.efendi.tr</p>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Call className="stroke-title size-6" />
                                    <p className="text-xs text-title">
                                        {tPages("biz.phoneNumber")}
                                    </p>
                                </div>
                                <p className="text-sm text-title text-left">05379786435</p>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Location className="stroke-title size-6" />
                                    <p className="text-xs text-title">{tPages("biz.address")}</p>
                                </div>
                                <p className="text-sm text-title text-left">
                                    Mimar Hayrettin Mh. Divan-i Ali Sk. No:12/C 34126 Istanbul
                                    Turkey
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 lg:mt-10 container mx-auto">
                    <TitleSection title={tPages("event.similarEvents")} link="/" />
                    <div className="mt-4 lg:mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                        {Array.from({ length: 3 }, (_, i) => (
                            <BusinessCard key={i} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}