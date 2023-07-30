const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: './main.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  mode: 'production',
  plugins: [
    new Dotenv()
  ],
};
