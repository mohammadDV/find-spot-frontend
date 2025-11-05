import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { Map } from "@/app/_components/map/Map";
import { Pagination } from "@/app/_components/pagination/Pagination";
import { ShareSheet } from "@/app/_components/shareSheet";
import { TitleSection } from "@/app/_components/titleSection";
import facebookIcon from "@/assets/images/Facebook.png";
import instagramIcon from "@/assets/images/Instagram.png";
import tiktokIcon from "@/assets/images/tiktok.svg";
import whatsappIcon from "@/assets/images/whatsapp.svg";
import youtubeIcon from "@/assets/images/youtube.svg";
import { SITE_URL } from "@/configs/global";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { cn, createFileUrl, formatWebsiteUrl, isEmpty } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Progress } from "@/ui/progress";
import Star from "@/ui/star";
import {
  Call,
  Clock,
  Global,
  Location,
  ShieldTick
} from "iconsax-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ReviewCard } from "../../../_components/cards/ReviewCard";
import { getBusiness } from "../_api/getBusiness";
import { getBusinessReviews } from "../_api/getBusinessReviews";
import { getSimilarBusinesses } from "../_api/getSimilarBusinesses";
import { AddToFavorites } from "../_components/AddToFavorites";
import { ImageGallery } from "../_components/ImageGallery";
import { MenuViewer } from "../_components/MenuViewer";
import { ReviewSortFilter } from "../_components/ReviewSortFilter";
import { SubmitReview } from "../_components/SubmitReview";
import { StatusCode } from "@/constants/enums";
import { redirect } from "next/navigation";

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

type BusinessDays = {
  from_monday: number;
  to_monday: number;
  from_tuesday: number;
  to_tuesday: number;
  from_wednesday: number;
  to_wednesday: number;
  from_thursday: number;
  to_thursday: number;
  from_friday: number;
  to_friday: number;
  from_saturday: number;
  to_saturday: number;
  from_sunday: number;
  to_sunday: number;
};

