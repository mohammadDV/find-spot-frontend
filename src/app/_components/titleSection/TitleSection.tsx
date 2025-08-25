import { useCommonTranslation } from "@/hooks/useTranslation";
import { ArrowLeft2 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

interface TitleSectionProps {
    title: string;
    link?: string
    linkLabel?: string;
}

export const TitleSection = ({ title, link, linkLabel }: TitleSectionProps) => {
    const t = useCommonTranslation();

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Image src={"/images/finybo-icon.svg"} alt="finybo icon" width={24} height={24} />
                <h2 className="text-title text-3xl font-bold">
                    {title}
                </h2>
            </div>
            {link && (
                <Link href={link} className="flex items-center gap-1 text-primary font-semibold">
                    {linkLabel || t("buttons.seeAll")}
                    <ArrowLeft2 className="size-4 stroke-primary"/>
                </Link>
            )}
        </div>
    )
}