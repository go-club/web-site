'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var initModel = require('./models/init');
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    type:'application/x-www-form-urlencoded',
    extended: true
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/font-awesome')));


var truth = require('./models/truth');
var mainView = require('./views/layouts/main');
var u = require('jubiq');
app.use(function render(req, res, next) {
    res.renderTruth = function(name, data) { 
        if (req.get('accept') == 'application/json') {
            res.json({ data: data, name: name });
            res.end();
        } else {
            var model = truth(req.baseUrl+req.route.path,null, name, data);
            var content = u.render(mainView(model));
            res.set('Content-Type', 'text/html');
            res.end('<!doctype html>\n'+content);    
        }
        
    };
    next();
});

//app.use('/', routes.home);
var buildModel = require('./models/jt-mongoose.js');
app.use('/users', routes.users(express.Router(), buildModel));


initModel();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.use(function(err, req, res, next) {
        console.dir(err);
        res.status(err.status || 500);
        req.baseUrl = '/';
        req.route.path = 'error';
        res.renderTruth('error', {
            status:err.status || 500,
            err: err
        });

});


module.exports = app;
