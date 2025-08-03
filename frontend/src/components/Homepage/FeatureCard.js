export default function FeatureCard({ title, description, icon: Icon }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center rounded-full w-12 h-12 bg-bg_blue mb-4">
                <Icon className="w-6 h-6 text-primary_blue" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-lg text-dark_grey font-heading mb-2">{title}</h3>
            <p className="text-sm text-light_grey">{description}</p>
        </div>
    );
}
