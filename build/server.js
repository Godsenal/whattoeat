'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

if (_config2.default.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    var webpackConfig = _config2.default.webpackConfig;
    var compiler = (0, _webpack2.default)(webpackConfig);
    var devServer = new _webpackDevServer2.default(compiler, webpackConfig.devServer);
    devServer.listen(_config2.default.devPort, function () {
        console.log('webpack-dev-server is listening on port', _config2.default.devPort);
    });
}

app.use('/', _express2.default.static(__dirname + '/../public'));

var server = app.listen(_config2.default.port, function () {
    console.log('Express listening on port', _config2.default.port);
});