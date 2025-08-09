"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Switch } from "@headlessui/react";
import { createLocker } from "@/lib/api";

export default function CreateLockerPage() {
    const router = useRouter();
    const { user } = useUser();

    const [title, setTitle] = useState("");
    const [destinationUrl, setDestinationUrl] = useState("");
    const [passwordEnabled, setPasswordEnabled] = useState(false);
    const [password, setPassword] = useState("");
    const [expirationDays, setExpirationDays] = useState("1");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
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

        setSubmitting(true);
        try {
            const data = await createLocker({
                title,
                destinationUrl,
                password: passwordEnabled ? password : "",
                expirationDays: Number(expirationDays),
                ownerId: user.id,
            });

            const shortCode = data?.locker?.shortCode;
            router.push(`/locker-created?code=${encodeURIComponent(shortCode)}`);
        } catch (err) {
            setError(err.message || "Failed to create locker.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 md:border p-6 md:rounded-lg md:shadow-sm">
            <div className="flex flex-col gap-2 pb-6">
                <h1 className="text-2xl font-bold font-heading text-dark_grey">Create a New Locker</h1>
                <p>Securely share your links with password protection and expiration settings.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Title */}
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

                {/* Destination URL */}
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

                {/* Security options */}
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
                                placeholder="Enter password"
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
                        disabled={submitting || !user?.id}
                        className="primary w-full py-2 text-center rounded-md disabled:opacity-60">
                        {submitting ? "Creating..." : "Create Locker"}
                    </button>
                </div>
            </form>
        </div>
    );
}
