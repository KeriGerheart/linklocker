import LockerCard from "./LockerCard";
import Link from "next/link";

export default function Locker({ lockers }) {
    if (!lockers || lockers.length === 0) {
        return (
            <p className="pt-5">
                No lockers found.{" "}
                <Link href="/create-locker" className="text-primary_blue font-semibold">
                    Create one to get started!
                </Link>
            </p>
        );
    }

    return (
        <>
            <h2 className="py-8 font-heading text-dark_grey text-2xl font-semibold">Your Lockers</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {lockers.map((locker) => (
                    <LockerCard key={locker.shortCode} locker={locker} />
                ))}
            </div>
        </>
    );
}
