"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex pt-12 justify-center min-h-screen px-4">
            <SignIn
                signUpUrl="/sign-up"
                routing="hash"
                appearance={{
                    elements: {
                        cardBox: "shadow-lg border border-gray-200",
                        card: "p-6",
                        header: "flex flex-col items-center",
                        headerTitle: "mt-2 text-2xl font-bold text-dark_grey font-heading",
                        headerSubtitle: "text-sm",
                        formFieldLabel: "text-sm",
                        formFieldInput: "border-gray-300 focus:ring-2 focus:ring-primary_blue rounded-md",
                        formButtonPrimary: "primary-button w-full justify-center mt-4 font-heading font-bold",
                        socialButtonsBlockButton: "border border-gray-300 rounded-md hover:bg-gray-50",
                        footerActionLink: "text-primary_blue hover:text-secondary_blue",
                    },
                    variables: {
                        colorPrimary: "#5068E2",
                        fontFamily: "var(--font-montserrat)",
                        borderRadius: "0.5rem",
                    },
                }}
            />
        </div>
    );
}
