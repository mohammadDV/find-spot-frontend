"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { isEmpty } from "@/lib/utils";
import { UserData } from "@/types/user.type";
import { Button } from "@/ui/button";
import { HambergerMenu } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";
import { FastAccessModal } from "../common/FastAccessModal";
import { StickyHeaderSearch } from "./StickyHeaderSearch";

export interface StickyHeaderProps {
    userData?: UserData | null;
}

export const StickyHeader = ({ userData }: StickyHeaderProps) => {
    const t = useCommonTranslation();
    const [isFastAccessOpen, setIsFastAccessOpen] = useState(false);

    const menuData = [
        {
            id: 1,
            title: t("navigation.submitBusiness"),
            link: "/my-biz/create",
        },
        {
            id: 2,
            title: t("navigation.searchMap"),
            link: "/map",
        },
        {
            id: 3,
            title: t("navigation.events"),
            link: "/events",
        },
        {
            id: 4,
            title: t("navigation.weekend"),
            link: "/weekend",
        },
        {
            id: 5,
            title: t("navigation.news"),
            link: "/blog",
        },
    ];

    return (
        <header className="sticky bg-background top-0 z-50">
            <div className="container relative mx-auto px-4 py-3 lg:py-6">
                <div className="flex items-center justify-between">
                    <Link href={"/"}>
                        <img
                            src={"/images/finybo-logo.png"}
                            alt="finybo logo"
                            width={158}
                            height={40}
                            className="w-[94px] h-6 lg:w-[158px] lg:h-10 object-contain"
                        />
                    </Link>
                    <StickyHeaderSearch />
                    <ul className="hidden lg:flex items-center gap-8">
                        {menuData.map((item) => (
                            <li key={item.id} className="text-lg font-normal text-title">
                                <Link href={item.link}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <Link href={(!!userData && !isEmpty(userData) ? "/profile/biz" : "/auth/login")}>
                        <Button variant={"primary"} size={"medium"} className="hidden lg:block">
                            {(!!userData && !isEmpty(userData) ? t("buttons.profile") : t("buttons.login"))}
                        </Button>
                    </Link>
                    <button aria-label="Open menu" className="lg:hidden" onClick={() => setIsFastAccessOpen(true)}>
                        <HambergerMenu className="size-6 stroke-black" />
                    </button>
                    <FastAccessModal open={isFastAccessOpen} onOpenChange={setIsFastAccessOpen} userData={userData} />
                </div>
            </div>
        </header>
    );
};
