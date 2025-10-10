import { getTranslations } from "next-intl/server";
import { TitleSection } from "../../_components/titleSection";
import { BizWrapper } from "../_components/BizWrapper";
import { getBusinessEdit } from "../_api/getBusinessEdit";

interface MyBizPageProps {
    params: Promise<{
        id: string
    }>;
}

export default async function MyBizPage({ params }: MyBizPageProps) {
    const t = await getTranslations("pages");
    const resolvedParams = await params;
    let bizData;

    if (resolvedParams.id !== "create") {
        bizData = await getBusinessEdit({ id: resolvedParams.id })
    }

    return (
        <div className="container px-4 mx-auto mt-10">
            <TitleSection title={resolvedParams.id == "create" ? t("myBiz.addTitle") : t("myBiz.editTitle")} />
            <BizWrapper bizData={bizData} id={resolvedParams.id} />
        </div>
    )
}