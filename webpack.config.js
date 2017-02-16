var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var srcDirectory = path.resolve('./src');
var nodeModulesDirectory = path.resolve('node_modules');

var isProduction = process.env.NODE_ENV === 'production'

var getPlugins = () => {
  var plugins = [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: __dirname + '/src/index.html',
    }),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
  ]

  if (isProduction) {
    plugins = plugins.concat([
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ])
  }

  return plugins
}

module.exports = {
  entry: {
    main: "./src/main",
    // Analyzed with `webpack-bundle-size-analyzer`
    // to put largest dependencies by size into the vendor bundle
    // Vendor dependencies account for over 80% of total JS size
    // June 7, 2016
    vendor: [
      'react',
      'lodash',
      'jquery',
      'react-router',
      'history'
    ]
  },
  devtool: isProduction ? 'source-map' : 'eval',
  output: {
    path: __dirname + '/build',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules|bootstrap-datetimepicker/,
      loader: 'babel-loader'
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    modulesDirectories: [
      srcDirectory,
      nodeModulesDirectory
    ],
  },
  watchOptions: {
    poll: true
  },
  plugins: getPlugins()
}
