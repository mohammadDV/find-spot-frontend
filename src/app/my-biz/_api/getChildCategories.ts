import { getFetch } from "@/core/publicService";
import { Category } from "@/types/category.type";

export const getChildCategories = async (parentId: number): Promise<Category[]> => {
    return await getFetch<Category[]>(`/categories/${parentId}/children`);
}