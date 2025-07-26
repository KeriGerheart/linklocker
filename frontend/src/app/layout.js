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

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${roboto.variable} ${montserrat.variable}`}>
                <body className="antialiased">
                    <Header />
                    {children}
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
