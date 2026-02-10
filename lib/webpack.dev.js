const {merge} = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'production',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only',
        host: '127.0.0.1',
        port: 3000,
        open: true,
        historyApiFallback: true
    },
    devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
