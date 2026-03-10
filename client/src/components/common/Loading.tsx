import LoadingSpinner from "./LoadingSpinner";
import LoadingSkeleton from "./LoadingSkeleton";
import LoadingProgress from "./LoadingProgress";

interface LoadingProps {
    variant?: "full" | "inline" | "skeleton" | "progress";
    message?: string;
    progress?: number;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export default function Loading({
    variant = "full",
    message = "Loading...",
    progress,
    size = "md",
    className = "",
}: LoadingProps) {
    const baseClasses = "flex items-center justify-center";

    switch (variant) {
        case "full":
            return (
                <div
                    className={`min-h-screen bg-dark-50 ${baseClasses} ${className}`}
                >
                    <div className="text-center">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-dark-900 mb-2">
                                OpsDash
                            </h1>
                            <p className="text-dark-600">{message}</p>
                        </div>
                        <LoadingSpinner size="lg" />
                    </div>
                </div>
            );

        case "inline":
            return (
                <div className={`${baseClasses} ${className}`}>
                    <LoadingSpinner size={size} />
                    {message && (
                        <span className="ml-2 text-dark-600">{message}</span>
                    )}
                </div>
            );

        case "skeleton":
            return <LoadingSkeleton className={className} />;

        case "progress":
            return (
                <div className={`w-full ${className}`}>
                    {message && (
                        <p className="text-sm text-dark-600 mb-2">{message}</p>
                    )}
                    <LoadingProgress progress={progress} />
                </div>
            );

        default:
            return (
                <div className={`${baseClasses} ${className}`}>
                    <LoadingSpinner size={size} />
                </div>
            );
    }
}
