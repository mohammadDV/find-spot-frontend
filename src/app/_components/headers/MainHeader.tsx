"use client";

import { useState } from "react";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { isEmpty } from "@/lib/utils";
import { UserData } from "@/types/user.type";
import { Button } from "@/ui/button";
import { ArrowDown2, Coin1, HambergerMenu } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { FastAccessModal } from "../common/FastAccessModal";
import { CurrencyRatesModal } from "./CurrencyRatesModal";

export interface MainHeaderProps {
  userData?: UserData | null;
}

export const MainHeader = ({ userData }: MainHeaderProps) => {
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
    <header className="container relative mx-auto px-4 py-3 lg:py-6 z-40">
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/images/finybo-logo.svg"}
            alt="finybo logo"
            width={158}
            height={40}
            quality={100}
            className="w-[94px] h-6 lg:w-[158px] lg:h-10"
          />
        </Link>
        <ul className="hidden lg:flex items-center gap-10">
          {menuData.map((item) => (
            <li key={item.id} className="font-normal text-lg text-white">
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center justify-end gap-3">
          <CurrencyRatesModal />
          <Link href={(!!userData && !isEmpty(userData) ? "/profile/biz" : "/auth/login")}>
            <Button variant={"white"} size={"medium"}>
              {(!!userData && !isEmpty(userData) ? t("buttons.profile") : t("buttons.login"))}
            </Button>
          </Link>
        </div>
        <button aria-label="Open menu" className="lg:hidden" onClick={() => setIsFastAccessOpen(true)}>
          <HambergerMenu className="size-6 stroke-white" />
        </button>
        <FastAccessModal open={isFastAccessOpen} onOpenChange={setIsFastAccessOpen} userData={userData} />
      </div>
    </header>
  );
};
