import { categories } from "@/app/_mock/categories";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/ui/navigation-menu";

export default function CategoriesMenu() {
  return (
    <div className="hidden lg:block w-full bg-background py-1">
      <div className="container mx-auto px-4">
        <NavigationMenu className="w-full" viewport={false}>
          <NavigationMenuList className="w-full flex justify-between">
            {categories.map((category) => (
              <NavigationMenuItem key={category.id}>
                <NavigationMenuTrigger className="flex items-center gap-1">
                  <category.icon size={16} className="ml-1 stroke-title" />
                  {category.title}
                  {category.arrowIcon && <category.arrowIcon size={16} className="mr-1 stroke-title" />}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-40">
                    {category.children.map((child) => (
                      <NavigationMenuLink key={child.id} href={child.href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">{child.title}</div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}