const HtmlWebPackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports  =
{
  mode: isProd,
  output:{
    filename: 'app.bundle.js',
  },
  plugins:[
    new HtmlWebPackPlugin(
      {
        template: 'src'
      }
    )
  ],
  module:
  {
    rules: [
      {
        test: /|.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',
          options:{
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}