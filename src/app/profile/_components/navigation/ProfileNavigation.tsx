"use client"

import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";

interface ProfileNavigationProps {
    title: string;
}

export const ProfileNavigation = ({ title }: ProfileNavigationProps) => {
    const router = useRouter();

    const goToPrevPageHandler = () => router.back();

    return (
        <div className="py-3 mt-1 flex items-center justify-between mb-4">
            <p className="text-lg text-title">
                {title}
            </p>
            <ArrowLeft2 className="stroke-title size-6" onClick={goToPrevPageHandler} />
        </div>
    )
}