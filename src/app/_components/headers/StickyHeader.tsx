import { useCommonTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { HambergerMenu, SearchNormal1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

export const StickyHeader = () => {
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
                    <div className="lg:w-80 hidden lg:flex overflow-hidden rounded-xl h-12">
                        <div className="border border-description flex-1 rounded-r-xl h-full">
                            <input
                                type="text"
                                placeholder={t("buttons.search")}
                                className="w-full h-full px-3 py-4 outline-none text-sm text-title"
                            />
                        </div>
                        <button className="w-14 bg-secondary flex items-center cursor-pointer justify-center h-full">
                            <SearchNormal1 className="size-6 stroke-white rotate-90" />
                        </button>
                    </div>
                    <ul className="hidden lg:flex items-center gap-10">
                        {menuData.map((item) => (
                            <li key={item.id} className="text-lg font-normal text-title">
                                <Link href={item.link}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <Button variant={"primary"} size={"medium"} className="hidden lg:block">
                        {t("buttons.login")}
                    </Button>
                    <HambergerMenu className="lg:hidden size-6 stroke-black" />
                </div>
            </div>
        </header>
    );
};
