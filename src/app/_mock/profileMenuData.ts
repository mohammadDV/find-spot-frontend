import { ArchiveAdd, I24Support, Messages } from "iconsax-react";
import { MenuItem } from "../profile/_components/sidebar";
import { Settings2 } from "lucide-react";

export const profileMenuData: MenuItem[] = [
    {
        id: 1,
        title: "کسب و کار من",
        icon: Messages,
        link: "/profile/biz"
    },
    {
        id: 2,
        title: "نظرات",
        icon: Messages,
        link: "/profile/reviews"
    },
    {
        id: 3,
        title: "کسب و کارهای ذخیره شده",
        icon: ArchiveAdd,
        link: "/profile/saved-biz"
    },
    {
        id: 4,
        title: "رویدادهای ذخیره شده",
        icon: ArchiveAdd,
        link: "/profile/saved-events"
    },
    {
        id: 5,
        title: "پشتیبانی",
        icon: I24Support,
        link: "/profile/support"
    },
    {
        id: 6,
        title: "تنظیمات",
        icon: Settings2,
        link: "/profile/settings"
    },
]