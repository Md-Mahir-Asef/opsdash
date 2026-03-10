interface LoadingProgressProps {
  progress?: number;
  className?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function LoadingProgress({ 
  progress = 0, 
  className = "", 
  showPercentage = true,
  size = "md"
}: LoadingProgressProps) {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2", 
    lg: "h-3"
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <div className={`w-full ${sizeClasses[size]} bg-dark-200 rounded-full overflow-hidden`}>
          <div 
            className={`h-full bg-primary-600 rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${clampedProgress}%` }}
          ></div>
        </div>
        {showPercentage && (
          <span className="absolute -top-6 right-0 text-xs text-dark-600">
            {Math.round(clampedProgress)}%
          </span>
        )}
      </div>
    </div>
  );
}

// Circular progress component
export function CircularProgress({ 
  progress = 0, 
  size = 60, 
  strokeWidth = 4,
  className = "" 
}: { 
  progress?: number; 
  size?: number; 
  strokeWidth?: number;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-dark-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-primary-600 transition-all duration-300 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-dark-900">
          {Math.round(clampedProgress)}%
        </span>
      </div>
    </div>
  );
}
