// 为了 tailwindcss jit 开发时的热更新
if (process.env.NODE_ENV === "development") {
	process.env.TAILWIND_MODE = "watch";
}

const {
	UniAppWeappTailwindcssWebpackPluginV4,
} = require("weapp-tailwindcss-webpack-plugin");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
	//....
	configureWebpack: {
		plugins: [new UniAppWeappTailwindcssWebpackPluginV4()],
	},
	//....
};

module.exports = config;