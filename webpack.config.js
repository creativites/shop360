const webpack = require("webpack")
const Hwp = require("html-webpack-plugin")
const path = require("path")
//提取css代码
const Ext = require("extract-text-webpack-plugin")

module.exports = {
    entry : __dirname + "/src/main.js", //__dirname项目的绝对路径
    output : {
//      path : path.resolve(__dirname,"dist"),
//		path : "./dist",
		path : path.resolve("./","dist"),
        filename : "app.js",
        publicPath : "./"	//相对路径
    },
    devtool : "source-map",
    devServer : {
//      contentBase : path.join(__dirname,"dist"),
        contentBase : path.join("./","dist"),
        port : 3000,
        inline : true,		//热加载
        publicPath : "./",
        compress : true,
        historyApiFallback : true,
        disableHostCheck : true
    },
    module : {
        rules : [
            {test:/\.js$/,exclude:/node_modules/,loader:"babel-loader"},
            {test:/\.css$/,loader:Ext.extract("css-loader")},
            {test:/\.less$/,loader:Ext.extract("css-loader!less-loader")}
        ]
    },
    plugins : [
        new webpack.ProvidePlugin({
            React : "react"
        }),
        new Hwp({
            template : "index.html",
            filename : "index.html",
            inject : true
        }),
        new Ext("app.css")
    ]
}