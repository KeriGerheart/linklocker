import FeatureCard from "./FeatureCard";
import { LockClosedIcon, ClockIcon, ShareIcon, EyeIcon, UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const features = [
    {
        title: "Password Protection",
        description:
            "Safeguard your sensitive links with custom passwords, ensuring only authorized users can access your content.",
        icon: LockClosedIcon,
    },
    {
        title: "Expiration Controls",
        description:
            "Set automatic expiry dates for your links, perfect for temporary access or time-sensitive shares.",
        icon: ClockIcon,
    },
    {
        title: "Easy Sharing",
        description:
            "Generate concise, shareable links instantly and distribute them effortlessly across any platform.",
        icon: ShareIcon,
    },
    {
        title: "Track Views",
        description: "Monitor visits for each of your shared lockers.",
        icon: EyeIcon,
    },
    {
        title: "No Account Needed to View",
        description: "Recipients don’t need an account to access your links. Just click and unlock.",
        icon: UserIcon,
    },
    {
        title: "Secure Storage",
        description: "Your links are securely stored and managed within your personalized dashboard.",
        icon: ShieldCheckIcon,
    },
];

export default function Features() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-dark_grey mb-4 font-heading">
                    Powerful Features for Secure Sharing
                </h2>
                <p className="text-center text-light_grey max-w-2xl mx-auto mb-12">
                    LinkLocker provides everything you need to manage your links securely and efficiently.
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, idx) => (
                        <FeatureCard
                            key={idx}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
