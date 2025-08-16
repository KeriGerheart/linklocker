"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Create Locker", href: "/create-locker" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header className="bg-white font-body shadow-md">
            <nav
                aria-label="Global"
                className="mx-auto max-w-7xl flex items-center justify-between py-6 gap-8 px-4 2xl:px-0">
                <Link href="/" className="flex items-end -translate-y-1">
                    <Image src="/linklocker.svg" alt="LinkLocker Logo" width={40} height={40} />
                    <span className="text-lg text-dark_grey font-semibold">LinkLocker</span>
                </Link>

                <div className="flex md:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>

                <div className="hidden md:flex md:gap-x-12">
                    <SignedIn>
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm/6 font-semibold text-dark_grey hover:text-primary_blue transition-colors duration-200">
                                {item.name}
                            </Link>
                        ))}
                        <SignOutButton
                            redirectUrl="/"
                            className="text-sm/6 font-semibold text-dark_grey hover:text-primary_blue transition-colors duration-200"
                        />
                    </SignedIn>
                    <SignedOut>
                        <Link
                            className="text-sm/6 font-semibold text-primary_blue hover:text-dark_grey transition-colors duration-200"
                            href="/sign-in">
                            Sign In
                        </Link>
                        <Link
                            className="text-sm/6 font-semibold text-primary_blue hover:text-dark_grey transition-colors duration-200"
                            href="/sign-up">
                            Sign Up
                        </Link>
                    </SignedOut>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-end -translate-y-1">
                            <Image src="/linklocker.svg" alt="LinkLocker Logo" width={40} height={40} />
                            <span className="text-lg text-dark_grey font-semibold">LinkLocker</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-dark_grey">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <SignedIn>
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-dark_grey">
                                            {item.name}
                                        </Link>
                                    ))}
                                </SignedIn>
                                <SignedOut>
                                    <Link
                                        href="/sign-in"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-primary_blue">
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/sign-up"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-primary_blue">
                                        Sign Up
                                    </Link>
                                </SignedOut>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
