const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        // index: './src/index.ts',
        korea: './src/korea.ts',
    },
    devtool: 'inline-source-map',
    mode:'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.png|jpe?g|tif$/,
                use: 'file-loader',
                exclude: /node_modules/,
            }
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'korea.html',
            chunks: ['korea']
        }),
        
    ],
    devServer:{
        contentBase: [`${__dirname}/dist`, `${__dirname}/result`],
        contentBasePublicPath: ['/', '/result'],
        inline:true,
        hot:true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:4000',
                changeOrigin: true,
                secure: false
            },
            '/socket.io' : {
                target: 'http://127.0.0.1:4000',
                ws: true,
                changeOrigin: true,
                secure: false
            }
            // '/sockjs-node' : {
            //     target: 'ws://[::1]:3000',
            //     ws:true,
            //     changeOrigin: true,
            //     secure:false
            // }
        },
        host: '0.0.0.0',
        port: 4500
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.webpack_cache')
    },
};