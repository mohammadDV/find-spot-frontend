import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { Carousel } from "@/app/_components/carousel";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getWeekends } from "./_api/getWeekends";

export default async function WeekendPage() {
    const t = await getTranslations("pages");

    const weekendsData = await getWeekends();

    return (
        <>
            <div className="container px-4 mx-auto mt-4 lg:mt-10">
                <div className="flex items-center gap-2 mt-4 lg:mt-8">
                    <Image
                        src={"/images/finybo-icon.png"}
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
            {Object.values(weekendsData.data)?.map(row => (
                <div className="my-6 lg:my-10" key={row.title}>
                    <Carousel
                        slides={row.businesses?.map(item => (
                            <BusinessCard
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                rate={item.rate}
                                start_amount={item.start_amount}
                            />
                        ))}
                        desktopSlidesPerView={4}
                        mobileSlidesPerView={2.3}
                        title={row.title}
                    />
                </div>
            ))}
        </>
    )
}