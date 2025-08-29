import { Footer } from "../_components/footer/Footer";
import { StickyHeader } from "../_components/headers/StickyHeader";

export default async function ArchivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StickyHeader />
      {children}
      <Footer />
    </>
  );
}
