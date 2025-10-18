import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { Pagination } from "@/app/_components/pagination";
import noFavoritesImg from "@/assets/images/no-favorites.png";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Button } from "@/ui/button";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ProfileNavigation } from "../../_components/navigation";
import { getMyFavorites } from "../_api/getMyFavorites";
import { BusinessesSearchResponse } from './../../../../types/business.type';
import { EventsResponse } from './../../../../types/event.type';

export type FavoriteType = "events" | "businesses"

interface FavoritesPageProps {
    params: Promise<{
        type: FavoriteType;
    }>;
    searchParams: Promise<{
        page?: string;
    }>;
}

type FavoritesResponseMap = {
    businesses: BusinessesSearchResponse;
    events: EventsResponse;
};

export default async function favoritesPage({
    params,
    searchParams,
}: FavoritesPageProps) {
    const isMobile = await isMobileDevice();
    const t = await getTranslations("pages");

    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams?.page || "1");

    const favoritesData = await getMyFavorites<
        FavoritesResponseMap[typeof resolvedParams.type]
    >(resolvedParams.type, { page });

    return (
        <>
            {isMobile && <ProfileNavigation title={t(`profile.favorites.${resolvedParams.type}`)} />}
            {favoritesData.total > 0
                ? (
                    <div className="grid grid-cols-2 gap-4 lg:gap-6">
                        {resolvedParams.type === "businesses" && (
                            (favoritesData as BusinessesSearchResponse).data?.map((favorite) => (
                                <BusinessCard
                                    key={favorite.id}
                                    id={favorite.id}
                                    title={favorite.title}
                                    image={favorite.image}
                                    location={favorite.area?.title}
                                    favoriteMode="businesses"
                                    rate={favorite.rate}
                                    start_amount={favorite.start_amount}
                                />
                            ))
                        )}

                        {resolvedParams.type === "events" && (
                            (favoritesData as EventsResponse).data?.map((favorite) => (
                                <BusinessCard
                                    key={favorite.id}
                                    id={favorite.id}
                                    title={favorite.title}
                                    image={favorite.image}
                                    favoriteMode="events"
                                    start_date={favorite.start_date}
                                    start_amount={favorite.amount}
                                    end_date={favorite.end_date}
                                />
                            ))
                        )}

                        {favoritesData.last_page > 1 && (
                            <Pagination
                                currentPage={favoritesData.current_page}
                                lastPage={favoritesData.last_page}
                                links={favoritesData.links}
                                total={favoritesData.total}
                                routeUrl={`/profile/favorites/${resolvedParams.type}`}
                            />
                        )}
                    </div>
                )
                : (
                    <div className="lg:max-w-xl mx-auto">
                        <Image
                            src={noFavoritesImg}
                            alt="No Favorites"
                            width={331}
                            height={264}
                            className="mx-auto w-2/3 lg:w-auto" />
                        <h3 className="mt-6 lg:mt-8 text-center text-2xl lg:text-3xl text-title font-bold">
                            {t(`profile.favorites.no${resolvedParams.type}`)}
                        </h3>
                        <p className="text-sm lg:text-xl text-title text-center my-6">
                            {t(`profile.favorites.no${resolvedParams.type}Description`)}
                        </p>
                        <Link href={resolvedParams.type ? "/search" : "/events"} className="text-center block">
                            <Button variant={"secondary"} size={"medium"}>
                                {t(`profile.favorites.search${resolvedParams.type}`)}
                            </Button>
                        </Link>
                    </div>
                )}
        </>
    )
}