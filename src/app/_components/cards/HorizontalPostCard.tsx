import coffeeImg from "@/assets/images/coffee.jpg"
import { useCommonTranslation } from "@/hooks/useTranslation"
import { Button } from "@/ui/button"
import { ArrowLeft2 } from "iconsax-react"
import Image from "next/image"

export const HorizontalPostCard = () => {
    const t = useCommonTranslation();

    return (
        <div className="p-6 rounded-2xl border-b border-border flex justify-between gap-6">
            <Image src={coffeeImg} alt="" width={308} height={134} className="rounded-2xl object-cover" />
            <div className="flex-1">
                <h3 className="text-text text-2xl font-bold">
                    رستوران ایرانی که باید امتحان کنی
                </h3>
                <p className="my-2.5 text-lg text-description">
                    دنبال ته‌چین خوشمزه یا دیزی اصیل ایرانی هستی؟ این لیست بهت کمک می‌کنه بهترین رستوران‌های ایرانی استانبول رو پیدا کنی.
                </p>
                <Button variant={"link"} size={"medium"}>
                    {t("buttons.readMore")}
                    <ArrowLeft2 className="size-4 stroke-primary" />
                </Button>
            </div>
        </div>
    )
}