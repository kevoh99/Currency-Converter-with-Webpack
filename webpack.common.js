const path = require('path')

module.exports = {
  entry: {
    // main: path.resolve(__dirname, 'src/app.js'),
    main: ['regenerator-runtime/runtime.js', path.resolve(__dirname, 'src/app.js')],
    vendor: ['regenerator-runtime/runtime.js', path.resolve(__dirname, 'src/vendor.js')]
    // vendor: path.resolve(__dirname, 'src/vendor.js')
  },
  devtool: false, // Changes from 'inline-source-map' to false to solve memory issues
  // loaders
  module: {
    rules: [
      // html
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      // images
      {
        test: /\.(svg|ico|png|webp|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]' // Store generated files in 'img' folder
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
  }
}
