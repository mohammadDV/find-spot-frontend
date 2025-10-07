import { getFetch } from "@/core/publicService";
import { FiltersResponse } from "@/types/category.type";

export const getFilters = async (categoryId: number): Promise<FiltersResponse> => {
    return await getFetch(`/categories/${categoryId}/filters`);
}

export const getFacilities = async (categoryId: number): Promise<FiltersResponse> => {
    return await getFetch(`/categories/${categoryId}/facilities`);
}