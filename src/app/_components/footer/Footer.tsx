"use client"

import facebookIcon from "@/assets/images/Facebook.png";
import instagramIcon from "@/assets/images/Instagram.png";
import twitterIcon from "@/assets/images/Twitter.png";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const Footer = () => {
  const t = useCommonTranslation();
  const [email, setEmail] = useState("");

  const accessLinks = [
    {
      id: 1,
      title: t("navigation.aboutUs"),
      link: "/",
    },
    {
      id: 2,
      title: t("navigation.contactUs"),
      link: "/",
    },
    {
      id: 3,
      title: t("navigation.terms"),
      link: "/",
    },
  ];

  const customerServicesLinks = [
    {
      id: 1,
      title: t("navigation.events"),
      link: "/",
    },
    {
      id: 2,
      title: t("navigation.concerts"),
      link: "/",
    },
    {
      id: 3,
      title: t("navigation.houseRepairs"),
      link: "/",
    },
    {
      id: 4,
      title: t("navigation.houseCleaning"),
      link: "/",
    },
    {
      id: 5,
      title: t("navigation.makeup"),
      link: "/",
    },
    {
      id: 6,
      title: t("navigation.restaurant"),
      link: "/",
    },
  ];

  const otherLinks = [
    {
      id: 1,
      title: t("navigation.jobs"),
      link: "/",
    },
    {
      id: 2,
      title: t("navigation.support"),
      link: "/",
    },
  ];

  const fastAccessLinks = [
    { id: 1, title: t("navigation.submitBusiness"), link: "/my-biz/create" },
    { id: 2, title: t("navigation.searchMap"), link: "/map" },
    { id: 3, title: t("navigation.events"), link: "/events" },
    { id: 4, title: t("navigation.news"), link: "/blog" },
  ];

  const subscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("لطفاً ایمیل خود را وارد کنید");
      return;
    }
    toast.success("عضویت در خبرنامه با موفقیت انجام شد");
    setEmail("");
  };

  return (
    <footer className="mt-20 lg:mt-28 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="mt-6 lg:mt-12 grid grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-24">
          <div className="col-span-3 lg:col-span-1 flex flex-col gap-3">
            <Image src="/images/finybo-logo.svg" alt="logo" width={125} height={125} />
            <p className="text-2xs lg:text-sm text-text">
              راهنمای سریع برای یافتن کسب‌وکارها، خدمات و رویدادها در نزدیکی شما.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-2xs lg:text-sm text-text">آدرس: استانبول، آتاشهیر، بایراک سوکاک</p>
              <p className="text-2xs lg:text-sm text-text">+5379746381</p>
              <p className="text-2xs lg:text-sm text-text">support@finybo.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Image src={instagramIcon} alt="instagram" width={20} height={20} />
              <Image src={twitterIcon} alt="twitter" width={20} height={20} />
              <Image src={facebookIcon} alt="facebook" width={20} height={20} />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-xs font-bold lg:font-normal lg:text-lg text-title mb-2">{t("footer.customerServices")}</h4>
            <div className="flex flex-col gap-2">
              {customerServicesLinks.map((item) => (
                <Link key={item.id} href={item.link} className="text-2xs lg:text-sm text-text">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-xs font-bold lg:font-normal lg:text-lg text-title mb-2">{t("footer.others")}</h4>
            <div className="flex flex-col gap-2">
              {otherLinks.map((item) => (
                <Link key={item.id} href={item.link} className="text-2xs lg:text-sm text-text">
                  {item.title}
                </Link>
              ))}
              {accessLinks.map((item) => (
                <Link key={`access-${item.id}`} href={item.link} className="text-2xs lg:text-sm text-text">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-xs font-bold lg:font-normal lg:text-lg text-title mb-2">دسترسی سریع</h4>
            <div className="flex flex-col gap-2">
              {fastAccessLinks.map((item) => (
                <Link key={item.id} href={item.link} className="text-2xs lg:text-sm text-text">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 mb-6 lg:mb-8">
          <p className="text-center text-2xs lg:text-sm text-title">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
