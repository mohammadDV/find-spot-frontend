"use client"

import { useDebounce } from "@/hooks/useDebounce";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { createFileUrl } from "@/lib/utils";
import { SearchSuggestionsResponse } from "@/types/business.type";
import { Button } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { SearchNormal1 } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSearchSuggestions } from "./_api/getSearchSuggestions";

export const SearchSuggestions = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchSuggestionsResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const tCommon = useCommonTranslation();
    const tPages = usePagesTranslation();
    const router = useRouter();

    useEffect(() => {
        if (debouncedQuery.trim().length > 0) {
            setLoading(true);
            getSearchSuggestions({ query: debouncedQuery })
                .then((data) => {
                    setSuggestions(data);
                    setIsOpen(true);
                })
                .catch((error) => {
                    console.error("Search suggestions error:", error);
                    setSuggestions(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setSuggestions(null);
            setIsOpen(false);
        }
    }, [debouncedQuery]);

    const handleBusinessClick = (businessId: number) => {
        router.push(`/biz/${businessId}`);
        setIsOpen(false);
        setQuery("");
    };

    const handleCategoryClick = (categoryId: number) => {
        router.push(`/search?category=${categoryId}`);
        setIsOpen(false);
        setQuery("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (query.trim()) {
            router.push(`/search?column=title&query=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
        }
    };

    const handleInputFocus = () => {
        if (suggestions && debouncedQuery.trim().length > 0) {
            setIsOpen(true);
        }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setTimeout(() => {
            if (!e.currentTarget?.contains(document.activeElement)) {
                setIsOpen(false);
            }
        }, 150);
    };

    return (
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full lg:w-auto">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <div className="relative">
                            <SearchNormal1 className="size-6 stroke-white absolute right-3 top-3 rotate-90" />
                            <form onSubmit={handleSubmit}>
                                <input
                                    className="w-full border border-white/60 rounded-xl outline-none px-3 py-[11px] pr-11 bg-transparent text-white placeholder:text-white/70"
                                    placeholder={tCommon("buttons.search")}
                                    value={query}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                            </form>
                        </div>
                    </PopoverTrigger>

                    {(loading || suggestions) && (
                        <PopoverContent
                            className="lg:w-[var(--radix-popover-trigger-width)] p-0 bg-white border rounded-xl overflow-hidden border-gray-200 shadow-lg"
                            align="start"
                            onOpenAutoFocus={(e) => e.preventDefault()}
                            onCloseAutoFocus={(e) => e.preventDefault()}
                        >
                            {loading && (
                                <div className="p-4 text-center text-gray-500">
                                    {tPages("home.searching")}
                                </div>
                            )}

                            {suggestions && !loading && (
                                <div className="max-h-96 overflow-y-auto">
                                    {suggestions.businesses?.length > 0 && (
                                        <div className="p-2">
                                            <h3 className="text-sm font-semibold text-gray-700 px-2 py-1 mb-1">
                                                {tPages("home.businesses")}
                                            </h3>
                                            {suggestions.businesses.map((business) => (
                                                <button
                                                    key={business.id}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => handleBusinessClick(business.id)}
                                                    className="w-full flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-lg text-right transition-colors"
                                                >
                                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={createFileUrl(business.image!)}
                                                            alt={business.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 text-right">
                                                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                                            {business.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {business.area.title}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {suggestions.categories?.length > 0 && (
                                        <div className="p-2 border-t border-gray-100">
                                            <h3 className="text-sm font-semibold text-gray-700 px-2 py-1 mb-1">
                                                {tPages("home.categories")}
                                            </h3>
                                            {suggestions.categories.map((category) => (
                                                <button
                                                    key={category.id}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={() => handleCategoryClick(category.id)}
                                                    className="w-full flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-lg text-right transition-colors"
                                                >
                                                    <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={createFileUrl(category.image!)}
                                                            alt={category.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <p className="text-sm text-gray-900 flex-1 text-right">
                                                        {category.title}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {suggestions.businesses?.length === 0 &&
                                        suggestions.categories?.length === 0 && (
                                            <div className="p-4 text-center text-gray-500">
                                                {tCommon("messages.noResults")}
                                            </div>
                                        )}
                                </div>
                            )}
                        </PopoverContent>
                    )}
                </Popover>
            </div>
            <Button
                onClick={handleSubmit}
                variant={"secondary"}
                size={"medium"}
                className="w-full lg:w-auto">
                {tCommon("buttons.search")}
            </Button>
        </div>
    );
};
