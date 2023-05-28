const path = require('path');

module.exports = {
  mode: 'development',
  entry: './main.js',
 // watch:true,
  watchOptions:{
   aggregateTimeout:2000,
   poll:2000
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.dev.js',
  },
  module: {
     rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
     ],
   }
};