const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        js: [
            path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
            path.resolve(__dirname, 'node_modules/wow.js/dist/wow.js'),
            path.resolve(__dirname, 'node_modules/stellar.js/jquery.stellar.js'),
            path.resolve(__dirname, 'node_modules/scrolltofixed/jquery-scrolltofixed.js'),
            path.resolve(__dirname, 'js/flat-surface-shader.js'),
            path.resolve(__dirname, 'js/main.js')
        ],
        css: './scss/main.scss'
    },
    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'main.[name]'
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            filename: __dirname + '/index.html',
            template: __dirname + '/main.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new UglifyJsPlugin(),
        new ExtractTextPlugin({
            filename: 'main.css'
        })
    ],
    resolve: {
        modules: ['node_modules', 'scss', 'img']
    },
    module: {
        rules: [{
            test: /\.exec\.js$/,
            use: ['script-loader']
        }, {
            test: require.resolve('wow.js/dist/wow.js'),
            use: [{
                loader: 'expose-loader',
                options: 'WOW'
            }]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        minimize: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('postcss-short'),
                                require('postcss-cssnext')
                            ]
                        },
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            })
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]'
                }
            }
        }]
    }
};