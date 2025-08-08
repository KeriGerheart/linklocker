"use client";

import { useState } from "react";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function LockerCreatedPage({ lockerUrl = "https://example.com/locker/123" }) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(lockerUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <CheckCircleIcon className="w-16 h-16 text-dark_grey mb-4" />
            <h1 className="text-2xl font-bold font-heading text-dark_grey pb-2">Locker Created!</h1>
            <p className="text-sm mb-6">
                Your secure locker has been successfully generated. Share this link to grant access.
            </p>

            <div className="bg-gray-100 rounded-md px-4 py-3 flex items-center justify-between gap-2 w-full max-w-md mb-6">
                <p className="text-sm break-all text-gray-800">{lockerUrl}</p>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-sm font-medium text-primary_blue hover:text-secondary_blue transition">
                    <DocumentDuplicateIcon className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => router.push("/create-locker")}
                    className="bg-primary_blue hover:bg-secondary_blue text-white text-sm font-medium px-4 py-2 rounded-md transition">
                    Create Another Locker
                </button>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="border border-gray-400 text-dark_grey text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition">
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}
