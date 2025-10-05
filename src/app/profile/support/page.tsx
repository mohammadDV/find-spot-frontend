import { Pagination } from "@/app/_components/pagination";
import noMessageImg from "@/assets/images/no-message.png";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { ArrowLeft2 } from "iconsax-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ProfileNavigation } from "../_components/navigation";
import { getSupportTickets } from "./_api/getSupportTickets";

interface SupportPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function SupportPage({ searchParams }: SupportPageProps) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();
    const resolvedSearchParams = await searchParams;

    const page = parseInt(resolvedSearchParams?.page || "1");

    const ticketsData = await getSupportTickets({
        page,
        count: 8
    });

    return (
        <>
            {isMobile && <ProfileNavigation title={t("profile.support.title")} />}
            {ticketsData.total > 0
                ? (
                    <>
                        <Link href={"/profile/support/new"}>
                            <Button variant={"outline"} size={"medium"} className="mr-auto block">
                                {t("profile.support.newTicket")}
                            </Button>
                        </Link>
                        <div className="flex flex-col gap-4 lg:gap-6 mt-4 lg:mt-6">
                            {ticketsData.data?.map(ticket => (
                                <Link
                                    key={ticket.id}
                                    href={`/profile/support/${ticket.id}`}
                                    className="p-4 lg:p-6 rounded-xl bg-card flex items-center justify-between">
                                    <div className="flex flex-col gap-2.5">
                                        <h3 className="text-sm text-title font-medium">
                                            {t("profile.support.ticketNumber")} {' '} {ticket.id}
                                        </h3>
                                        <p className="text-title text-xs line-clamp-1">
                                            {ticket.message?.message}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 lg:gap-16">
                                        <Badge variant={ticket.status === "active" ? "grey" : "secondary"}>
                                            {t(`profile.support.${ticket.status}`)}
                                        </Badge>
                                        <ArrowLeft2 className="stroke-primary size-6" />
                                    </div>
                                </Link>
                            ))}
                            {ticketsData.last_page > 1 && (
                                <Pagination
                                    currentPage={ticketsData.current_page}
                                    lastPage={ticketsData.last_page}
                                    links={ticketsData.links}
                                    total={ticketsData.total}
                                    routeUrl={`/profile/support`}
                                />
                            )}
                        </div>
                    </>
                )
                : (
                    <div className="lg:max-w-xl mx-auto">
                        <Image
                            src={noMessageImg}
                            alt="No Reviews"
                            width={331}
                            height={296}
                            className="mx-auto w-2/3 lg:w-auto" />
                        <h3 className="mt-6 lg:mt-8 text-center text-2xl lg:text-3xl text-title font-bold">
                            {t("profile.support.noMessage")}
                        </h3>
                        <p className="text-sm lg:text-xl text-title text-center my-6">
                            {t("profile.support.noMessageDescription")}
                        </p>
                        <Link href={"/support/new"} className="text-center block">
                            <Button variant={"secondary"} size={"medium"}>
                                {t("profile.support.createTicket")}
                            </Button>
                        </Link>
                    </div>
                )}
        </>
    )
}