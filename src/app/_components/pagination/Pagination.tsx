"use client";

import { Button } from "@/ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    links: PaginationLink[];
    total: number;
    routeUrl: string;
}

export const Pagination = ({ currentPage, links, routeUrl }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handlePageChange = (page: number) => {
        if (params.type) {
            router.push(`${routeUrl}/${params.type}?${createQueryString('page', page.toString())}`);
        } else router.push(`${routeUrl}?${createQueryString('page', page.toString())}`);
    };

    const renderPageButton = (link: PaginationLink, index: number) => {
        if (!link.url && link.label === "...") {
            return (
                <span key={index} className="px-3 py-2 text-text">
                    ...
                </span>
            );
        }

        if (link.label === "&laquo; قبلی") {
            return (
                <Button
                    key={index}
                    variant="link"
                    size="medium"
                    // disabled={!link.url}
                    onClick={() => link.url && handlePageChange(currentPage - 1)}
                    className="flex items-center gap-1 text-title font-normal text-sm"
                >
                    <ArrowRight2 className="size-4 stroke-title" />
                    صفحه‌ی قبل
                </Button>
            );
        }

        if (link.label === "بعدی &raquo;") {
            return (
                <Button
                    key={index}
                    variant="link"
                    size="medium"
                    // disabled={!link.url}
                    onClick={() => link.url && handlePageChange(currentPage + 1)}
                    className="flex items-center gap-1 text-title font-normal text-sm"
                >
                    صفحه‌ی بعد
                    <ArrowLeft2 className="size-4 stroke-title" />
                </Button>
            );
        }

        const pageNumber = parseInt(link.label);
        if (!isNaN(pageNumber)) {
            return (
                <Button
                    key={index}
                    variant={link.active ? "outline" : "link"}
                    size="medium"
                    onClick={() => handlePageChange(pageNumber)}
                    className={cn("min-w-[40px] text-title rounded-lg font-normal",
                        link.active ? "border border-border bg-input" : "")}
                >
                    {pageNumber}
                </Button>
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex items-center gap-1 flex-wrap justify-center">
                {links.map((link, index) => renderPageButton(link, index))}
            </div>
        </div>
    );
};