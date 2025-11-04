"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { Share } from "iconsax-react";

interface ShareSheetProps {
    title: string;
    text?: string;
    url: string;
}

export const ShareSheet = ({
    title,
    text,
    url,
}: ShareSheetProps) => {
    const t = useCommonTranslation();

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                });
            } catch (error) {
                if ((error as Error).name !== "AbortError") {
                    console.error("Error sharing:", error);
                }
            }
        }
    };

    return (
        <>
            <Button
                variant={"outline"}
                size={"medium"}
                onClick={handleShare}
                className={"text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5"}
            >
                {t("buttons.share")}
                <Share className="stroke-primary size-4 lg:size-6" />
            </Button>
        </>
    );
};