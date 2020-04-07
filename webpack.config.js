const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const polyfills = [

];
module.exports = {
    context:path.resolve(__dirname,'src'),
    mode : 'development',
    entry : {
        main: ['@babel/polyfill','./index.js']
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname,'dist')
    },
    resolve:{
        extensions:['.js','.json'],
        alias:{
            '@' :   path.resolve(__dirname,'src'),
            '@components' :   path.resolve(__dirname,'components'),
        }
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([...polyfills], {
            ignore: ['.DS_Store']
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader:"babel-loader",
                    options:{
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    targets: '>1%, not dead, not ie 11'
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
}