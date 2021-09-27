const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/app.js'),
    vendor: path.resolve(__dirname, 'src/vendor.js')
  },
  devtool: false, // Changes from 'inline-source-map' to false to solve memory issues
  // The server serves files from memory rather than creating local copies
  /* devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 5000, // default 8080
    open: true,
    hot: true
    // watchContentBase: true // My VsCode apparentl doesn't recognize this
  }, */
  // loaders
  module: {
    rules: [
      // css loader
      {test: /.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      // images
      {
        test: /\.(svg|ico|png|webp|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'imgs/[hash][ext][query]' // Store generated files in 'imgs' folder
        }
      },
      // js for babel
      {test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack is Amazing!!',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/template.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
}
