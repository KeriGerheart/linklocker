import styles from "./Hero.module.css";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className="sm:w-4/6 text-center mx-auto py-20">
                    <h1 className="font-heading text-dark_grey text-5xl sm:text-7xl font-extrabold">
                        Secure Your Shares. Simply.
                    </h1>
                    <p className="text-light_grey text-lg pt-6">
                        Create password-protected and time-limited links with LinkLocker. Share anything securely,
                        manage access, and track views effortlessly.
                    </p>
                    <div className="flex justify-center pt-6">
                        <Link href="/signup">
                            <button className="primary">Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
