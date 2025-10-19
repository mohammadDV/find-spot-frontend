import { getFetch } from "@/core/publicService";

export interface CategoryServiceItem {
  id: number;
  title: string;
}

export interface CategoryServicesResponse {
  current_page: number;
  data: CategoryServiceItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; page: number | null; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export async function getCategoryServices(categoryId: number): Promise<CategoryServicesResponse> {
  return getFetch<CategoryServicesResponse>(`/categories/${categoryId}/services`);
}