import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "ios-wallpaper": "url('/images/ios17-wallpaper.png')"
      },
      colors: {

        "active-side-menu": "rgba(117, 201, 249, 0.87)"
      }
    },
    
  },
  plugins: [],
};
export default config;
