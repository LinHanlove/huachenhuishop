const path = require("path");
const resolve = (p) => {
	return path.resolve(__dirname, p);
};

/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	mode: "jit",
	purge: {
		content: [
			resolve("./index.html"),
			resolve("./pages/**/*.{vue,js,ts,jsx,tsx,wxml}"),
			resolve("./components/**/*.{vue,js,ts,jsx,tsx,wxml}"),
		],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
};