const debug = require('debug')('debug:app');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require("./config/config")
const logColor = require('./src/untils/logColor');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.options('*', cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

/** Router */
const routes = require('./src/routes');
app.use('/api/v1', routes);
app.use('/api/v2', routes);

/** Database */
mongoose.connect(config.mongo.setting.url, config.mongo.options).then(
    () => {console.log('Successfully connected to '+logColor(`color:green${config.mongo.setting.url}`));},
    err => {console.error( Error(` Unable to connect to database \n${err}`) );}
);

app.use((err, req, res, next) => {
  if (err) {
    log.error('Invalid Request data!');
    debug(err);
    res.statusCode = 400;
    res.send('Invalid Request data')
  } else {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }
});

module.exports = app;
