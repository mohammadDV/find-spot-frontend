import { getFetch } from "@/core/publicService";
import { BusinessSummary } from "@/types/business.type";

interface GetSimilarBusinessesParams {
    id: string;
}

export async function getSimilarBusinesses({
    id,
}: GetSimilarBusinessesParams): Promise<BusinessSummary[]> {
    return getFetch<BusinessSummary[]>(`/businesses/${id}/similar`);
}