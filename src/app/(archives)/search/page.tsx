import { Button } from "@/ui/button";
import { ArrowDown2, HambergerMenu } from "iconsax-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { SearchCard } from "./_components/searchCard/SearchCard";
import { Pagination } from "@/app/_components/pagination";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";

export default async function SearchPage() {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();

    return (
        <div className="my-8 lg:my-10 container mx-auto px-4">
            <div className="lg:flex justify-between gap-10">
                <div className="lg:w-3/4">
                    <div className="flex items-center gap-1 lg:gap-2">
                        <Image
                            src={"/images/finybo-icon.svg"}
                            alt="finybo icon"
                            width={24}
                            height={24}
                            className="size-4 lg:size-6"
                        />
                        <h2 className="text-title lg:text-3xl font-bold">بهترین رستوران‌های استانبول</h2>
                    </div>
                    <div className="mt-5 lg:mt-8 flex flex-wrap items-center gap-2 lg:gap-4">
                        <Button variant={"primary"} size={isMobile ? "small" : "medium"} className="rounded-lg">
                            <HambergerMenu className="size-4 lg:size-6 stroke-white" />
                            {t("search.filters")}
                            <ArrowDown2 className="size-4 stroke-white mr-1" />
                        </Button>
                        <Button variant={"outline"} size={"small"}>
                            {t("search.price")}
                            <ArrowDown2 className="size-4 stroke-primary mr-1" />
                        </Button>
                        <Button variant={"outline"} size={"small"}>
                            {t("search.nowOpen")}
                        </Button>
                        <Button variant={"outline"} size={"small"}>
                            {t("search.aroundMe")}
                        </Button>
                        <Button variant={"outline"} size={"small"}>
                            {t("search.fastShipping")}
                        </Button>
                        <Button variant={"outline"} size={"small"}>
                            {t("search.takeaway")}
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 lg:flex flex-col gap-4 lg:gap-6 mt-8">
                        {Array.from({ length: 3 }, (_, i) => (
                            <SearchCard key={i} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={1}
                        lastPage={5}
                        links={[
                            {
                                "url": null,
                                "label": "&laquo; قبلی",
                                "active": false
                            },
                            {
                                "url": "https://localhost:3000/api/search?page=1",
                                "label": "1",
                                "active": false
                            },
                            {
                                "url": "https://localhost:3000/api/search?page=1",
                                "label": "2",
                                "active": true
                            },
                            {
                                "url": "https://localhost:3000/api/search?page=1",
                                "label": "3",
                                "active": false
                            },
                            {
                                "url": "",
                                "label": "...",
                                "active": false
                            },
                            {
                                "url": "https://localhost:3000/api/search?page=1",
                                "label": "5",
                                "active": false
                            },
                            {
                                "url": null,
                                "label": "بعدی &raquo;",
                                "active": true
                            }
                        ]}
                        routeUrl="/search"
                        total={15} />
                </div>
                <div className="bg-border lg:w-1/3 rounded-2xl">
                </div>
            </div>
        </div>
    )
}