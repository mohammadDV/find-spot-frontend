import { StatusCode } from "@/constants/enums";
import { getFetch } from "@/core/publicService";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { createFileUrl } from "@/lib/utils";
import { BusinessSummary } from "@/types/business.type";
import { Category } from "@/types/category.type";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { BannerSlider } from "./_components/bannerSilder/BannerSlider";
import { BusinessCard } from "./_components/cards/BusinessCard";
import { HorizontalPostCard } from "./_components/cards/HorizontalPostCard";
import { VerticalPostCard } from "./_components/cards/VerticalPostCard";
import { Footer } from "./_components/footer/Footer";
import { MainHeader } from "./_components/headers/MainHeader";
import Hero from "./_components/hero/Hero";
import { TitleSection } from "./_components/titleSection";
import { PostsResponse } from "@/types/post.type";

interface FeaturedBusinessesService {
  status: StatusCode;
  data: {
    offers: Array<BusinessSummary>,
    weekends: Array<BusinessSummary>,
  }
}

async function getFeaturedBusinesses(): Promise<FeaturedBusinessesService> {
  return await getFetch<FeaturedBusinessesService>("/businesses/featured");
}

async function getActiveCategories(): Promise<Array<Category>> {
  return await getFetch<Array<Category>>("/active-categories");
}

async function getLatestPosts(): Promise<PostsResponse> {
  return await getFetch<PostsResponse>("/posts/latest");
}

export default async function Home() {
  const tPages = await getTranslations("pages");
  const tCommon = await getTranslations("common");
  const isMobile = await isMobileDevice();

  const [
    featuredBusinessesData,
    activeCategoriesData,
    latestPostsData
  ] = await Promise.all([
    getFeaturedBusinesses(),
    getActiveCategories(),
    getLatestPosts()
  ])

  return (
    <>
      <MainHeader />
      <main>
        <Hero />
        {isMobile && (
          <div className="mt-8 container mx-auto px-4">
            <div className="grid grid-cols-5 gap-x-4 gap-y-2">
              {activeCategoriesData?.slice(0, 10).map(item => (
                <div
                  key={item.id}
                  className="py-1 flex flex-col justify-center items-center gap-1"
                >
                  <Image src={createFileUrl(item.image!)} alt="" width={24} height={24} />
                  <h3 className="text-description text-sm">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 lg:mt-16 container mx-auto px-4">
          <TitleSection title={tPages("home.specialOffers")} link="/" />
          <div className="mt-4 lg:mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {featuredBusinessesData?.data.offers?.slice(0, 6).map(item => (
              <BusinessCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                location={item.area.title}
                rate={item.rate}
                start_amount={item.start_amount} />
            ))}
          </div>
        </div>
        <div className="mt-10 lg:mt-24">
          <BannerSlider />
        </div>
        <div className="mt-10 lg:mt-24 container mx-auto px-4">
          <TitleSection title={tPages("home.weekend")} link="/" />
          <div className="mt-4 lg:mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {featuredBusinessesData?.data.weekends?.slice(0, isMobile ? 4 : 3).map(item => (
              <BusinessCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                location={item.area.title}
                rate={item.rate}
                start_amount={item.start_amount} />
            ))}
          </div>
        </div>
        {!isMobile && (
          <div className="mt-24 container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold text-title">
              {tPages("home.categories")}
            </h2>
            <div className="grid lg:grid-cols-5 gap-8 mt-10">
              {activeCategoriesData?.slice(0, 10).map(item => (
                <div
                  key={item.id}
                  className="py-10 cursor-pointer border border-border rounded-3xl flex flex-col justify-center items-center gap-4"
                >
                  <Image src={createFileUrl(item.image!)} alt="" width={56} height={56} />
                  <h3 className="text-description text-lg">{item.title}</h3>
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
              {latestPostsData.data?.slice(0, 3).map(item => (
                <VerticalPostCard data={item} />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex justify-between gap-6">
              <div className="flex flex-col gap-6 flex-1">
                <HorizontalPostCard data={latestPostsData.data?.[0]} />
                <HorizontalPostCard data={latestPostsData.data?.[1]} />
              </div>
              <div className="w-sm">
                <VerticalPostCard data={latestPostsData.data?.[2]} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
