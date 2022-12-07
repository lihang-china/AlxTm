/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-12-07 14:07:01
 * @LastEditors: Your Name
 * @LastEditTime: 2022-12-07 14:56:49
 */
const isDEV = process.env.NODE_ENV === 'development'
module.exports = {
    // ...
    "presets": [
        [
            "@babel/preset-env",
            {
                // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                // "targets": {
                //  "chrome": 35,
                //  "ie": 9
                // },
                "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                "corejs": 3 // 配置使用core-js使用的版本
            }
        ],
        ["@babel/preset-react", {
            "runtime": "automatic"
        }],
        "@babel/preset-typescript"
    ],
    "plugins": [
        isDEV && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件
        ["@babel/plugin-proposal-decorators", {
            "legacy": true
        }]
    ].filter(Boolean)
}