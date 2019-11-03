const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    index: path.join(__dirname, 'src/ts/index.ts'),
    contact:   path.join(__dirname, 'src/ts/contact.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  optimization: {
    minimizer: [new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }), new OptimizeCSSAssetsPlugin()]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    liveReload: true,
    disableHostCheck: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
              // outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.ico/,
        use: [{ loader: 'file-loader', options: { name: '[name].[ext]' } }]
      },

      {
        test: /\.(jpeg|png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=assets/img/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin([{ from: './src/**/*.html', flatten: true }]),
    new CopyPlugin([{ from: './img/**/*.png', flatten: false }]),
    new CopyPlugin([{ from: './img/**/*.jpg', flatten: false }]),
  ]
};
