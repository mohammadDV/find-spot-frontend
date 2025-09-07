import { usePagesTranslation } from "@/hooks/useTranslation"
import { Button } from "@/ui/button"
import { ArrowDown2, HambergerMenu } from "iconsax-react";
import { AmountTypeFilter } from "./AmountTypeFilter";
import { NowOpenFilter } from "./NowOpenFilter";

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
            <NowOpenFilter />
            <Button variant={"outline"} size={"small"}>
                {t("search.aroundMe")}
            </Button>
        </>
    )
}