import { usePagesTranslation } from "@/hooks/useTranslation"
import { Button } from "@/ui/button"
import { ArrowDown2, HambergerMenu } from "iconsax-react";
import { AmountTypeFilter } from "./AmountTypeFilter";

export const SearchFilters = () => {
    const t = usePagesTranslation();

    return (
        <>
            <Button variant={"primary"} size={"small"} className="rounded-lg lg:text-sm">
                <HambergerMenu className="size-4 lg:size-6 stroke-white" />
                {t("search.filters")}
                <ArrowDown2 className="size-4 stroke-white mr-1" />
            </Button>
            <AmountTypeFilter />
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
        </>
    )
}