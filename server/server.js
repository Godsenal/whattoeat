import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

import api from './api';
import config from './config';
const app = express();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log('Connected to mongod server');
});

mongoose.Promise = require('bluebird');
mongoose.connect(config.db,{
  useMongoClient: true,
});

app.use( bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json());

app.use('/api',api);

if (config.NODE_ENV == "development") {
  console.log("Server is running on development mode");
  let webpackConfig = config.webpackConfig;
  let compiler = webpack(webpackConfig);
  let devServer = new WebpackDevServer(compiler, webpackConfig.devServer);
  devServer.listen(config.devPort, () => {
    console.log("webpack-dev-server is listening on port", config.devPort);
  });
}   

app.use("/", express.static(__dirname + "/../public"));

app.get('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

const server = app.listen(config.port, () => {
  console.log("Express listening on port", config.port);
});
