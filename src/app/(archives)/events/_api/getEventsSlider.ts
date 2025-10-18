import { getFetch } from "@/core/publicService";
import { EventsSlidersResponse } from "@/types/event.type";

export async function getEventsSliders(): Promise<EventsSlidersResponse> {
    return await getFetch<EventsSlidersResponse>("/events/sliders");
}
