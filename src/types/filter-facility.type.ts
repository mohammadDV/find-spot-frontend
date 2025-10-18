export interface FilterFacilityItem {
    id: number;
    title: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface FilterFacilityResponse {
    current_page: number;
    data: FilterFacilityItem[];
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

export interface FilterFacilityRequest {
    categories: number[];
}