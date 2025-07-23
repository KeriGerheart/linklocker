import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./components/Header";

export const metadata = {
    title: "LinkLocker",
    description: "Secure one-time link sharing",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="antialiased">
                    <Header />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
