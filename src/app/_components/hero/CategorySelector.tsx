"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { createFileUrl } from "@/lib/utils";
import { Category } from "@/types/category.type";
import { HambergerMenu } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "../modal/modal";
import { getAllCategories } from "./_api/getAllCategories";

export const CategorySelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const tCommon = useCommonTranslation();
    const router = useRouter();

    const fetchCategories = async () => {
        if (categories.length > 0) return;

        setLoading(true);
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
        fetchCategories();
    };

    const handleCategoryClick = (categoryId: number) => {
        router.push(`/search?category=${categoryId}`);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="flex items-center z-10 gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
                <HambergerMenu className="size-4 stroke-white" />
                <p className="text-xl font-light text-white">
                    {tCommon("categories.all")}
                </p>
            </button>

            <Modal
                open={isOpen}
                onOpenChange={setIsOpen}
                title="دسته‌بندی‌ها"
                size="large"
                showConfirm={false}
                showCancel={false}
            >
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-description">{tCommon("messages.noResults")}</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto">
                        {categories.map((category) => (
                            <div key={category.id} className="space-y-1">
                                <button
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="w-full flex cursor-pointer items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-right"
                                >
                                    {category.image && (
                                        <div className="relative size-7 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={createFileUrl(category.image)}
                                                alt={category.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-sm font-semibold text-title flex-1">
                                        {category.title}
                                    </h3>
                                </button>

                                {category.children && category.children.length > 0 && (
                                    <div className="space-y-1">
                                        {category.children.map((child, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleCategoryClick(child.id)}
                                                className="w-full p-2 hover:bg-gray-50 cursor-pointer rounded-md transition-colors text-right"
                                            >
                                                <span className="text-sm text-description flex-1">
                                                    {child.title}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </>
    );
};