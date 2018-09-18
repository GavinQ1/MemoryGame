var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "babel-polyfill"
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: path.resolve(__dirname, '../'),
      query: {
        presets: ['env', 'react', 'stage-2']
      }
    }, {
      test: /\.json$/,
      loader: "json-loader"
    }]
  },
  node: {
    fs: "empty",
    module: "empty",
    net: "empty"
  }
}