import { PaginationLink } from "@/app/_components/pagination";
import { QualityService } from "./business.type";
import { FileType } from "./file.type";
import { UserInfo } from "./user.type";

export type ReviewStatus = 'approved' | "cancelled";

export interface Review {
    id: number;
    comment: string;
    rate: number;
    status: ReviewStatus;
    business_id: number;
    owner_id: number | null;
    user_id: number;
    user: UserInfo;
    files: FileType[];
    likes_count: number;
    dislikes_count: number;
    quality_services: QualityService[];
    created_at: string;
}

export interface ReviewsResponse {
    current_page: number;
    data: Review[];
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