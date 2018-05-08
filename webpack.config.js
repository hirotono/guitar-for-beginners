const MODE = 'development';
const enabledSourceMap = (MODE === 'development');

var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    mode: 'development',//ソースマップ有効 production指定で圧縮
    entry: './src/index.jsx',
    output: {
        path: `${__dirname}/dist`,
        filename: 'main.js'
    },
    devServer: {
        contentBase: 'dist',
        open: true
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: enabledSourceMap,//ソースマップ有効
                            importLoaders: 2
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                loader: 'url-loader',//画像をBase64として取り込む
            },
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', {'modules': false}],
                                'react'
                            ]
                        }
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    }
}