const path = require('path')
const common = require('./webpack.common')
const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
  mode: 'production', // Change from 'development' to 'production' to generate minimized js, ready for distribution
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
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
          MiniCssExtractPlugin.loader, // 3. Extract css into files
          'css-loader', // 2. Turns css into commonjs
          'sass-loader' // 1. Turns sass into css
        ]
      }
    ]
  },
  devtool: false, // Changed from 'inline-source-map' to false to solve memory issues
  // Enable CSS Minimizer Webpack plugin
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
      new HtmlWebpackPlugin({
        title: 'Webpack is Amazing!!',
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/template.html'),
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  // Mini Css Extract Plugin extracts css into a file
  plugins: [new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
  })]
})
