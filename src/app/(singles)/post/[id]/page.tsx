import { createFileUrl } from "@/lib/utils";
import Image from "next/image";
import { getPost } from "../_api/getPost";

interface PostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const resolvedParams = await params;
    const postData = await getPost(resolvedParams.id);

    return (
        <div className="max-w-6xl mx-auto px-4 mt-4 lg:mt-10">
            <h1 className="lg:text-[40px] font-bold text-title">
                {postData.title}
            </h1>
            {(postData.video || postData.image) && (
                <div>
                    {postData.video ? (
                        <div className="aspect-video w-full rounded-2xl object-cover my-2 lg:my-6 overflow-hidden">
                            <video
                                src={createFileUrl(postData.video)}
                                controls
                                className="w-full h-full object-cover"
                                poster={createFileUrl(postData.video!) || undefined}
                            >
                            </video>
                        </div>
                    ) : postData.image && (
                        <Image src={createFileUrl(postData.image!)} alt="" width={1188} height={411} className="w-full rounded-2xl object-cover my-2 lg:my-6" />
                    )}
                </div>
            )}
            <p className="text-xs lg:text-lg text-title">
                {postData.content}
            </p>
        </div>
    )
}