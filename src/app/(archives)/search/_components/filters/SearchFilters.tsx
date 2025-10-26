import { AmountTypeFilter } from "./AmountTypeFilter";
import { AroundMeFilter } from "./AroundMeFilter";
import { DynamicFilters } from "./DynamicFilters";
import { NowOpenFilter } from "./NowOpenFilter";
import { ClearFilters } from "./ClearFilters";

export const SearchFilters = () => {
    return (
        <>
            <DynamicFilters />
            <AmountTypeFilter />
            <NowOpenFilter />
            <AroundMeFilter />
            <ClearFilters />
        </>
    )
}