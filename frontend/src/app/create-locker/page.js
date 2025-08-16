import { Suspense } from "react";
import CreateLockerPageClient from "./CreateLockerPageClient";
import Spinner from "@/components/UI/Spinner";

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center p-6">
                    <Spinner />
                </div>
            }>
            <CreateLockerPageClient />
        </Suspense>
    );
}
