import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { Carousel } from "@/app/_components/carousel";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function WeekendPage() {
    const t = await getTranslations("pages");

    return (
        <>
            <div className="container px-4 mx-auto mt-4 lg:mt-10">
                <div className="flex items-center gap-2 mt-4 lg:mt-8">
                    <Image
                        src={"/images/finybo-icon.svg"}
                        alt="finybo icon"
                        width={24}
                        height={24}
                        className="size-4 lg:size-6"
                    />
                    <h2 className="text-title lg:text-3xl font-bold">
                        {t("weekend.title")}
                    </h2>
                </div>
            </div>
            <div className="my-6 lg:my-10">
                <Carousel
                    slides={Array.from({ length: 6 }, (_, i) => <BusinessCard key={i} />)}
                    desktopSlidesPerView={4}
                    mobileSlidesPerView={2.3}
                    title="رستوران‌ها"
                />
            </div>
            <div className="my-6 lg:my-10">
                <Carousel
                    slides={Array.from({ length: 6 }, (_, i) => <BusinessCard key={i} />)}
                    desktopSlidesPerView={4}
                    mobileSlidesPerView={2.3}
                    title="کنسرت ها"
                />
            </div>
            <div className="my-6 lg:my-10">
                <Carousel
                    slides={Array.from({ length: 6 }, (_, i) => <BusinessCard key={i} />)}
                    desktopSlidesPerView={4}
                    mobileSlidesPerView={2.3}
                    title="کنسرت ها"
                />
            </div>
        </>
    )
}