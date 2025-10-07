import { BizForm } from "./BizForm"

export const BizWrapper = () => {
    return (
        <div className="lg:mt-10 md:flex justify-between items-start mx-auto gap-10">
            <BizForm />
            <div className="flex-1">
            </div>
        </div>
    )
}