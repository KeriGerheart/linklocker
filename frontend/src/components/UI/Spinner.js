export default function Spinner({ className = "" }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-light_grey border-t-dark_grey" />
        </div>
    );
}
