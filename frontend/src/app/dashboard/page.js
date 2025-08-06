"use client";
import { useEffect, useState } from "react";
import Locker from "@/components/UI/Locker";
import { useUser } from "@clerk/nextjs";

import Skeleton from "@/components/Loaders/Skeleton";

export default function DashboardPage() {
    const [lockers, setLockers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate network delay
        setTimeout(() => {
            setLockers([
                {
                    shortCode: "abc123",
                    title: "Test Locker 1",
                    url: "testlocker1.com",
                    passwordHash: null,
                    expirationDate: new Date().toISOString(),
                    views: 12,
                },
                {
                    shortCode: "xyz789",
                    title: "Test Locker 2",
                    url: "testlocker2.com",
                    passwordHash: "hashed-password",
                    expirationDate: new Date().toISOString(),
                    views: 4,
                },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto">
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

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 pt-6 font-heading text-dark_grey">Welcome Back, NAME</h1>
            <p className="pb-6">Here&#39;s an overview of your lockers.</p>
            <hr />
            <Locker lockers={lockers} />
        </div>
    );
}
