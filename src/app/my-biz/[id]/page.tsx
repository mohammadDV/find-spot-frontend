import { getTranslations } from "next-intl/server";
import { TitleSection } from "../../_components/titleSection";
import { BizWrapper } from "../_components/BizWrapper";

export default async function MyBizPage() {
    const t = await getTranslations("pages");

    return (
        <div className="container px-4 mx-auto mt-10">
            <TitleSection title={t("myBiz.title")} />
            <BizWrapper />
        </div>
    )
}