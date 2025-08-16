"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getUserLockers } from "@/lib/api";
import Locker from "@/components/UI/Locker";
import Skeleton from "@/components/Loaders/Skeleton";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();

    const q = useQuery({
        queryKey: ["lockers", user?.id],
        queryFn: () => getUserLockers(user.id),
        enabled: isLoaded && !!user?.id,
        staleTime: 60_000,
    });

    if (!isLoaded || q.isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 2xl:px-0 pt-8">
                {Array(3)
                    .fill(0)
                    .map((_, idx) => (
                        <div key={idx} className="flex gap-4">
                            <Skeleton className="w-16 h-16" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-3 w-1/3" />
                            </div>
                        </div>
                    ))}
            </div>
        );
    }

    if (q.error) {
        return (
            <div className="max-w-7xl mx-auto px-4 2xl:px-0 pt-8">
                <h1 className="text-2xl font-bold mb-4 font-heading text-dark_grey">
                    Welcome Back, {user?.firstName || user?.username || "Friend"}!
                </h1>
                <p className="pb-6">Here&#39;s an overview of your lockers.</p>
                <hr />
                <div className="p-6 text-sm text-red-600">Failed to load lockers: {q.error.message}</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 2xl:px-0 pt-8">
            <h1 className="text-2xl font-bold mb-4 font-heading text-dark_grey">
                Welcome Back, {user?.firstName || user?.username || "Friend"}!
            </h1>
            <p className="pb-6">Here&#39;s an overview of your lockers.</p>
            <hr />
            <Locker lockers={q.data ?? []} />
        </div>
    );
}
