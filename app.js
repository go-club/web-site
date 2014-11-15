'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jubiqExpress = require('./jubiq-express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./routes');
var connectMongo = require('./models/init');
var buildModel = require('./models/jt-mongoose.js');
var mainView = require('./views/layouts/main');
var Root = require('./models/Root');

var app = express();

connectMongo();

passport.use(new LocalStrategy(routes.auth.loginStrategy));
routes.auth.serialization(passport);

app.use( jubiqExpress(mainView, Root) );


app.use(favicon(__dirname + '/public/img/favicon.png'));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    type: 'application/x-www-form-urlencoded',
    extended: true
}));
app.use(cookieParser());

app.use(session({ 
    secret: 'dfgfdgfdgfdgfdgfdgewrwe,yuk1237' ,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes.home(express.Router()));
app.use('/users', routes.users(express.Router(), buildModel));
app.use('/auth', routes.auth(express.Router(), buildModel, passport));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/font-awesome')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(jubiqExpress.errorMiddleware);


module.exports = app;
