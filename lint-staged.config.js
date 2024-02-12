/** @type {import("lint-staged").Config} */
const config = {
  "./src/**/*.ts?(x)": () => "tsc --noEmit",
  "./src/**/*.{js,ts,jsx,tsx}": (filenames) => [
    `eslint --no-ignore --max-warnings=0 --fix ${filenames.join(" ")}`,
    `prettier --write ${filenames.join(" ")}`,
  ],
};

export default config;
