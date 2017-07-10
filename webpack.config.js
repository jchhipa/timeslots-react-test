var webpack = require('webpack')
var path = require('path')

// webpack.config.js
module.exports = {
  entry: {
    app: './js-src/main.js'
  },
  output: {
    path: __dirname + '/public/app/build',
    publicPath: '/app/build/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    inline: true,
    port: 3030,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules/'),
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy'
          ]
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    // These libraries will be available everywhere. No need to do require in every file
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
  resolve: {
    // Absolute path that contains modules
    modules: ['js-src', 'node_modules'],
    extensions: ['.js', '.json']
  },
  node: {
    fs: "empty"
  },
  cache: true,
  devtool: 'source-map'
}
