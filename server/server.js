import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import config from './config';
const app = express();

if(config.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  let webpackConfig = config.webpackConfig;
  let compiler = webpack(webpackConfig);
  let devServer = new WebpackDevServer(compiler, webpackConfig.devServer);
  devServer.listen(config.devPort, () => {
      console.log('webpack-dev-server is listening on port', config.devPort);
  });
}

app.use('/', express.static(__dirname + '/../public'));

const server = app.listen(config.port, () => {
    console.log('Express listening on port', config.port);
});