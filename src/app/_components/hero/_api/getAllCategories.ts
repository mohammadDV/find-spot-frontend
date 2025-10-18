import { getFetch } from "@/core/publicService";
import { Category } from "@/types/category.type";

export async function getAllCategories(): Promise<Category[]> {
    return getFetch<Category[]>("/all-categories");
}