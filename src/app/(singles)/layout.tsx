import { getUserData } from "@/lib/getUserDataFromHeaders";
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
      {children}
      <Footer />
    </>
  );
}
