'use client'

import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMapEvents } from "react-leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.MapContainer })), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.TileLayer })), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.Marker })), { ssr: false });

interface RHFMapProps {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  heightClassName?: string;
}

function LocationMarker({ position, onChange, disabled }: { position: [number, number]; onChange: (pos: [number, number]) => void; disabled?: boolean }) {
  useMapEvents({
    click(e) {
      if (disabled) return;
      const { lat, lng } = e.latlng;
      onChange([lat, lng]);
    },
  });
  return null as any;
}

export const RHFMap: React.FC<RHFMapProps> = ({ name, label, className, disabled, heightClassName }) => {
  const { control } = useFormContext();
  const [defaultIcon, setDefaultIcon] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then((L) => {
      setDefaultIcon(
        L.default.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      );
    });
  }, []);

  const getFallbackCenter = (): [number, number] => [41.0082, 28.9784];

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={getFallbackCenter() as any}
      render={({ field }) => {
        const value: [number, number] = Array.isArray(field.value) && field.value.length === 2
          ? [Number(field.value[0]), Number(field.value[1])] as [number, number]
          : getFallbackCenter();

        if (!isClient || !defaultIcon) {
          return (
            <FormItem className="gap-1 w-full">
              {label && <FormLabel className="text-xs text-title">{label}</FormLabel>}
              <FormControl>
                <div className={cn("w-full h-[225px] bg-gray-200 flex items-center justify-center rounded-xl", className)}>
                  در حال بارگذاری نقشه...
                </div>
              </FormControl>
              <FormMessage className="text-xs mr-3" />
            </FormItem>
          );
        }

        return (
          <FormItem className="gap-1 w-full">
            {label && <FormLabel className="text-xs text-title">{label}</FormLabel>}
            <FormControl>
              <div className={cn("w-full", className)}>
                <MapContainer
                  center={value}
                  zoom={15}
                  className={cn("w-full rounded-xl z-20", heightClassName || "h-[225px]")}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker
                    position={value}
                    disabled={disabled}
                    onChange={(pos) => field.onChange(pos)}
                  />
                  <Marker
                    position={value}
                    icon={defaultIcon}
                    draggable={!disabled}
                    eventHandlers={{
                      dragend(e) {
                        const m = e.target;
                        const p = m.getLatLng();
                        field.onChange([p.lat, p.lng]);
                      },
                    }}
                  />
                </MapContainer>
              </div>
            </FormControl>
            <FormMessage className="text-xs mr-3" />
          </FormItem>
        );
      }}
    />
  );
}