import { HorizontalPostCard } from "@/app/_components/cards/HorizontalPostCard";
import { VerticalPostCard } from "@/app/_components/cards/VerticalPostCard";
import { Pagination } from "@/app/_components/pagination";
import { TitleSection } from "@/app/_components/titleSection";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getPopularPosts } from "./_api/getPopularPosts";
import { getPosts } from "./_api/getPosts";

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();

    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams?.page || "1");

    const [
        postsData,
        popularPostsData
    ] = await Promise.all([
        getPosts({ page }),
        getPopularPosts({})
    ])

    return (
        <>
            <div className="mt-1.5 lg:mt-10 container mx-auto px-4">
                <TitleSection title={t("blog.title")} />
                <div className="mt-1.5 lg:mt-10 flex flex-col lg:flex-row items-start justify-between gap-6">
                    <div className="hidden lg:block lg:w-1/3 sticky top-28">
                        <div className="p-6 rounded-2xl bg-white shadow-card">
                            <h2 className="text-text text-2xl font-bold mb-3">
                                {t("blog.mostViews")}
                            </h2>
                            <div className="flex flex-col gap-2">
                                {popularPostsData.data?.map(post => (
                                    <Link key={post.id} href={`/post/${post.id}`} className="text-description text-lg hover:text-primary">
                                        {post.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-3/4">
                        <div className="flex flex-col gap-3 lg:gap-6">
                            {isMobile
                                ? postsData?.data?.map(post => (
                                    <VerticalPostCard key={post.id} data={post} />
                                ))
                                : postsData?.data?.map(post => (
                                    <HorizontalPostCard key={post.id} data={post} />
                                ))}
                        </div>
                        {postsData && postsData.last_page > 1 && (
                            <Pagination
                                currentPage={postsData.current_page}
                                lastPage={postsData.last_page}
                                links={postsData.links}
                                total={postsData.total}
                                routeUrl="/blog"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}