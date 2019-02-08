const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./api');
const config = require('./config');

const app = express();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log('Connected to mongod server');
});

mongoose.connect(config.db, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.use('/', express.static(__dirname + '../public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.listen(config.port, config.host, () => {
  console.log('Express listening on port', config.port);
});
