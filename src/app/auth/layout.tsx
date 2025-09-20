import { getTranslations } from "next-intl/server";
import { MainHeader } from "../_components/headers/MainHeader";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { StickyHeader } from "../_components/headers/StickyHeader";
import Link from "next/link";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();
    const t = await getTranslations("common");

    if (isMobile) {
        return (
            <>
                <StickyHeader />
                <div className="p-4">
                    {children}
                </div>
                <div className="flex items-center justify-center gap-4 mt-10 absolute bottom-0 py-4 w-full bg-background">
                    <Link href={"/"} className="text-xs text-primary">
                        {t("navigation.privacy")}
                    </Link>
                    <Link href={"/"} className="text-xs text-primary">
                        {t("navigation.rules")}
                    </Link>
                </div>
            </>
        )
    } else {
        return (
            <>
                <MainHeader />
                <div className="bg-[url(/images/auth-background.jpg)] relative bg-cover pt-10 bg-center flex flex-col items-center justify-center min-h-svh -mt-24">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 max-w-6xl mx-auto flex h-full gap-24">
                        <div className="bg-white w-[482px] rounded-xl p-8">
                            {children}
                            <div className="flex items-center justify-center gap-4 mt-10">
                                <Link href={"/"} className="text-xs text-primary">
                                    {t("navigation.privacy")}
                                </Link>
                                <Link href={"/"} className="text-xs text-primary">
                                    {t("navigation.rules")}
                                </Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-white text-[40px] font-bold">
                                {t("brand.name")} ;
                                <br />
                                {t("brand.tagline")}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}