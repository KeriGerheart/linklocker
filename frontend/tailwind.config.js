/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/app/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary_blue: "#5068E2",
                secondary_blue: "#70A0E9",
            },
            fontFamily: {
                body: ["var(--font-roboto)", "sans-serif"],
                heading: ["var(--font-montserrat)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
