"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { createFileUrl } from "@/lib/utils";
import { FileType } from "@/types/file.type";
import { Button } from "@/ui/button";
import { Gallery } from "iconsax-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ImageGalleryProps {
  files: FileType[];
  className?: string;
}

export const ImageGallery = ({ files, className }: ImageGalleryProps) => {
  const [open, setOpen] = useState(false);
  const tCommon = useCommonTranslation();

  const imageFiles = files
    .filter(file => file.type === "image")
    .map(file => ({
      src: createFileUrl(file.path),
      alt: `Image ${file.id}`
    }));

  if (imageFiles.length === 0) {
    return null;
  }

  return (
    <>
      <Button
        variant={"outline"}
        size={"small"}
        className={className}
        onClick={() => setOpen(true)}
      >
        <Gallery className="stroke-white size-3 lg:size-6" />
        {tCommon("buttons.seeOtherImages")}
      </Button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={imageFiles}
        render={{
          buttonPrev: imageFiles.length <= 1 ? () => null : undefined,
          buttonNext: imageFiles.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
};