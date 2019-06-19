const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html并注入
const CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝资源文件
/* eslint-disable  react/require-extension */ 
const config = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      src$: path.resolve(__dirname, 'src/')
    }
  },

  devtool: 'eval', // 调试工具
  mode: "development",
  entry: {
    aiani:[
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/ai-ani/aiani') 
    ],
    ball:[
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/ball/index') 
    ],
    meteorshower1:[
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/meteorshower/meteorshower-bg') 
    ],
    meteorshower2:[
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/meteorshower/meteorshower') 
    ],
    onestar:[
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/meteorshower/onestar') 
    ],
    cloud:[
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/cloud/index') 
    ],
    cloud1:[
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/cloud/index1') 
    ],
    earth: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/earth/index') 
    ],
    effect: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/effectbysnapsvg/efficient')
    ],
    safesvg: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/effectbysnapsvg/safesvg')
    ],
    fire: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/fire/fire')
    ],
    progress: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/progress/index')
    ],
    wave: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/wave/index')
    ]
  },
  target: 'web', // 目标是web 服务器
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出编译文件目录
    publicPath: '/', //根目录
    filename: 'js/[name].js',
    // chunkFilename: 'js/core.js'
  },
  optimization: {
    // 优化打包配置
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
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'progress.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, 'dist/assets'),
        ignore: ['.*']
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','onestar','cloud','cloud1','earth','effect','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/ai-ani/index.html',
      filename: 'aiani.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['ball','meteorshower1','meteorshower2','onestar','cloud','cloud1','earth','effect','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/ball/index.html',
      filename: 'ball.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','meteorshower1','meteorshower2','onestar','cloud','cloud1','earth','effect','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/meteorshower/meteorshower-bg.html',
      filename: 'meteorshower-bg.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower2','onestar','cloud','cloud1','earth','effect','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/meteorshower/meteorshower.html',
      filename: 'meteorshower.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','onestar','cloud','cloud1','earth','effect','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/meteorshower/onestar.html',
      filename: 'onestar.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','cloud','cloud1','earth','effect','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/cloud/index.html',
      filename: 'cloud.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','onestar','cloud1','earth','effect','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/cloud/index1.html',
      filename: 'cloud1.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','onestar','cloud','earth','effect','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/earth/index.html',
      filename: 'earth.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','onestar','cloud','cloud1','effect','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/effectbysnapsvg/efficient.html',
      filename: 'efficient.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','onestar','cloud','cloud1','earth','safesvg','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/effectbysnapsvg/safesvg.html',
      filename: 'safesvg.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','onestar','cloud','cloud1','earth','effect','fire','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/fire/index.html',
      filename: 'fire.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','onestar','cloud','cloud1','earth','effect','safesvg','progress','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/progress/index.html',
      filename: 'progress.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','onestar','cloud','cloud1','earth','effect','safesvg','fire','wave'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    }),
    new HtmlWebpackPlugin({
      template: 'src/wave/index.html',
      filename: 'wave.html',
      // favicon: 'src/favicon.ico',
      excludeChunks:['aiani','ball','meteorshower1','meteorshower2','onestar','cloud','cloud1','earth','effect','safesvg','fire','progress'],
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      inject: true,
      trackJSToken: ''
    })
  ],
  module: {
    //  编译模式
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
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
              mimetype: 'application/octet-stream'
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
              mimetype: 'image/svg+xml'
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
        // exclude: /node_modules/, //排除这个文件夹
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
              // importLoaders: 2,
              // modules: true,
              // namedExport: true, // this is  invalid Options ,I find it
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
              // includePaths: [path.resolve(__dirname, 'src', 'less')],
              paths:[path.resolve(__dirname, 'src'),path.resolve(__dirname, 'node_modules', )],
              javascriptEnabled: true,
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
// function getView(globPath,flag){
//   let files = glob.sync(globPath);
//   let entries = {},
//   entry, dirname, basename, pathname, extname;

//   files.forEach(item => {
//       entry = item;
//       dirname = path.dirname(entry);//当前目录
//       extname = path.extname(entry);//后缀
//       basename = path.basename(entry, extname);//文件名
//       pathname = path.join(dirname, basename);//文件路径
//       if (extname === '.html') {
//           entries[pathname] = './' + entry;
//       } else if (extname === '.js') {
//           entries[basename] = entry;
//       }
//   });

//   return entries;
// }
// ['src/seo/*html'].forEach((item)=>{
//   let pages = Object.keys(getView(item));
//   pages.forEach(pathname => {
//     let htmlname = pathname.split('src'+path.sep)[1];
//     let conf = {
//         filename: `${htmlname}.html`,
//         template: `${pathname}.html`,
//         excludeChunks:['vps','home','about','vpscommon', 'guide'],
//         minify: {
//             removeAttributeQuotes:true,
//             removeComments: true,
//             collapseWhitespace: true,
//             removeScriptTypeAttributes:true,
//             removeStyleLinkTypeAttributes:true
//         },
//         inject: true,
//         trackJSToken: ''
//     }

//     config.plugins.push(new HtmlWebpackPlugin(conf));
//   });
// });
module.exports = config;