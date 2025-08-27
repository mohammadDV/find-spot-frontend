import coffeeImg from "@/assets/images/coffee.jpg";
import { Badge } from "@/ui/badge";
import Star from "@/ui/star";
import { Location } from "iconsax-react";
import Image from "next/image";

export const SearchCard = () => {
    return (
        <div className="hover:bg-white transition-all p-6 border-b border-border flex gap-6">
            <Image src={coffeeImg} alt="" width={308} height={184} className="rounded-2xl object-cover" />
            <div className="flex flex-col gap-2.5">
                <h3 className="text-title font-bold">
                    رستوران مهمت افندی
                </h3>
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
                <div className="flex items-center gap-2">
                    <Location className="stroke-title size-3 lg:size-6" />
                    <p className="text-2xs lg:text-xs text-title">عومرانیه، چارشی</p>
                </div>
                <p className="text-description text-lg leading-6">
                    دنبال ته‌چین خوشمزه یا دیزی اصیل ایرانی هستی؟ این لیست بهت کمک می‌کنه بهترین رستوران‌های ایرانی استانبول رو پیدا کنی.
                </p>
                <div className="flex items-center gap-2">
                    <Badge variant={"secondary"}>
                        قهوه
                    </Badge>
                    <Badge variant={"secondary"}>
                        کباب
                    </Badge>
                    <Badge variant={"secondary"}>
                        دسر ترکی
                    </Badge>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-2xs lg:text-sm text-title">شروع قیمت از:</p>
                    <p className="text-primary text-2xs lg:text-base">
                        200
                        <span className="font-semibold mr-1">لیر</span>
                    </p>
                </div>
            </div>
        </div>
    )
}