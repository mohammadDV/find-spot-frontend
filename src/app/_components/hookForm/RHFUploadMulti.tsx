'use client'

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { uploadImageAction, uploadVideoAction, uploadFileAction, UploadResponse } from "./formAction";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { StatusCode } from "@/constants/enums";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Paperclip2, Trash } from "iconsax-react";
import { Loading } from "@/ui/loading";

type UploadType = 'image' | 'video' | 'file';

type UploadedItem = {
  path: string;
  type: UploadType;
};

interface RHFUploadMultiProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  name: string;
  label?: string;
  className?: string;
  defaultValue?: UploadedItem[];
  placeholder?: string;
  uploadTypes?: UploadType[];
  disabled?: boolean;
  maxItems?: number;
}

export const RHFUploadMulti: React.FC<RHFUploadMultiProps> = ({
  name,
  label,
  className,
  defaultValue,
  placeholder,
  uploadTypes = ['image', 'video', 'file'],
  disabled,
  maxItems = Infinity,
  ...rest
}) => {
  const t = useCommonTranslation();
  const { control } = useFormContext();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const acceptTypes = useMemo(() => {
    const parts: string[] = [];
    if (uploadTypes.includes('image')) parts.push('image/*');
    if (uploadTypes.includes('video')) parts.push('video/*');
    if (uploadTypes.includes('file')) parts.push('*');
    return parts.join(',');
  }, [uploadTypes]);

  const getMaxFileSize = (type: UploadType) => {
    switch (type) {
      case 'image':
        return 5 * 1024 * 1024;
      case 'video':
      case 'file':
      default:
        return 20 * 1024 * 1024;
    }
  };

  const resolveTypeFromFile = (file: File): UploadType => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'file';
  };

  const getUploadAction = (type: UploadType) => {
    switch (type) {
      case 'image':
        return uploadImageAction;
      case 'video':
        return uploadVideoAction;
      case 'file':
      default:
        return uploadFileAction;
    }
  };

  const getFormDataKey = (type: UploadType) => {
    switch (type) {
      case 'image':
        return 'image';
      case 'video':
        return 'video';
      case 'file':
      default:
        return 'file';
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
    currentValue: UploadedItem[]
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadError("");

    try {
      const results: UploadedItem[] = [];
      for (const file of files) {
        const type = resolveTypeFromFile(file);
        if (!uploadTypes.includes(type)) {
          continue;
        }

        const maxFileSize = getMaxFileSize(type);
        if (file.size > maxFileSize) {
          setUploadError(type === 'image' ? t('validation.invalid.lowSizeError') : t('validation.invalid.highSizeError'));
          continue;
        }

        const formData = new FormData();
        formData.append(getFormDataKey(type), file);

        const uploadAction = getUploadAction(type);
        const response: UploadResponse = await uploadAction(formData);

        if (response.status === StatusCode.Success && response.url) {
          results.push({ path: response.url, type });
        } else {
          setUploadError(response.message || t('validation.invalid.fileError'));
        }
      }

      // Enforce max items limit
      let allowedResults = results;
      if (Number.isFinite(maxItems)) {
        const remaining = Math.max((maxItems - (currentValue?.length || 0)), 0);
        if (allowedResults.length > remaining) {
          allowedResults = allowedResults.slice(0, remaining);
          setUploadError(t('validation.invalid.fileError'));
        }
      }

      if (allowedResults.length > 0) {
        onChange([...(currentValue || []), ...allowedResults]);
      }
    } catch (error) {
      setUploadError(t('validation.invalid.fileError'));
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleDeleteItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    onChange: (...event: any[]) => void,
    currentValue: UploadedItem[],
    index: number
  ) => {
    e.stopPropagation();
    const next = [...(currentValue || [])];
    next.splice(index, 1);
    onChange(next);
  };

  const getPlaceholderText = () => {
    if (placeholder) return placeholder;
    return t('inputs.selectFile');
  };

  const filenameFromPath = (path: string) => {
    try {
      const parts = path.split('/');
      return parts[parts.length - 1] || path;
    } catch {
      return path;
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue as any}
      render={({ field, fieldState }) => {
        const items: UploadedItem[] = Array.isArray(field.value) ? field.value : [];
        return (
          <FormItem className="gap-1 w-full">
            {label && (
              <FormLabel className={cn("text-title mr-3 text-xs", disabled && "text-disabled-text")}>{label}</FormLabel>
            )}
            <FormControl>
              <div className="relative">
                <div
                  className={cn(
                    "flex text-muted-foreground border border-input bg-input h-12 w-full min-w-0 rounded-xl items-center justify-between px-3 py-4 text-sm",
                    fieldState.error || uploadError ? "border-destructive" : "",
                    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                  )}
                >
                  <label
                    htmlFor={`${name}-input`}
                    className={cn(
                      "flex-1 flex text-muted-foreground items-center gap-2 truncate cursor-pointer transition",
                      isUploading ? "cursor-not-allowed" : "",
                      className
                    )}
                  >
                    {isUploading ? (
                      <Loading type="spinner" size={"small"} variant="primary" />
                    ) : (
                      <Paperclip2 className="stroke-label size-5" />
                    )}
                    <span className="truncate max-w-56">
                      {isUploading
                        ? t("messages.uploading")
                        : items.length > 0
                        ? `${items.length} ${t("inputs.itemSelected")}`
                        : getPlaceholderText()}
                    </span>
                  </label>

                  {items.length > 0 && !isUploading && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange([]);
                        setUploadError("");
                        if (inputRef.current) inputRef.current.value = "";
                      }}
                      className="text-destructive transition cursor-pointer"
                    >
                      <Trash className="stroke-label size-5" />
                    </button>
                  )}
                </div>

                <input
                  ref={inputRef}
                  id={`${name}-input`}
                  type="file"
                  multiple
                  accept={acceptTypes}
                  className="hidden"
                  onChange={(e) => handleChange(e, field.onChange, items)}
                  disabled={isUploading}
                  {...rest}
                />
              </div>
            </FormControl>

            {items.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {items.map((item, index) => (
                  <div
                    key={`${item.path}-${index}`}
                    className="flex items-center gap-2 bg-muted px-2 py-1 rounded-md"
                  >
                    <span className="text-xs lg:text-sm text-title truncate max-w-40">
                      {filenameFromPath(item.path)}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.type}</span>
                    <button
                      type="button"
                      className="text-destructive"
                      onClick={(e) => handleDeleteItem(e, field.onChange, items, index)}
                    >
                      <Trash className="stroke-label size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {uploadError && <p className="text-sm text-destructive">{uploadError}</p>}
            <FormMessage className="text-xs mr-3" />
          </FormItem>
        );
      }}
    />
  );
}