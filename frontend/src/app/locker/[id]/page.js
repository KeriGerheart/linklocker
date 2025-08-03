import LockerSkeleton from "@/components/Loaders/LockerSkeleton";

export default function LockerPage() {
    const isLoading = true;

    return (
        <div className="p-6">
            {isLoading ? <LockerSkeleton count={1} className="max-w-md" /> : <div>Locker details go here</div>}
        </div>
    );
}
