import { BannerSlider } from "@/app/_components/bannerSilder/BannerSlider";
import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { Carousel } from "@/app/_components/carousel";
import { Pagination } from "@/app/_components/pagination";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getEventsSliders } from "./_api/getEventsSlider";
import { getFeaturedEvents } from "./_api/getFeaturedEvents";
import { getAllEvents } from "./_api/getAllEvents";
import { EventSortFilter } from "./_components/EventSortFilter";

interface EventsPageProps {
    searchParams: Promise<{
        page?: string;
        sort?: string;
        column?: string;
    }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
    const t = await getTranslations("pages");
    const resolvedSearchParams = await searchParams;

    const page = parseInt(resolvedSearchParams?.page || "1");
    const sort = resolvedSearchParams?.sort;
    const column = resolvedSearchParams?.column;

    const [
        eventsSlidersData,
        featuredEventsData,
        allEventsData
    ] = await Promise.all([
        getEventsSliders(),
        getFeaturedEvents(),
        getAllEvents({
            page,
            count: 12,
            sort,
            column
        }),
    ])

    return (
        <>
            <div className="mt-4 lg:mt-10">
                <BannerSlider data={eventsSlidersData.sliders} />
            </div>
            <div className="mt-4 lg:mt-10">
                <Carousel
                    slides={featuredEventsData?.data?.map(item => (
                        <BusinessCard
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            start_date={item.start_date}
                            end_date={item.end_date}
                            start_amount={item.amount}
                        />
                    ))}
                    desktopSlidesPerView={3}
                    mobileSlidesPerView={2.3}
                />
            </div>
            <div className="mt-10 container mx-auto px-4">
                <div className="flex items-center gap-2 lg:gap-6">
                    <div className="flex items-center gap-1 lg:gap-2">
                        <Image
                            src={"/images/finybo-icon.png"}
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
                        <EventSortFilter />
                    </div>
                </div>
                <div className="mt-4 lg:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                    {allEventsData?.data?.map(event => (
                        <BusinessCard
                            key={event.id}
                            id={event.id}
                            image={event.image}
                            title={event.title}
                            start_date={event.start_date}
                            end_date={event.end_date}
                            start_amount={event.amount}
                        />
                    ))}
                </div>
                {allEventsData && allEventsData.last_page > 1 && (
                    <Pagination
                        currentPage={allEventsData.current_page}
                        lastPage={allEventsData.last_page}
                        links={allEventsData.links}
                        total={allEventsData.total}
                        routeUrl="/events"
                    />
                )}
            </div>
        </>
    )
}