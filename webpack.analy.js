/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-12-07 15:00:17
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-07 15:04:27
 */
const prodConfig = require('./webpack.prod')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const {
    merge
} = require('webpack-merge')
module.exports = smp.wrap(merge(prodConfig), {

})