import { PaginationLink } from "@/app/_components/pagination";

export interface EventSummary {
    id: number;
    title: string;
    summary: string;
    start_date: string;
    end_date: string;
    link: string;
    amount: number;
    lat: string;
    long: string;
    image: string;
}

export interface Event {
    id: number;
    title: string;
    summary: string | null;
    information: string | null;
    description: string | null;
    link: string | null;
    address: string | null;
    amount: number;
    lat: string;
    long: string;
    image: string | null;
    video: string | null;
    website: string | null;
    facebook: string | null;
    instagram: string | null;
    whatsapp: string | null;
    youtube: string | null;
    start_date: string;
    end_date: string;
    slider_image: string | null;
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