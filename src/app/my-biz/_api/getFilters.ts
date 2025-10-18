import { postFetch } from "@/core/publicService";
import { FilterFacilityResponse, FilterFacilityRequest } from "@/types/filter-facility.type";

export const getFilters = async (categories: number[]): Promise<FilterFacilityResponse> => {
    const requestBody: FilterFacilityRequest = { categories };
    return await postFetch(`/categories/filters`, requestBody);
}

export const getFacilities = async (categories: number[]): Promise<FilterFacilityResponse> => {
    const requestBody: FilterFacilityRequest = { categories };
    return await postFetch(`/categories/facilities`, requestBody);
}