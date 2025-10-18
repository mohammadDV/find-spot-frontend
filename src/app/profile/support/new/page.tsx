import { getTranslations } from "next-intl/server";
import { ProfileNavigation } from "../../_components/navigation";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import NewTicketForm from "./_components/NewTicketForm";

export default async function NewSupportPage() {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile && <ProfileNavigation title={t("profile.support.title")} />}
            <h1 className="text-2xl font-bold text-title mb-4 lg:mb-10">
                {t("profile.support.newTicket")}
            </h1>
            <NewTicketForm />
        </>
    )
}