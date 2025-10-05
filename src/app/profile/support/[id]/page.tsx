import { formatToShamsiWithYear } from "@/lib/dateUtils";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { cn, createFileUrl } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Messages, Paperclip, Profile } from "iconsax-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ProfileNavigation } from "../../_components/navigation";
import { getTicket } from "./_api/getTicket";
import { SendMessageForm } from "./_components/SendMessageForm";

interface TicketPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ShowSupportPage({ params }: TicketPageProps) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();
    const userData = await getUserData();

    const resolvedParams = await params;
    const ticketInfo = await getTicket({ id: resolvedParams.id })

    return (
        <>
            {isMobile && <ProfileNavigation title={t("profile.support.title")} />}
            <div className="flex items-center justify-between mb-4 lg:mb-10">
                <h1 className="text-lg lg:text-2xl font-bold text-title">
                    {t("profile.support.ticketNumber")} {' '} {ticketInfo.id}
                </h1>
                <Link href={"/profile/support/new"}>
                    <Button variant={"outline"} size={"medium"}>
                        {t("profile.support.newTicket")}
                    </Button>
                </Link>
            </div>
            <div className="shadow-card px-6 py-4 rounded-xl bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Messages className="stroke-secondary size-6" />
                        <h3 className="text-secondary text-lg font-bold">
                            {t("profile.support.ticketDetails")}
                        </h3>
                    </div>
                    <Badge variant={ticketInfo.status === "active" ? "grey" : "secondary"}>
                        {t(`profile.support.${ticketInfo.status}`)}
                    </Badge>
                </div>
                <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        <p className="text-sm text-title">
                            {t("profile.support.trackingNumber")}
                        </p>
                        <p className="text-base text-title font-bold">
                            {ticketInfo.id}
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <p className="text-sm text-title">
                            {t("profile.support.ticketType")}
                        </p>
                        <p className="text-base text-title font-bold">
                            {ticketInfo.subject.title}
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <p className="text-sm text-title">
                            {t("profile.support.date")}
                        </p>
                        <p className="text-base text-title font-bold">
                            {formatToShamsiWithYear(new Date(ticketInfo.created_at))}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-4 lg:mt-10 gap-4 lg:gap-10">
                {ticketInfo?.messages?.map(item => {
                    const isMyMessage = userData.user.id === item.user_id;
                    return <div key={item.id}
                        className={cn(
                            "flex gap-2.5 max-w-[85%] lg:max-w-[70%]",
                            isMyMessage ? "self-start flex-row-reverse" : "self-end"
                        )}>

                        <div className="flex flex-col gap-1">
                            <div className={cn("flex gap-1",
                                isMyMessage ? "flex-row" : "flex-row-reverse"
                            )}>
                                {isMyMessage ? <img
                                    src={createFileUrl(userData.user.profile_photo_path!)}
                                    className="size-8 rounded-full object-cover" />
                                    : <div className="size-8 bg-on-secondary text-secondary rounded-full flex items-center justify-center">
                                        <Profile className="size-5.5 stroke-secondary" />
                                    </div>}
                                <div
                                    className={cn(
                                        "p-4 bg-card rounded-2xl max-w-full text-text break-words",
                                        isMyMessage
                                            ? "rounded-tr-none"
                                            : "rounded-tl-none"
                                    )}
                                >
                                    {item.message && (
                                        <p className="leading-relaxed">
                                            {item.message}
                                        </p>
                                    )}

                                    {item.file && (
                                        <div className="mt-2">
                                            <Link
                                                href={createFileUrl(item.file)}
                                                target="_blank"
                                                className="flex items-center gap-1">
                                                <Paperclip className="stroke-primary size-4" />
                                                <span className="underline text-sm text-primary">
                                                    {t("profile.support.downloadFile")}
                                                </span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={cn(
                                "flex items-center gap-2 text-xs text-text px-1",
                                isMyMessage ? "justify-end" : "justify-start"
                            )}>
                                <span>
                                    {formatToShamsiWithYear(new Date(item.created_at))}
                                </span>
                            </div>
                        </div>
                    </div>
                })}
                {ticketInfo.status === "active" && <SendMessageForm ticketId={ticketInfo.id} />}
            </div>
        </>
    )
}