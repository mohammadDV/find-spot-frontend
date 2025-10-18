import { getFetchAuth } from "@/core/privateService";
import { FavoriteType } from "../[type]/page";

interface GetFavoritesParams {
    page?: number;
    count?: number;
}

export async function getMyFavorites<T>(
    type: FavoriteType,
    { page = 1, count = 8 }: GetFavoritesParams
): Promise<T> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    return getFetchAuth<T>(
        `/profile/${type}/favorite?${searchParams.toString()}`
    );
}