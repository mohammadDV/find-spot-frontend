import CategoriesMenu from "../_components/categoriesMenu/CategoriesMenu";
import { Footer } from "../_components/footer/Footer";
import { StickyHeader } from "../_components/headers/StickyHeader";

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <StickyHeader />
            <CategoriesMenu />
            <hr className="hidden lg:block border-t border-border mt-6" />
            {children}
            <Footer />
        </>
    );
}
