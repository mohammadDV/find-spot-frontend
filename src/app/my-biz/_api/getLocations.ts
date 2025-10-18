import { getFetch } from "@/core/publicService";

export const getAreas = async (cityId: number) => {
    return await getFetch(`/areas/${cityId}`);
}

export const getCities = async (countryId: number) => {
    return await getFetch(`/cities/${countryId}`);
}

export const getCityDetails = async (cityId: number) => {
    return await getFetch(`/cities/${cityId}/details`);
}