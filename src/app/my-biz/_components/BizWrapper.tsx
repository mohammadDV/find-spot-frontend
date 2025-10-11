"use client"

import { BusinessEditResponse } from "@/types/business.type";
import { BizForm } from "./BizForm"
import type { BizFormData } from "./BizForm"
import { useState } from "react"
import { BizPreview } from "./BizPreview";

interface BizWrapperProps {
    bizData?: BusinessEditResponse;
    id: string;
}

export const BizWrapper = ({ bizData, id }: BizWrapperProps) => {
    const [formValues, setFormValues] = useState<BizFormData | null>(null);

    return (
        <div className="lg:mt-10 md:flex justify-between items-start mx-auto gap-10">
            <BizForm defaultData={bizData} id={id} onValuesChange={setFormValues} />
            <BizPreview bizData={bizData} formValues={formValues} />
        </div>
    )
}