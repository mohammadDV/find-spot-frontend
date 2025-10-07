'use client'

import { cn } from "@/lib/utils"
import { ComboboxMulti } from "@/ui/combobox-multi"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form"
import * as React from "react"
import { useFormContext } from "react-hook-form"

export type OptionTypes = {
    label: string,
    value: string
}

interface RHFComboboxMultiProps {
    name: string;
    options: OptionTypes[];
    label?: string;
    placeholder?: string;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
}

export const RHFComboboxMulti: React.FC<RHFComboboxMultiProps> = ({
    name,
    options,
    label,
    placeholder = "انتخاب کنید",
    className,
    loading,
    disabled
}) => {
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="gap-1 w-full">
                    {label && (
                        <FormLabel className={cn("text-title mr-3 text-xs", disabled && "text-disabled-text")}>
                            {label}
                        </FormLabel>
                    )}
                    <FormControl>
                        <ComboboxMulti
                            options={options}
                            value={field.value}
                            onChange={field.onChange}
                            loading={loading}
                            placeholder={placeholder}
                            className={cn(
                                fieldState.error && "border-destructive",
                                className
                            )}
                        />
                    </FormControl>
                    <FormMessage className="text-xs mr-3" />
                </FormItem>
            )}
        />
    )
}