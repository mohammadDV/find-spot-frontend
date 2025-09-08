import { getFetch } from "@/core/publicService";
import { EventsResponse } from "@/types/event.type";

interface GetAllEventsParams {
    page?: number;
    count?: number;
    sort?: string;
    column?: string;
}

export async function getAllEvents({
    page = 1,
    count = 10,
    sort,
    column
}: GetAllEventsParams): Promise<EventsResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    if (sort) searchParams.set("sort", sort);
    if (column) searchParams.set("column", column);

    return getFetch<EventsResponse>(
        `/events?${searchParams.toString()}`
    );
}