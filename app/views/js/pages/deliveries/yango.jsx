import { useEffect } from "react";

export default function YangoWidget({ deliveryDefaults, order }) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://yastatic.net/taxi-widget/ya-taxi-widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="ya-taxi-widget rounded-3xl mb-2"
            data-ref="https://selll.online"
            data-size="xs"
            data-theme="dark"
            data-title="Book a delivery"
            data-description={`Send out ${order?.customer.name}'s order`}
            data-use-location="true"
            data-app="2187871"
            data-lang="en"
            data-point-а={`${deliveryDefaults?.latitude},${deliveryDefaults?.longitude}`}
            data-point-b={`${order?.latitude},${order?.longitude}`}
            data-proxy-url={`https://yango.go.link/route?start-lat=${deliveryDefaults?.latitude}&start-lon=${deliveryDefaults?.longitude}&end-lat=${order?.latitude}&end-lon=${order?.longitude}&adj_adgroup=widget&ref=https://selll.online&adj_t=vokme8e_nd9s9z9&lang=ru&adj_deeplink_js=1&utm_source=widget&adj_fallback=https%3A%2F%2Fyango.com%2Fen_int%2Forder%2F%3Fgfrom%3D${deliveryDefaults?.longitude}%2C${deliveryDefaults?.latitude}%26gto%3D${order?.longitude}%2C${order?.latitude}%26ref%3Dhttps://selll.online`}
        ></div>
    );
}
