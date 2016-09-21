/*eslint-disable no-var, one-var, func-names, indent, prefer-arrow-callback, object-shorthand, no-console, newline-per-chained-call, one-var-declaration-per-line, prefer-template, vars-on-top */
var path = require('path');
var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var isProd = process.env.NODE_ENV === 'production';

var cssLoaders = 'css?sourceMap!postcss?pack=custom!sass?sourceMap';
var config = {
  context: path.join(__dirname, '../app'),
  resolve: {
    alias: {
      modernizr$: path.join(__dirname, '.modernizrrc')
    },
    modules: [path.join(__dirname, '../app/scripts'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  entry: {},
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: function() {
          return {
            defaults: [autoprefixer],
            custom: [
              autoprefixer({
                browsers: [
                  'ie >= 9',
                  'ie_mob >= 10',
                  'ff >= 30',
                  'chrome >= 34',
                  'safari >= 7',
                  'opera >= 23',
                  'ios >= 7',
                  'android >= 4.4',
                  'bb >= 10'
                ]
              })
            ]
          };
        }
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: isProd ? ExtractText.extract(cssLoaders) : 'style!' + cssLoaders
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&minetype=application/font-woff&name=/media/fonts/[name].[ext]',
        include: /fonts/
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=/media/fonts/[name].[ext]',
        include: /fonts/
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          'file?hash=sha512&digest=hex' + (isProd ? '&name=/fonts/[name].[ext]' : ''),
          'image-webpack?bypassOnDebug=false&optimizationLevel=7&interlaced=false'
        ],
        include: /media/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.modernizrrc$/,
        loader: 'modernizr'
      },
      {
        test: /\.md$/,
        loader: 'html!markdown'
      }
    ]
  }
};

module.exports = config;
