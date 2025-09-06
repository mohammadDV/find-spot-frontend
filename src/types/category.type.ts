export interface Category {
    id: number;
    title: string;
    image: string | null;
    children?: Category[]
}