interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export default function LoadingSkeleton({ className = "", lines = 3, height = "h-4" }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className={`${height} bg-dark-200 rounded animate-pulse`}
          style={{
            animationDelay: `${index * 0.1}s`,
            width: index === lines - 1 ? '60%' : '100%'
          }}
        ></div>
      ))}
    </div>
  );
}

// Card skeleton component
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-dark-100 border border-dark-300 rounded-lg p-6 ${className}`}>
      <div className="animate-pulse space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 bg-dark-200 rounded"></div>
          <div className="w-16 h-4 bg-dark-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-dark-200 rounded w-3/4"></div>
          <div className="h-4 bg-dark-200 rounded w-1/2"></div>
        </div>
        <div className="h-2 bg-dark-200 rounded w-full"></div>
      </div>
    </div>
  );
}

// Table skeleton component
export function TableSkeleton({ rows = 5, className = "" }: { rows?: number; className?: string }) {
  return (
    <div className={`bg-dark-100 border border-dark-300 rounded-lg overflow-hidden ${className}`}>
      <div className="p-4 border-b border-dark-300">
        <div className="h-6 bg-dark-200 rounded w-1/4 animate-pulse"></div>
      </div>
      <div className="divide-y divide-dark-300">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="p-4 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-dark-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-dark-200 rounded w-1/3"></div>
                <div className="h-3 bg-dark-200 rounded w-1/2"></div>
              </div>
              <div className="w-20 h-6 bg-dark-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
