/*
 * jubiq-express
 * https://github.com/parroit/jubiq-express
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';
var u = require('jubiq');
var urlParser = require('url');
module.exports = jubiqExpress;

function jubiqExpress(mainView, RootType) {

    function buildRootComponent(url, loggedUser, propName, propValue, flash) {

        var root = new RootType({
            url: url,
            loggedUser: loggedUser,
            flash: flash
        });

        if (propName) {
            root = root.set(propName, propValue);
        }



        return {
            root: root
        };

    }

    return function render(req, res, next) {
        res.renderTruth = function(name, data, route, forcedUrl) {
            if (route) {
                throw new Error('route argument deprecated');
            }
            var msg = req.flash('error').join('<br>');
            if (req.get('accept') == 'application/json') {
                res.json({
                    data: data,
                    name: name,
                    flash: msg,
                    loggedUser: req.user
                });
                res.end();
            } else {

                var url = forcedUrl || urlParser.parse(req.originalUrl).path;
                var rootComponent = buildRootComponent(url, req.user, name, data, msg);
                var content = u.render(mainView(rootComponent));
                res.set('Content-Type', 'text/html');
                res.end('<!doctype html>\n' + content);
            }

        };
        next();
    };

}

jubiqExpress.errorMiddleware = function(err, req, res, next) {

    res.status(err.status || 500);

    var url = '/error';
    console.dir(err);
    res.renderTruth('error', {
        status: err.status || 500,
        type: err.constructor && err.constructor.name,
        message: err.message,
        stack: err.stack
    }, null, url);


};
