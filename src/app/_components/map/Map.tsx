"use client"

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.MapContainer })), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.Marker })), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.TileLayer })), { ssr: false });

interface MapProps {
    lat: number;
    long: number;
    className?: string;
}

export const Map = ({ lat, long, className }: MapProps) => {
    const [defaultIcon, setDefaultIcon] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        import("leaflet").then((L) => {
            setDefaultIcon(L.default.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
            }));
        });
    }, []);

    if (!isClient || !defaultIcon) {
        return (
            <div className={cn("w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-xl", className)}>
                در حال بارگذاری نقشه...
            </div>
        );
    }

    return (
        <MapContainer
            center={[lat, long]}
            zoom={15}
            className={cn("w-full h-[300px] rounded-xl z-20", className)}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={[lat, long]}
                icon={defaultIcon}
            />
        </MapContainer>
    );
};