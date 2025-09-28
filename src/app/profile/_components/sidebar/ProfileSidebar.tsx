"use client"

import { profileMenuData } from "@/app/_mock/profileMenuData";
import { cn, createFileUrl } from "@/lib/utils";
import { UserData } from "@/types/user.type";
import { ArrowLeft2, Edit } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileSidebarProps {
    userData?: UserData | null;
}

export interface MenuItem {
    id: number;
    title: string;
    icon: React.ElementType;
    link?: string;
}

export const ProfileSidebar = ({ userData }: ProfileSidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="lg:w-[473px] lg:shrink-0 mt-4 lg:mt-0">
            <div className="shadow-card bg-white rounded-xl p-6 flex items-center justify-between">
                <div className="flex-1 flex items-center gap-2.5 p-2">
                    <img
                        src={userData?.user?.profile_photo_path
                            ? createFileUrl(userData?.user?.profile_photo_path)
                            : undefined}
                        alt=""
                        width={56}
                        height={56}
                        className="size-14 rounded-full"
                    />
                    <div className="flex flex-col gap-2.5">
                        <p className="text-title text-sm">
                            {userData?.user?.nickname}
                        </p>
                        <p className="text-description text-xs">
                            {userData?.customer_number}
                        </p>
                    </div>
                </div>
                <Link href={"/profile/settings"}>
                    <Edit className="stroke-title size-6" />
                </Link>
            </div>
            <div className="mt-4 lg:mt-6 flex flex-col gap-2.5">
                {profileMenuData.map(item => (
                    <Link
                        key={item.id}
                        href={item.link || "#"}
                        className={cn("flex items-center justify-between p-5.5 rounded-xl",
                            pathname === item.link ? "bg-card" : ""
                        )}>
                        <div className="flex items-center gap-2">
                            <item.icon className="size-6 stroke-title" />
                            <p className="text-title text-lg">
                                {item.title}
                            </p>
                        </div>
                        <ArrowLeft2 className="stroke-title size-6" />
                    </Link>
                ))}
            </div>
        </div>
    )
}