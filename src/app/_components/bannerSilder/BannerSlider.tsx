"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { createFileUrl } from "@/lib/utils";
import { EventSummary } from "@/types/event.type";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface BannerSliderProps {
  data: Array<EventSummary>
}

export const BannerSlider = ({ data }: BannerSliderProps) => {
  const t = useCommonTranslation();
  const router = useRouter();

  const handleSlideClick = () => {
    router.push("/events");
  };

  const handleButtonClick = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    router.push(`/event/${eventId}`);
  };

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
              <div
                className="relative w-full h-full block cursor-pointer"
                onClick={handleSlideClick}
              >
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
                      <Button
                        variant="white"
                        size="medium"
                        className="rounded-lg lg:rounded-xl text-xs lg:text-base mt-4 relative z-20"
                        onClick={(e) => handleButtonClick(e, slide.id.toString())}
                      >
                        {t("buttons.seeMore")}
                      </Button>
                    </div>
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
