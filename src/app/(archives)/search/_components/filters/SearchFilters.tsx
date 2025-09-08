import { usePagesTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { AmountTypeFilter } from "./AmountTypeFilter";
import { DynamicFilters } from "./DynamicFilters";
import { NowOpenFilter } from "./NowOpenFilter";

export const SearchFilters = () => {
    const t = usePagesTranslation();

    return (
        <>
            <DynamicFilters />
            <AmountTypeFilter />
            <NowOpenFilter />
            <Button variant={"outline"} size={"small"}>
                {t("search.aroundMe")}
            </Button>
        </>
    )
}