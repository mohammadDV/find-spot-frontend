"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { isEmpty } from "@/lib/utils";
import { UserData } from "@/types/user.type";
import Link from "next/link";
import { ArrowLeft2 } from "iconsax-react";
import { Modal } from "../modal";
import { Button } from "@/ui/button";
import { useState } from "react";
import { CurrencyRatesModal } from "../headers/CurrencyRatesModal";

interface FastAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData?: UserData | null;
}

export const FastAccessModal = ({ open, onOpenChange, userData }: FastAccessModalProps) => {
  const t = useCommonTranslation();
  const [isRatesOpen, setIsRatesOpen] = useState(false);

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
          <Link href={"/weekend"} className="flex items-center justify-between">
            <p className="text-lg text-primary">{t("navigation.weekend")}</p>
            <ArrowLeft2 className="size-6 stroke-title" />
          </Link>
          <hr className="border-t border-border" />
          <Link href={"/blog"} className="flex items-center justify-between">
            <p className="text-lg text-primary">{t("navigation.news")}</p>
            <ArrowLeft2 className="size-6 stroke-title" />
          </Link>
          <hr className="border-t border-border" />
          <div
            className="flex items-center justify-between"
            onClick={(e) => {
              e.preventDefault();
              setIsRatesOpen(true);
            }}
          >
            <p className="text-lg text-primary">{t("buttons.convertCurrency")}</p>
            <ArrowLeft2 className="size-6 stroke-title" />
          </div>
        </div>
        <Link href={(!!userData && !isEmpty(userData) ? "/profile" : "/auth/login")}>
          <Button variant={"primary"} size={"medium"} className="w-full">
            {(!!userData && !isEmpty(userData) ? t("buttons.profile") : t("buttons.login"))}
          </Button>
        </Link>
        <CurrencyRatesModal open={isRatesOpen} onOpenChange={setIsRatesOpen} showTrigger={false} />
      </>
    </Modal>
  );
};