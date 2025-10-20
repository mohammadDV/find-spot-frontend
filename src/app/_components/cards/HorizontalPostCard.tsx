import { useCommonTranslation } from "@/hooks/useTranslation"
import { createFileUrl } from "@/lib/utils"
import { Post } from "@/types/post.type"
import { Button } from "@/ui/button"
import { ArrowLeft2 } from "iconsax-react"
import Image from "next/image"
import Link from "next/link"

interface HorizontalPostCardProps {
    data: Post;
}

export const HorizontalPostCard = ({ data }: HorizontalPostCardProps) => {
    const t = useCommonTranslation();

    return (
        <Link href={`/post/${data.id}`} className="p-6 rounded-2xl border-b border-border flex justify-between gap-6">
            <Image src={createFileUrl(data.image!)} alt="" width={308} height={134} className="rounded-2xl object-cover lg:max-h-44" />
            <div className="flex-1">
                <h3 className="text-text text-lg font-bold line-clamp-1">
                    {data.title}
                </h3>
                <p className="my-2.5 text-base text-description line-clamp-2">
                    {data.summary}
                </p>
                <Button variant={"link"} size={"medium"}>
                    {t("buttons.readMore")}
                    <ArrowLeft2 className="size-4 stroke-primary" />
                </Button>
            </div>
        </Link>
    )
}