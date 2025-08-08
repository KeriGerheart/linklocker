import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ExpiredLockerPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-3 max-w-2xl mx-auto">
            <ShieldExclamationIcon className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-dark_grey" />

            <h1 className="text-2xl font-bold font-heading text-dark_grey">This link is no longer available.</h1>
            <p>
                The locker link you attempted to access has either expired or is invalid. Please ensure you have the
                correct link or contact the sender for assistance.
            </p>

            <div className="mt-6 flex flex-col gap-3">
                <Link href="/">
                    <button className="primary mx-auto">Return to home</button>
                </Link>
            </div>
        </div>
    );
}
