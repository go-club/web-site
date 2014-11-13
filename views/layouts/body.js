var u = require('jubiq');
var error = require('../error');
var navbar = require('../partials/navbar');
var viewRouter = require('./view-router');

module.exports = function render(truth, rootComponent) {

    var view = viewRouter(truth, rootComponent);
//console.dir(view);
    return u.section(/#content/,
        u.header(
            navbar()
        ), 
        (truth.error ? error(truth.error) : view)
    );

};
