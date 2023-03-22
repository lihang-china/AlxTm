/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-12-07 13:14:54
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-07 19:12:58
 */
const glob = require('glob')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssminizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const {
    merge
} = require('webpack-merge')
const baseConfig = require('./webpack.base')
module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new CssminizerPlugin(), //压缩css
            new TerserPlugin({ // 压缩js
                parallel: true, // 开启多线程压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ["console.log"] // 删除console.log
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendors: { //提取mode_modules文件
                    test: /node_modules/, //匹配node_modules
                    name: 'vendors',
                    minChunks: 5, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, //体积大于0就提取
                    priority: 1 //提取优先级1
                },
                commons: {
                    //提取页面公共代码
                    name: 'commons',
                    minChunks: 2,
                    chunks: 'initial',
                    minSize: 0
                }
            }
        }
    },
    plugins: [
        new CompressionPlugin({
            test: /.(js|css)$/,
            filename: '[path][base].gz',
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 8.0
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css' // 抽离css的输出目录和名称
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, './public'),
                to: path.resolve(__dirname, './dist'),
                filter: source => {
                    return !source.includes('index.html')
                }
            }]
        })
    ]
})
