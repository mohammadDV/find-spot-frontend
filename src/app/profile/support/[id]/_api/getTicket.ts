import { getFetchAuth } from "@/core/privateService";
import { TicketInfo } from "@/types/support.type";

interface getTicketParams {
    id: string;
}

export async function getTicket({ id }: getTicketParams): Promise<TicketInfo> {
    return await getFetchAuth<TicketInfo>(`/profile/tickets/${id}`);
}