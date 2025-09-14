import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { Map } from "@/app/_components/map";
import { TitleSection } from "@/app/_components/titleSection";
import { createFileUrl } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { ArchiveAdd, Call, Global, Location, Share, Star1 } from "iconsax-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getEvent } from "../_api/getEvents";
import { getSimilarEvents } from "../_api/getSimilarEvents";

interface EventPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EventPage({ params }: EventPageProps) {
    const tCommon = await getTranslations("common");
    const tPages = await getTranslations("pages");

    const resolvedParams = await params;

    const [eventData, similarEventsData] = await Promise.all([
        getEvent({ id: resolvedParams?.id }),
        getSimilarEvents({ id: resolvedParams?.id })
    ]);

    return (
        <>
            <section className="container px-4 mx-auto mt-4 lg:mt-10">
                <div className="relative w-full h-[262px] lg:h-[555px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={createFileUrl(eventData.slider_image!)}
                            alt=""
                            quality={100}
                            width={1280}
                            height={555}
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
                                    {eventData.start_date}
                                </Badge>
                                <Badge
                                    variant={"primary"}
                                    className="text-lg py-0 font-normal"
                                >
                                    {eventData.end_date}
                                </Badge>
                            </div>
                            <h1 className="text-white text-2xl lg:text-4xl font-bold mt-6 mb-2">
                                {eventData.title}
                            </h1>
                            <p className="font-normal text-white text-xl lg:text-2xl">
                                {eventData?.summary}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-4 lg:mt-10 container px-4 mx-auto">
                <div className="flex justify-between gap-10">
                    <div className="w-full lg:w-2/3">
                        <div className="flex items-center gap-2 lg:gap-4">
                            {eventData.link && <Link href={eventData.link} target="_blank">
                                <Button
                                    variant={"primary"}
                                    size={"medium"}
                                    className="px-4 lg:px-10 text-2xs lg:text-base rounded-lg lg:rounded-xl py-2 lg:py-2.5">
                                    <Star1 className="stroke-white size-4 lg:size-6" />
                                    {tCommon("buttons.ticketing")}
                                </Button>
                            </Link>}
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
                                {eventData.title}
                            </h2>
                        </div>
                        <p className="mt-2 lg:mt-4 text-xs lg:text-lg text-title">
                            {eventData?.description}
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
                                {eventData?.address}
                            </p>
                            <p className="text-xs lg:text-lg text-title my-2 lg:my-3">
                                {eventData?.whatsapp}
                            </p>
                            <p className="text-xs lg:text-lg text-title">
                                {eventData.start_date} - {eventData.end_date}
                            </p>
                            <Map
                                lat={parseFloat(eventData.lat)}
                                long={parseFloat(eventData.long)}
                                className="rounded-xl lg:w-[473px] h-[150px] mt-6"
                            />
                        </div>
                    </div>
                    <div className="hidden lg:block lg:w-1/3">
                        <div className="w-full shadow-card rounded-2xl p-6 flex flex-col gap-6 sticky top-28">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Global className="stroke-title size-6" />
                                    <p className="text-xs text-title">{tPages("biz.website")}</p>
                                </div>
                                <p className="text-sm text-title text-left">{eventData?.website}</p>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Call className="stroke-title size-6" />
                                    <p className="text-xs text-title">
                                        {tPages("biz.phoneNumber")}
                                    </p>
                                </div>
                                <p className="text-sm text-title text-left">{eventData?.whatsapp}</p>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Location className="stroke-title size-6" />
                                    <p className="text-xs text-title">{tPages("biz.address")}</p>
                                </div>
                                <p className="text-sm text-title text-left">
                                    {eventData?.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 lg:mt-10 container mx-auto">
                    <TitleSection title={tPages("event.similarEvents")} link="/" />
                    <div className="mt-4 lg:mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                        {similarEventsData?.slice(0, 3)?.map(item => (
                            <BusinessCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                start_date={item.start_date}
                                end_date={item.end_date}
                                start_amount={item.amount} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}