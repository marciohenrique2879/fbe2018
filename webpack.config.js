const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": ["react", "es2015"],
                        "plugins": ['transform-object-rest-spread']
                    }
                }
            },{
            test: /\.css$/, loaders: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [htmlPlugin]
};