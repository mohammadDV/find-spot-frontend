import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getTranslations } from "next-intl/server";
import { ProfileNavigation } from "../_components/navigation";
import { Pagination } from "@/app/_components/pagination";
import noBizImg from "@/assets/images/no-biz.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/ui/button";
import { getMyBusinesses } from "./_api/getMyBusinesses";
import { ArrowLeft2 } from "iconsax-react";
import { Badge } from "@/ui/badge";

interface MyBizPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function MyBizPage({ searchParams }: MyBizPageProps) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();
    const resolvedSearchParams = await searchParams;

    const page = parseInt(resolvedSearchParams?.page || "1");
    const bizData = await getMyBusinesses({ page })

    return (
        <>
            {isMobile && <ProfileNavigation title={t("profile.biz.title")} />}
            {bizData.total > 0
                ? (
                    <div className="flex flex-col gap-5 lg:gap-6">
                        {bizData.data?.map(biz => (
                            <Link
                                key={biz.id}
                                href={`/my-biz/${biz.id}`}
                                className="bg-white rounded-xl p-6 shadow-card flex items-center justify-between">
                                <p className="text-title lg:text-lg line-clamp-1">
                                    {biz.title}
                                </p>
                                <div className="flex items-center justify-end gap-3.5 lg:gap-6">
                                    <Badge variant={biz.status === "approved" ? "grey" : "secondary"}>
                                        {t(`profile.biz.${biz.status}`)}
                                    </Badge>
                                    <ArrowLeft2 className="stroke-title size-6" />
                                </div>
                            </Link>
                        ))}
                        {bizData.last_page > 1 && (
                            <Pagination
                                currentPage={bizData.current_page}
                                lastPage={bizData.last_page}
                                links={bizData.links}
                                total={bizData.total}
                                routeUrl={`/profile/biz`}
                            />
                        )}
                    </div>
                )
                : (
                    <div className="lg:max-w-xl mx-auto">
                        <Image
                            src={noBizImg}
                            alt="No Reviews"
                            width={331}
                            height={307}
                            className="mx-auto w-2/3 lg:w-auto" />
                        <h3 className="mt-6 lg:mt-8 text-center text-2xl lg:text-3xl text-title font-bold">
                            {t("profile.biz.noBiz")}
                        </h3>
                        <p className="text-sm lg:text-xl text-title text-center my-6">
                            {t("profile.biz.noBizDescription")}
                        </p>
                        <Link href={"/my-biz/create"} className="text-center block">
                            <Button variant={"secondary"} size={"medium"}>
                                {t("profile.biz.createBiz")}
                            </Button>
                        </Link>
                    </div>
                )}
        </>
    )
}