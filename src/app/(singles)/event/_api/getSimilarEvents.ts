import { getFetch } from "@/core/publicService";
import { EventSummary } from "@/types/event.type";

interface GetSimilarEventsParams {
    id: string;
}

export async function getSimilarEvents({
    id,
}: GetSimilarEventsParams): Promise<EventSummary[]> {
    return getFetch<EventSummary[]>(`/events/${id}/similar`);
}