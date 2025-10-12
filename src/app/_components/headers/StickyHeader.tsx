"use client";

import { useState } from "react";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { HambergerMenu } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { StickyHeaderSearch } from "./StickyHeaderSearch";
import { UserData } from "@/types/user.type";
import { isEmpty } from "@/lib/utils";
import { FastAccessModal } from "../common/FastAccessModal";

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
            link: "/search",
        },
        {
            id: 3,
            title: t("navigation.events"),
            link: "/events",
        },
        {
            id: 4,
            title: t("navigation.news"),
            link: "/blog",
        },
    ];

    return (
        <header className="sticky bg-background top-0 z-50">
            <div className="container relative mx-auto px-4 py-3 lg:py-6">
                <div className="flex items-center justify-between">
                    <Link href={"/"}>
                        <Image
                            src={"/images/finybo-logo.svg"}
                            alt="finybo logo"
                            width={158}
                            height={40}
                            className="w-[94px] h-6 lg:w-[158px] lg:h-10"
                        />
                    </Link>
                    <StickyHeaderSearch />
                    <ul className="hidden lg:flex items-center gap-10">
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
