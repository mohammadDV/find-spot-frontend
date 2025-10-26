"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { Trash } from "iconsax-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ClearFilters = () => {
  const t = useCommonTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const hasActiveFilters = (
    searchParams.getAll("filters").length > 0 ||
    !!searchParams.get("amount_type") ||
    searchParams.get("now") === "true" ||
    !!searchParams.get("lat") ||
    !!searchParams.get("long") ||
    !!searchParams.get("sort") ||
    !!searchParams.get("column")
  );

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    [
      "filters",
      "amount_type",
      "now",
      "lat",
      "long",
      "page",
      "sort",
      "column",
    ].forEach((key) => params.delete(key));

    const newURL = `${pathname}?${params.toString()}`;
    router.push(newURL, { scroll: false });
  };

  if (hasActiveFilters)
    return (
      <Button
        variant={"link"}
        size={"small"}
        className="text-secondary"
        onClick={clearAllFilters}
      >
        <Trash className="stroke-secondary size-4" />
        {t("inputs.clearFilters")}
      </Button>
    );
};