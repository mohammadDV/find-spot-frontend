import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getTranslations } from "next-intl/server";
import { ProfileNavigation } from "../_components/navigation";
import { getMyReviews } from "./_api/getMyReviews";
import { ReviewCard } from "@/app/_components/cards/ReviewCard";
import { Pagination } from "@/app/_components/pagination";
import noReviewsImg from "@/assets/images/no-reviews.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/ui/button";

interface MyReviewsPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function MyReviewsPage({ searchParams }: MyReviewsPageProps) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();
    const resolvedSearchParams = await searchParams;

    const page = parseInt(resolvedSearchParams?.page || "1");
    const reviewsData = await getMyReviews({ page })

    return (
        <>
            {isMobile && <ProfileNavigation title={t("profile.myReviews.title")} />}
            {reviewsData.total > 0
                ? (
                    <div className="flex flex-col gap-6">
                        {reviewsData.data?.map(review => (
                            <ReviewCard key={review.id} review={review} enableDeactivation />
                        ))}
                        {reviewsData.last_page > 1 && (
                            <Pagination
                                currentPage={reviewsData.current_page}
                                lastPage={reviewsData.last_page}
                                links={reviewsData.links}
                                total={reviewsData.total}
                                routeUrl={`/profile/reviews`}
                            />
                        )}
                    </div>
                )
                : (
                    <div className="lg:max-w-xl mx-auto">
                        <Image
                            src={noReviewsImg}
                            alt="No Reviews"
                            width={331}
                            height={302}
                            className="mx-auto w-2/3 lg:w-auto" />
                        <h3 className="mt-6 lg:mt-8 text-center text-2xl lg:text-3xl text-title font-bold">
                            {t("profile.myReviews.noReviews")}
                        </h3>
                        <p className="text-sm lg:text-xl text-title text-center my-6">
                            {t("profile.myReviews.noReviewsDescription")}
                        </p>
                        <Link href={"/search"} className="text-center block">
                            <Button variant={"secondary"} size={"medium"}>
                                {t("profile.myReviews.submitFirst")}
                            </Button>
                        </Link>
                    </div>
                )}
        </>
    )
}