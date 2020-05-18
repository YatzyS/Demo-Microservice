var express = require('express');
var path = require('path');

var logger = require('morgan');

var login = require('./routes/login');
var jsonpatch = require('./routes/jsonPatch');
var thumbnail = require('./routes/thumbnail');

var app = express();

app.use(logger('tiny'))

app.use('/login', login);
app.use('/jsonPatch', jsonpatch);
app.use('/thumbnail', thumbnail);

module.exports = app;
