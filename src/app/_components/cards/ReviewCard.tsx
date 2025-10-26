"use client";

import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { cn, createFileUrl } from "@/lib/utils";
import { Review } from "@/types/review.type";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Star } from "@/ui/star";
import { Like1, TickCircle, Trash } from "iconsax-react";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { reviewChangeStatus } from "./reviewChangeStatus";
import { LikeStatus, StatusCode } from "@/constants/enums";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { likeReviewAction } from "@/app/(singles)/biz/_api/likeReviewAction";

interface ReviewCardProps {
    review: Review;
    enableLike?: boolean;
    enableDeactivation?: boolean
}

export const ReviewCard = ({ review, enableLike, enableDeactivation }: ReviewCardProps) => {
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [likeLoading, setLikeLoading] = useState<boolean>(false);
    const [likeActive, setLikeActive] = useState<LikeStatus | null>(null);

    const imageFiles = review.files
        ?.filter(file => file.type === "image")
        .map(file => ({
            src: createFileUrl(file.path),
            alt: `Review image ${file.id}`
        })) || [];

    const changeStatusHandler = async () => {
        setIsLoading(true);
        try {
            const res = await reviewChangeStatus(review.id);
            if (res.status === StatusCode.Success) {
                router.refresh();
            }
        } catch (error) {
            tCommon("messages.dataProblem")
        } finally {
            setIsLoading(false);
        }
    }

    const likeHandler = async () => {
        if (!enableLike) return;
        setLikeLoading(true);
        try {
            const res = await likeReviewAction(review.id);
            if (res.status === StatusCode.Success) {
                setLikeActive(res.active);
                toast.success(res.message);
                router.refresh();
            } else {
                toast.error(tCommon("messages.error"));
            }
        } catch (error) {
            toast.error(tCommon("messages.error"));
        } finally {
            setLikeLoading(false);
        }
    }

    return (
        <div className={cn("p-3 lg:p-6 border-b border-border", review.status === "cancelled" && "bg-red-50")}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <Image
                        src={createFileUrl(review.user.profile_photo_path!) || "/images/default-avatar.png"}
                        alt=""
                        width={57}
                        height={57}
                        className="rounded-full"
                    />
                    <div className="flex flex-col gap-1.5">
                        <p className="text-title font-medium">{review.user.nickname}</p>
                        <p className="text-title text-xs">{review.user.point || 0} {tPages("profile.myReviews.comment")}</p>
                    </div>
                </div>
                {enableLike && (
                    <Button variant={"link"} size={"small"} className="!px-2" onClick={likeHandler} disabled={likeLoading}>
                        {tPages("biz.likeComment")}
                        <Like1 className={cn("size-4", likeActive === LikeStatus.Active ? "fill-primary stroke-primary" : "stroke-primary")} />
                    </Button>
                )}
                {enableDeactivation && (
                    <Button
                        variant={"link"}
                        size={"small"}
                        onClick={changeStatusHandler}
                        disabled={isLoading}
                        className={cn("!px-2", review.status === "cancelled" ? "text-primary" : "text-secondary")}>
                        {review.status === "cancelled"
                            ? tPages("profile.myReviews.activate")
                            : tPages("profile.myReviews.deactivate")}
                        {review.status === "cancelled"
                            ? <TickCircle className="stroke-primary size-4" />
                            : <Trash className="stroke-secondary size-4" />}
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2 mt-3 lg:mt-6">
                <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star
                            key={index}
                            className={cn("size-4", index < review.rate ? "fill-warning" : "fill-border")}
                        />
                    ))}
                </div>
                <p className="text-xs text-description">
                    {review.created_at}
                </p>
            </div>
            <p className="my-2.5 text-xs lg:text-lg text-description">
                {review.comment}
            </p>
            {review.quality_services && review.quality_services.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                    {review.quality_services.map((service, index) => (
                        <Badge key={index} variant={"secondary"} className="text-xs lg:text-sm">
                            {service.title}
                        </Badge>
                    ))}
                </div>
            )}
            {imageFiles.length > 0 && (
                <>
                    <div
                        className="grid grid-cols-4 gap-2 lg:gap-4 mt-3 lg:mt-6 cursor-pointer"
                        onClick={() => setLightboxOpen(true)}
                    >
                        {imageFiles.slice(0, 3).map((file, index) => (
                            <Image
                                key={index}
                                src={file.src}
                                alt={file.alt}
                                width={177}
                                height={127}
                                className="w-full rounded-sm h-[87px] lg:h-[137px] object-cover hover:opacity-80 transition-opacity"
                            />
                        ))}
                        {imageFiles.length > 3 && (
                            <div className="w-full relative rounded-sm overflow-hidden hover:opacity-80 transition-opacity">
                                <div className="absolute inset-0 bg-black/40"></div>
                                <Image
                                    src={imageFiles[3].src}
                                    alt={imageFiles[3].alt}
                                    width={177}
                                    height={127}
                                    className="w-full rounded-sm h-[87px] lg:h-[137px] object-cover"
                                />
                                <p className="flex absolute h-full top-0 w-full z-10 items-center justify-center font-bold text-2xl text-white">
                                    +{imageFiles.length - 3}
                                </p>
                            </div>
                        )}
                    </div>

                    <Lightbox
                        open={lightboxOpen}
                        close={() => setLightboxOpen(false)}
                        slides={imageFiles}
                        render={{
                            buttonPrev: imageFiles.length <= 1 ? () => null : undefined,
                            buttonNext: imageFiles.length <= 1 ? () => null : undefined,
                        }}
                    />
                </>
            )}
        </div>
    );
};