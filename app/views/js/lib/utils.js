import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes without conflicts
 * @param {...string} inputs - Tailwind CSS classes to merge
 * @returns {string} - Merged classes without conflicts
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
