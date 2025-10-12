import { getUserData } from "@/lib/getUserDataFromHeaders";
import { Footer } from "../_components/footer/Footer";
import { StickyHeader } from "../_components/headers/StickyHeader";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { BottomNavigation } from "../_components/bottomNavigation";

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
      {children}
      <Footer />
      {isMobile && <BottomNavigation userData={userData} />}
    </>
  );
}
