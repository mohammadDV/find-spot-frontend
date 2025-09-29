import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserAccount } from "./_api/getUserAccount";
import { AccountForm } from "./_components/AccountForm";
import { ProfileNavigation } from "../_components/navigation";
import { getTranslations } from "next-intl/server";

export default async function AccountPage() {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();
    const userAccountData = await getUserAccount();

    return (
        <>
            {isMobile && <ProfileNavigation title={t("profile.account.title")} />}
            <div className="lg:max-w-xl mx-auto">
                <AccountForm accountData={userAccountData?.user || {}} />
            </div>
        </>
    )
}