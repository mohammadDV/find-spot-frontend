"use client"

import { usePagesTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const NowOpenFilter = () => {
    const t = usePagesTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [isNowOpen, setIsNowOpen] = useState<boolean>(() => {
        return searchParams.get('now') === 'true';
    });

    const updateURL = useCallback((nowValue: boolean) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nowValue) {
            params.set('now', 'true');
        } else {
            params.delete('now');
        }

        params.delete('page');

        const newURL = `${pathname}?${params.toString()}`;
        router.push(newURL, { scroll: false });
    }, [searchParams, pathname, router]);

    const handleToggle = () => {
        const newValue = !isNowOpen;
        setIsNowOpen(newValue);
        updateURL(newValue);
    };

    useEffect(() => {
        const urlNowValue = searchParams.get('now') === 'true';

        if (urlNowValue !== isNowOpen) {
            setIsNowOpen(urlNowValue);
        }
    }, [searchParams, isNowOpen]);

    return (
        <Button
            variant={isNowOpen ? "primary" : "outline"}
            size={"small"}
            onClick={handleToggle}
        >
            {t("search.nowOpen")}
        </Button>
    );
};