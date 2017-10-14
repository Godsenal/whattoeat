module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/public',
    port : 8080
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/,
      },
      { 
        test: /\.jsx$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: [/node_modules/,/style\/quill/],
        loader: 'style-loader!css-loader'
        //loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/,/style\/quill/],
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.scss$/,
        use:
        [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options:
            {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options:
            {
              sourceMap: true
            }
          }]
      }
    ]
  }
};