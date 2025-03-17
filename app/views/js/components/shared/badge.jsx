import { cn } from "@/lib/utils";

const variants = {
    success: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    warning: "bg-primary-orange/10 text-primary-orange border border-primary-orange/20",
    default: "bg-[#2C2C2C] text-gray-400 border border-[#3C3C3C]",
};

export function Badge({ children, variant = "default", className, ...props }) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
