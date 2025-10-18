"use client"

import { usePagesTranslation } from "@/hooks/useTranslation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const sortOptions = [
    { label: "default", value: "default", sort: null, column: null },
    { label: "most rate", value: "rate_desc", sort: "desc", column: "rate" },
    { label: "min rate", value: "rate_asc", sort: "asc", column: "rate" },
    { label: "most price", value: "price_desc", sort: "desc", column: "start_amount" },
    { label: "min price", value: "price_asc", sort: "asc", column: "start_amount" }
];

export const SortFilter = () => {
    const t = usePagesTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [selectedSort, setSelectedSort] = useState<string>(() => {
        const sort = searchParams.get('sort');
        const column = searchParams.get('column');
        
        if (!sort || !column) return 'default';
        
        const option = sortOptions.find(opt => opt.sort === sort && opt.column === column);
        return option?.value || 'default';
    });

    const updateURL = useCallback((sortValue: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const option = sortOptions.find(opt => opt.value === sortValue);

        if (option && option.sort && option.column) {
            params.set('sort', option.sort);
            params.set('column', option.column);
        } else {
            params.delete('sort');
            params.delete('column');
        }

        params.delete('page');

        const newURL = `${pathname}?${params.toString()}`;
        router.push(newURL, { scroll: false });
    }, [searchParams, pathname, router]);

    const handleSortChange = (value: string) => {
        setSelectedSort(value);
        updateURL(value);
    };

    useEffect(() => {
        const sort = searchParams.get('sort');
        const column = searchParams.get('column');
        
        let currentValue = 'default';
        if (sort && column) {
            const option = sortOptions.find(opt => opt.sort === sort && opt.column === column);
            currentValue = option?.value || 'default';
        }

        if (currentValue !== selectedSort) {
            setSelectedSort(currentValue);
        }
    }, [searchParams, selectedSort]);

    return (
        <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-auto min-w-36">
                <SelectValue placeholder="مرتب‌سازی" />
            </SelectTrigger>
            <SelectContent>
                {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {t(`search.sort.${option.label.replace(' ', '_')}`) || option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};