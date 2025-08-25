import { useCommonTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import instagramIcon from "@/assets/images/Instagram.png";
import twitterIcon from "@/assets/images/Twitter.png";
import facebookIcon from "@/assets/images/Facebook.png";
import mapImg from "@/assets/images/map.png";
import Image from "next/image";

export const Footer = () => {
  const t = useCommonTranslation();

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

  return (
    <footer className="mt-20 lg:mt-28 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between mt-6 lg:mt-16">
          <div className="flex justify-between lg:justify-start gap-12 lg:gap-20">
            <div className="flex flex-col gap-2 order-2 lg:order-none">
              <h4 className="text-xs font-bold lg:font-normal lg:text-lg text-title">
                {t("brand.name")}
              </h4>
              {accessLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="text-2xs lg:text-sm text-text"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 order-1 lg:order-none">
              <h4 className="text-xs font-bold lg:font-normal lg:text-lg text-title">
                {t("footer.customerServices")}
              </h4>
              {customerServicesLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="text-2xs lg:text-sm text-text"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 order-3 lg:order-none">
              <h4 className="text-xs font-bold lg:font-normal lg:text-lg text-title">
                {t("footer.others")}
              </h4>
              {otherLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="text-2xs lg:text-sm text-text"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-6 lg:mt-0 flex lg:max-w-52 lg:block items-start justify-between gap-4">
            <div className="w-1/2 lg:w-auto">
              <h4 className="font-bold text-title text-xs lg:text-base">
                {t("footer.contactInfo")}
              </h4>
              <p className="my-2 text-2xs lg:text-sm text-text">
                آدرس: استانبول،آتاشهیر، بایراک سوکاک
              </p>
              <p className="my-2 text-2xs lg:text-sm text-text">+5379746381</p>
            </div>
            <div>
              <Image
                src={mapImg}
                alt="map"
                width={205}
                height={144}
                className="rounded-2xl"
              />
              <div className="mt-2 flex items-center justify-end gap-2 p-2">
                <Image
                  src={instagramIcon}
                  alt="instagram"
                  width={20}
                  height={20}
                />
                <Image src={twitterIcon} alt="twitter" width={20} height={20} />
                <Image
                  src={facebookIcon}
                  alt="facebook"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-6 lg:mb-8">
          <p className="text-center text-2xs lg:text-sm text-title">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
