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

export const BannerSlider = () => {
  const slideData = [
    {
      id: 1,
      title: "فستیوال رقص ۲۰۲۵ – استانبول",
      description:
        "با ما برقص، بخند و از لحظه‌هات لذت ببر. تجربه‌ای فراموش‌نشدنی در انتظار توست!",
      tags: ["رویدادهای ویژه", "22 - 27 مهر"],
      button: "تهیه‌ی بلیط",
    },
    {
      id: 2,
      title: "فستیوال رقص ۲۰۲۵ – استانبول",
      description:
        "با ما برقص، بخند و از لحظه‌هات لذت ببر. تجربه‌ای فراموش‌نشدنی در انتظار توست!",
      tags: ["رویدادهای ویژه", "22 - 27 مهر"],
      button: "تهیه‌ی بلیط",
    },
    {
      id: 3,
      title: "فستیوال رقص ۲۰۲۵ – استانبول",
      description:
        "با ما برقص، بخند و از لحظه‌هات لذت ببر. تجربه‌ای فراموش‌نشدنی در انتظار توست!",
      tags: ["رویدادهای ویژه", "22 - 27 مهر"],
      button: "تهیه‌ی بلیط",
    },
  ];

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
          {slideData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0">
                  <Image
                    src={bannerSample}
                    alt=""
                    priority={index === 0}
                    quality={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative lg:max-w-3xl px-4 mx-auto z-10 h-full flex items-center">
                  <div className="flex flex-col justify-center items-start h-full">
                    <div className="flex items-center gap-2.5">
                      {slide.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={"primary"}
                          className="text-lg py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h1 className="text-white text-2xl lg:text-4xl font-bold mt-6 mb-2">
                      {slide.title}
                    </h1>
                    <p className="font-normal text-white text-xl lg:text-2xl">
                      {slide.description}
                    </p>
                    <Link href={"/"} className="mt-4">
                      <Button
                        variant="white"
                        size="medium"
                        className="rounded-lg lg:rounded-xl text-xs lg:text-base"
                      >
                        {slide.button}
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
