"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn, isEmpty } from "@/lib/utils";
import { AddSquare, ArrowLeft2, Category, Home2, Location, More } from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "../modal";
import { UserData } from "@/types/user.type";
import { Button } from "@/ui/button";

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
                <Link href={"/category"} className="flex flex-col gap-1 items-center w-full">
                    <Category className="stroke-title size-5" />
                    <p className={"text-center text-xs text-title"}>
                        {t("navigation.category")}
                    </p>
                </Link>
                <div onClick={() => setIsOthersModalOpen(true)} className="flex flex-col gap-1 items-center w-full">
                    <More className="stroke-title size-5" />
                    <p className={"text-center text-xs text-title"}>
                        {t("navigation.more")}
                    </p>
                </div>
            </div>
            <Modal open={isOthersModalOpen}
                onOpenChange={setIsOthersModalOpen}
                title={t("navigation.more")}
                description={t("navigation.fastAccess")}
                showConfirm={false}
                showCancel={false}
                size="small"
            >
                <>
                    <div className="flex flex-col gap-4 mb-6">
                        <Link href={"/my-biz/create"} className="flex items-center justify-between">
                            <p className="text-lg text-primary">
                                {t("navigation.submitBusiness")}
                            </p>
                            <ArrowLeft2 className="size-6 stroke-title" />
                        </Link>
                        <hr className="border-t border-border" />
                        <Link href={"/map"} className="flex items-center justify-between">
                            <p className="text-lg text-primary">
                                {t("navigation.searchMap")}
                            </p>
                            <ArrowLeft2 className="size-6 stroke-title" />
                        </Link>
                        <hr className="border-t border-border" />
                        <Link href={"/events"} className="flex items-center justify-between">
                            <p className="text-lg text-primary">
                                {t("navigation.events")}
                            </p>
                            <ArrowLeft2 className="size-6 stroke-title" />
                        </Link>
                        <hr className="border-t border-border" />
                        <Link href={"/blog"} className="flex items-center justify-between">
                            <p className="text-lg text-primary">
                                {t("navigation.news")}
                            </p>
                            <ArrowLeft2 className="size-6 stroke-title" />
                        </Link>
                        <hr className="border-t border-border" />
                        <Link href={"/"} className="flex items-center justify-between">
                            <p className="text-lg text-primary">
                                {t("buttons.convertCurrency")}
                            </p>
                            <ArrowLeft2 className="size-6 stroke-title" />
                        </Link>
                    </div>
                    <Link href={(!!userData && !isEmpty(userData) ? "/profile" : "/auth/login")}>
                        <Button variant={"primary"} size={"medium"} className="w-full">
                            {(!!userData && !isEmpty(userData) ? t("buttons.profile") : t("buttons.login"))}
                        </Button>
                    </Link>
                </>
            </Modal>
        </div>
    )
}