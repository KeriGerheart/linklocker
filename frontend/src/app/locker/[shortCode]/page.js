"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    const qc = useQueryClient();

    const [destinationUrl, setDestinationUrl] = useState("");
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const metaQ = useQuery({
        queryKey: ["lockerMeta", shortCode],
        queryFn: () => getPublicLocker(shortCode),
        enabled: !!shortCode,
        staleTime: 30_000,
        retry: (count, err) => {
            if (!err?.status) return count < 2; // network/etc
            if (err.status >= 400 && err.status < 500) return false; // client errors
            return count < 2; // server errors retry twice
        },
    });

    const unlockM = useMutation({
        mutationFn: (pwd) => unlockLocker(shortCode, pwd),
        onSuccess: (data) => {
            setDestinationUrl(data.destinationUrl);
            qc.setQueryData(["lockerMeta", shortCode], (prev) =>
                prev ? { ...prev, views: (prev.views ?? 0) + 1 } : prev
            );
        },
        onError: (err) => {
            if (err.status === 410) return router.replace("/expired-locker");
        },
    });

    useEffect(() => {
        if (metaQ.isSuccess && metaQ.data && !metaQ.data.requiresPassword && !destinationUrl) {
            unlockM.mutate("");
        }
        // eslint-disable-next-line
    }, [metaQ.isSuccess, metaQ.data?.requiresPassword, destinationUrl]);

    const expiresLabel = useMemo(
        () => (metaQ.data?.expirationDate ? formatExpiresLabel(metaQ.data?.expirationDate) : ""),
        [metaQ.data?.expirationDate]
    );

    if (metaQ.isLoading) {
        return (
            <div className="p-6">
                <LockerSkeleton count={1} className="max-w-lg mx-auto" />
            </div>
        );
    }

    if (metaQ.error) {
        if (metaQ.error.status === 410) {
            router.replace("/expired-locker");
            return null;
        }
        return (
            <div className="max-w-2xl mx-auto mt-12 md:border p-6 md:rounded-lg md:shadow-sm">
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {metaQ.error.message || "Failed to load locker."}
                </div>
            </div>
        );
    }

    const { title, requiresPassword, views } = metaQ.data || {};

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(destinationUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            /* noop */
        }
    };

    const handleUnlock = (e) => {
        e.preventDefault();
        unlockM.mutate(password);
    };

    return (
        <div className="max-w-2xl mx-auto mt-12 md:border p-6 md:rounded-lg md:shadow-sm">
            <h1 className="text-2xl text-center mb-2 font-bold font-heading text-dark_grey">
                {title || "Shared Link"}
            </h1>

            <div className="flex items-center justify-center gap-2 text-sm pb-2">
                <EyeIcon className="w-4 h-4" aria-hidden="true" />
                <span>Views: {views ?? 0}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm mb-6">
                <ClockIcon className="w-4 h-4" aria-hidden="true" />
                <span>{expiresLabel}</span>
            </div>

            <div className="bg-[#f7f7f7] p-4 rounded-md border border-light_grey border-dashed">
                {requiresPassword && !destinationUrl ? (
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
                                    onChange={(e) => {
                                        if (unlockM.isError) unlockM.reset();
                                        setPassword(e.target.value);
                                    }}
                                    aria-invalid={unlockM.isError ? "true" : "false"}
                                    aria-describedby={unlockM.isError ? "pwd-error" : undefined}
                                    className="w-full rounded-md border border-light_grey px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary_blue"
                                />
                                {unlockM.isError && (
                                    <p id="pwd-error" className="mt-1 text-sm text-red-600">
                                        {unlockM.error?.message || "Invalid password"}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={unlockM.isPending || !password}
                                className="primary w-full py-2 rounded-md">
                                {unlockM.isPending ? "Unlocking..." : "Unlock"}
                            </button>
                        </form>
                    </>
                ) : destinationUrl ? (
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
                ) : null}
            </div>
        </div>
    );
}
