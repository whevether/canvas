const webpack = require('webpack'); //webpack 打包
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //打包压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html并注入js css
const CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝资源文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');
// 配置全局环境为生产环境
const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__DEV__': false
};
const config = {
    resolve: {
        extensions: ['*', '.js', '.json'],
        alias: {
            src$: path.resolve(__dirname, 'src/')
        }
    },
    entry: {
        aiani: path.resolve(__dirname, 'src/ai-ani/aiani'),
        ball: path.resolve(__dirname, 'src/ball/index'),
        meteorshower1: path.resolve(__dirname, 'src/meteorshower/meteorshower-bg'),
        meteorshower2: path.resolve(__dirname, 'src/meteorshower/meteorshower'),
        onestar: path.resolve(__dirname, 'src/meteorshower/onestar'),
        cloud: path.resolve(__dirname, 'src/cloud/index'),
        cloud1: path.resolve(__dirname, 'src/cloud/index1'),
        earth: path.resolve(__dirname, 'src/earth/index'),
        effect: path.resolve(__dirname, 'src/effectbysnapsvg/efficient'),
        safesvg: path.resolve(__dirname, 'src/effectbysnapsvg/safesvg'),
        fire: path.resolve(__dirname, 'src/fire/fire'),
        progress: path.resolve(__dirname, 'src/progress/index'),
        wave: path.resolve(__dirname, 'src/wave/index')
    },
    target: 'web', // 目标是web服务
    mode: "production", //打包模式
    output: {
        //输出目录
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].js?v=[chunkhash]',
        // chunkFilename: 'js/core.js?v=[chunkhash]',
    },
    optimization: {
        // 优化打包配置
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        properties: true
                    },
                    output: {
                        comments: false
                    },
                    warnings: false,
                    mangle: true,
                    ie8: true
                },
                cache: true,
                cacheKeys: (defaultCacheKeys, file) => {
                    defaultCacheKeys.myCacheKey = 'myCacheKeyValue';

                    return defaultCacheKeys;
                },
                parallel: true,
                sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css|\.less$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            })
        ],
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendor: {//node_modules内的依赖库
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: "core",
                    minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 100,
                    // enforce: true?
                },
                common: {// ‘src/js’ 下的js文件
                    chunks: "all",
                    test: /[\\/]src[\\/]js[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
                    name: "common", //生成文件名，依据output规则
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1
                },
                styles: {
                    name: 'styles',
                    test: /\.css|\.less$/,
                    chunks: 'all',
                    minSize: 0,
                    minChunks: 2,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        // 插件
        new webpack.DefinePlugin(GLOBALS),
        new MiniCssExtractPlugin({
            filename: "styles/[name].css?v=[chunkhash]",
            chunkFilename: "styles/core.css?v=[chunkhash]"
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets'),
                to: path.resolve(__dirname, 'dist/assets'),
                ignore: ['.*']
            }
        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'earth', 'effect', 'safesvg', 'fire', 'progress', 'wave'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/ai-ani/index.html',
            filename: 'aiani.html',
            // chunks: ['public','index'],
            excludeChunks: ['ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'earth', 'effect', 'safesvg', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/ball/index.html',
            filename: 'ball.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'earth', 'effect', 'safesvg', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/meteorshower/meteorshower-bg.html',
            filename: 'meteorshower-bg.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'earth', 'effect', 'safesvg', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/meteorshower/meteorshower.html',
            filename: 'meteorshower.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'onestar', 'cloud', 'cloud1', 'earth', 'effect', 'safesvg', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/meteorshower/onestar.html',
            filename: 'onestar.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'cloud', 'cloud1', 'earth', 'effect', 'safesvg', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/cloud/index.html',
            filename: 'cloud.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud1', 'earth', 'effect', 'safesvg', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/cloud/index1.html',
            filename: 'cloud1.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'earth', 'effect', 'safesvg', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/earth/index.html',
            filename: 'earth.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'effect', 'safesvg', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/effectbysnapsvg/efficient.html',
            filename: 'efficient.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'earth', 'safesvg', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/effectbysnapsvg/safesvg.html',
            filename: 'safesvg.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'earth', 'effect', 'fire', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/fire/index.html',
            filename: 'fire.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'earth', 'effect', 'safesvg', 'progress', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/progress/index.html',
            filename: 'progress.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'earth', 'effect', 'safesvg', 'fire', 'wave'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        }),
        new HtmlWebpackPlugin({
            template: 'src/wave/index.html',
            filename: 'wave.html',
            // favicon: 'src/favicon.ico',
            excludeChunks: ['aiani', 'ball', 'meteorshower1', 'meteorshower2', 'onestar', 'cloud', 'cloud1', 'earth', 'effect', 'safesvg', 'fire', 'progress'],
            // favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: ''
        })
    ],
    module: {
        // 编译打包的模块
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }]
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.css|\.less$/,
                // exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true,
                            sourceMap: false
                            // importLoaders: 2,
                            // modules: true,
                            // // namedExport: true, // this is  invalid Options ,I find it
                            // camelCase: true,
                            // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer'),
                                require('postcss-pxtorem')({
                                    rootValue: 16,
                                    unitPrecision: 5,
                                    propList: ['*'],
                                    selectorBlackList: [],
                                    replace: true,
                                    mediaQuery: false,
                                    minPixelValue: 0
                                })
                            ],
                            sourceMap: false
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            paths: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
                            minimize: true,
                            javascriptEnabled: true,
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    }
}
// function getView(globPath, flag) {
//     let files = glob.sync(globPath);
//     let entries = {},
//         entry, dirname, basename, pathname, extname;

//     files.forEach(item => {
//         entry = item;
//         dirname = path.dirname(entry);//当前目录
//         extname = path.extname(entry);//后缀
//         basename = path.basename(entry, extname);//文件名
//         pathname = path.join(dirname, basename);//文件路径
//         if (extname === '.html') {
//             entries[pathname] = './' + entry;
//         } else if (extname === '.js') {
//             entries[basename] = entry;
//         }
//     });

//     return entries;
// }
// ['src/seo/*html'].forEach((item) => {
//     let pages = Object.keys(getView(item));
//     pages.forEach(pathname => {
//         let htmlname = pathname.split('src' + path.sep)[1];
//         let conf = {
//             filename: `${htmlname}.html`,
//             template: `${pathname}.html`,
//             excludeChunks: ['vps', 'home', 'about', 'vpscommon', 'guide'],
//             minify: {
//                 removeComments: true,
//                 collapseWhitespace: true,
//                 removeRedundantAttributes: true,
//                 useShortDoctype: true,
//                 removeEmptyAttributes: true,
//                 removeStyleLinkTypeAttributes: true,
//                 keepClosingSlash: true,
//                 minifyJS: true,
//                 minifyCSS: true,
//                 minifyURLs: true
//             },
//             inject: true,
//             trackJSToken: ''
//         }

//         config.plugins.push(new HtmlWebpackPlugin(conf));
//     });
// });
module.exports = config;