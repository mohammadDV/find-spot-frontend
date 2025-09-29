import { ArrowDown2, Buildings2, Car, Coffee, HambergerMenu, Health, Home2, House, Reserve } from "iconsax-react";

export interface CategoryItem {
    id: number;
    title: string;
    icon: React.ElementType;
    arrowIcon?: React.ElementType;
    children: {
        id: number;
        title: string;
        href: string;
    }[];
}

export const categories: CategoryItem[] = [
    {
        id: 1,
        title: "دسته‌بندی‌ها",
        icon: HambergerMenu,
        children: [
            { id: 11, title: "رستوران‌ها", href: "/restaurants" },
            { id: 12, title: "کافه‌ها", href: "/cafes" },
            { id: 13, title: "خرید", href: "/shopping" },
            { id: 14, title: "سرگرمی", href: "/entertainment" },
            { id: 15, title: "خدمات", href: "/services" },
            { id: 16, title: "آموزش", href: "/education" },
        ],
    },
    {
        id: 2,
        title: "رستوران‌ها",
        icon: Reserve,
        arrowIcon: ArrowDown2,
        children: [
            { id: 21, title: "رستوران ایرانی", href: "/restaurants/iranian" },
            { id: 22, title: "رستوران ترکی", href: "/restaurants/turkish" },
            { id: 23, title: "فست فود", href: "/restaurants/fastfood" },
            { id: 24, title: "رستوران عربی", href: "/restaurants/arabic" },
            { id: 25, title: "رستوران ایتالیایی", href: "/restaurants/italian" },
            { id: 26, title: "رستوران چینی", href: "/restaurants/chinese" },
        ],
    },
    {
        id: 3,
        title: "خانه و کاشانه",
        icon: House,
        arrowIcon: ArrowDown2,
        children: [
            { id: 31, title: "اجاره خانه", href: "/housing/rent" },
            { id: 32, title: "خرید خانه", href: "/housing/buy" },
            { id: 33, title: "تعمیرات", href: "/housing/repairs" },
            { id: 34, title: "دکوراسیون", href: "/housing/decoration" },
            { id: 35, title: "لوازم خانگی", href: "/housing/appliances" },
            { id: 36, title: "باغبانی", href: "/housing/gardening" },
        ],
    },
    {
        id: 4,
        title: "خودرو",
        icon: Car,
        arrowIcon: ArrowDown2,
        children: [
            { id: 41, title: "خرید خودرو", href: "/automotive/buy" },
            { id: 42, title: "اجاره خودرو", href: "/automotive/rent" },
            { id: 43, title: "تعمیرگاه", href: "/automotive/repair" },
            { id: 44, title: "قطعات یدکی", href: "/automotive/parts" },
            { id: 45, title: "بیمه خودرو", href: "/automotive/insurance" },
            { id: 46, title: "شستشوی خودرو", href: "/automotive/wash" },
        ],
    },
    {
        id: 5,
        title: "سلامت",
        icon: Health,
        arrowIcon: ArrowDown2,
        children: [
            { id: 51, title: "پزشک عمومی", href: "/health/general" },
            { id: 52, title: "دندانپزشک", href: "/health/dental" },
            { id: 53, title: "داروخانه", href: "/health/pharmacy" },
            { id: 54, title: "آزمایشگاه", href: "/health/lab" },
            { id: 55, title: "فیزیوتراپی", href: "/health/physiotherapy" },
            { id: 56, title: "روانشناس", href: "/health/psychology" },
        ],
    },
    {
        id: 6,
        title: "کافه‌ها",
        icon: Coffee,
        arrowIcon: ArrowDown2,
        children: [
            { id: 61, title: "کافه سنتی", href: "/cafes/traditional" },
            { id: 62, title: "کافه مدرن", href: "/cafes/modern" },
            { id: 63, title: "کافه کتاب", href: "/cafes/bookstore" },
            { id: 64, title: "کافه بازی", href: "/cafes/gaming" },
            { id: 65, title: "کافه روف‌تاپ", href: "/cafes/rooftop" },
            { id: 66, title: "کافه درایو", href: "/cafes/drive" },
        ],
    },
];