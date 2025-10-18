"use client"

import { usePagesTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { ArrowDown2 } from "iconsax-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const amountTypeOptions = [
    { label: "t", value: "1" },
    { label: "tt", value: "2" },
    { label: "ttt", value: "3" },
    { label: "tttt", value: "4" }
];

export const AmountTypeFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const t = usePagesTranslation();

    const [selectedAmountType, setSelectedAmountType] = useState<string | null>(() => {
        return searchParams.get('amount_type') || null;
    });

    const updateURL = useCallback((newAmountType: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newAmountType) {
            params.set('amount_type', newAmountType);
        } else {
            params.delete('amount_type');
        }

        params.delete('page');

        const newURL = `${pathname}?${params.toString()}`;
        router.push(newURL, { scroll: false });
    }, [searchParams, pathname, router]);

    const handleAmountTypeChange = (amountTypeValue: string, checked: boolean) => {
        let newSelectedAmountType: string | null;

        if (checked) {
            newSelectedAmountType = amountTypeValue;
        } else {
            newSelectedAmountType = null;
        }

        setSelectedAmountType(newSelectedAmountType);
        updateURL(newSelectedAmountType);
    };

    useEffect(() => {
        const urlAmountType = searchParams.get('amount_type');

        if (urlAmountType !== selectedAmountType) {
            setSelectedAmountType(urlAmountType);
        }
    }, [searchParams, selectedAmountType]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"small"}>
                    {t("search.price")}
                    <ArrowDown2 className="size-4 stroke-primary mr-1" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
                <div className="space-y-3">
                    {amountTypeOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                            <Checkbox
                                id={`amountType-${option.value}`}
                                checked={selectedAmountType === option.value}
                                onCheckedChange={(checked) =>
                                    handleAmountTypeChange(option.value, checked as boolean)
                                }
                            />
                            <label
                                htmlFor={`amountType-${option.value}`}
                                className="text-sm font-normal cursor-pointer mt-0.5 text-text mr-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}