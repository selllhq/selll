import { defineConfig } from "vite";
import leaf from "@leafphp/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        leaf({
            input: ["app/views/js/app.jsx"],
            refresh: true,
        }),
        react(),
        eslintPlugin({
            cache: false,
            include: ["./app/views/js/**/*.js", "./app/views/js/**/*.jsx"],
            exclude: [],
        }),
    ],
    resolve: {
        alias: {
            "@": "/app/views/js",
        },
    },
});
