import { getTranslations } from "next-intl/server";
import { MainHeader } from "./_components/headers/MainHeader";
import Hero from "./_components/hero/Hero";
import { TitleSection } from "./_components/titleSection";
import { BusinessCard } from "./_components/cards/BusinessCard";
import { BannerSlider } from "./_components/bannerSilder/BannerSlider";
import { Coffee } from "iconsax-react";
import { HorizontalPostCard } from "./_components/cards/HorizontalPostCard";
import { VerticalPostCard } from "./_components/cards/VerticalPostCard";
import { Footer } from "./_components/footer/Footer";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";

export default async function Home() {
  const tPages = await getTranslations("pages");
  const tCommon = await getTranslations("common");
  const isMobile = await isMobileDevice();

  return (
    <>
      <MainHeader />
      <main>
        <Hero />
        {isMobile && (
          <div className="mt-8 container mx-auto px-4">
            <div className="grid grid-cols-5 gap-x-4 gap-y-2">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="py-1 flex flex-col justify-center items-center gap-1"
                >
                  <Coffee className="stroke-description size-6" />
                  <h3 className="text-description text-sm">کافه‌ها</h3>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 lg:mt-16 container mx-auto px-4">
          <TitleSection title={tPages("home.specialOffers")} link="/" />
          <div className="mt-4 lg:mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <BusinessCard key={i} />
            ))}
          </div>
        </div>
        <div className="mt-10 lg:mt-24">
          <BannerSlider />
        </div>
        <div className="mt-10 lg:mt-24 container mx-auto px-4">
          <TitleSection title={tPages("home.weekend")} link="/" />
          <div className="mt-4 lg:mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {Array.from({ length: isMobile ? 4 : 3 }, (_, i) => (
              <BusinessCard key={i} />
            ))}
          </div>
        </div>
        {!isMobile && (
          <div className="mt-24 container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold text-title">
              {tPages("home.categories")}
            </h2>
            <div className="grid lg:grid-cols-5 gap-8 mt-10">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="py-10 border border-border rounded-3xl flex flex-col justify-center items-center gap-4"
                >
                  <Coffee className="stroke-description size-14" />
                  <h3 className="text-description text-lg">کافه‌ها</h3>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10 lg:mt-24 container mx-auto px-4">
          <TitleSection
            title={tPages("home.news")}
            link="/"
            linkLabel={tCommon("buttons.readAll")}
          />
          {isMobile ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }, (_, i) => (
                <VerticalPostCard key={i} />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex justify-between gap-6">
              <div className="flex flex-col gap-6 flex-1">
                <HorizontalPostCard />
                <HorizontalPostCard />
              </div>
              <div className="w-sm">
                <VerticalPostCard />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
