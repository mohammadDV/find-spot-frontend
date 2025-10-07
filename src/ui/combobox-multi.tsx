'use client'

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";

type Option = {
    label: string;
    value: string;
};

interface ComboboxMultiProps {
    id?: string;
    options: Option[];
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    className?: string;
    loading?: boolean;
}

export function ComboboxMulti({
    options,
    value = [],
    onChange,
    placeholder,
    id,
    className,
    loading
}: ComboboxMultiProps) {
    const t = useCommonTranslation();
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [width, setWidth] = React.useState<number>();

    const selectedOptions = options.filter((opt) => value.includes(opt.value));

    React.useEffect(() => {
        if (buttonRef.current) {
            setWidth(buttonRef.current.offsetWidth);
        }
    }, [buttonRef.current, value]);

    const handleSelectValue = (option: Option) => {
        let newSelected: string[];
        if (value.includes(option.value)) {
            newSelected = value.filter((v) => v !== option.value);
        } else {
            newSelected = [...value, option.value];
        }
        onChange?.(newSelected);
    };

    const handleRemove = (option: Option, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const newSelected = value.filter((v) => v !== option.value);
        onChange?.(newSelected);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    ref={buttonRef}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between min-h-12 border border-input rounded-xl text-sm text-title font-normal bg-input px-3",
                        className
                    )}
                >
                    <div className="flex flex-wrap items-center gap-1">
                        {selectedOptions.length > 0 ? (
                            selectedOptions.map((item) => (
                                <span
                                    key={item.value}
                                    className="flex items-center gap-1 bg-on-primary px-2 py-1 rounded-md cursor-pointer"
                                    onClick={(e) => handleRemove(item, e)}
                                >
                                    <span className="text-xs lg:text-sm text-title">{item.label}</span>
                                    <span aria-hidden className="text-title">×</span>
                                </span>
                            ))
                        ) : (
                            <span className="text-muted-foreground">
                                {placeholder || t("inputs.select")}
                            </span>
                        )}
                    </div>
                    {open ? (
                        <ArrowUp2 className="stroke-primary size-5" />
                    ) : (
                        <ArrowDown2 className="stroke-primary size-5" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-input" style={{ width }}>
                <Command>
                    <CommandInput placeholder={t("inputs.search")} />
                    <CommandEmpty>{loading ? t("messages.loading") : t("messages.noResults")}</CommandEmpty>
                    <CommandGroup className="max-h-52 overflow-auto">
                        {options.map((option) => (
                            <CommandItem key={option.value} onSelect={() => handleSelectValue(option)}>
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value.includes(option.value) ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}