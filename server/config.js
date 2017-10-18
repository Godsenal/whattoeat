const { NODE_ENV, PORT, HOST, DOMAIN } = process.env;
const localDB = "mongodb://localhost:27017/foodDB";
const webpackConfig = require("../webpack.dev.config");

export default {
  NODE_ENV,
  port: PORT || 3000,
  host: HOST,
  domain: DOMAIN || HOST,
  devPort: 3001,
  db: localDB,
  webpackConfig
};
