import clsx from "clsx";

export default function Badge({
    children,
    variant = "outline",
    className,
}) {
    return (
        <span
            className={clsx(
                "rounded-full px-3 py-1 text-xs lg:text-sm font-medium tracking-tight",
                {
                    // outline 样式
                    "border-[1.75px] border-secondary-foreground/70 text-secondary-foreground/70 uppercase":
                        variant === "outline",

                    // filled 样式
                    "bg-secondary-foreground/70 text-secondary":
                        variant === "filled",
                },
                className
            )}
        >
            {children}
        </span>
    );
}
