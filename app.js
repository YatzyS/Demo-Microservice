var debug = require('debug')('microservice');
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
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
