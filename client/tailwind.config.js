/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    "0%": {
                        transform: "translateY(-140px)",
                    },
                    "100%": {
                        transform: "translateY(0)",
                    },
                },
                fadeOut: {
                    "0%": {
                        transform: "translateY(-140px)",
                        opacity: 0,
                    },
                    "100%": {
                        transform: "translateY(0)",
                        opacity: 1,
                    },
                },
                push: {
                    from: {
                        background: "transparent",
                    },
                    to: {
                        background: "#ffffff",
                    },
                },
            },

            animation: {
                shrinkAnimation: "fadeIn 0.5s linear",
                fadeOut: "fadeOut 0.5s linear,push 0.5s linear",
            },
        },
        screens: {
            tablet: { max: "1024px" },
            mobile: { max: "660px" },
            laptop: { min: "1025px", max: "1300px" },
            desktop: "1301px",
            md: "661px",
        },
    },
};
