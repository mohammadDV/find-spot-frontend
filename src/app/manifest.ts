import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Finybo",
        short_name: "Finybo",
        description: "Find and explore businesses",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#D71616",
        icons: [
            {
                src: "/images/finybo-icon.png",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}