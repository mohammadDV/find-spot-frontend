import { getFetch } from "@/core/publicService";
import { PostsResponse } from "@/types/post.type";

interface GetPostsParams {
    page?: number;
    count?: number;
}

export async function getPosts({
    page = 1,
    count = 8,
}: GetPostsParams): Promise<PostsResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    return getFetch<PostsResponse>(
        `/posts?${searchParams.toString()}`
    );
}