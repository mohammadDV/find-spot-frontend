"use client"

import { BusinessEditResponse } from "@/types/business.type";
import { BizForm } from "./BizForm"
import type { BizFormData } from "./BizForm"
import { useState } from "react"
import { BizPreview } from "./BizPreview";
import type { OptionTypes } from "@/app/_components/hookForm/RHFCombobox";

interface BizWrapperProps {
    bizData?: BusinessEditResponse;
    id: string;
}

export const BizWrapper = ({ bizData, id }: BizWrapperProps) => {
    const [formValues, setFormValues] = useState<BizFormData | null>(null);
    const [optionsMeta, setOptionsMeta] = useState<{ areaOptions: OptionTypes[]; facilitiesOptions: OptionTypes[] }>({
        areaOptions: [],
        facilitiesOptions: []
    });

    return (
        <div className="lg:mt-10 flex flex-col lg:flex-row justify-between items-start mx-auto gap-10">
            <BizForm
                defaultData={bizData}
                id={id}
                onValuesChange={setFormValues}
                onOptionsChange={setOptionsMeta}
            />
            <BizPreview
                bizData={bizData}
                formValues={formValues}
                areaOptions={optionsMeta.areaOptions}
                facilitiesOptions={optionsMeta.facilitiesOptions}
            />
        </div>
    )
}