import Skeleton from "./Skeleton";

export default function LockerSkeleton({ count = 3, className = "" }) {
    return (
        <div className={`space-y-4 ${className}`}>
            {Array(count)
                .fill(0)
                .map((_, idx) => (
                    <div key={idx} className="flex gap-4">
                        <Skeleton className="w-16 h-16" /> {/* Icon placeholder */}
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-1/2" /> {/* Title */}
                            <Skeleton className="h-3 w-1/3" /> {/* Subtitle */}
                        </div>
                    </div>
                ))}
        </div>
    );
}
