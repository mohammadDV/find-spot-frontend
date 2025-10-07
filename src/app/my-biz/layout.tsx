import { getUserData } from "@/lib/getUserDataFromHeaders";
import CategoriesMenu from "../_components/categoriesMenu/CategoriesMenu";
import { Footer } from "../_components/footer/Footer";
import { StickyHeader } from "../_components/headers/StickyHeader";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { ProfileNavigation } from "../profile/_components/navigation";
import { getTranslations } from "next-intl/server";

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile ? (
                isMobile && <ProfileNavigation title={t("myBiz.title")} />
            ) : (
                <>
                    <StickyHeader />
                    <CategoriesMenu />
                    <hr className="hidden lg:block border-t border-border mt-6" />
                </>
            )}
            <>
                {children}
            </>
            {!isMobile && <Footer />}
        </>
    );
}
