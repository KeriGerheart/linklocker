"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LockerSkeleton from "@/components/Loaders/LockerSkeleton";
import { LockClosedIcon, LockOpenIcon, ClockIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export default function View98LockerPage({ params }) {
    const router = useRouter();
    const { shortCode } = params;

    // states
    const [loading, setLoading] = useState(true);
    const [isLocked, setIsLocked] = useState(true);
    const [title, setTitle] = useState("");
    const [destinationUrl, setDestinationUrl] = useState("");
    const [expiresLabel, setExpiresLabel] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    // placeholder for testing
    useEffect(() => {
        const timer = setTimeout(() => {
            // placeholder fetch data
            setTitle("Very Important Link");
            setDestinationUrl("https://example.com/some/real/link");
            setExpiresLabel("Expires in 2 days");
            setIsLocked(false);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [shortCode]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(destinationUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    const handleUnlockSubmit = (e) => {
        e.preventDefault();
        // testing
        if (!password.trim()) {
            setError("Please enter a password.");
            return;
        }
        setError("");
        setIsLocked(false);
    };

    if (loading) {
        return (
            <div className="p-6">
                <LockerSkeleton count={1} className="max-w-lg mx-auto" />
            </div>
        );
    }

    // content
    return (
        <div className="max-w-2xl mx-auto mt-12 md:border p-6 md:rounded-lg md:shadow-sm">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold font-heading text-dark_grey">{title}</h1>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm mb-6">
                <ClockIcon className="w-4 h-4" aria-hidden="true" />
                <span>{expiresLabel}</span>
            </div>

            <div className="bg-[#f7f7f7] p-4 rounded-md border border-light_grey border-dashed">
                {isLocked ? (
                    <>
                        <div className="flex items-center gap-2 mb-4">
                            <LockClosedIcon className="w-5 h-5 text-primary_blue" />
                            <p className="text-dark_grey font-medium">This locker is password protected</p>
                        </div>

                        <form onSubmit={handleUnlockSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-dark_grey mb-1">Enter Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-md border border-light_grey px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary_blue"
                                />
                                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                            </div>

                            <button type="submit" className="primary w-full py-2 rounded-md">
                                Unlock
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 mb-4">
                            <LockOpenIcon className="w-5 h-5 text-primary_blue" />
                            <p className="text-dark_grey font-medium">Unlocked</p>
                        </div>

                        <div className="bg-white rounded-md px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p className="text-sm break-all text-dark_grey">{destinationUrl}</p>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-sm font-medium text-primary_blue hover:text-secondary_blue transition"
                                type="button">
                                <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>

                        <a
                            href={destinationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 button-primary w-full inline-flex justify-center py-2 rounded-md">
                            Open Link
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}
