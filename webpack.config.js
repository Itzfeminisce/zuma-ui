const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    library: "Zuma",
    libraryTarget: "umd",
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/dist"),
    clean: true,
    //library: 'MyLibrary',
    // libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        include: path.resolve(__dirname, "src"), // exclude any files in the node_modules folder
        use: {
          loader: "babel-loader", // use babel-loader
          options: {
            presets: ["@babel/preset-env"], // specify the babel preset
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
        include: path.resolve(__dirname, "src/assets/css"),
      },
      {
        test: /\.(png|mp3)$/i,
        type: "asset/resource",
        include: path.resolve(__dirname, "src/assets/files"),
      },
    ],
  },
};
