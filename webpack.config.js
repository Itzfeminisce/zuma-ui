const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
  library:"Zuma",
  libraryTarget:"umd",
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    clean:true
    //library: 'MyLibrary',
   // libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any files in the node_modules folder
        use: {
          loader: "babel-loader", // use babel-loader
          options: {
            presets: ["@babel/preset-env"], // specify the babel preset
          },
        }
        
      },
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
};
