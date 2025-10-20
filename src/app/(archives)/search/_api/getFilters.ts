import { postFetch } from "@/core/publicService";
import { FilterFacilityResponse, FilterFacilityRequest } from "@/types/filter-facility.type";

export const getFilters = async (categories: number[]): Promise<FilterFacilityResponse> => {
    const requestBody: FilterFacilityRequest = { categories };
    return await postFetch<FilterFacilityResponse>("/categories/filters?count=200", requestBody);
};