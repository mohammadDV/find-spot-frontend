import { getTranslations } from "next-intl/server";
import { MainHeader } from "./_components/headers/MainHeader";
import Hero from "./_components/hero/Hero";
import { TitleSection } from "./_components/titleSection";
import { BusinessCard } from "./_components/cards/BusinessCard";

export default async function Home() {
  const t = await getTranslations("pages");

  return (
    <>
      <MainHeader />
      <main>
        <Hero />
        <div className="mt-16 container mx-auto px-4">
          <TitleSection title={t("home.specialOffers")} link="/" />
          <div className="mt-8 grid lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }, (_, i) => <BusinessCard key={i} />)}
          </div>
        </div>
      </main>
    </>
  );
}
