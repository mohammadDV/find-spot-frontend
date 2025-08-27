"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Image from "next/image";
import { JSX, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarouselProps {
    title?: string;
    slides: Array<JSX.Element>;
    disableNavigation?: boolean;
    desktopSlidesPerView?: number;
    mobileSlidesPerView?: number;
}

export const Carousel = ({
    title,
    slides,
    disableNavigation,
    desktopSlidesPerView,
    mobileSlidesPerView,
}: CarouselProps) => {
    const swiperRef = useRef<SwiperType>(null);

    const handlePrevSlide = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNextSlide = () => {
        swiperRef.current?.slideNext();
    };

    return (
        <section className="mt-8 lg:mt-16 container mx-auto lg:px-4">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
                <div className="flex items-center gap-2.5 lg:gap-4">
                    {title && <div className="flex items-center gap-1 lg:gap-2">
                        <Image
                            src={"/images/finybo-icon.svg"}
                            alt="finybo icon"
                            width={24}
                            height={24}
                            className="size-4 lg:size-6"
                        />
                        <h2 className="text-title lg:text-3xl font-bold">{title}</h2>
                    </div>}
                    <div className="h-0.5 rounded-full w-9 lg:w-12 bg-hint"></div>
                </div>
                <div className="flex items-center justify-end gap-4">
                    {(!disableNavigation || slides?.length > (desktopSlidesPerView || 3)) && (
                        <div className="flex items-center gap-3 lg:gap-4">
                            <button
                                onClick={handlePrevSlide}
                                className="flex items-center justify-center size-6 lg:size-12 rounded-sm lg:rounded-lg border border-primary cursor-pointer"
                            >
                                <ArrowRight2 className="size-4 lg:size-6 stroke-primary" />
                            </button>
                            <button
                                onClick={handleNextSlide}
                                className="flex items-center justify-center size-6 lg:size-12 rounded-sm lg:rounded-lg border border-primary cursor-pointer"
                            >
                                <ArrowLeft2 className="size-4 lg:size-6 stroke-primary" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Swiper
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                pagination={{
                    clickable: true,
                    el: ".carousel-pagination",
                    bulletClass: "carousel-pagination-bullet",
                    bulletActiveClass: "carousel-pagination-bullet-active",
                }}
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={mobileSlidesPerView || 1.5}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: desktopSlidesPerView || 4,
                        spaceBetween: 32,
                    },
                }}
                className="events-swiper"
            >
                {slides.map((component) => (
                    <SwiperSlide key={component.key} className="pb-5 lg:pb-6">{component}</SwiperSlide>
                ))}
            </Swiper>
            <div className="carousel-pagination flex justify-center"></div>
        </section>
    );
};