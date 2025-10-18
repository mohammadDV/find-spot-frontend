import { getFetch } from "@/core/publicService";
import { Event } from "@/types/event.type";

interface GetEventParams {
    id: string;
}

export async function getEvent({
    id,
}: GetEventParams): Promise<Event> {
    return getFetch<Event>(`/events/${id}`);
}