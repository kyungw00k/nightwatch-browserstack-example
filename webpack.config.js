var path = require('path')
var webpack = require('webpack')

module.exports = {
  target: 'web',
  node: {
    console: false,
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  entry: {
    library: [
      path.resolve(__dirname, 'src/index.js')
    ]
  },
  module: {
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.js$/,
        loader: 'standard',
        exclude: /(node_modules|lib)/
      }
    ],
    loaders: [
      {
        loader: 'babel',
        test: /\.js$/,
        exclude: /(node_modules|lib)/,
        query: {
          presets: ['es2015']
        }
      }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify-loader'],
        exclude: [
          /(node_modules|lib)/
        ],
      }
    ]
  },
  stats: {
    colors: true,
    reasons: true,
    modules: true
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].min.js',
    library: 'library',
    libraryTarget: 'umd'
  },
  debug: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: true,
      mangle: false,
      minimize: true
    })
  ]
}
