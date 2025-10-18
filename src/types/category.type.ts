export interface Category {
    id: number;
    title: string;
    image: string | null;
    children?: Category[]
}

export interface FilterOption {
    id: number;
    title: string;
    value: string;
}

export interface FiltersResponse {
    data: FilterOption[];
}