import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { Map } from "@/app/_components/map/Map";
import { Pagination } from "@/app/_components/pagination/Pagination";
import { TitleSection } from "@/app/_components/titleSection";
import { cn, createFileUrl, isEmpty } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Progress } from "@/ui/progress";
import Star from "@/ui/star";
import {
  Call,
  Clock,
  Global,
  Location,
  Share,
  ShieldTick,
  Star1
} from "iconsax-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ReviewCard } from "../../../_components/cards/ReviewCard";
import { getBusiness } from "../_api/getBusiness";
import { getBusinessReviews } from "../_api/getBusinessReviews";
import { getSimilarBusinesses } from "../_api/getSimilarBusinesses";
import { AddToFavorites } from "../_components/AddToFavorites";
import { ImageGallery } from "../_components/ImageGallery";
import { MenuViewer } from "../_components/MenuViewer";
import { ReviewSortFilter } from "../_components/ReviewSortFilter";
import { SubmitReview } from "../_components/SubmitReview";
import { getUserData } from "@/lib/getUserDataFromHeaders";

interface BizPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    column?: string;
  }>;
}

export default async function BizPage({ params, searchParams }: BizPageProps) {
  const tCommon = await getTranslations("common");
  const tPages = await getTranslations("pages");
  const userData = await getUserData();

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const page = parseInt(resolvedSearchParams?.page || "1");
  const sort = resolvedSearchParams?.sort;
  const column = resolvedSearchParams?.column;

  const [businessData, similarBusinessesData, reviewsData] = await Promise.all([
    getBusiness({ id: resolvedParams?.id || '' }),
    getSimilarBusinesses({ id: resolvedParams?.id || '' }),
    getBusinessReviews({
      id: resolvedParams?.id || '',
      page,
      count: 10,
      sort,
      column
    }),
  ])

  const colorClasses = [
    "bg-secondary",
    "bg-[#DE3314]",
    "bg-[#E14212]",
    "bg-[#E86310]",
    "bg-[#F59D0C]"
  ];
  const translationKeys = [
    "biz.great",
    "biz.good",
    "biz.medium",
    "biz.bad",
    "biz.tooBad"
  ];

  return (
    <>
      <section className="relative lg:h-[560px] w-full">
        <div className="absolute inset-0">
          <Image
            src={createFileUrl(businessData.business?.image!)}
            alt=""
            priority
            width={1420}
            height={600}
            quality={100}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative container px-4 py-4 lg:py-0 mx-auto z-10 h-full">
          <div className="flex flex-col justify-end pb-2 lg:pb-11 items-start h-full">
            <h1 className="text-2xl lg:text-[40px] font-bold text-white">
              {businessData.business.title}
            </h1>
            <div className="flex items-center gap-2 mt-6">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={cn("size-4 lg:size-8", index < businessData.business.rate ? "fill-warning" : "fill-border")} />
                ))}
              </div>
              <p className="text-sm lg:text-xl text-white">
                ({businessData.business.rate} از مجموع {businessData.business.reviews_count} امتیاز)
              </p>
            </div>
            <div className="flex items-center gap-2 my-2 lg:my-4">
              <Location className="stroke-white size-4 lg:size-6" />
              <p className="text-xs lg:text-lg text-white">{businessData.business.area.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <ShieldTick className="stroke-success size-4 lg:size-6" />
              <p className="text-xs lg:text-xl font-bold text-white">
                {"₺".repeat(businessData.business.amount_type)}
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-2 my-2 lg:my-4">
              {businessData.business.tags?.map(item => (
                <Badge key={item.id} variant={"secondary"}>{item.title}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="stroke-white size-4 lg:size-6" />
              <p className="text-xs lg:text-lg text-white">
                {businessData.business.opening_hours}
              </p>
            </div>
            <div className="mt-6 lg:mt-10 flex items-center lg:justify-end w-full gap-4">
              <Link
                href={`https://www.google.com/maps?q=${businessData.business.lat},${businessData.business.long}`}
                target="_blank"
                rel="noopener noreferrer">
                <Button
                  variant={"outline"}
                  size={"small"}
                  className="border-white text-white px-4"
                >
                  <Location className="stroke-white size-3 lg:size-6" />
                  {tCommon("buttons.map")}
                </Button>
              </Link>
              {!isEmpty(businessData.business.files) && <ImageGallery
                files={businessData.business.files}
                className="border-white text-white px-4"
              />}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 lg:mt-14 container px-4 mx-auto">
        <div className="flex justify-between gap-10">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-2 lg:gap-4">
              <SubmitReview bizId={businessData.business.id} userData={userData} categories={businessData.business.categories} />
              {businessData.business.menu_image && <MenuViewer
                menuImage={businessData.business.menu_image}
                className="text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5"
              />}
              <Button
                variant={"outline"}
                size={"medium"}
                className="text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5">
                {tCommon("buttons.share")}
                <Share className="stroke-primary size-4 lg:size-6" />
              </Button>
              <AddToFavorites id={businessData.business.id} />
            </div>
            <div className="flex items-center gap-2 mt-4 lg:mt-8">
              <Image
                src={"/images/finybo-icon.svg"}
                alt="finybo icon"
                width={24}
                height={24}
                className="size-4 lg:size-6"
              />
              <h2 className="text-title lg:text-3xl font-bold">
                {businessData.business.title}
              </h2>
            </div>
            <p className="mt-2 lg:mt-4 text-xs lg:text-lg text-title">
              {businessData.business.description}
            </p>
            {businessData.business?.video && (
              <div className="mt-2 lg:mt-4">
                <video
                  controls
                  className="w-full rounded-xl"
                  src={createFileUrl(businessData.business.video)}
                />
              </div>
            )}
            <div className="flex items-center gap-1 lg:gap-2 mt-4 lg:mt-8">
              <Image
                src={"/images/finybo-icon.svg"}
                alt="finybo icon"
                width={24}
                height={24}
                className="size-4 lg:size-6"
              />
              <h2 className="text-title lg:text-2xl font-bold">{tPages("biz.addressAndHour")}</h2>
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-6 mt-2 lg:mt-4">
              <Map
                lat={parseFloat(businessData.business.lat)}
                long={parseFloat(businessData.business.long)}
                className="rounded-xl lg:w-[473px] h-[300px]"
              />
              <div className="flex-1 h-full bg-card rounded-xl p-4 flex flex-col gap-2 lg:gap-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">شنبه</p>
                  <p className="text-sm text-title">
                    {businessData.business.from_saturday} صبح تا {businessData.business.to_saturday} شب
                  </p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">یکشنبه</p>
                  <p className="text-sm text-title">
                    {businessData.business.from_sunday} صبح تا {businessData.business.to_sunday} شب
                  </p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">دوشنبه</p>
                  <p className="text-sm text-title">
                    {businessData.business.from_monday} صبح تا {businessData.business.to_monday} شب
                  </p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">سه‌شنبه</p>
                  <p className="text-sm text-title">
                    {businessData.business.from_tuesday} صبح تا {businessData.business.to_tuesday} شب
                  </p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">چهارشنبه</p>
                  <p className="text-sm text-title">
                    {businessData.business.from_wednesday} صبح تا {businessData.business.to_wednesday} شب
                  </p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">پنجشنبه</p>
                  <p className="text-sm text-title">
                    {businessData.business.from_thursday} صبح تا {businessData.business.to_thursday} شب
                  </p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">جمعه</p>
                  <p className="text-sm text-title">
                    {businessData.business.from_friday} صبح تا {businessData.business.to_friday} شب
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 mt-4 lg:mt-8">
              <Image
                src={"/images/finybo-icon.svg"}
                alt="finybo icon"
                width={24}
                height={24}
                className="size-4 lg:size-6"
              />
              <h2 className="text-title lg:text-2xl font-bold">{tPages("biz.features")}</h2>
            </div>
            <div className="flex mt-2 lg:mt-4">
              <div className="flex items-center flex-wrap gap-2">
                {businessData.business.facilities?.map(item => (
                  <Badge key={item.id} variant={"grey"} className="text-sm">
                    {item.title}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 mt-4 lg:mt-8">
              <Image
                src={"/images/finybo-icon.svg"}
                alt="finybo icon"
                width={24}
                height={24}
                className="size-4 lg:size-6"
              />
              <h2 className="text-title lg:text-2xl font-bold">{tPages("biz.score")}</h2>
            </div>
            <div className="flex items-center justify-between gap-3 lg:gap-6 mt-2 lg:mt-4">
              <div className="flex flex-col gap-2 lg:gap-4 flex-1">
                {businessData.reviews.map((review, index) => {
                  return (
                    <div key={index} className="flex items-center justify-between gap-2.5">
                      <p className="text-xs lg:text-lg text-title w-10 lg:w-14">
                        {tPages(translationKeys[index] || "biz.great")}
                      </p>
                      <Progress
                        value={review.percentage}
                        className="flex-1"
                        indicatorColorClass={colorClasses[index] || "bg-secondary"}
                      />
                      <p className="text-xs lg:text-lg text-title w-6 lg:w-7">
                        {review.count}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-xs lg:text-sm text-black">
                  {businessData.business.rate >= 4 ? tPages("biz.tooBad") :
                    businessData.business.rate >= 3 ? tPages("biz.good") :
                      businessData.business.rate >= 2 ? tPages("biz.medium") :
                        businessData.business.rate >= 1 ? tPages("biz.bad") : tPages("biz.noScoreYet")}
                </p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={cn("size-4 lg:size-8", index < businessData.business.rate ? "fill-warning" : "fill-border")} />
                  ))}
                </div>
                <p className="text-xs lg:text-sm text-black">
                  ({businessData.business.rate} از مجموع {businessData.business.reviews_count} امتیاز)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 mt-4 lg:mt-8">
              <Image
                src={"/images/finybo-icon.svg"}
                alt="finybo icon"
                width={24}
                height={24}
                className="size-4 lg:size-6"
              />
              <h2 className="text-title lg:text-2xl font-bold">{tPages("biz.servicesQuality")}</h2>
            </div>
            <div className="mt-2 lg:mt-4 grid grid-cols-2 gap-3 lg:gap-6">
              {businessData.quality_services.map((service, index) => {
                const progressValue = Math.min((service.count / Math.max(...businessData.quality_services.map(s => s.count))) * 100, 100);
                const rating = (service.count * 5 / Math.max(...businessData.quality_services.map(s => s.count))).toFixed(1);
                return (
                  <div key={index} className="flex items-center justify-between gap-2.5">
                    <p className="text-xs lg:text-lg text-title w-12 lg:w-20 text-center">
                      {service.title}
                    </p>
                    <Progress value={progressValue} className="flex-1" />
                    <p className="text-2xs lg:text-lg text-title w-6 lg:w-7">
                      {rating}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-8">
              <div className="flex items-center gap-1 lg:gap-2">
                <Image
                  src={"/images/finybo-icon.svg"}
                  alt="finybo icon"
                  width={24}
                  height={24}
                  className="size-4 lg:size-6"
                />
                <h2 className="text-title lg:text-2xl font-bold">
                  {tPages("biz.comments")}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <ReviewSortFilter />
              </div>
            </div>
            <div className="mt-3 lg:mt-6 flex flex-col gap-2 lg:gap-6">
              {reviewsData.data.map((review) => (
                <ReviewCard key={review.id} review={review} enableLike />
              ))}
            </div>
            {reviewsData.last_page > 1 && (
              <Pagination
                currentPage={reviewsData.current_page}
                lastPage={reviewsData.last_page}
                links={reviewsData.links}
                total={reviewsData.total}
                routeUrl={`/biz/${resolvedParams.id}`}
              />
            )}
          </div>

          <div className="hidden lg:block lg:w-1/3">
            <div className="w-full shadow-card rounded-2xl p-6 flex flex-col gap-6 sticky top-28">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Global className="stroke-title size-6" />
                  <p className="text-xs text-title">{tPages("biz.website")}</p>
                </div>
                <p className="text-sm text-title text-left">{businessData.business.website}</p>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Call className="stroke-title size-6" />
                  <p className="text-xs text-title">
                    {tPages("biz.phoneNumber")}
                  </p>
                </div>
                <p className="text-sm text-title text-left">{businessData.business.phone}</p>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Location className="stroke-title size-6" />
                  <p className="text-xs text-title">{tPages("biz.address")}</p>
                </div>
                <p className="text-sm text-title text-left">
                  {businessData.business.address}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-24 container mx-auto">
          <TitleSection title={tPages("biz.suggestions")} link="/" />
          <div className="mt-4 lg:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {similarBusinessesData?.map(item => (
              <BusinessCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                location={item.area?.title}
                rate={item.rate}
                start_amount={item.start_amount} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
