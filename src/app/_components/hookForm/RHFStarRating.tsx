'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { useFormContext } from "react-hook-form";
import Star from "@/ui/star";
import { cn } from "@/lib/utils";

interface RHFStarRatingProps {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const RHFStarRating: React.FC<RHFStarRatingProps> = ({ name, label, className, disabled }) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={0 as any}
      render={({ field, fieldState }) => {
        const value: number = typeof field.value === 'number' ? field.value : 0;

        const setRating = (r: number) => {
          if (!disabled) field.onChange(r);
        };

        return (
          <FormItem className={cn("gap-1 w-full", className)}>
            {label && (
              <FormLabel className={cn("text-title mr-3 text-xs", disabled && "text-disabled-text")}>{label}</FormLabel>
            )}
            <FormControl>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <button
                      key={ratingValue}
                      type="button"
                      onClick={() => setRating(ratingValue)}
                      className={cn("p-0", disabled ? "cursor-not-allowed" : "cursor-pointer")}
                    >
                      <Star className={cn("size-6", ratingValue <= value ? "fill-warning" : "fill-border")} />
                    </button>
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