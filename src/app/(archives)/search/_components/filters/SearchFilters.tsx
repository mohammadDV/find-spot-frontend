import { usePagesTranslation } from "@/hooks/useTranslation";
import { AmountTypeFilter } from "./AmountTypeFilter";
import { DynamicFilters } from "./DynamicFilters";
import { NowOpenFilter } from "./NowOpenFilter";
import { AroundMeFilter } from "./AroundMeFilter";

export const SearchFilters = () => {
    const t = usePagesTranslation();

    return (
        <>
            <DynamicFilters />
            <AmountTypeFilter />
            <NowOpenFilter />
            <AroundMeFilter />
        </>
    )
}