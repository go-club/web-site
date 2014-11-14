'use strict';

module.exports = function(truth, rootComponent) {
    var url = truth.url;

    if (url[url.length - 1] == '/') {
        url = url.slice(0,-1);
    }
    switch (url) {
        case '/users':
            return require('../users')(truth.users, rootComponent);
        case '/error':
            
            return require('../error')(truth.error);
        case '/users/new':
            return require('../edit-user')(truth.editUser, rootComponent);
        case '/users/:id':
            return require('../edit-user')(truth.editUser, rootComponent);

    }

    throw new Error('unknown url:'+url);
};
