'use client'

import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn, isEmpty } from "@/lib/utils";
import { Check } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ArrowDown2, ArrowUp2, CloseCircle } from "iconsax-react";

type Option = {
    label: string;
    value: string;
};

interface ComboboxProps {
    id?: string;
    options: Option[];
    value?: string
    onChange?: (value: string) => void
    placeholder?: string;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
    hideClear?: boolean;
}

export function Combobox({ options, value, onChange, placeholder, id, className, loading, disabled, hideClear }: ComboboxProps) {
    const t = useCommonTranslation();
    const [open, setOpen] = React.useState(false)
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [width, setWidth] = React.useState<number>();
    const [selected, setSelected] = React.useState<Option | null | undefined>(options.find(opt => opt.value == value) || null);

    React.useEffect(() => {
        if (buttonRef.current) {
            setWidth(buttonRef.current.offsetWidth)
        }

        if (options.length === 0) {
            setSelected(null);
            return;
        }

        if (!isEmpty(value)) {
            const foundOption = options.find(opt => opt.value == value);
            setSelected(foundOption || null);
        } else {
            setSelected(null);
        }
    }, [buttonRef.current, value, options.length])

    const handleSelectValue = (option: Option) => {
        setSelected(option)
        setOpen(false)
        onChange?.(option.value)
    }

    const handleClearValue = () => {
        setSelected(null);
        onChange?.('');
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button id={id}
                    ref={buttonRef}
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    aria-expanded={open}
                    className={cn("w-full justify-between h-12 border border-input rounded-xl text-sm text-title font-normal bg-input px-3", className)}
                >
                    {selected ? selected.label : <span className="text-muted-foreground">{placeholder}</span>}
                    <div className="flex items-center gap-1.5">
                        {(!hideClear && selected) && (
                            <span
                                onClick={handleClearValue}
                                role="button"
                                aria-label="Clear selection"
                                className="cursor-pointer"
                            >
                                <CloseCircle className="stroke-primary size-5" />
                            </span>
                        )}
                        {open ? (
                            <ArrowUp2 className="stroke-primary size-5" />
                        ) : (
                            <ArrowDown2 className="stroke-primary size-5" />
                        )}
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-input" style={{ width }}>
                <Command>
                    <CommandInput placeholder={t("inputs.search")} />
                    <CommandEmpty>{loading ? t("messages.loading") : t("messages.noResults")}</CommandEmpty>
                    <CommandGroup className="max-h-48 overflow-auto">
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => handleSelectValue(option)}>
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selected?.value === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}