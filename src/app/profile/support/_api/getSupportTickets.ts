import { getFetchAuth } from "@/core/privateService";
import { TicketsResponse } from "@/types/support.type";

interface GetSupportTicketsParams {
    page?: number;
    count?: number;
}

export async function getSupportTickets({
    page = 1,
    count = 8,
}: GetSupportTicketsParams): Promise<TicketsResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        count: count.toString(),
    });
    return await getFetchAuth<TicketsResponse>(
        `/profile/tickets?${params.toString()}`
    );
}