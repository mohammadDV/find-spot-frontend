import Image from "next/image";
import restaurantImg from "@/assets/images/restaurant.jpg";
import { Button } from "@/ui/button";
import { ArrowLeft2 } from "iconsax-react";
import { useCommonTranslation } from "@/hooks/useTranslation";

export const VerticalPostCard = () => {
  const t = useCommonTranslation();

  return (
    <div className="p-3 pb-1 lg:p-6 rounded-lg lg:rounded-2xl bg-white shadow-card">
      <Image
        src={restaurantImg}
        alt=""
        width={337}
        height={191}
        className="rounded-2xl object-cover h-[137px] lg:h-[191px]"
      />
      <div className="mt-3 lg:mt-6">
        <h3 className="text-2xs lg:text-2xl font-bold text-text">
          بهترین رستوران ایرانی
        </h3>
        <p className="mt-1 lg:my-2.5 text-2xs lg:text-lg text-description">
          دنبال ته‌چین خوشمزه یا دیزی اصیل ایرانی هستی؟ این لیست بهت کمک می‌کنه
          بهترین رستوران‌های ایرانی استانبول رو پیدا کنی.
        </p>
        <Button
          variant={"link"}
          size={"medium"}
          className="!px-0 lg:px-2 text-xs lg:text lg:text-base"
        >
          {t("buttons.readMore")}
          <ArrowLeft2 className="size-4 stroke-primary" />
        </Button>
      </div>
    </div>
  );
};
