import { BusinessEditResponse } from "@/types/business.type";
import { BizForm } from "./BizForm"

interface BizWrapperProps {
    bizData?: BusinessEditResponse;
    id: string;
}

export const BizWrapper = ({ bizData, id }: BizWrapperProps) => {
    return (
        <div className="lg:mt-10 md:flex justify-between items-start mx-auto gap-10">
            <BizForm defaultData={bizData} id={id} />
            <div className="flex-1">
            </div>
        </div>
    )
}