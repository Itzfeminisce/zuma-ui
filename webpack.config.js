const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    //library: 'MyLibrary',
   // libraryTarget: 'umd',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname,"dist"),
    },
    port: 3000,
  //  open: true,
    hot: true,
    compress: true,
  //  historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  externals: ['.yarn','node_modules','.git']
};
