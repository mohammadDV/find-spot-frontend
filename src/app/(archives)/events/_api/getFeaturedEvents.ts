import { StatusCode } from "@/constants/enums";
import { getFetch } from "@/core/publicService";
import { EventSummary } from "@/types/event.type";

interface FeaturedEventsResponse {
    status: StatusCode;
    data: EventSummary[],
}

export async function getFeaturedEvents(): Promise<FeaturedEventsResponse> {
    return await getFetch<FeaturedEventsResponse>("/events/featured");
}
