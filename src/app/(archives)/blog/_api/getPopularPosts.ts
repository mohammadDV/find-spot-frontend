import { getFetch } from "@/core/publicService";
import { PostsResponse } from "@/types/post.type";

interface GetPopularPostsParams {
    page?: number;
    count?: number;
}

export async function getPopularPosts({
    page = 1,
    count = 8,
}: GetPopularPostsParams): Promise<PostsResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    return getFetch<PostsResponse>(
        `/posts/popular?${searchParams.toString()}`
    );
}