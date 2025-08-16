"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Switch } from "@headlessui/react";
import { useQueryClient, useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { createLocker, getUserLockers, updateLocker } from "@/lib/api";

export default function CreateLockerPage() {
    const router = useRouter();
    const params = useSearchParams();
    const { user } = useUser();
    const queryClient = useQueryClient();

    const editShortCode = params.get("edit");
    const isEdit = !!editShortCode;

    const [title, setTitle] = useState("");
    const [destinationUrl, setDestinationUrl] = useState("");
    const [passwordEnabled, setPasswordEnabled] = useState(false);
    const [password, setPassword] = useState("");
    const [expirationDays, setExpirationDays] = useState("1");
    const [error, setError] = useState("");

    const { data: lockers = [], isLoading: lockersLoading } = useQuery({
        queryKey: ["lockers", user?.id],
        queryFn: () => getUserLockers(user.id),
        enabled: !!user?.id && isEdit,
    });

    const lockerFromCache = useMemo(() => {
        if (!isEdit) return null;
        const cachedLockers = queryClient.getQueryData(["lockers", user?.id]) || [];
        return cachedLockers.find((l) => l.shortCode === editShortCode) || null;
    }, [isEdit, editShortCode, queryClient, user?.id]);

    useEffect(() => {
        if (!lockerFromCache) return;
        setTitle(lockerFromCache.title ?? "");
        setDestinationUrl(lockerFromCache.destinationUrl ?? "");
        setPasswordEnabled(!!lockerFromCache.passwordHash);
    }, [lockerFromCache]);

    const createMutation = useMutation({
        mutationFn: (payload) => createLocker(payload),

        onMutate: async (payload) => {
            setError("");
            await queryClient.cancelQueries({ queryKey: ["lockers", user?.id] });

            const previous = queryClient.getQueryData(["lockers", user?.id]) || [];

            const tempShort = `temp-${Math.random().toString(36).slice(2, 8)}`;
            const tempLocker = {
                _id: tempShort,
                title: payload.title,
                destinationUrl: payload.destinationUrl,
                shortCode: tempShort,
                views: 0,
                passwordHash: payload.password ? "set" : undefined,
                expirationDate: new Date(
                    Date.now() + Number(payload.expirationDays) * 24 * 60 * 60 * 1000
                ).toISOString(),
                ownerId: user?.id,
            };

            queryClient.setQueryData(["lockers", user?.id], [tempLocker, ...previous]);
            return { previous, tempShort };
        },

        onError: (err, _payload, ctx) => {
            if (ctx?.previous) queryClient.setQueryData(["lockers", user?.id], ctx.previous);
            setError(err?.message || "Failed to create locker.");
        },

        onSuccess: (data, payload, ctx) => {
            const real = {
                ...data.locker,
                title: payload.title,
                destinationUrl: payload.destinationUrl,
                views: 0,
                passwordHash: payload.password ? "set" : undefined,
                ownerId: user?.id,
            };

            queryClient.setQueryData(["lockers", user?.id], (old = []) => {
                return [real, ...old.filter((l) => l.shortCode !== ctx?.tempShort)];
            });

            const shortCode = data?.locker?.shortCode;
            router.push(`/locker-created?code=${encodeURIComponent(shortCode)}`);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["lockers", user?.id] });
        },
    });

    const editMutation = useMutation({
        mutationFn: ({ shortCode, updates }) => updateLocker(shortCode, updates),
        onError: (err) => setError(err?.message || "Failed to update locker."),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lockers", user?.id] });
            router.push("/dashboard");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!user?.id) {
            setError("You must be signed in to create a locker.");
            return;
        }
        if (!title.trim() || !destinationUrl.trim()) {
            setError("Title and destination URL are required.");
            return;
        }

        if (isEdit) {
            const updates = {
                title,
                destinationUrl,
                expirationDays: Number(expirationDays),
            };
            if (passwordEnabled && password.trim()) {
                updates.password = password.trim();
            }
            editMutation.mutate({ shortCode: editShortCode, updates });
        } else {
            const payload = {
                title,
                destinationUrl,
                password: passwordEnabled ? password : "",
                expirationDays: Number(expirationDays),
                ownerId: user.id,
            };
            createMutation.mutate(payload);
        }
    };

    const isSubmitting = createMutation.isPending || editMutation.isPending;

    if (isEdit && lockersLoading && !lockerFromCache) {
        return (
            <div className="max-w-2xl mx-auto mt-8 md:border p-6 md:rounded-lg md:shadow-sm">
                <p>Loading locker…</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 md:border p-6 md:rounded-lg md:shadow-sm">
            <div className="flex flex-col gap-2 pb-6">
                <h1 className="text-2xl font-bold font-heading text-dark_grey">
                    {isEdit ? "Edit Locker" : "Create a New Locker"}
                </h1>
                <p>
                    {isEdit
                        ? "Update details for your locker."
                        : "Securely share your links with password protection and expiration settings."}
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium mb-1 text-dark_grey">Locker Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Project Docs"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-md border border-light_grey px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary_blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-dark_grey">Destination URL</label>
                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={destinationUrl}
                        onChange={(e) => setDestinationUrl(e.target.value)}
                        className="w-full rounded-md border border-light_grey px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary_blue"
                    />
                </div>

                <div className="bg-[#f7f7f7] p-4 rounded-md border border-light_grey border-dashed">
                    <p className="font-heading text-dark_grey text-lg font-semibold pb-4">Security Options</p>

                    <div className="flex items-center justify-between pb-2">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-dark_grey">
                                Enable Password Protection
                            </label>
                            <span className="text-xs">Require a password to access the link.</span>
                        </div>
                        <Switch
                            checked={passwordEnabled}
                            onChange={setPasswordEnabled}
                            className={`${
                                passwordEnabled ? "bg-primary_blue" : "bg-gray-300"
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}>
                            <span
                                className={`${
                                    passwordEnabled ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                        </Switch>
                    </div>

                    {passwordEnabled && (
                        <div className="pb-2">
                            <label className="block text-sm font-medium mb-1 text-dark_grey">Password</label>
                            <input
                                type="text"
                                placeholder={isEdit ? "Leave blank to keep current password" : "Enter password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md border border-light_grey px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary_blue"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1 text-dark_grey">Expiration</label>
                        <select
                            value={expirationDays}
                            onChange={(e) => setExpirationDays(e.target.value)}
                            className="w-full rounded-md border border-light_grey px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary_blue">
                            <option value="1">24 hours</option>
                            <option value="3">3 days</option>
                            <option value="7">7 days</option>
                        </select>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || !user?.id}
                        className="primary w-full py-2 text-center rounded-md disabled:opacity-60">
                        {isSubmitting
                            ? isEdit
                                ? "Saving..."
                                : "Creating..."
                            : isEdit
                            ? "Save Changes"
                            : "Create Locker"}
                    </button>
                </div>
            </form>
        </div>
    );
}
