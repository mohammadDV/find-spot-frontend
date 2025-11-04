"use client"

import { useCommonTranslation } from "@/hooks/useTranslation"
import { Button } from "@/ui/button"
import { ArchiveAdd } from "iconsax-react";
import { useState } from "react";
import { toast } from "sonner";
import { FavoriteStatus } from "@/constants/enums";
import { cn, isEmpty } from "@/lib/utils";
import { addBizToFavoriteAction } from "../_api/addToFavoriteAction";
import { UserData } from "@/types/user.type";
import { useRouter } from "next/navigation";

interface AddToFavoritesProps {
    id: number;
    userData?: UserData | null;
    isFavorite?: boolean;
}

export const AddToFavorites = ({ id, userData, isFavorite }: AddToFavoritesProps) => {
    const router = useRouter();
    const t = useCommonTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [favoriteStatus, setFavoriteStatus] = useState<FavoriteStatus>(FavoriteStatus.Removed);

    const addToFavoriteHandler = async () => {
        if (!isEmpty(userData)) {
            setIsLoading(true);
            try {
                const res = await addBizToFavoriteAction(id);
                setFavoriteStatus(res.favorite);
            } catch (error) {
                toast.error(t("messages.error"))
            } finally {
                setIsLoading(false);
            }
        } else {
            router.push("/auth/login");
        }
    }

    return (
        <Button
            variant={(isFavorite || favoriteStatus === FavoriteStatus.Added) ? "primary" : "outline"}
            size={"medium"}
            onClick={addToFavoriteHandler}
            disabled={isLoading}
            className="text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5">
            {(isFavorite || favoriteStatus === FavoriteStatus.Added) ? t("buttons.remove") : t("buttons.save")}
            <ArchiveAdd className={cn("size-4 lg:size-6",
                (isFavorite || favoriteStatus === FavoriteStatus.Added) ? "stroke-white" : "stroke-primary")} />
        </Button>
    )
}