"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { isEmpty } from "@/lib/utils";
import { UserData } from "@/types/user.type";
import Link from "next/link";
import { ArrowLeft2 } from "iconsax-react";
import { Modal } from "../modal";
import { Button } from "@/ui/button";

interface FastAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData?: UserData | null;
}

export const FastAccessModal = ({ open, onOpenChange, userData }: FastAccessModalProps) => {
  const t = useCommonTranslation();

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={t("navigation.more")}
      description={t("navigation.fastAccess")}
      showConfirm={false}
      showCancel={false}
      size="small"
    >
      <>
        <div className="flex flex-col gap-4 mb-6">
          <Link href={"/my-biz/create"} className="flex items-center justify-between">
            <p className="text-lg text-primary">{t("navigation.submitBusiness")}</p>
            <ArrowLeft2 className="size-6 stroke-title" />
          </Link>
          <hr className="border-t border-border" />
          <Link href={"/map"} className="flex items-center justify-between">
            <p className="text-lg text-primary">{t("navigation.searchMap")}</p>
            <ArrowLeft2 className="size-6 stroke-title" />
          </Link>
          <hr className="border-t border-border" />
          <Link href={"/events"} className="flex items-center justify-between">
            <p className="text-lg text-primary">{t("navigation.events")}</p>
            <ArrowLeft2 className="size-6 stroke-title" />
          </Link>
          <hr className="border-t border-border" />
          <Link href={"/blog"} className="flex items-center justify-between">
            <p className="text-lg text-primary">{t("navigation.news")}</p>
            <ArrowLeft2 className="size-6 stroke-title" />
          </Link>
          <hr className="border-t border-border" />
          <Link href={"/"} className="flex items-center justify-between">
            <p className="text-lg text-primary">{t("buttons.convertCurrency")}</p>
            <ArrowLeft2 className="size-6 stroke-title" />
          </Link>
        </div>
        <Link href={(!!userData && !isEmpty(userData) ? "/profile" : "/auth/login")}>
          <Button variant={"primary"} size={"medium"} className="w-full">
            {(!!userData && !isEmpty(userData) ? t("buttons.profile") : t("buttons.login"))}
          </Button>
        </Link>
      </>
    </Modal>
  );
};