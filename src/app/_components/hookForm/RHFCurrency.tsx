'use client'

import { cn, convertPersianToEnglish, putCommas } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface RHFCurrencyProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    name: string;
    label?: string;
    className?: string;
}

export const RHFCurrency: React.FC<RHFCurrencyProps> = ({
    name,
    label,
    className,
    ...props
}) => {
    const { control } = useFormContext();
    const [displayValue, setDisplayValue] = useState<string>("");

    const formatNumber = (value: string): string => {
        const numericValue = value.replace(/[^\d]/g, '');

        if (!numericValue) return '';

        return putCommas(Number(numericValue));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void
    ) => {
        let inputValue = e.target.value;
        inputValue = convertPersianToEnglish(inputValue);
        const numericValue = inputValue.replace(/[^\d]/g, '');

        const formattedValue = formatNumber(numericValue);
        setDisplayValue(formattedValue);

        onChange(numericValue);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                useEffect(() => {
                    if (field.value !== undefined && field.value !== null) {
                        setDisplayValue(formatNumber(field.value.toString()));
                    } else {
                        setDisplayValue('');
                    }
                }, [field.value]);

                return (
                    <FormItem className="gap-1.5 w-full">
                        {label && (
                            <FormLabel className={cn("text-title mr-3 text-xs", props.disabled && "text-disabled-text")}>
                                {label}
                            </FormLabel>
                        )}
                        <FormControl>
                            <Input
                                {...props}
                                value={displayValue}
                                onChange={(e) => handleInputChange(e, field.onChange)}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                className={className}
                                inputMode="numeric"
                                aria-invalid={!!fieldState.error}
                            />
                        </FormControl>
                        <FormMessage className="text-xs mr-3" />
                    </FormItem>
                );
            }}
        />
    );
};