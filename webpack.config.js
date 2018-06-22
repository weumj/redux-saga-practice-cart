const webpack = require("webpack");
const path = require("path");
module.exports = {
    mode: process.env.WEBPACK_SERVE ? "development" : "production",
    devtool: "source-map",
    entry: {
        index: [
            // "babel-regenerator-runtime",
            // "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",
            "./",
        ],
    },
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/assets",
        filename: "[name].bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                    },
                ],
                include: path.join(__dirname, "src"),
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
        ],
    },
    node: {
        fs: "empty",
    },
};
