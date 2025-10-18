import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-white border-input h-12 w-full min-w-0 rounded-xl border bg-input px-3 py-4 text-sm transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-input file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-disabled-text md:text-sm",
        "focus-visible:border-primary",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
