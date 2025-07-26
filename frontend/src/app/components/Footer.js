export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="mx-auto flex max-w-7xl justify-center text-body text-sm light_grey pb-5">
                <p> © {currentYear} LinkLocker</p>
            </div>
        </footer>
    );
}
