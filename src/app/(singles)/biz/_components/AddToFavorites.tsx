"use client"

import { useCommonTranslation } from "@/hooks/useTranslation"
import { Button } from "@/ui/button"
import { ArchiveAdd } from "iconsax-react";
import { useState } from "react";
import { addToFavoriteAction } from "../_api/addToFavoriteAction";
import { toast } from "sonner";
import { FavoriteStatus } from "@/constants/enums";
import { cn } from "@/lib/utils";

interface AddToFavoritesProps {
    id: number
}

export const AddToFavorites = ({ id }: AddToFavoritesProps) => {
    const t = useCommonTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [favoriteStatus, setFavoriteStatus] = useState<FavoriteStatus>(FavoriteStatus.Removed);

    const addToFavoriteHandler = async () => {
        setIsLoading(true);
        try {
            const res = await addToFavoriteAction(id);
            setFavoriteStatus(res.favorite);
        } catch (error) {
            toast.error(t("messages.error"))
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            variant={favoriteStatus === FavoriteStatus.Added ? "primary" : "outline"}
            size={"medium"}
            onClick={addToFavoriteHandler}
            disabled={isLoading}
            className="text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5">
            {favoriteStatus === FavoriteStatus.Added ? t("buttons.remove") : t("buttons.save")}
            <ArchiveAdd className={cn("size-4 lg:size-6",
                favoriteStatus === FavoriteStatus.Added ? "stroke-white" : "stroke-primary")} />
        </Button>
    )
}