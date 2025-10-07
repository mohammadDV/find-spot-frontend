'use client'

import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Combobox } from "@/ui/combobox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Switch } from "@/ui/switch";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

type HoursValue = { from: number; to: number };

interface RHFWorkingHoursProps {
    name: string;
    label?: string;
    className?: string;
    disabled?: boolean;
}

type OptionTypes = { label: string; value: string };

export const RHFWorkingHours: React.FC<RHFWorkingHoursProps> = ({ name, label, className, disabled }) => {
    const t = useCommonTranslation();
    const { control } = useFormContext();

    const hourOptions: OptionTypes[] = useMemo(
        () => Array.from({ length: 24 }, (_, h) => ({ label: `${h + 1}`, value: `${h + 1}` })),
        []
    );

    const clampRange = (from: number, to: number): HoursValue => {
        const f = Math.max(0, Math.min(24, from));
        const t = Math.max(0, Math.min(24, to));
        if (t < f) return { from: f, to: f };
        return { from: f, to: t };
    };

    return (
        <FormField
            control={control}
            name={name}
            defaultValue={{ from: 0, to: 0 } as any}
            render={({ field }) => {
                const value: HoursValue =
                    typeof field.value === "object" && field.value
                        ? clampRange(Number(field.value.from ?? 0), Number(field.value.to ?? 0))
                        : { from: 0, to: 0 };

                const enabled = value.from !== 0 || value.to !== 0;

                const setEnabled = (on: boolean) => {
                    if (!on) field.onChange({ from: 0, to: 0 });
                    else field.onChange({ from: 9, to: 17 });
                };

                const setFrom = (fromStr: string) => {
                    const nextFrom = parseInt(fromStr, 10);
                    const next = clampRange(nextFrom, value.to);
                    field.onChange(next);
                };

                const setTo = (toStr: string) => {
                    const nextTo = parseInt(toStr, 10);
                    const next = clampRange(value.from, nextTo);
                    field.onChange(next);
                };

                return (
                    <FormItem className={cn("gap-1 w-full", className)}>
                        <FormControl>
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex items-center gap-2 w-40">
                                    <Switch
                                        checked={enabled}
                                        onCheckedChange={(checked: boolean) => setEnabled(checked)}
                                        disabled={disabled}
                                    />
                                    {label && <FormLabel className="text-lg text-title">{label}</FormLabel>}
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <p className="text-lg text-title">
                                        {t("inputs.from")}
                                    </p>
                                    <div className="flex-1">
                                        <Combobox
                                            options={hourOptions}
                                            value={`${value.from}`}
                                            onChange={setFrom}
                                            hideClear
                                            disabled={disabled || !enabled}
                                        />
                                    </div>
                                    <p className="text-lg text-title">
                                        {t("inputs.to")}
                                    </p>
                                    <div className="flex-1">
                                        <Combobox
                                            options={hourOptions}
                                            value={`${value.to}`}
                                            onChange={setTo}
                                            hideClear
                                            disabled={disabled || !enabled}
                                        />
                                    </div>
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage className="text-xs mr-3" />
                    </FormItem>
                );
            }}
        />
    );
};
