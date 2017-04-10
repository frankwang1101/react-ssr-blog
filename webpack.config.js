var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');

var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');

var webpack_isomorphic_tools_plugin = 
  // webpack-isomorphic-tools settings reside in a separate .js file 
  // (because they will be used in the web server code too).
  new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)
  .development()


var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];
var clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : [];

var commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
];
module.exports = 
  {
    context: path.join(__dirname),
    entry: ['webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr','./src/containers/browser.js'],
    output: {
      path: `${__dirname}/dist/assets`,
      publicPath: 'http://localhost:3001/assets/',
      filename: 'bundle.js'
    },
    plugins: clientLoaders.concat([
      webpack_isomorphic_tools_plugin,
       new webpack.HotModuleReplacementPlugin()
    ]),
    module: {
      preLoaders: [
         {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader:'eslint',
          use: [{
            options: {
              userEslintrc: true
            },
            loader: 'eslint-loader'
          }]
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          // loaders: ['react-hot','babel']
          loaders:['react-hot','babel'],

        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.less$/,
          loader:'style-loader!css-loader!less-loader',
        },
        {
          test: webpack_isomorphic_tools_plugin.regular_expression('fonts'),
          loader:'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
        },
        {
          test: webpack_isomorphic_tools_plugin.regular_expression('images'),
          loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
        }
      ]
      
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };
