import Image from "next/image";
import Link from "next/link";
import cardThumbnail from "@/assets/images/card-thumbnail.png";
import { Location } from "iconsax-react";
import Star from "@/ui/star";

export const BusinessCard = () => {
  return (
    <Link
      href={"/"}
      className="block overflow-hidden rounded-lg lg:rounded-3xl bg-white shadow-card"
    >
      <Image
        src={cardThumbnail}
        alt=""
        width={400}
        height={283}
        className="rounded-t-lg lg:rounded-t-3xl w-full lg:aspect-3/2 object-cover"
      />
      <div className="p-3 lg:p-6">
        <h3 className="text-title font-semibold text-2xs lg:text-base">
          لباس فروشی احمد بی
        </h3>
        <div className="flex items-center gap-2 mt-3 mb-1 lg:my-2">
          <Location className="stroke-title size-3 lg:size-6" />
          <p className="text-2xs lg:text-xs text-title">عومرانیه، چارشی</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-3 lg:size-4" />
            ))}
          </div>
          <p className="text-2xs lg:text-xs text-description">
            (از ۱۲۸ امتیاز)
          </p>
        </div>
        <div className="flex items-center justify-between mt-3 lg:mt-4">
          <p className="text-2xs lg:text-sm text-title">شروع قیمت از:</p>
          <p className="text-primary text-2xs lg:text-base">
            200
            <span className="font-semibold mr-1">لیر</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
