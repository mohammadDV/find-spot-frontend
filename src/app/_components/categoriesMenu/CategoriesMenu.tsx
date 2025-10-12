"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { Car, Health, House, Reserve, HambergerMenu, Location } from "iconsax-react";
import { Category } from "@/types/category.type";
import { getAllCategories } from "../hero/_api/getAllCategories";
import { createFileUrl } from "@/lib/utils";

export const CategoriesMenu = () => {
  const tCommon = useCommonTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="hidden lg:block w-full bg-background py-1">
      <div className="container mx-auto px-4">
        <div className="w-full flex items-center justify-between">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <HambergerMenu className="stroke-title size-4" />
                  <span className="text-title text-lg">{tCommon("categories.all")}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 min-w-max z-50">
                  {loading
                    ? <div className="flex justify-center items-center py-8">
                      <div className="text-description">{tCommon("messages.loading")}</div>
                    </div>
                    : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
                      {categories.map((category) => (
                        <div key={category.id} className="space-y-1">
                          <Link
                            href={`/search?category=${category.id}`}
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
                          </Link>

                          {category.children && category.children.length > 0 && (
                            <div className="space-y-1">
                              {category.children.map((child, index) => (
                                <Link
                                  key={index}
                                  href={`/search?category=${child.id}`}
                                  className="w-full p-2 hover:bg-gray-50 cursor-pointer rounded-md transition-colors text-right block"
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
                    </div>}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href={"/search?category=2"} className="flex items-center cursor-pointer gap-2">
            <Reserve className="size-4 stroke-title" />
            <p className="text-title text-lg">
              {tCommon("categories.restaurants")}
            </p>
          </Link>
          <Link href={"/search?category=13"} className="flex items-center cursor-pointer gap-2">
            <House className="size-4 stroke-title" />
            <p className="text-title text-lg">
              {tCommon("categories.house")}
            </p>
          </Link>
          <Link href={"/search?category=10"} className="flex items-center cursor-pointer gap-2">
            <Car className="size-4 stroke-title" />
            <p className="text-title text-lg">
              {tCommon("categories.vehicle")}
            </p>
          </Link>
          <Link href={"/search?category=3"} className="flex items-center cursor-pointer gap-2">
            <Health className="size-4 stroke-title" />
            <p className="text-title text-lg">
              {tCommon("categories.health")}
            </p>
          </Link>
          <Link href={"/search?category=11"} className="flex items-center cursor-pointer gap-2">
            <Location className="size-4 stroke-title" />
            <p className="text-title text-lg">
              {tCommon("categories.tourism")}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}