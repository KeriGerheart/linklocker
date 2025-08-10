"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPublicLocker, unlockLocker } from "@/lib/api";
import LockerSkeleton from "@/components/Loaders/LockerSkeleton";
import { LockClosedIcon, LockOpenIcon, ClockIcon, DocumentDuplicateIcon, EyeIcon } from "@heroicons/react/24/outline";

function formatExpiresLabel(dateStr) {
    const d = new Date(dateStr);
    const diffMs = d.getTime() - Date.now();
    if (diffMs <= 0) return "Expired";
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return "Expires in 24h";
    return `Expires in ${diffDays} days`;
}

export default function ViewLockerPage() {
    const router = useRouter();
    const { shortCode } = useParams();

    // states
    const [loading, setLoading] = useState(true);
    const [unlocking, setUnlocking] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [requiresPassword, setRequiresPassword] = useState(false);
    const [destinationUrl, setDestinationUrl] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [views, setViews] = useState(0);
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const expiresLabel = useMemo(() => (expirationDate ? formatExpiresLabel(expirationDate) : ""), [expirationDate]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const meta = await getPublicLocker(shortCode);
                if (cancelled) return;
                setTitle(meta.title);
                setRequiresPassword(!!meta.requiresPassword);
                setExpirationDate(meta.expirationDate);
                setViews(meta.views ?? 0);

                if (!meta.requiresPassword) {
                    setUnlocking(true);
                    const { destinationUrl } = await unlockLocker(shortCode, "");
                    if (cancelled) return;
                    setDestinationUrl(destinationUrl);
                    setViews((v) => v + 1);
                }
            } catch (e) {
                if (e.status === 410) {
                    router.replace("/expired-locker");
                    return;
                }
                setError(e.message || "Failed to load locker.");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                    setUnlocking(false);
                }
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [shortCode, router]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(destinationUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            /* noop */
        }
    };

    const handleUnlock = async (e) => {
        e.preventDefault();
        setError("");
        setUnlocking(true);
        try {
            const { destinationUrl } = await unlockLocker(shortCode, password);
            setDestinationUrl(destinationUrl);
            setViews((v) => v + 1);
        } catch (e) {
            if (e.status === 410) {
                router.replace("/expired-locker");
                return;
            }
            setError(e.message || "Invalid password");
        } finally {
            setUnlocking(false);
        }
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
            <h1 className="text-2xl text-center mb-2 font-bold font-heading text-dark_grey">
                {title || "Shared Link"}
            </h1>

            {error && (
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}
            <div className="flex items-center justify-center gap-2 text-sm pb-2">
                <EyeIcon className="w-4 h-4" aria-hidden="true" />
                <span>Views: {views}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm mb-6">
                <ClockIcon className="w-4 h-4" aria-hidden="true" />
                <span>{expiresLabel}</span>
            </div>

            <div className="bg-[#f7f7f7] p-4 rounded-md border border-light_grey border-dashed">
                {requiresPassword && !destinationUrl && (
                    <>
                        <div className="flex items-center gap-2 mb-4">
                            <LockClosedIcon className="w-5 h-5 text-primary_blue" />
                            <p className="text-dark_grey font-medium">This locker is password protected</p>
                        </div>

                        <form onSubmit={handleUnlock} className="space-y-4">
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

                            <button
                                type="submit"
                                disabled={unlocking || !password}
                                className="primary w-full py-2 rounded-md">
                                {unlocking ? "Unlocking..." : "Unlock"}
                            </button>
                        </form>
                    </>
                )}
                {destinationUrl && (
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
