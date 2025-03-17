import { usePage } from "@inertiajs/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function getInitials(fullName) {
    const names = fullName.trim().split(" ");

    if (names.length === 0) return "";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    return `${names[0].charAt(0)}${names[names.length - 1].charAt(
        0,
    )}`.toUpperCase();
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

export function useAuth() {
    return usePage().props.auth;
}
