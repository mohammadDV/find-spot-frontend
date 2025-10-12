"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn, isEmpty } from "@/lib/utils";
import { AddSquare, Home2, Location, More } from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryNavigationModal } from "./CategoryNavigationModal";
import { UserData } from "@/types/user.type";
import { FastAccessModal } from "../common/FastAccessModal";

interface BottomNavigationProps {
    userData?: UserData | null;
}

export const BottomNavigation = ({ userData }: BottomNavigationProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const t = useCommonTranslation();
    const [isOthersModalOpen, setIsOthersModalOpen] = useState(false);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white z-40 py-3 border-t border-border">
            <div className="flex items-center justify-between gap-2.5">
                <Link href={"/"} className="flex flex-col gap-1 items-center w-full">
                    <Home2
                        className={cn("size-5", pathname === "/" ? "fill-title stroke-white" : "stroke-title")}
                        variant={pathname === "/" ? "Bold" : "Linear"} />
                    <p className={"text-center text-xs text-title"}>
                        {t("navigation.home")}
                    </p>
                </Link>
                <Link href={"/map"} className="flex flex-col gap-1 items-center w-full">
                    <Location
                        className={cn("size-5", pathname === "/map" ? "fill-title stroke-white" : "stroke-title")}
                        variant={pathname === "/" ? "Bold" : "Linear"} />
                    <p className={"text-center text-xs text-title"}>
                        {t("navigation.map")}
                    </p>
                </Link>
                <Link href={"/my-biz/create"} className="flex flex-col gap-1 items-center w-full">
                    <AddSquare className="stroke-title size-5" />
                    <p className={"text-center text-xs text-title"}>
                        {t("navigation.submitBusiness")}
                    </p>
                </Link>
                <CategoryNavigationModal />
                <div onClick={() => setIsOthersModalOpen(true)} className="flex flex-col gap-1 items-center w-full">
                    <More className="stroke-title size-5" />
                    <p className={"text-center text-xs text-title"}>
                        {t("navigation.more")}
                    </p>
                </div>
            </div>
            <FastAccessModal open={isOthersModalOpen} onOpenChange={setIsOthersModalOpen} userData={userData} />
        </div>
    )
}