const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'blur-[100px]',
    'blur-[120px]',
    'blur-3xl',
    'opacity-10',
    'opacity-20',
    'opacity-30',
    'opacity-60',
    'z-[-1]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
