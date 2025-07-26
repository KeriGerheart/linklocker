import styles from "./page.module.css";

export default function Home() {
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className="w-4/6 text-center mx-auto py-20">
                    <h1 className="font-heading text-dark_grey text-7xl font-extrabold">Secure Your Shares. Simply.</h1>
                </div>
            </div>
        </section>
    );
}
