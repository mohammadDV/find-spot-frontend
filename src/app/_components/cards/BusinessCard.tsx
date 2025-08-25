import Image from "next/image"
import Link from "next/link"
import cardThumbnail from "@/assets/images/card-thumbnail.png";
import { Location } from "iconsax-react";
import Star from "@/ui/star";

export const BusinessCard = () => {
    return (
        <Link href={"/"} className="overflow-hidden rounded-3xl bg-white shadow-card">
            <Image src={cardThumbnail} alt="" width={400} height={283} className="rounded-t-3xl" />
            <div className="p-6">
                <h3 className="text-title font-semibold">
                    لباس فروشی احمد بی
                </h3>
                <div className="flex items-center gap-2 my-2">
                    <Location className="stroke-title size-6" />
                    <p className="text-xs text-title">
                        عومرانیه، چارشی
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => <Star key={i} size="medium" />)}
                    </div>
                    <p className="text-xs text-description">
                        (2.5 از مجموع 128 امتیاز)
                    </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-title">
                        شروع قیمت از:
                    </p>
                    <p className="text-primary">
                        200
                        <span className="font-semibold mr-1">
                            لیر
                        </span>
                    </p>
                </div>
            </div>
        </Link>
    )
}