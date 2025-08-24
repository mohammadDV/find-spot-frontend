import {
  useCommonTranslation,
  usePagesTranslation,
} from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import {
  Car,
  HambergerMenu,
  Health,
  House,
  Reserve,
  SearchNormal1,
} from "iconsax-react";

const Hero = () => {
  const tCommon = useCommonTranslation();
  const tPages = usePagesTranslation();

  return (
    <div className="relative h-[630px] w-full relative bg-[url('/images/hero.jpg')] -mt-24 z-10 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0"></div>
      <div className="w-3xl flex flex-col items-center mb-20">
        <h1 className="text-white text-4xl font-bold">
          {tPages("home.title")}
        </h1>
        <div className="flex items-center w-full justify-between mt-8">
          <div className="flex items-center gap-2">
            <HambergerMenu className="size-4 stroke-white" />
            <p className="text-xl font-light text-white">
              {tCommon("categories.all")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Reserve className="size-4 stroke-white" />
            <p className="text-xl font-light text-white">
              {tCommon("categories.restaurants")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <House className="size-4 stroke-white" />
            <p className="text-xl font-light text-white">
              {tCommon("categories.house")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Car className="size-4 stroke-white" />
            <p className="text-xl font-light text-white">
              {tCommon("categories.vehicle")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Health className="size-4 stroke-white" />
            <p className="text-xl font-light text-white">
              {tCommon("categories.health")}
            </p>
          </div>
        </div>
        <div className="w-full p-6 rounded-3xl shadow-[0px_4px_20px_0px_#00000010] backdrop-blur-md bg-white/15 mt-3 border border-white/30 flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <SearchNormal1 className="size-6 stroke-white absolute right-3 top-3 rotate-90" />
            <input
              className="w-full border border-white/60 rounded-xl outline-none p-3 pr-11 bg-transparent text-white"
              placeholder={tCommon("buttons.search")}
            />
          </div>
          <Button variant={"secondary"} size={"medium"}>
            {tCommon("buttons.search")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
