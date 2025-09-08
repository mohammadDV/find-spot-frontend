import { PaginationLink } from "@/app/_components/pagination";

export interface EventSummary {
    id: number;
    title: string;
    summary: string;
    start_date: string;
    end_date: string;
    link: string;
    amount: string;
    lat: string;
    long: string;
    image: string;
}

export interface EventsSlidersResponse {
    sliders: Array<EventSummary>,
    recommended: Array<EventSummary>,
}

export interface EventsResponse {
    current_page: number;
    data: EventSummary[];
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