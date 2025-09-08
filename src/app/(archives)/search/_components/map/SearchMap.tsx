"use client"

import { BusinessCard } from "@/app/_components/cards/BusinessCard";
import { peydaFont } from "@/constants/localfont";
import { BusinessSummary } from "@/types/business.type";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.MapContainer })), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.Marker })), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.Popup })), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => ({ default: mod.TileLayer })), { ssr: false });

interface SearchMapProps {
    items: BusinessSummary[];
}

export const SearchMap = ({ items }: SearchMapProps) => {
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

    const getDefaultCenter = (): [number, number] => {
        if (items.length > 0) {
            return [parseFloat(items[0].lat), parseFloat(items[0].long)];
        }
        return [41.0082, 28.9784];
    };

    if (!isClient || !defaultIcon) {
        return <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center rounded-2xl">در حال بارگذاری نقشه...</div>;
    }

    return (
        <MapContainer
            center={getDefaultCenter()}
            zoom={12}
            className="w-full lg:h-[600px] rounded-2xl z-20 sticky top-28"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {items.map((item) => (
                <Marker
                    key={item.id}
                    position={[parseFloat(item.lat), parseFloat(item.long)]}
                    icon={defaultIcon}
                >
                    <Popup className={peydaFont.className}>
                        <BusinessCard
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            rate={item.rate}
                        />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};