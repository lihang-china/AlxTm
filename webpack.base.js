/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-12-07 09:47:48
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-07 16:20:59
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式s
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.join(__dirname, './src/index.tsx'),
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        path: path.join(__dirname, './dist'),
        clean: true,
        publicPath: process.env.NODE_ENV === 'production' ? './' : '/'

    },
    module: {
        rules: [{
                test: /.(ts|tsx)$/,
                use: ['thread-loader', 'babel-loader']
            },
            {
                test: /.(css|scss)$/, //匹配 css和less 文件.
                // include: [path.resolve(__dirname, './src')],
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: "static/images/[name].[contenthash:8][ext]"
                }
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            }
        ]
    },
    resolve: {
        // include: [path.resolve(__dirname, './src')],
        // modules: [path.resolve(__dirname, './node_modules')],
        extensions: ['.js', '.tsx', '.ts'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            inject: true
        })
    ],
    cache: {
        type: 'filesystem', // 使用文件缓存
    }
}