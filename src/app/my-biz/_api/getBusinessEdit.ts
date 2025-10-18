import { getFetchAuth } from "@/core/privateService";
import { BusinessEditResponse } from "@/types/business.type";

interface GetBusinessParams {
  id: string;
}

export async function getBusinessEdit({
  id,
}: GetBusinessParams): Promise<BusinessEditResponse> {
  return getFetchAuth<BusinessEditResponse>(`/profile/businesses/${id}/edit`);
}
