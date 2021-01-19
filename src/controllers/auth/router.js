'use strict';

const express = require('express');
const route = express();
const api = require('./api');

route.post('/register', api.register);

module.exports = route