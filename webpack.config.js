const path = require('path')

module.exports = {
  entry: './components/app-element/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    open: true
  },
  watchOptions: {
    ignored: /node_modules/
  }
}
