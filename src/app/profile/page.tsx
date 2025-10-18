import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { ProfileNavigation } from "./_components/navigation";
import { getTranslations } from "next-intl/server";
import { ProfileSidebar } from "./_components/sidebar";
import { getUserData } from "@/lib/getUserDataFromHeaders";

export default async function ProfilePage() {
    const userData = await getUserData();
    const isMobile = await isMobileDevice();
    const t = await getTranslations("pages");

    return (
        <>
            {isMobile && (
                <>
                    <ProfileNavigation title={t("profile.title")} />
                    <ProfileSidebar userData={userData} />
                </>
            )}
        </>
    )
}