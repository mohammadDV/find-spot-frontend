import { getUserData } from "@/lib/getUserDataFromHeaders";
import { Footer } from "../_components/footer/Footer";
import { StickyHeader } from "../_components/headers/StickyHeader";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { ProfileNavigation } from "../profile/_components/navigation";
import { getTranslations } from "next-intl/server";
import { CategoriesMenu } from "../_components/categoriesMenu";

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();
    const userData = await getUserData();

    return (
        <>
            {isMobile ? (
                <div className="px-4">
                    <ProfileNavigation title={t("myBiz.addTitle")} />
                </div>
            ) : (
                <>
                    <StickyHeader userData={userData} />
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
