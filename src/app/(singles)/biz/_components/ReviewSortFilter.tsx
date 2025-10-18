"use client";

import { usePagesTranslation } from "@/hooks/useTranslation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const sortOptions = [
    { label: "newestComments", value: "newest", sort: "desc", column: "created_at" },
    { label: "oldestComments", value: "oldest", sort: "asc", column: "created_at" },
    { label: "highestScore", value: "most_rate", sort: "desc", column: "rate" },
    { label: "lowestScore", value: "min_rate", sort: "asc", column: "rate" }
];

export const ReviewSortFilter = () => {
    const t = usePagesTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [selectedSort, setSelectedSort] = useState<string>(() => {
        const sort = searchParams.get('sort');
        const column = searchParams.get('column');

        if (!sort || !column) return 'newest';

        const option = sortOptions.find(opt => opt.sort === sort && opt.column === column);
        return option?.value || 'newest';
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

        let currentValue = 'newest';
        if (sort && column) {
            const option = sortOptions.find(opt => opt.sort === sort && opt.column === column);
            currentValue = option?.value || 'newest';
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
                        {t(`biz.${option.label}`) || option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};