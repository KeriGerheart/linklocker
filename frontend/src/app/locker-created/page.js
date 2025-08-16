import { Suspense } from "react";
import LockerCreatedPageClient from "./LockerCreatedPageClient";
import Spinner from "@/components/UI/Spinner";

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center p-6">
                    <Spinner />
                </div>
            }>
            <LockerCreatedPageClient />
        </Suspense>
    );
}
