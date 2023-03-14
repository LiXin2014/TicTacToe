const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './app/index.jsx',
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
}