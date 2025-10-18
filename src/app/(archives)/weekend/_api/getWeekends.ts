import { StatusCode } from "@/constants/enums";
import { getFetch } from "@/core/publicService";
import { BusinessSummary } from "@/types/business.type";

export interface WeekendsResponse {
    status: StatusCode;
    data: {
        [key: string]: {
            title: string;
            businesses: BusinessSummary[];
        }
    }
}

export async function getWeekends(): Promise<WeekendsResponse> {
    return await getFetch<WeekendsResponse>("/weekends");
}