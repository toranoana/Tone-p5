var webpack = require('webpack');

module.exports = {
  entry: './src/index',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000
  }
};