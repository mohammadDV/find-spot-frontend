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

export interface SearchSuggestionsResponse {
    businesses: BusinessSummary[];
    categories: Category[];
}

export interface BusinessEditResponse {
    id: number;
    title: string;
    description: string;
    point: number;
    rate: number;
    lat: string;
    long: string;
    website: string | null;
    facebook: string | null;
    instagram: string | null;
    youtube: string | null;
    tiktok: string | null;
    whatsapp: string | null;
    phone: string;
    email: string;
    address: string;
    start_amount: number;
    amount_type: number;
    image: string;
    menu_image: string | null;
    slider_image: string | null;
    video: string | null;
    from_monday: number;
    from_tuesday: number;
    from_wednesday: number;
    from_thursday: number;
    from_friday: number;
    from_saturday: number;
    from_sunday: number;
    to_monday: number;
    to_tuesday: number;
    to_wednesday: number;
    to_thursday: number;
    to_friday: number;
    to_saturday: number;
    to_sunday: number;
    active: number;
    status: string;
    vip: boolean;
    priority: number;
    country_id: number;
    city_id: number;
    area_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    categories: Array<{
        id: number;
        title: string;
        pivot: {
            business_id: number;
            category_id: number;
        };
    }>;
    area: {
        id: number;
        title: string;
        image: string | null;
        status: number;
        city_id: number;
        created_at: string;
        updated_at: string;
        priority: number;
        city: {
            id: number;
            title: string;
            status: number;
            priority: number;
            country_id: number;
            created_at: string;
            updated_at: string;
            country: {
                id: number;
                title: string;
                image: string | null;
                status: number;
                created_at: string;
                updated_at: string;
                priority: number;
            };
        };
    };
    tags: Array<{
        id: number;
        business_id: number;
        title: string;
        status: number;
        created_at: string;
        updated_at: string;
    }>;
    facilities: Array<{
        id: number;
        title: string;
        pivot: {
            business_id: number;
            facility_id: number;
        };
    }>;
    filters: Array<{
        id: number;
        title: string;
        pivot: {
            business_id: number;
            filter_id: number;
        };
    }>;
    files: Array<{
        id: number;
        business_id: number;
        path: string;
        type: string;
        status: number;
        created_at: string;
        updated_at: string;
        priority: number;
    }>;
}