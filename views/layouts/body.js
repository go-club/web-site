var u = require('jubiq');
var error = require('../error');
var navbar = require('../partials/navbar');
var viewRouter = require('./view-router');

module.exports = function render(truth) {

    var view = viewRouter(truth);
console.dir(view);
    return u.section(/#content/,
        u.header(
            navbar()
        ), 
        (truth.error ? error(truth.error) : view)
    );

};
