'use strict';
var route = require('./route-views');

route('/auth/login', require('../login'));
route('/auth/logout', require('../home'));
route('/users/new', require('../edit-user'));
route('/users/:id', require('../edit-user'));
route('/users', require('../users'));
route('/auth/change-password', require('../change-password'));
route('/error', require('../error'));
route('/', require('../home'));
route(/.*/, function(rootComponent) {
    throw new Error('unknown url:' + rootComponent.root.url);
});

module.exports = function(rootComponent) {
    var truth = rootComponent.root;
    var url = truth.url;


    if (url[url.length - 1] == '/') {
        url = url.slice(0, -1);
    }
    

    console.log('routing for url ', url);
    return route(url)(rootComponent);

};
