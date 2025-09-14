import { PaginationLink } from "@/app/_components/pagination";
import { Category } from "./category.type";
import { FileType } from "./file.type";

export type BusinessType = "approved";

export type BusinessOption = {
    id: number;
    title: string
}

export type QualityService = {
    title: string;
    count: number;
}

export type ReviewType = {
    title: string;
    rate: number;
    count: number;
    percentage: number;
}

export interface BusinessSummary {
    id: number;
    title: string;
    amount_type: number;
    start_amount: number;
    lat: string;
    long: string;
    image: string;
    rate: number;
    description: string | null;
    area: {
        id: number;
        title: string;
        image: string | null
    },
    tags: BusinessOption[];
}

export interface Business {
    id: number;
    title: string;
    type?: null;
    address?: string;
    phone?: string;
    email?: string;
    from_monday?: number;
    to_monday?: number;
    from_tuesday?: number;
    to_tuesday?: number;
    from_wednesday?: number;
    to_wednesday?: number;
    from_thursday?: number;
    to_thursday?: number;
    from_friday?: number;
    to_friday?: number;
    from_saturday?: number;
    to_saturday?: number;
    from_sunday?: number;
    to_sunday?: number;
    country_id: number;
    city_id: number;
    path_type?: null;
    amount_type: number;
    start_amount: number;
    end_amount?: number | null;
    lat: string;
    long: string;
    website: string | null;
    facebook: string | null;
    instagram: string | null;
    image: string | null;
    status: BusinessType;
    description: string;
    vip: boolean;
    menu_image: string | null;
    video: string | null;
    rate: number;
    reviews_count: number;
    opening_hours: string;
    area: {
        id: number;
        title: string;
        image: string | null;
        city: any
    },
    categories: Category[];
    filters: any;
    files: FileType[];
    tags: BusinessOption[];
    facilities: BusinessOption[];
}

export interface BusinessResponse {
    business: Business;
    quality_services: QualityService[];
    reviews: ReviewType[];
}

export interface BusinessesSearchResponse {
    current_page: number;
    data: BusinessSummary[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}