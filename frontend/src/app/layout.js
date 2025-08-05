import { ClerkProvider } from "@clerk/nextjs";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const roboto = Roboto({
    subsets: ["latin"],
    weights: ["400", "500"],
    variable: "--font-roboto",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weights: ["500", "600", "700", "800"],
    variable: "--font-montserrat",
});

export const metadata = {
    title: "LinkLocker",
    description: "Secure one-time link sharing",
};

const localization = {
    signUp: {
        start: {
            title: "Sign Up for LinkLocker",
            subtitle: "Create your secure links in seconds.",
        },
    },
    formButtonPrimary: "Sign Up",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider localization={localization}>
            <html lang="en" className={`${roboto.variable} ${montserrat.variable}`}>
                <body className="antialiased flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
