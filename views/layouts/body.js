var u = require('jubiq');
var error = require('../error');
var navbar = require('../partials/navbar');
var viewRouter = require('./view-router');

module.exports = function render(rootComponent) {
    var truth = rootComponent.root;	
    var view = viewRouter(rootComponent);
	
	console.dir(truth.flash);
    return u.section(/#content/,
        u.header(
            navbar(rootComponent)
        ), 
        truth.flash,
        (truth.error ? error(rootComponent) : view)
    );

};
