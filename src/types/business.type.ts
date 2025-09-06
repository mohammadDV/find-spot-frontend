import { PaginationLink } from "@/app/_components/pagination";

export interface BusinessSummary {
    id: number;
    title: string;
    amount_type: number;
    start_amount: number;
    lat: string;
    long: string;
    image: string;
    rate: number;
    area: {
        id: number;
        title: string;
        image: string | null
    }
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