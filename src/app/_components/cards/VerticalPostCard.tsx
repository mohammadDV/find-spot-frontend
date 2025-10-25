import Image from "next/image";
import restaurantImg from "@/assets/images/restaurant.jpg";
import { Button } from "@/ui/button";
import { ArrowLeft2 } from "iconsax-react";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { Post } from "@/types/post.type";
import Link from "next/link";
import { createFileUrl } from "@/lib/utils";

interface VerticalPostCardProps {
  data: Post;
}

export const VerticalPostCard = ({ data }: VerticalPostCardProps) => {
  const t = useCommonTranslation();

  return (
    <Link href={`/post/${data.id}`} className="block p-3 pb-1 lg:p-6 rounded-lg lg:rounded-2xl bg-white shadow-card">
      <Image
        src={createFileUrl(data.image!)}
        alt=""
        width={337}
        height={191}
        className="rounded-2xl object-cover w-full h-[137px] lg:h-[203px]"
      />
      <div className="mt-3 lg:mt-6">
        <h3 className="text-sm lg:text-lg text-center lg:text-right font-bold text-text line-clamp-1">
          {data.title}
        </h3>
        <p className="mt-1 lg:my-2.5 text-xs lg:text-base text-center lg:text-right text-description line-clamp-3">
          {data.summary}
        </p>
        <Button
          variant={"link"}
          size={"medium"}
          className="!px-0 lg:px-2 text-xs lg:text justify-center w-full lg:justify-start lg:text-base"
        >
          {t("buttons.readMore")}
          <ArrowLeft2 className="size-4 stroke-primary" />
        </Button>
      </div>
    </Link>
  );
};
