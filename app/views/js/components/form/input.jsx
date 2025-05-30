import { cn } from "@/utils";

export default function Input({ className, type, as: Comp = "input", ...props }, ref) {
    if (props.render) {
        props.children = props.render(props);
    }

    return (
        <Comp
            type={type}
            className={cn(
                "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
}
