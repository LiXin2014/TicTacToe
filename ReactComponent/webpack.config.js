const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './app/index.tsx',
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.json', ".js", ".jsx"]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
}