"use client";

import bannerSample from "@/assets/images/banner-sample.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { EventSummary } from "@/types/event.type";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { createFileUrl } from "@/lib/utils";

interface BannerSliderProps {
  data: Array<EventSummary>
}

export const BannerSlider = ({ data }: BannerSliderProps) => {
  const t = useCommonTranslation();

  return (
    <>
      <section className="relative w-full z-20 h-[298px] lg:h-[555px] overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: ".banners-pagination",
            bulletClass: "banners-pagination-bullet",
            bulletActiveClass: "banners-pagination-bullet-active",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1000}
          loop={true}
          className="h-full"
        >
          {data.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0">
                  <Image
                    src={createFileUrl(slide.slider_image!)}
                    alt=""
                    priority={index === 0}
                    quality={100}
                    width={1440}
                    height={555}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative lg:max-w-3xl px-4 mx-auto z-10 h-full flex items-center">
                  <div className="flex flex-col justify-center items-start h-full">
                    <div className="flex items-center gap-2.5">
                      <Badge
                        variant={"primary"}
                        className="lg:text-lg py-0 font-normal"
                      >
                        {slide.start_date}
                      </Badge>
                      <Badge
                        variant={"primary"}
                        className="lg:text-lg py-0 font-normal"
                      >
                        {slide.end_date}
                      </Badge>
                    </div>
                    <h1 className="text-white text-xl lg:text-4xl font-bold mt-6 mb-2">
                      {slide.title}
                    </h1>
                    <p className="font-normal text-white text-lg lg:text-2xl">
                      {slide.summary}
                    </p>
                    <Link href={slide.link} target="_blank" className="mt-4">
                      <Button
                        variant="white"
                        size="medium"
                        className="rounded-lg lg:rounded-xl text-xs lg:text-base"
                      >
                        {t("buttons.ticketing")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div className="banners-pagination flex justify-center mt-4 lg:mt-8"></div>
    </>
  );
};
