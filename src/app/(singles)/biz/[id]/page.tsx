import Image from "next/image";
import bizImg from "@/assets/images/biz.jpg";
import Star from "@/ui/star";
import {
  ArchiveAdd,
  ArrowDown2,
  BookSaved,
  Call,
  Clock,
  Gallery,
  Global,
  Like1,
  Location,
  Share,
  ShieldTick,
  Star1,
} from "iconsax-react";
import { Badge } from "@/ui/badge";
import { getTranslations } from "next-intl/server";
import { Button } from "@/ui/button";
import { Progress } from "@/ui/progress";
import sampleAvatar from "@/assets/images/sample-avatar.png";
import foodImg from "@/assets/images/food.jpg";
import { TitleSection } from "@/app/_components/titleSection";
import { BusinessCard } from "@/app/_components/cards/BusinessCard";

export default async function BizPage() {
  const tCommon = await getTranslations("common");
  const tPages = await getTranslations("pages");

  return (
    <>
      <section className="relative lg:h-[560px] w-full">
        <div className="absolute inset-0">
          <Image
            src={bizImg}
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
              رستوران مهمت افندی کادیکوی
            </h1>
            <div className="flex items-center gap-2 mt-6">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 lg:size-8" />
                ))}
              </div>
              <p className="text-sm lg:text-xl text-white">
                (2.5 از مجموع 128 امتیاز)
              </p>
            </div>
            <div className="flex items-center gap-2 my-2 lg:my-4">
              <Location className="stroke-white size-4 lg:size-6" />
              <p className="text-xs lg:text-lg text-white">Umraniye, carsi</p>
            </div>
            <div className="flex items-center gap-2">
              <ShieldTick className="stroke-success size-4 lg:size-6" />
              <p className="text-xs lg:text-xl font-bold text-white">₺₺</p>
            </div>
            <div className="flex items-center flex-wrap gap-2 my-2 lg:my-4">
              <Badge variant={"secondary"}>قهوه</Badge>
              <Badge variant={"secondary"}>کباب</Badge>
              <Badge variant={"secondary"}>دسر ترکی</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="stroke-white size-4 lg:size-6" />
              <p className="text-xs lg:text-lg text-white">
                12:00 - 14:00 شنبه تا پنجشنبه
              </p>
            </div>
            <div className="mt-6 lg:mt-10 flex items-center lg:justify-end w-full gap-4">
              <Button
                variant={"outline"}
                size={"small"}
                className="border-white text-white px-4"
              >
                <Location className="stroke-white size-3 lg:size-6" />
                {tCommon("buttons.map")}
              </Button>
              <Button
                variant={"outline"}
                size={"small"}
                className="border-white text-white px-4"
              >
                <Gallery className="stroke-white size-3 lg:size-6" />
                {tCommon("buttons.seeOtherImages")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 lg:mt-14 container px-4 mx-auto">
        <div className="flex justify-between gap-10">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-2 lg:gap-4">
              <Button
                variant={"primary"}
                size={"medium"}
                className="px-4 lg:px-10 text-2xs lg:text-base rounded-lg lg:rounded-xl py-2 lg:py-2.5">
                <Star1 className="stroke-white size-4 lg:size-6" />
                {tCommon("buttons.submitComment")}
              </Button>
              <Button
                variant={"outline"}
                size={"medium"}
                className="text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5">
                {tCommon("buttons.menu")}
                <BookSaved className="stroke-primary size-4 lg:size-6" />
              </Button>
              <Button
                variant={"outline"}
                size={"medium"}
                className="text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5">
                {tCommon("buttons.share")}
                <Share className="stroke-primary size-4 lg:size-6" />
              </Button>
              <Button
                variant={"outline"}
                size={"medium"}
                className="text-2xs lg:text-base rounded-lg lg:rounded-xl !px-2 py-2 lg:!px-5 lg:py-2.5">
                {tCommon("buttons.save")}
                <ArchiveAdd className="stroke-primary size-4 lg:size-6" />
              </Button>
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
                رستوران مهمت افندی
              </h2>
            </div>
            <p className="mt-2 lg:mt-4 text-xs lg:text-lg text-title">
              در اینجا، هر غذا داستانی دارد؛ داستانی از طعم‌های سنتی ترکی، از
              دست‌پخت‌هایی که از دل فرهنگ و تاریخ آمده‌اند، و از مهربانی‌ای که
              در هر بشقاب جاری‌ست. از کباب‌های آبدار گرفته تا پیش‌غذاهای رنگارنگ
              و دسرهای وسوسه‌انگیز ترک، همه چیز با عشق آماده می‌شود . با همان
              وسواسی که مادربزرگ‌ها برای عزیزترین‌هایشان غذا می‌پزند.
            </p>
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385399.3519135348!2d28.682539048623084!3d41.00485196902631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zSXN0YW5idWwsIMSwc3RhbmJ1bCwgVMO8cmtpeWU!5e0!3m2!1sen!2s!4v1756486573705!5m2!1sen!2s"
                allowFullScreen={true}
                className="rounded-xl lg:w-[473px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="flex-1 h-full bg-card rounded-xl p-4 flex flex-col gap-2 lg:gap-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">شنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">یکشنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">دوشنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">سه‌شنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">چهارشنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">پنجشنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-xs lg:text-lg text-title">جمعه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
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
                <Badge variant={"grey"} className="text-sm">
                  پارکینگ
                </Badge>
                <Badge variant={"grey"} className="text-sm">
                  دسترسی به حمل و نقل عمومی
                </Badge>
                <Badge variant={"grey"} className="text-sm">
                  پیک بیرون بر
                </Badge>
                <Badge variant={"grey"} className="text-sm">
                  فضای باز
                </Badge>
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
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-xs lg:text-lg text-title w-10 lg:w-14">
                    {tPages("biz.great")}
                  </p>
                  <Progress value={90} className="flex-1" indicatorColorClass="bg-secondary" />
                  <p className="text-xs lg:text-lg text-title w-6 lg:w-7">
                    142
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-xs lg:text-lg text-title w-10 lg:w-14">
                    {tPages("biz.good")}
                  </p>
                  <Progress value={75} className="flex-1" indicatorColorClass="bg-[#DE3314]" />
                  <p className="text-xs lg:text-lg text-title w-6 lg:w-7">
                    12
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-xs lg:text-lg text-title w-10 lg:w-14">
                    {tPages("biz.medium")}
                  </p>
                  <Progress value={60} className="flex-1" indicatorColorClass="bg-[#E14212]" />
                  <p className="text-xs lg:text-lg text-title w-6 lg:w-7">
                    2
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-xs lg:text-lg text-title w-10 lg:w-14">
                    {tPages("biz.bad")}
                  </p>
                  <Progress value={45} className="flex-1" indicatorColorClass="bg-[#E86310]" />
                  <p className="text-xs lg:text-lg text-title w-6 lg:w-7">
                    3
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-xs lg:text-lg text-title w-10 lg:w-14">
                    {tPages("biz.tooBad")}
                  </p>
                  <Progress value={20} className="flex-1" indicatorColorClass="bg-[#F59D0C]" />
                  <p className="text-xs lg:text-lg text-title w-6 lg:w-7">
                    15
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-xs lg:text-sm text-black">
                  خیلی خوب
                </p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-4 lg:size-8" />
                  ))}
                </div>
                <p className="text-xs lg:text-sm text-black">
                  (2.5 از مجموع 128 امتیاز)
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
            <div className="mt-2 lg:mt-4 flex items-center justify-between gap-3 lg:gap-6">
              <div className="flex flex-col w-1/2 gap-3 lg:gap-6">
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-xs lg:text-lg text-title w-12 lg:w-20 text-center">
                    کیفیت غذا
                  </p>
                  <Progress value={80} className="flex-1" />
                  <p className="text-2xs lg:text-lg text-title w-6 lg:w-7">
                    4.5
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-xs lg:text-lg text-title w-12 lg:w-20 text-center">
                    فضای آرام
                  </p>
                  <Progress value={80} className="flex-1" />
                  <p className="text-2xs lg:text-lg text-title w-6 lg:w-7">
                    4.5
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-1/2 gap-3 lg:gap-6">
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-xs lg:text-lg text-title w-12 lg:w-20 text-center">
                    کیفیت غذا
                  </p>
                  <Progress value={80} className="flex-1" />
                  <p className="text-2xs lg:text-lg text-title w-6 lg:w-7">
                    4.5
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-xs lg:text-lg text-title w-12 lg:w-20 text-center">
                    فضای آرام
                  </p>
                  <Progress value={80} className="flex-1" />
                  <p className="text-2xs lg:text-lg text-title w-6 lg:w-7">
                    4.5
                  </p>
                </div>
              </div>
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
                <h2 className="text-title lg:text-3xl font-bold">
                  {tPages("biz.comments")}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <Button variant={"outline"} size={"small"}>
                  {tPages("biz.newestComments")}
                  <ArrowDown2 className="size-4 stroke-primary mr-1" />
                </Button>
                <Button variant={"outline"} size={"small"}>
                  {tPages("biz.highestScore")}
                  <ArrowDown2 className="size-4 stroke-primary mr-1" />
                </Button>
              </div>
            </div>
            <div className="mt-3 lg:mt-6 flex flex-col gap-2 lg:gap-6">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="p-3 lg:p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Image src={sampleAvatar} alt="" width={57} height={57} className="rounded-full" />
                      <div className="flex flex-col gap-2">
                        <p className="text-title font-medium">مریم عطایی</p>
                        <p className="text-title text-xs">124 نظر</p>
                      </div>
                    </div>
                    <Button variant={"link"} size={"small"} className="!px-2">
                      {tPages("biz.likeComment")}
                      <Like1 className="stroke-primary size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-3 lg:mt-6">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="size-4" />
                      ))}
                    </div>
                    <p className="text-xs text-description">
                      27 آذر 1403
                    </p>
                  </div>
                  <p className="my-2.5 text-xs lg:text-lg text-description">
                    دنبال ته‌چین خوشمزه یا دیزی اصیل ایرانی هستی؟ این لیست بهت کمک می‌کنه بهترین رستوران‌های ایرانی استانبول رو پیدا کنی.
                  </p>
                  <div className="flex items-center flex-wrap gap-2">
                    <Badge variant={"secondary"} className="text-xs lg:text-sm">
                      کیفیت غذای خوب
                    </Badge>
                    <Badge variant={"secondary"} className="text-xs lg:text-sm">
                      فضای آرام و راحت
                    </Badge>
                    <Badge variant={"secondary"} className="text-xs lg:text-sm">
                      دسترسی به حمل و نقل عمومی
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 lg:gap-4 mt-3 lg:mt-6">
                    {Array.from({ length: 3 }, (_, i) => (
                      <Image key={i} src={foodImg} alt="" width={177} height={127} className="w-full rounded-sm h-[87px] lg:h-[137px] object-cover" />
                    ))}
                    <div className="w-full relative rounded-sm overflow-hidden">
                      <div className="absolute inset-0 bg-black/40"></div>
                      <Image src={foodImg} alt="" width={177} height={127} className="w-full rounded-sm h-[87px] lg:h-[137px] object-cover" />
                      <p className="flex absolute h-full top-0 w-full z-10 items-center justify-center font-bold text-2xl text-white">
                        +12
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/3">
            <div className="w-full shadow-card rounded-2xl p-6 flex flex-col gap-6 sticky top-28">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Global className="stroke-title size-6" />
                  <p className="text-xs text-title">{tPages("biz.website")}</p>
                </div>
                <p className="text-sm text-title text-left">mehmet.efendi.tr</p>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Call className="stroke-title size-6" />
                  <p className="text-xs text-title">
                    {tPages("biz.phoneNumber")}
                  </p>
                </div>
                <p className="text-sm text-title text-left">05379786435</p>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Location className="stroke-title size-6" />
                  <p className="text-xs text-title">{tPages("biz.address")}</p>
                </div>
                <p className="text-sm text-title text-left">
                  Mimar Hayrettin Mh. Divan-i Ali Sk. No:12/C 34126 Istanbul
                  Turkey
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-24 container mx-auto">
          <TitleSection title={tPages("biz.suggestions")} link="/" />
          <div className="mt-4 lg:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {Array.from({ length: 4 }, (_, i) => (
              <BusinessCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
