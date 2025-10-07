"use client"

import { usePagesTranslation } from "@/hooks/useTranslation";
import { useFetchData } from "@/hooks/useFetchData";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { ArrowDown2, HambergerMenu } from "iconsax-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiltersResponse } from "@/types/category.type";

export const DynamicFilters = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const t = usePagesTranslation();

    const categoryId = searchParams.get('category');

    if (!categoryId) {
        return null;
    }

    const { response: filtersData, loading } = useFetchData<FiltersResponse>(
        `/categories/${categoryId}/filters`
    );

    const [selectedFilters, setSelectedFilters] = useState<string[]>(() => {
        const filtersParam = searchParams.getAll('filters');
        return filtersParam;
    });

    const updateURL = useCallback((newFilters: string[]) => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete('filters');

        newFilters.forEach(filter => {
            params.append('filters', filter);
        });

        params.delete('page');

        const newURL = `${pathname}?${params.toString()}`;
        router.push(newURL, { scroll: false });
    }, [searchParams, pathname, router]);

    const handleFilterChange = (filterValue: string, checked: boolean) => {
        let newSelectedFilters: string[];

        if (checked) {
            newSelectedFilters = [...selectedFilters, filterValue];
        } else {
            newSelectedFilters = selectedFilters.filter(f => f !== filterValue);
        }

        setSelectedFilters(newSelectedFilters);
        updateURL(newSelectedFilters);
    };

    useEffect(() => {
        const urlFiltersArray = searchParams.getAll('filters');

        if (JSON.stringify(urlFiltersArray) !== JSON.stringify(selectedFilters)) {
            setSelectedFilters(urlFiltersArray);
        }
    }, [searchParams, selectedFilters]);

    useEffect(() => {
        setSelectedFilters([]);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('filters');
        params.delete('page');
        const newURL = `${pathname}?${params.toString()}`;
        router.replace(newURL, { scroll: false });
    }, [categoryId]);

    if (loading || !filtersData?.data) {
        return (
            <Button variant={"primary"} size={"small"} className="rounded-lg lg:text-sm" disabled>
                <HambergerMenu className="size-4 lg:size-6 stroke-white" />
                {t("search.filters")}
                <ArrowDown2 className="size-4 stroke-white mr-1" />
            </Button>
        );
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"primary"} size={"small"} className="rounded-lg lg:text-sm">
                    <HambergerMenu className="size-4 lg:size-6 stroke-white" />
                    {t("search.filters")}
                    {selectedFilters.length > 0 && (
                        <span className="bg-white text-primary rounded-full px-2 py-0.5 text-xs mr-1">
                            {selectedFilters.length}
                        </span>
                    )}
                    <ArrowDown2 className="size-4 stroke-white mr-1" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>{t("search.filters")}</SheetTitle>
                </SheetHeader>
                <div className="space-y-3 px-4">
                    {filtersData.data.map((option) => (
                        <div key={option.id} className="flex items-center">
                            <Checkbox
                                id={`filter-${option.id}`}
                                checked={selectedFilters.includes(option.id.toString())}
                                onCheckedChange={(checked) =>
                                    handleFilterChange(option.id.toString(), checked as boolean)
                                }
                            />
                            <label
                                htmlFor={`filter-${option.id}`}
                                className="text-sm font-normal cursor-pointer mt-0.5 text-text mr-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {option.title}
                            </label>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};