import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn, createFileUrl } from "@/lib/utils";
import Star from "@/ui/star";
import { Calendar, Location } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

interface BusinessCardProps {
  id: number;
  title: string;
  start_amount?: number;
  image: string | null;
  rate?: number;
  location?: string;
  start_date?: string;
  end_date?: string;
}

export const BusinessCard = ({
  id,
  title,
  image,
  location,
  rate,
  start_amount,
  start_date,
  end_date
}: BusinessCardProps) => {
  const t = useCommonTranslation();

  return (
    <Link
      href={start_date ? `/event/${id}` : `/biz/${id}`}
      className="block overflow-hidden rounded-lg lg:rounded-3xl bg-white shadow-card"
    >
      <Image
        src={createFileUrl(image!)}
        alt=""
        width={400}
        height={283}
        className="rounded-t-lg lg:rounded-t-3xl w-full lg:aspect-3/2 object-cover"
      />
      <div className="p-3 lg:p-6">
        <h3 className="text-title font-semibold text-2xs mb-2.5 lg:text-base line-clamp-1">
          {title}
        </h3>
        {start_date && <div className="flex items-center gap-2 mb-1 lg:my-2">
          <Calendar className="stroke-title size-3 lg:size-6" />
          <p className="text-2xs lg:text-xs text-title">{start_date + " تا " + end_date}</p>
        </div>}
        {location && <div className="flex items-center gap-2 mb-1 lg:my-2">
          <Location className="stroke-title size-3 lg:size-6" />
          <p className="text-2xs lg:text-xs text-title">{location}</p>
        </div>}
        {(rate != null && rate != undefined) && <div className="flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className={cn("size-3 lg:size-4", index < rate ? "fill-warning" : "fill-border")} />
            ))}
          </div>
        </div>}
        {(start_amount !== null && start_amount !== undefined) && <div className="flex items-center justify-between mt-3 lg:mt-4">
          <p className="text-2xs lg:text-sm text-title">{t("currency.startAmount")}</p>
          <p className="text-primary text-2xs lg:text-base">
            {start_amount > 0
              ? (
                <>{start_amount} {t("currency.lira")}</>
              )
              : (
                t("currency.free")
              )}
          </p>
        </div>}
      </div>
    </Link>
  );
};
