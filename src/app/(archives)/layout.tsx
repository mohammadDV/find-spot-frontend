import { getUserData } from "@/lib/getUserDataFromHeaders";
import { CategoriesMenu } from "../_components/categoriesMenu";
import { Footer } from "../_components/footer/Footer";
import { StickyHeader } from "../_components/headers/StickyHeader";
import { BottomNavigation } from "../_components/bottomNavigation";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";

export default async function ArchivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserData();
  const isMobile = await isMobileDevice();

  return (
    <>
      <StickyHeader userData={userData} />
      <CategoriesMenu />
      <hr className="hidden lg:block border-t border-border mt-6" />
      {children}
      {isMobile && <BottomNavigation userData={userData} />}
      <Footer />
    </>
  );
}
