const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const weddingInvitations = require('./wedding-invitations.config');

let config = {
    entry: {
        css: './scss/wedding-invitation.scss'
    },
    output: {
        path: path.join(__dirname, './wedding-invitations/'),
        filename: 'main.[name]'
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            filename: __dirname + '/wedding-invitations/index.html',
            template: __dirname + '/wedding-invitation.html',
            templateParameters: {
                'persons': ['Имя 1', 'Имя 2']
            }
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

weddingInvitations.map((weddingInvitation, index) => {
    config.plugins.push(new HtmlWebpackPlugin({
        filename: __dirname + '/wedding-invitations/' + (index + 1) + '/index.html',
        template: __dirname + '/wedding-invitation.html',
        templateParameters: {
            'persons': weddingInvitation.persons
        }
    }))
});

module.exports = config;