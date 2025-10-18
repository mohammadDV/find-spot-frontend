import {
  useCommonTranslation,
  usePagesTranslation,
} from "@/hooks/useTranslation";
import {
  Car,
  Health,
  House,
  Reserve,
} from "iconsax-react";
import { SearchSuggestions } from "./SearchSuggestions";
import { CategorySelector } from "./CategorySelector";
import Link from "next/link";

const Hero = () => {
  const tCommon = useCommonTranslation();
  const tPages = usePagesTranslation();

  return (
    <div className="relative h-[420px] lg:h-[630px] 2xl:h-[760px] w-full bg-[url('/images/hero.jpg')] -mt-24 z-10 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0"></div>
      <div className="lg:w-3xl flex flex-col items-center w-full p-4 lg:p-0 mt-12 lg:mb-20 2xl:mb-44">
        <h1 className="text-white text-2xl lg:text-4xl font-bold">
          {tPages("home.title")}
        </h1>
        <div className="hidden lg:flex items-center w-full justify-between lg:mt-8">
          <CategorySelector />
          <Link href={"/search?category=2"} className="flex items-center cursor-pointer gap-2 z-10">
            <Reserve className="size-4 stroke-white" />
            <p className="text-xl font-light text-white">
              {tCommon("categories.restaurants")}
            </p>
          </Link>
          <Link href={"/search?category=13"} className="flex items-center cursor-pointer gap-2 z-10">
            <House className="size-4 stroke-white" />
            <p className="text-xl font-light text-white">
              {tCommon("categories.house")}
            </p>
          </Link>
          <Link href={"/search?category=10"} className="flex items-center cursor-pointer gap-2 z-10">
            <Car className="size-4 stroke-white" />
            <p className="text-xl font-light text-white">
              {tCommon("categories.vehicle")}
            </p>
          </Link>
          <Link href={"/search?category=3"} className="flex items-center cursor-pointer gap-2 z-10">
            <Health className="size-4 stroke-white" />
            <p className="text-xl font-light text-white">
              {tCommon("categories.health")}
            </p>
          </Link>
        </div>
        <div className="w-full p-6 rounded-3xl shadow-[0px_4px_20px_0px_#00000010] backdrop-blur-sm lg:backdrop-blur-md bg-white/15 mt-10 lg:mt-3 border border-white/30">
          <SearchSuggestions />
        </div>
      </div>
    </div>
  );
};

export default Hero;
