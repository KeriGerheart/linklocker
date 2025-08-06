import LockerCard from "./LockerCard";

export default function Locker({ lockers }) {
    if (!lockers || lockers.length === 0) {
        return <p className="text-gray-500">No lockers found. Create one to get started!</p>;
    }

    return (
        <>
            <h2 className="py-8 font-heading text-dark_grey text-2xl font-semibold">Your Lockers</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lockers.map((locker) => (
                    <LockerCard key={locker.shortCode} locker={locker} />
                ))}
            </div>
        </>
    );
}
