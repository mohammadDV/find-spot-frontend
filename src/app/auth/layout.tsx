import { getTranslations } from "next-intl/server";
import { MainHeader } from "../_components/headers/MainHeader";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { StickyHeader } from "../_components/headers/StickyHeader";

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
            </>
        )
    } else {
        return (
            <>
                <MainHeader />
                <div className="bg-[url(/images/auth-background.jpg)] relative bg-cover bg-center flex flex-col items-center justify-center min-h-svh -mt-24">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 max-w-6xl mx-auto flex h-full gap-24">
                        <div className="bg-white w-[482px] rounded-xl p-8">
                            {children}
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