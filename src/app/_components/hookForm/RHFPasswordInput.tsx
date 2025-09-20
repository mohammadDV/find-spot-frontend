'use client'

import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface RHFPasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    className?: string;
}

export const RHFPasswordInput: React.FC<RHFPasswordInputProps> = ({
    name,
    label,
    className,
    ...props
}) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="gap-1 w-full">
                    {label && (
                        <FormLabel className={cn("text-title mr-3 text-xs", props.disabled && "text-disabled-text")}>
                            {label}
                        </FormLabel>
                    )}
                    <div className="relative">
                        <FormControl>
                            <Input
                                {...field}
                                {...props}
                                className={className}
                                type={showPassword ? "text" : "password"}
                            />
                        </FormControl>
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute flex items-center justify-center left-3 bottom-1/2 translate-y-1/2 cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeSlash className="size-6 stroke-label" />
                            ) : (
                                <Eye className="size-6 stroke-label" />
                            )}
                        </button>
                    </div>
                    <FormMessage className="text-xs mr-3" />
                </FormItem>
            )}
        />
    );
};
