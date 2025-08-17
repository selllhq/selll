import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function getInitials(name = "?") {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
}

export function slugify(text) {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // Keep alphanumeric, spaces and hyphens
        .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

export function urlify(url) {
    if (!url) {
        return "";
    }

    const formattedUrl = url
        .replace(/(^\w+:|^)\/\//, "")
        .replace(/\/+$/, "");

    if (formattedUrl.startsWith("www.")) {
        return formattedUrl.slice(4);
    }

    return formattedUrl;
}

export function useAuth() {
    return usePage().props.auth;
}

export function RotatingWords({ words, interval = 3000, className = "" }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words, interval]);

    return (
        <span
            aria-live="polite"
            className={
                "inline-block transition-opacity duration-500 ease-in-out " +
                className
            }
            style={{ minWidth: 90 }}
        >
            {words[index]}
        </span>
    );
}
