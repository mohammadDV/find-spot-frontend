"use client"

import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "./logoutAction";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { ArrowLeft2, Logout } from "iconsax-react";
import { Modal } from "@/app/_components/modal";

export const LogoutButton = () => {
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const logoutHandler = async () => {
        setIsLoading(true);
        try {
            const res = await logoutAction();
            if (res?.status === StatusCode.Success) {
                router.replace("/");
            } else {
                toast.error(res?.message || tCommon("messages.error"));
            }
        } catch (error) {
            toast.error(tCommon("messages.error"));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div
                onClick={() => setIsOpenModal(true)}
                className="flex items-center justify-between p-5.5 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                    <Logout className="size-6 stroke-error" />
                    <p className="text-error text-lg">
                        {tPages("profile.logout")}
                    </p>
                </div>
                <ArrowLeft2 className="stroke-error size-6" />
            </div>
            <Modal
                open={isOpenModal}
                size="small"
                onOpenChange={setIsOpenModal}
                title={tPages("profile.logoutAccount")}
                description={tPages("profile.logoutConfirm")}
                confirmText={tCommon("buttons.yes")}
                cancelText={tCommon("buttons.cancel")}
                confirmVariant="error"
                cancelVariant="outline"
                onCancel={() => setIsOpenModal(false)}
                loading={isLoading}
                onConfirm={logoutHandler}
            />
        </>
    )
}