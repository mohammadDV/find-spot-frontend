import { MenuItem } from "@/app/profile/_components/sidebar";
import { ArchiveAdd, Edit, Global, I24Support, Messages1 } from "iconsax-react";
import { Settings2 } from "lucide-react";

export const profileMenuData: MenuItem[] = [
    {
        id: 1,
        title: "کسب و کار من",
        icon: Global,
        link: "/profile/biz"
    },
    {
        id: 2,
        title: "ثبت کسب و کار جدید",
        icon: Edit,
        link: "/my-biz/create"
    },
    {
        id: 3,
        title: "نظرات",
        icon: Messages1,
        link: "/profile/reviews"
    },
    {
        id: 4,
        title: "کسب و کارهای ذخیره شده",
        icon: ArchiveAdd,
        link: "/profile/favorites/businesses"
    },
    {
        id: 5,
        title: "رویدادهای ذخیره شده",
        icon: ArchiveAdd,
        link: "/profile/favorites/events"
    },
    {
        id: 6,
        title: "پشتیبانی",
        icon: I24Support,
        link: "/profile/support"
    },
    {
        id: 7,
        title: "تغییر رمز عبور",
        icon: Settings2,
        link: "/profile/change-password"
    },
]