"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { createFileUrl } from "@/lib/utils";
import { Category as CategoryIcon, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Modal } from "../modal";
import { Category } from "@/types/category.type";
import { getAllCategories } from "../hero/_api/getAllCategories";

export const CategoryNavigationModal = () => {
  const t = useCommonTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentParent, setCurrentParent] = useState<Category | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAllCategories()
      .then((data) => {
        if (mounted) setCategories(data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setCurrentParent(null);
  };

  return (
    <>
      <button onClick={openModal} className="flex flex-col gap-1 items-center w-full">
        <CategoryIcon className="stroke-title size-5" />
        <p className="text-center text-xs text-title">{t("navigation.category")}</p>
      </button>

      <Modal
        open={isOpen}
        onOpenChange={(open) => (open ? setIsOpen(true) : closeModal())}
        title={currentParent ? currentParent.title : t("navigation.category")}
        description={currentParent ? undefined : t("navigation.fastAccess")}
        showConfirm={false}
        showCancel={false}
        size="small"
      >
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-description">{t("messages.loading")}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {currentParent ? (
              <>
                <button
                  onClick={() => setCurrentParent(null)}
                  className="flex items-center justify-between"
                >
                  <p className="text-lg text-secondary">{t("buttons.back")}</p>
                  <ArrowRight2 className="size-6 stroke-title" />
                </button>
                <hr className="border-t border-border" />
                {currentParent.children && currentParent.children.length > 0 ? (
                  currentParent.children.map((child, idx) => (
                    <Fragment key={child.id}>
                      <Link
                        href={`/search?category=${child.id}`}
                        className="flex items-center justify-between"
                        onClick={closeModal}
                      >
                        <div className="flex items-center gap-3">
                          {child.image && (
                            <div className="relative size-7 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={createFileUrl(child.image)}
                                alt={child.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <p className="text-lg text-primary">{child.title}</p>
                        </div>
                        <ArrowLeft2 className="size-6 stroke-title" />
                      </Link>
                      {idx < currentParent.children!.length - 1 && (
                        <hr className="border-t border-border" />
                      )}
                    </Fragment>
                  ))
                ) : (
                  <div className="text-description text-center py-4">
                    {t("messages.noResults")}
                  </div>
                )}
              </>
            ) : (
              <>
                {categories.map((cat, idx) => (
                  <Fragment key={cat.id}>
                    <button
                      onClick={() => setCurrentParent(cat)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {cat.image && (
                          <div className="relative size-7 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={createFileUrl(cat.image)}
                              alt={cat.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="text-lg text-primary">{cat.title}</p>
                      </div>
                      <ArrowLeft2 className="size-6 stroke-title" />
                    </button>
                    {idx < categories.length - 1 && (
                      <hr className="border-t border-border" />
                    )}
                  </Fragment>
                ))}
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};