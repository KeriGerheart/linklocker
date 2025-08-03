import LockerSkeleton from "@/components/Loaders/LockerSkeleton";

export default function DashboardPage() {
    const isLoading = true;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Locker Loading Skeleton</h1>
            {isLoading ? <LockerSkeleton count={5} /> : <div>real lockers go here</div>}
        </div>
    );
}
