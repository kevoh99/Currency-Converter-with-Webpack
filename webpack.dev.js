const path = require('path')
const common = require('./webpack.common')
// Video tutorial uses "const merge = require('webpack-merge')" which doesn't work
const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development', // Change from 'development' to 'production' to generate minimized js, ready for distribution
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    // assetModuleFilename: '[name][ext]', // Does the same as generator: {filename: 'imgs/[hash][ext][query]' // Store generated files in 'imgs' folder}
    clean: true
  },
  // loaders
  module: {
    rules: [
      // css loader
      {
        test: /.s?css$/,
        use: [
          'style-loader', // 3. Inject styles into DOM
          'css-loader', // 2. Turns css into commonjs
          'sass-loader' // 1. Turns sass into css
        ]
      }
    ]
  },
  devtool: false, // Changes from 'inline-source-map' to false to solve memory issues
  // The server serves files from memory rather than creating local copies
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 5000, // default 8080
    open: true,
    hot: true
    // watchContentBase: true // My VsCode apparentl doesn't recognize this
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack is Amazing!!',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/template.html')
    })
  ]
})
