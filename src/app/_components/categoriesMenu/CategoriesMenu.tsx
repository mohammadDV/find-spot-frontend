"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { Car, Health, House, Reserve, HambergerMenu, Location } from "iconsax-react";
import { Category } from "@/types/category.type";
import { getAllCategories } from "../hero/_api/getAllCategories";
import { createFileUrl } from "@/lib/utils";

export const CategoriesMenu = () => {
  const tCommon = useCommonTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div className="hidden lg:block w-full bg-background py-1">
      <div className="container mx-auto px-4">
        <div className="w-full flex items-center justify-between">

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-2">
              <HambergerMenu className="stroke-title size-4" />
              <span className="text-title text-lg">{tCommon("categories.all")}</span>
            </button>

            {isOpen && (
              <div
                className="absolute top-full right-0 mt-1 p-3 min-w-[800px] max-h-[60vh] overflow-y-auto 
                bg-white shadow-lg rounded-xl border z-50"
              >
                {loading ? (
                  <div className="flex justify-center items-center py-8 text-description">
                    {tCommon("messages.loading")}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                      <div key={category.id} className="space-y-1">
                        <Link
                          href={`/search?category=${category.id}`}
                          onClick={() => setIsOpen(false)}
                          className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 
                          rounded-lg transition-colors text-right"
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
                        </Link>

                        {category.children && (
                          <div className="space-y-1">
                            {category.children.map((child) => (
                              <Link
                                key={child.id}
                                href={`/search?category=${child.id}`}
                                onClick={() => setIsOpen(false)}
                                className="w-full p-2 hover:bg-gray-50 rounded-md transition-colors block text-right"
                              >
                                <span className="text-sm text-description flex-1">
                                  {child.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link href={"/search?category=2"} className="flex items-center cursor-pointer gap-2">
            <Reserve className="size-4 stroke-title" />
            <p className="text-title text-lg">{tCommon("categories.restaurants")}</p>
          </Link>
          <Link href={"/search?category=13"} className="flex items-center cursor-pointer gap-2">
            <House className="size-4 stroke-title" />
            <p className="text-title text-lg">{tCommon("categories.house")}</p>
          </Link>
          <Link href={"/search?category=10"} className="flex items-center cursor-pointer gap-2">
            <Car className="size-4 stroke-title" />
            <p className="text-title text-lg">{tCommon("categories.vehicle")}</p>
          </Link>
          <Link href={"/search?category=3"} className="flex items-center cursor-pointer gap-2">
            <Health className="size-4 stroke-title" />
            <p className="text-title text-lg">{tCommon("categories.health")}</p>
          </Link>
          <Link href={"/search?category=11"} className="flex items-center cursor-pointer gap-2">
            <Location className="size-4 stroke-title" />
            <p className="text-title text-lg">{tCommon("categories.tourism")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
