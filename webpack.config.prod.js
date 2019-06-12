const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const GoogleFontsPlugin = require('google-fonts-plugin')

module.exports = function () {
    return {
        mode: 'production',
        entry: {
            polyfill: 'babel-polyfill',
            app: './src/app.js'
        },
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin()
            ]
        },
        plugins: [
            //new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Webpack starter project',
                template: path.resolve('./src/index.html')
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new GoogleFontsPlugin({
                fonts: [
                    { "family": "Kanit", "variants": ["400", "400i", "700", "700i"] }
                ]
            })
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: './images',
                                name: "[name].[ext]",
                            },
                        },
                    ]
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader',
                    }
                },
            ]
        }
    };
}
