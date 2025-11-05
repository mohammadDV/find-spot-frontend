import { getUserData } from "@/lib/getUserDataFromHeaders";
import { Button } from "@/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Footer } from "./_components/footer";
import { StickyHeader } from "./_components/headers/StickyHeader";

export default async function NotFound() {
  const userData = await getUserData();
  const tPages = await getTranslations("pages");

  return (
    <>
      <StickyHeader userData={userData} />
      <div className="h-screen-minus-header flex flex-col items-center justify-center text-center gap-6 p-4 mt-8 lg:mt-16">
        <h1 className="text-7xl lg:text-8xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold text-title">{tPages("notFound.title")}</h2>
        <p className="text-lg text-description max-w-md">{tPages("notFound.description")}</p>
        <Button className="mt-5">
          <Link href="/">{tPages("notFound.backToHome")}</Link>
        </Button>
      </div>
      <Footer />
    </>
  );
}