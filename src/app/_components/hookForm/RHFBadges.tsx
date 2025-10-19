'use client'

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Badge } from "@/ui/badge";

export interface BadgeOption {
  id: number;
  title: string;
}

interface RHFBadgesProps {
  name: string;
  label?: string;
  options: BadgeOption[];
  className?: string;
  disabled?: boolean;
}

export const RHFBadges: React.FC<RHFBadgesProps> = ({
  name,
  label,
  options,
  className,
  disabled,
}) => {
  const { control } = useFormContext();

  const toggleId = (currentValue: number[], id: number) => {
    const set = new Set(currentValue || []);
    if (set.has(id)) {
      set.delete(id);
    } else {
      set.add(id);
    }
    return Array.from(set);
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={[] as any}
      render={({ field }) => {
        const selected: number[] = Array.isArray(field.value) ? field.value : [];
        return (
          <FormItem className={cn("gap-1 w-full", className)}>
            {label && (
              <FormLabel className={cn("text-title mr-3 text-xs", disabled && "text-disabled-text")}>{label}</FormLabel>
            )}
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {options?.map((opt) => {
                  const isSelected = selected.includes(opt.id);
                  return (
                    <Badge
                      key={opt.id}
                      variant={isSelected ? "primary" : "outline"}
                      className={cn("text-xs cursor-pointer", disabled && "opacity-60 cursor-not-allowed")}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (disabled) return;
                        field.onChange(toggleId(selected, opt.id));
                      }}
                    >
                      {opt.title}
                    </Badge>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage className="text-xs mr-3" />
          </FormItem>
        );
      }}
    />
  );
};