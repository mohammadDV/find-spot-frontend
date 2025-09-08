import { getFetch } from "@/core/publicService";
import { BusinessResponse } from "@/types/business.type";

interface GetBusinessParams {
    id: string;
}

export async function getBusiness({
    id,
}: GetBusinessParams): Promise<BusinessResponse> {
    return getFetch<BusinessResponse>(`/businesses/${id}`);
}