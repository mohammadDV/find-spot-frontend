import Image from "next/image";
import bizImg from "@/assets/images/biz.jpg";
import Star from "@/ui/star";
import {
  ArchiveAdd,
  BookSaved,
  Call,
  Clock,
  Gallery,
  Global,
  Location,
  Share,
  ShieldTick,
  Star1,
} from "iconsax-react";
import { Badge } from "@/ui/badge";
import { getTranslations } from "next-intl/server";
import { Button } from "@/ui/button";

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
        <div className="relative container px-4 mx-auto z-10 h-full">
          <div className="flex flex-col justify-end pb-11 items-start h-full">
            <h1 className="text-[40px] font-bold text-white">
              رستوران مهمت افندی کادیکوی
            </h1>
            <div className="flex items-center gap-1 mt-6">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 lg:size-8" />
                ))}
              </div>
              <p className="text-2xs lg:text-xl text-white">
                (2.5 از مجموع 128 امتیاز)
              </p>
            </div>
            <div className="flex items-center gap-2 my-4">
              <Location className="stroke-white size-3 lg:size-6" />
              <p className="text-xs lg:text-lg text-white">Umraniye, carsi</p>
            </div>
            <div className="flex items-center gap-2">
              <ShieldTick className="stroke-success size-3 lg:size-6" />
              <p className="text-xs lg:text-xl font-bold text-white">₺₺</p>
            </div>
            <div className="flex items-center flex-wrap gap-2 my-4">
              <Badge variant={"secondary"}>قهوه</Badge>
              <Badge variant={"secondary"}>کباب</Badge>
              <Badge variant={"secondary"}>دسر ترکی</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="stroke-white size-3 lg:size-6" />
              <p className="text-xs lg:text-lg text-white">
                12:00 - 14:00 شنبه تا پنجشنبه
              </p>
            </div>
            <div className="mt-10 flex items-center justify-end w-full gap-4">
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

      <section className="mt-14 container px-4 mx-auto">
        <div className="flex justify-between gap-10">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-4">
              <Button variant={"primary"} size={"medium"} className="px-10">
                <Star1 className="stroke-white size-3 lg:size-6" />
                {tCommon("buttons.submitComment")}
              </Button>
              <Button variant={"outline"} size={"medium"}>
                {tCommon("buttons.menu")}
                <BookSaved className="stroke-primary size-3 lg:size-6" />
              </Button>
              <Button variant={"outline"} size={"medium"}>
                {tCommon("buttons.share")}
                <Share className="stroke-primary size-3 lg:size-6" />
              </Button>
              <Button variant={"outline"} size={"medium"}>
                {tCommon("buttons.save")}
                <ArchiveAdd className="stroke-primary size-3 lg:size-6" />
              </Button>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 mt-8">
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
            <p className="mt-4 lg:text-lg text-title">
              در اینجا، هر غذا داستانی دارد؛ داستانی از طعم‌های سنتی ترکی، از
              دست‌پخت‌هایی که از دل فرهنگ و تاریخ آمده‌اند، و از مهربانی‌ای که
              در هر بشقاب جاری‌ست. از کباب‌های آبدار گرفته تا پیش‌غذاهای رنگارنگ
              و دسرهای وسوسه‌انگیز ترک، همه چیز با عشق آماده می‌شود . با همان
              وسواسی که مادربزرگ‌ها برای عزیزترین‌هایشان غذا می‌پزند.
            </p>
            <div className="flex items-center gap-1 lg:gap-2 mt-8">
              <Image
                src={"/images/finybo-icon.svg"}
                alt="finybo icon"
                width={24}
                height={24}
                className="size-4 lg:size-6"
              />
              <h2 className="text-title lg:text-2xl font-bold">آدرس و ساعت</h2>
            </div>
            <div className="flex gap-6 mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385399.3519135348!2d28.682539048623084!3d41.00485196902631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zSXN0YW5idWwsIMSwc3RhbmJ1bCwgVMO8cmtpeWU!5e0!3m2!1sen!2s!4v1756486573705!5m2!1sen!2s"
                width="473"
                allowFullScreen={true}
                className="rounded-xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="flex-1 h-full bg-card rounded-xl p-4 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-lg text-title">شنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-lg text-title">یکشنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-lg text-title">دوشنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-lg text-title">سه‌شنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-lg text-title">چهارشنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-lg text-title">پنجشنبه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between">
                  <p className="text-lg text-title">جمعه</p>
                  <p className="text-xs text-title">10 صبح تا 11 شب</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 mt-8">
              <Image
                src={"/images/finybo-icon.svg"}
                alt="finybo icon"
                width={24}
                height={24}
                className="size-4 lg:size-6"
              />
              <h2 className="text-title lg:text-2xl font-bold">امکانات</h2>
            </div>
            <div className="flex items-center gap-3 mt-4">
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
          </div>

          <div className="lg:w-1/3">
            <div className="w-full shadow-card rounded-2xl p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Global className="stroke-title size-6" />
                  <p className="text-xs text-title">{tPages("biz.website")}</p>
                </div>
                <p className="text-sm text-title text-left">mehmet.efendi.tr</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Call className="stroke-title size-6" />
                  <p className="text-xs text-title">
                    {tPages("biz.phoneNumber")}
                  </p>
                </div>
                <p className="text-sm text-title text-left">05379786435</p>
              </div>
              <div className="flex items-center justify-between gap-3">
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
      </section>
    </>
  );
}
