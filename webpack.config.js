var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'app/build/js');
var APP_DIR = path.resolve(__dirname, 'app/src');

var config = {
  entry: {
    app: [`${APP_DIR}/index.jsx`]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "app/build"),
    port: 9000
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
    "mobx": "mobx",
    "mobx-react": "mobxReact",
    "mobx-state-tree": "mobxStateTree",
    "web3": "Web3"
  }
};

module.exports = config;
