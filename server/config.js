const { NODE_ENV } = process.env;
const localDB = "mongodb://localhost:27017/foodDB";
const webpackConfig = require("../webpack.dev.config");

export default {
  NODE_ENV,
  port: 3000,
  devPort: 3001,
  db: localDB,
  webpackConfig
};