export default async function BizPage({ params, searchParams }: BizPageProps) {
  const tCommon = await getTranslations("common");
  const tPages = await getTranslations("pages");
  const userData = await getUserData();
  const isMobile = await isMobileDevice();

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

  if (businessData?.status === StatusCode.Failed) {
    return redirect("/not-found");
  }

  const businessDays: { label: string; from: keyof BusinessDays; to: keyof BusinessDays }[] = [
    { label: tPages("biz.monday"), from: "from_monday", to: "to_monday" },
    { label: tPages("biz.tuesday"), from: "from_tuesday", to: "to_tuesday" },
    { label: tPages("biz.wednesday"), from: "from_wednesday", to: "to_wednesday" },
    { label: tPages("biz.thursday"), from: "from_thursday", to: "to_thursday" },
    { label: tPages("biz.friday"), from: "from_friday", to: "to_friday" },
    { label: tPages("biz.saturday"), from: "from_saturday", to: "to_saturday" },
    { label: tPages("biz.sunday"), from: "from_sunday", to: "to_sunday" },
  ];

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
            src={createFileUrl(businessData.business?.slider_image!)}
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
              {businessData.business?.title}
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
              <ShareSheet
                title={businessData.business.title}
                text={businessData.business.description}
                url={`${SITE_URL}/biz/${businessData.business.id}`}
              />
              <AddToFavorites
                id={businessData.business.id}
                userData={userData}
                isFavorite={businessData?.is_favorite} />
            </div>
            <div className="flex items-center gap-2 mt-4 lg:mt-8">
              <Image
                src={"/images/finybo-icon.png"}
                alt="finybo icon"
                width={24}
                height={24}
                className="size-4 lg:size-6"
              />
              <h2 className="text-title lg:text-3xl font-bold">
                {businessData.business.title}
              </h2>
            </div>
            <div
              className="mt-2 lg:mt-4 text-xs lg:text-lg text-title"
              dangerouslySetInnerHTML={{ __html: businessData.business?.description }}>
            </div>
            {businessData.business?.video && (
              <div className="mt-2 lg:mt-4">
                <video
                  controls
                  className="w-full rounded-xl"
                  src={createFileUrl(businessData.business.video)}
                />
              </div>
            )}
            {isMobile && <div className="mt-4">
              <div className="w-full shadow-card rounded-2xl p-6 flex flex-col gap-6 sticky top-28">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Global className="stroke-title size-6" />
                    <p className="text-xs text-title">{tPages("biz.website")}</p>
                  </div>
                  {businessData.business.website && <Link
                    href={formatWebsiteUrl(businessData.business.website)}
                    target="_blank"
                    className="text-sm text-title text-left">
                    {businessData.business.website}
                  </Link>}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Call className="stroke-title size-6" />
                    <p className="text-xs text-title">
                      {tPages("biz.phoneNumber")}
                    </p>
                  </div>
                  {businessData.business.phone && <Link
                    href={`tel:${businessData.business.phone}`}
                    className="text-sm text-title text-left">
                    {businessData.business.phone}
                  </Link>}
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
                {(businessData.business.facebook || businessData.business.instagram || businessData.business.youtube || businessData.business.tiktok || businessData.business.whatsapp) && (
                  <div className="flex items-center justify-end gap-3">
                    {businessData.business.facebook && (
                      <Link href={businessData.business.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <Image src={facebookIcon} alt="facebook" width={24} height={24} className="size-6" />
                      </Link>
                    )}
                    {businessData.business.instagram && (
                      <Link href={businessData.business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Image src={instagramIcon} alt="instagram" width={24} height={24} className="size-6" />
                      </Link>
                    )}
                    {businessData.business.youtube && (
                      <Link href={businessData.business.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <Image src={youtubeIcon} alt="youtube" width={24} height={24} className="size-6" />
                      </Link>
                    )}
                    {businessData.business.tiktok && (
                      <Link href={businessData.business.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                        <Image src={tiktokIcon} alt="tiktok" width={24} height={24} className="size-6" />
                      </Link>
                    )}
                    {businessData.business.whatsapp && (
                      <Link href={businessData.business.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <Image src={whatsappIcon} alt="whatsapp" width={24} height={24} className="size-6" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>}
            <div className="flex items-center gap-1 lg:gap-2 mt-4 lg:mt-8">
              <Image
                src={"/images/finybo-icon.png"}
                alt="finybo icon"
                width={24}
                height={24}
                className="size-4 lg:size-6"
              />
              <h2 className="text-title lg:text-2xl font-bold">{tPages("biz.addressAndHour")}</h2>
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-6 mt-2 lg:mt-4">
              <Link
                href={`https://www.google.com/maps?q=${businessData.business.lat},${businessData.business.long}`}
                target="_blank">
                <Map
                  lat={parseFloat(businessData.business.lat)}
                  long={parseFloat(businessData.business.long)}
                  className="rounded-xl lg:w-[473px] h-[300px]"
                />
              </Link>
              <div className="flex-1 h-full bg-card rounded-xl p-4 flex flex-col gap-2 lg:gap-1.5">
                {businessDays.map((day, index) => {
                  const from = businessData.business[day.from as keyof typeof businessData.business];
                  const to = businessData.business[day.to as keyof typeof businessData.business];
                  const isClosed = (!from && !to) || (from === 0 && to === 0);

                  return (
                    <Fragment key={day.label}>
                      <div className="flex items-center justify-between">
                        <p className="text-xs lg:text-lg text-title">{day.label}</p>
                        <p className="text-sm text-title">
                          {isClosed ? "تعطیل" : `${from} صبح تا ${to} شب`}
                        </p>
                      </div>
                      {index < businessDays.length - 1 && <hr className="border-t border-border" />}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 mt-4 lg:mt-8">
              <Image
                src={"/images/finybo-icon.png"}
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
                src={"/images/finybo-icon.png"}
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
                  {businessData.business.rate >= 5 ? tPages("biz.great") :
                    businessData.business.rate >= 4 ? tPages("biz.good") :
                      businessData.business.rate >= 3 ? tPages("biz.medium") :
                        businessData.business.rate >= 2 ? tPages("biz.bad") :
                          businessData.business.rate >= 1 ? tPages("biz.tooBad") : tPages("biz.noScoreYet")}
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
                src={"/images/finybo-icon.png"}
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
                  src={"/images/finybo-icon.png"}
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

          {!isMobile && <div className="lg:w-1/3">
            <div className="w-full shadow-card rounded-2xl p-6 flex flex-col gap-6 sticky top-28">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Global className="stroke-title size-6" />
                  <p className="text-xs text-title">{tPages("biz.website")}</p>
                </div>
                {businessData.business.website && <Link
                  href={formatWebsiteUrl(businessData.business.website)}
                  target="_blank"
                  className="text-sm text-title text-left">
                  {businessData.business.website}
                </Link>}
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Call className="stroke-title size-6" />
                  <p className="text-xs text-title">
                    {tPages("biz.phoneNumber")}
                  </p>
                </div>
                {businessData.business.phone && <Link
                  href={`tel:${businessData.business.phone}`}
                  className="text-sm text-title text-left">
                  {businessData.business.phone}
                </Link>}
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
              {(businessData.business.facebook || businessData.business.instagram || businessData.business.youtube || businessData.business.tiktok || businessData.business.whatsapp) && (
                <div className="flex items-center justify-end gap-3">
                  {businessData.business.facebook && (
                    <Link href={businessData.business.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Image src={facebookIcon} alt="facebook" width={24} height={24} className="size-6" />
                    </Link>
                  )}
                  {businessData.business.instagram && (
                    <Link href={businessData.business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Image src={instagramIcon} alt="instagram" width={24} height={24} className="size-6" />
                    </Link>
                  )}
                  {businessData.business.youtube && (
                    <Link href={businessData.business.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <Image src={youtubeIcon} alt="youtube" width={24} height={24} className="size-6" />
                    </Link>
                  )}
                  {businessData.business.tiktok && (
                    <Link href={businessData.business.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                      <Image src={tiktokIcon} alt="tiktok" width={24} height={24} className="size-6" />
                    </Link>
                  )}
                  {businessData.business.whatsapp && (
                    <Link href={businessData.business.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      <Image src={whatsappIcon} alt="whatsapp" width={24} height={24} className="size-6" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>}
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
