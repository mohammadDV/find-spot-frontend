import { HorizontalPostCard } from "@/app/_components/cards/HorizontalPostCard";
import { VerticalPostCard } from "@/app/_components/cards/VerticalPostCard";
import { TitleSection } from "@/app/_components/titleSection";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function BlogPage() {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();

    return (
        <>
            <div className="mt-1.5 lg:mt-10 container mx-auto px-4">
                <TitleSection title={t("blog.title")} />
                <div className="mt-1.5 lg:mt-10 flex flex-col lg:flex-row items-start justify-between gap-6">
                    <div className="hidden lg:block lg:w-1/3 sticky top-28">
                        <div className="p-6 rounded-2xl bg-white shadow-card">
                            <h2 className="text-text text-2xl font-bold mb-3">
                                {t("blog.mostViews")}
                            </h2>
                            <div className="flex flex-col gap-2">
                                {Array.from({ length: 6 }, (_, i) => (
                                    <Link key={i} href={"/"} className="text-description text-lg hover:text-primary">
                                        جورج راسل: من قهرمان جهان خواهم شد، به من ایمان بیاورید.
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-3/4">
                        <div className="flex flex-col gap-3 lg:gap-6">
                            {isMobile
                                ? Array.from({ length: 4 }, (_, i) => (
                                    <VerticalPostCard key={i} />
                                ))
                                : Array.from({ length: 4 }, (_, i) => (
                                    <HorizontalPostCard key={i} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}