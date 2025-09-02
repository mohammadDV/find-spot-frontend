import { BannerSlider } from "@/app/_components/bannerSilder/BannerSlider";
import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { Carousel } from "@/app/_components/carousel";
import { Button } from "@/ui/button";
import { ArrowDown2 } from "iconsax-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function EventsPage() {
    const t = await getTranslations("pages");

    return (
        <>
            <div className="mt-4 lg:mt-10">
                <BannerSlider />
            </div>
            <div className="mt-4 lg:mt-10">
                <Carousel
                    slides={Array.from({ length: 4 }, (_, i) => <BusinessCard key={i} />)}
                    desktopSlidesPerView={3}
                    mobileSlidesPerView={2.3}
                />
            </div>
            <div className="mt-8 container mx-auto px-4">
                <div className="flex items-center gap-2 lg:gap-6">
                    <div className="flex items-center gap-1 lg:gap-2">
                        <Image
                            src={"/images/finybo-icon.svg"}
                            alt="finybo icon"
                            width={24}
                            height={24}
                            className="size-4 lg:size-6"
                        />
                        <h2 className="text-title lg:text-3xl font-bold">
                            {t("events.title")}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4">
                        <Button variant={"outline"} size={"small"}>
                            {t("events.newest")}
                            <ArrowDown2 className="size-4 stroke-primary mr-1" />
                        </Button>
                        <Button variant={"outline"} size={"small"}>
                            {t("events.cheapest")}
                            <ArrowDown2 className="size-4 stroke-primary mr-1" />
                        </Button>
                    </div>
                </div>
                <div className="mt-4 lg:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                    {Array.from({ length: 12 }, (_, i) => <BusinessCard key={i} />)}
                </div>
            </div>
        </>
    )
}