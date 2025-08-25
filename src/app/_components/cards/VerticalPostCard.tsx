import Image from "next/image"
import restaurantImg from "@/assets/images/restaurant.jpg";
import { Button } from "@/ui/button";
import { ArrowLeft2 } from "iconsax-react";
import { useCommonTranslation } from "@/hooks/useTranslation";

export const VerticalPostCard = () => {
    const t = useCommonTranslation();

    return (
        <div className="p-6 rounded-2xl bg-white shadow-card">
            <Image src={restaurantImg} alt="" width={337} height={191} className="rounded-2xl object-cover" />
            <div className="mt-6">
                <h3 className="text-2xl font-bold text-text">
                    بهترین رستوران ایرانی
                </h3>
                <p className="my-2.5 text-lg text-description">
                    دنبال ته‌چین خوشمزه یا دیزی اصیل ایرانی هستی؟ این لیست بهت کمک می‌کنه بهترین رستوران‌های ایرانی استانبول رو پیدا کنی.
                </p>
                <Button variant={"link"} size={"medium"}>
                    {t("buttons.more")}
                    <ArrowLeft2 className="size-4 stroke-primary" />
                </Button>
            </div>
        </div>
    )
}