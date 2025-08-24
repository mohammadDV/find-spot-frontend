import { useCommonTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { ArrowDown2, Coin, Coin1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

export const MainHeader = () => {
  const t = useCommonTranslation();

  const menuData = [
    {
      id: 1,
      title: t("navigation.submitBusiness"),
      link: "/submit-business",
    },
    {
      id: 2,
      title: t("navigation.searchMap"),
      link: "/search-map",
    },
    {
      id: 3,
      title: t("navigation.events"),
      link: "/events",
    },
    {
      id: 4,
      title: t("navigation.news"),
      link: "/news",
    },
  ];

  return (
    <header className="container relative mx-auto px-4 py-6 z-40">
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/images/finybo-logo.svg"}
            alt="finybo logo"
            width={158}
            height={40}
          />
        </Link>
        <ul className="flex items-center gap-10">
          {menuData.map((item) => (
            <li key={item.id} className="text-xl font-light text-white">
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-end gap-3">
          <Button
            variant={"outline"}
            size={"medium"}
            className="border-white text-white bg-transparent"
          >
            <Coin1 className="stroke-white"/>
            {t("buttons.convertCurrency")}
            <ArrowDown2 className="stroke-white size-4"/>
          </Button>
          <Button variant={"white"} size={"medium"}>
            {t("buttons.login")}
          </Button>
        </div>
      </div>
    </header>
  );
};
