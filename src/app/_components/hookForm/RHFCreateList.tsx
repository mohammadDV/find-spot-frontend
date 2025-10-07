'use client'

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Badge } from "@/ui/badge";
import { CloseCircle } from "iconsax-react";

interface RHFCreateListProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  maxCount?: number;
  disabled?: boolean;
}

export const RHFCreateList: React.FC<RHFCreateListProps> = ({
  name,
  label,
  className,
  placeholder,
  maxCount = 4,
  disabled,
  ...rest
}) => {
  const t = useCommonTranslation();
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState<string>("");

  const getPlaceholderText = () => {
    if (placeholder) return placeholder;
    return t("inputs.writeAndAdd");
  };

  const canAdd = (items: string[]) => {
    const trimmed = inputValue.trim();
    return trimmed.length > 0 && items.length < maxCount;
  };

  const addItem = (onChange: (...event: any[]) => void, items: string[]) => {
    const trimmed = inputValue.trim();
    if (!trimmed || items.length >= maxCount) return;
    const next = items.includes(trimmed) ? items : [...items, trimmed];
    onChange(next);
    setInputValue("");
  };

  const removeItem = (
    e: React.MouseEvent<HTMLElement>,
    onChange: (...event: any[]) => void,
    items: string[],
    index: number
  ) => {
    e.stopPropagation();
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={[] as any}
      render={({ field, fieldState }) => {
        const items: string[] = Array.isArray(field.value) ? field.value : [];
        return (
          <FormItem className="gap-1 w-full">
            {label && (
              <FormLabel className={cn("text-title mr-3 text-xs", disabled && "text-disabled-text")}>{label}</FormLabel>
            )}
            <FormControl>
              <div className="relative">
                <div className="flex gap-2 items-end">
                  <Input
                    type="text"
                    className={cn(fieldState.error ? "aria-invalid" : "", className)}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={getPlaceholderText()}
                    disabled={disabled}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addItem(field.onChange, items);
                      }
                    }}
                    {...rest}
                  />
                  <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() => addItem(field.onChange, items)}
                    disabled={!canAdd(items)}
                  >
                    {t("buttons.add")}
                  </Button>
                </div>

                {items.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {items.map((item, index) => (
                      <Badge key={`${item}-${index}`} variant="grey">
                        <span
                          role="button"
                          className="cursor-pointer text-title"
                          onClick={(e) => removeItem(e, field.onChange, items, index)}
                        >
                          <CloseCircle className="size-4 stroke-primary" />
                        </span>
                        <span className="text-xs lg:text-sm text-primary truncate max-w-40">{item}</span>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage className="text-xs mr-3" />
          </FormItem>
        );
      }}
    />
  );
};