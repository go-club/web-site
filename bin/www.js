#!/usr/bin/env node
require('traceur/bin/traceur-runtime');
var debug = require('debug')('go-club');
var app = require('../site_deploy/app');


app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
