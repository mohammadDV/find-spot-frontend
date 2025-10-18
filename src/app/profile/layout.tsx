import { getUserData } from "@/lib/getUserDataFromHeaders";
import { Footer } from "../_components/footer/Footer";
import { StickyHeader } from "../_components/headers/StickyHeader";
import { ProfileSidebar } from "./_components/sidebar";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { CategoriesMenu } from "../_components/categoriesMenu";

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userData = await getUserData();
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile ? (
                <></>
            ) : (
                <>
                    <StickyHeader userData={userData} />
                    <CategoriesMenu />
                    <hr className="hidden lg:block border-t border-border mt-6" />
                </>
            )}
            <div className="lg:mt-10 md:flex justify-between items-start mx-auto gap-10 container px-4">
                {!isMobile && <ProfileSidebar userData={userData} />}
                <div className="flex-1">
                    {children}
                </div>
            </div>
            {!isMobile && <Footer />}
        </>
    );
}
