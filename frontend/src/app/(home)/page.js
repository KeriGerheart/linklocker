import Hero from "@/components/Homepage/Hero";
import Features from "@/components/Homepage/Features";
import Image from "next/image";
import { LockClosedIcon, BoltIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <section className="py-16 bg-white">
                <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
                    <div className="flex-shrink-0 w-full md:w-1/2">
                        <Image
                            src="/img/simple-secure.png"
                            className="rounded-lg shadow-lg"
                            alt="LinkLocker security illustration"
                            width={432}
                            height={294}
                        />
                    </div>

                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-2xl font-bold text-dark_grey font-heading">Simple. Secure. Yours</h2>
                        <p className="text-light_grey">
                            At LinkLocker, your privacy and control come first. We keep things straightforward and
                            secure so you can share with confidence.
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center gap-3">
                                <LockClosedIcon className="w-6 h-6 text-primary_blue" aria-hidden="true" />
                                Links can be password-protected for added privacy
                            </li>
                            <li className="flex items-center gap-3">
                                <BoltIcon className="w-6 h-6 text-primary_blue" aria-hidden="true" />
                                You choose when your links expire
                            </li>
                            <li className="flex items-center gap-3">
                                <NoSymbolIcon className="w-6 h-6 text-primary_blue" aria-hidden="true" />
                                No unnecessary data collection
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="py-16 text-center">
                <div className="container max-w-7xl mx-auto px-6 py-20 bg-bg_blue rounded-2xl">
                    <h3 className="text-2xl font-bold text-dark_grey font-heading mb-6">Ready to Secure Your Links?</h3>
                    <Link href="/sign-up">
                        <button className="primary mx-auto">Start Building Lockers</button>
                    </Link>
                </div>
            </section>
        </>
    );
}
