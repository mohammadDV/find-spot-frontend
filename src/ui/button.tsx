"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Loading } from "./loading";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl cursor-pointer text-base transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary/90",
        secondary: "bg-secondary text-on-secondary hover:bg-secondary/90",
        outline: "border border-primary bg-white text-primary",
        link: "text-primary",
        error: "bg-error text-on-error hover:bg-error/90",
        success: "bg-success text-on-success hover:bg-success/90",
        warning: "bg-warning text-on-warning hover:bg-warning/90",
        information:
          "bg-information text-on-information hover:bg-information/90",
      },
      size: {
        medium: "px-6 py-3 font-bold has-[>svg]:px-4",
        small:
          "rounded-lg text-xs font-bold py-3 gap-1.5 px-5 has-[>svg]:px-3.5",
        large: "text-lg rounded-xl font-normal py-3.5 px-7 has-[>svg]:px-5",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

function Button({
  className,
  variant,
  size,
  isLoading,
  disabled,
  children,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || disabled}
      {...props}
    >
      {children}
      {isLoading && <Loading type="spinner" size={size} />}
    </Comp>
  );
}

export { Button, buttonVariants };
