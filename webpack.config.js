const path = require("path");

module.exports = {
  entry: "./app.js",
  mode: "development",
  module: {
    rules: [
   /*  
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
   {
        test: /\.css$/i,
        use:["style-loader","css-loader"]
      },*/
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  /*experiments:{
    outputModule:true
},*/
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
   /* module:true,*/
   // library:"Zuma",
    /*clean:true*/
  },
};
