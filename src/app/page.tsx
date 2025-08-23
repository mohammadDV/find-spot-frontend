import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("pages");
  return <p className="text-primary">{t("home.title")}</p>;
}
