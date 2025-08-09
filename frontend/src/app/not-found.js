import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-primary_blue mb-4" aria-hidden="true" />
            <h1 className="text-3xl font-bold mb-2 text-dark_grey font-heading">Page Not Found</h1>
            <p className="max-w-md mb-6">The page you’re looking for doesn’t exist or has been moved.</p>
            <Link href="/">
                <button className="primary mx-auto">Homepage</button>
            </Link>
        </div>
    );
}
