import React from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "white";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}) => {
    const baseClasses =
        "font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center";

    const variants = {
        primary:
            "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl",
        secondary:
            "bg-dark-200 hover:bg-dark-300 text-dark-800 border border-dark-300",
        white: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm hover:shadow-md",
    };

    const sizes = {
        sm: "py-2 px-4 text-sm",
        md: "py-3 px-6",
        lg: "py-4 px-8 text-lg",
    };

    return (
        <button
            className={cn(
                baseClasses,
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};
