"use client"

import { usePagesTranslation } from "@/hooks/useTranslation"
import { Button } from "@/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const AroundMeFilter = () => {
    const t = usePagesTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [location, setLocation] = useState<{ lat: number, long: number } | undefined>(() => {
        const lat = searchParams.get('lat');
        const long = searchParams.get('long');

        if (lat && long) {
            return {
                lat: parseFloat(lat),
                long: parseFloat(long)
            };
        }

        return undefined;
    });

    const updateURL = useCallback((lat: number, long: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (lat && long) {
            params.set('lat', lat.toString());
            params.set('long', long.toString());
        } else {
            params.delete('lat');
            params.delete('long');
        }

        params.delete('page');

        const newURL = `${pathname}?${params.toString()}`;
        router.push(newURL, { scroll: false });
    }, [searchParams, pathname, router]);

    const goLocationHandler = () => {
        if (location) {
            setLocation(undefined);
            const params = new URLSearchParams(searchParams.toString());
            params.delete('lat');
            params.delete('long');
            params.delete('page');
            const newURL = `${pathname}?${params.toString()}`;
            router.push(newURL, { scroll: false });
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    })
                    updateURL(position.coords.latitude, position.coords.longitude)
                },
                (error) => console.log(error)
            )
        } else console.log("your browser does not support geolocation!")
    }

    useEffect(() => {
        const urlLat = searchParams.get('lat');
        const urlLong = searchParams.get('long');

        if (urlLat && urlLong) {
            const newLocation = {
                lat: parseFloat(urlLat),
                long: parseFloat(urlLong)
            };

            if (!location || location.lat !== newLocation.lat || location.long !== newLocation.long) {
                setLocation(newLocation);
            }
        } else if (location) {
            setLocation(undefined);
        }
    }, [searchParams, location]);

    return (
        <Button
            variant={location ? "primary" : "outline"}
            size={"small"}
            onClick={goLocationHandler}>
            {t("search.aroundMe")}
        </Button>
    )
}