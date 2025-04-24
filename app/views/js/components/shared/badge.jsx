import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

const variants = {
    success: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    warning:
        "bg-primary-orange/10 text-primary-orange border border-primary-orange/20",
    default: "bg-[#2C2C2C] text-gray-400 border border-[#3C3C3C]",
};

export function Badge({ children, variant = "default", className, ...props }) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium",
                variants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </span>
    );
}

export function StatusBadge({ status, className, ...props }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
            case "paid":
                return <CheckCircle className="h-4 w-4" />;
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "failed":
            case "cancelled":
                return <XCircle className="h-4 w-4" />;
            default:
                return <AlertCircle className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-emerald-500/10 text-emerald-500";
            case "pending":
                return "bg-amber-500/10 text-amber-500";
            case "failed":
                return "bg-red-500/10 text-red-500";
            default:
                return "bg-gray-500/10 text-gray-500";
        }
    };

    return (
        <Badge
            className={cn(getStatusColor(status), className)}
            {...props}
        >
            {getStatusIcon(status)}
            <span className="text-xs font-medium capitalize">
                {status}
            </span>
        </Badge>
    );
}
