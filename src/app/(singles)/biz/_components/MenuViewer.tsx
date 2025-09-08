"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { createFileUrl } from "@/lib/utils";
import { Button } from "@/ui/button";
import { BookSaved } from "iconsax-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface MenuViewerProps {
  menuImage: string | null;
  className?: string;
}

export const MenuViewer = ({ menuImage, className }: MenuViewerProps) => {
  const [open, setOpen] = useState(false);
  const tCommon = useCommonTranslation();

  const menuSlide = {
    src: createFileUrl(menuImage!),
    alt: "Menu"
  };

  return (
    <>
      <Button
        variant={"outline"}
        size={"medium"}
        className={className}
        onClick={() => setOpen(true)}
      >
        {tCommon("buttons.menu")}
        <BookSaved className="stroke-primary size-4 lg:size-6" />
      </Button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[menuSlide]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}