const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './scss/main.scss',
    output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name].css'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ],
    resolve: {
        modules: ['node_modules', 'scss', 'img']
    },
    module: {
        rules: [{
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
                                require('autoprefixer'),
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