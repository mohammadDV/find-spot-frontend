import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn, createFileUrl } from "@/lib/utils";
import { BusinessSummary } from "@/types/business.type";
import { Badge } from "@/ui/badge";
import Star from "@/ui/star";
import { Location } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

interface SearchCardProps {
  data: BusinessSummary;
}

export const SearchCard = ({ data }: SearchCardProps) => {
  const t = useCommonTranslation();

  return (
    <Link
      href={`/biz/${data.id}`}
      className="hover:bg-white overflow-hidden transition-all block lg:p-6 lg:border-b shadow-card lg:shadow-none rounded-lg lg:rounded-none border-border lg:flex gap-6">
      <Image
        src={createFileUrl(data.image)}
        alt=""
        width={308}
        height={184}
        className="lg:rounded-2xl object-cover w-full lg:w-[308px] h-[107px] lg:h-[184px]"
      />
      <div className="flex flex-col gap-2.5 p-3 lg:p-0">
        <h3 className="text-title font-bold line-clamp-1">{data.title}</h3>
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className={cn("size-3 lg:size-4", index < data.rate ? "fill-warning" : "fill-border")} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Location className="stroke-title size-3 lg:size-6" />
          <p className="text-2xs lg:text-xs text-title">{data.area.title}</p>
        </div>
        <p className="text-description text-2xs lg:text-lg lg:leading-6 line-clamp-2">
          {data.description}
        </p>
        <div className="flex items-center flex-wrap gap-2">
          {data.tags?.map(tag => (
            <Badge key={tag.id} variant={"secondary"}>{tag.title}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-2xs lg:text-sm text-title">{t("currency.startAmount")}</p>
          <p className="text-primary text-2xs lg:text-base">
            {data.start_amount}
            <span className="font-semibold mr-1">{t("currency.lira")}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
