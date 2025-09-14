import { getFetch } from "@/core/publicService";
import { Post } from "@/types/post.type";

export async function getPost(id: string): Promise<Post> {
    return await getFetch<Post>(`/post/${id}`);
}