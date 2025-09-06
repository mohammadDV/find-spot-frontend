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