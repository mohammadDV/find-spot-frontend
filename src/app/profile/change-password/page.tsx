import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { ProfileNavigation } from "../_components/navigation";
import { getTranslations } from "next-intl/server";
import { ChangePasswordForm } from "./_components/ChangePasswordForm";

export default async function ChangePasswordPage() {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile && <ProfileNavigation title={t("auth.newPassword")} />}
            <div className="lg:max-w-xl mx-auto">
                <ChangePasswordForm />
            </div>
        </>
    )
}