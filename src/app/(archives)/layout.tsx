import { getUserData } from "@/lib/getUserDataFromHeaders";
import { CategoriesMenu } from "../_components/categoriesMenu";
import { Footer } from "../_components/footer/Footer";
import { StickyHeader } from "../_components/headers/StickyHeader";

export default async function ArchivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserData();

  return (
    <>
      <StickyHeader userData={userData} />
      <CategoriesMenu />
      <hr className="hidden lg:block border-t border-border mt-6" />
      {children}
      <Footer />
    </>
  );
}
