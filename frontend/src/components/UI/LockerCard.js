import {
    LockClosedIcon,
    LockOpenIcon,
    ClockIcon,
    EyeIcon,
    PencilSquareIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

export default function LockerCard({ locker }) {
    return (
        <div className="border rounded-lg py-2 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col px-4 pb-2">
                <h2 className="text-lg font-semibold font-heading text-dark_grey">{locker.title}</h2>
                <p className="text-sm">{locker.url}</p>
            </div>

            <hr />
            <div className="flex flex-col gap-1 pt-2 px-4">
                <p className="text-sm flex items-center gap-1">
                    {locker.passwordHash ? (
                        <>
                            <LockClosedIcon className="w-4 h-4" aria-hidden="true" />
                            Password Protected
                        </>
                    ) : (
                        <>
                            <LockOpenIcon className="w-4 h-4" aria-hidden="true" />
                            No Password
                        </>
                    )}
                </p>{" "}
                <p className="text-sm flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" aria-hidden="true" /> Expires:{" "}
                    {new Date(locker.expirationDate).toLocaleDateString()}
                </p>
                <p className="text-sm flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" aria-hidden="true" /> Views: {locker.views}
                </p>
                <div className="mt-3 flex gap-2 pb-2">
                    <button className="flex-1 text-dark_grey font-medium border border-dark_grey p-2 rounded-md text-sm flex items-center justify-center gap-1 hover:bg-primary_blue hover:border-primary_blue hover:text-white transition-colors duration-200">
                        <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" /> Copy Link
                    </button>
                    <button className="flex-1 text-dark_grey font-medium border border-dark_grey p-2 rounded-md text-sm flex items-center justify-center gap-1 hover:bg-primary_blue hover:border-primary_blue hover:text-white transition-colors duration-200">
                        <PencilSquareIcon className="w-4 h-4" aria-hidden="true" /> Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
